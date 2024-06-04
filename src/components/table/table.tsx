import React, {FC, ReactNode, useEffect, useRef, useState} from 'react'
import {NativeProps, withNativeProps} from '../../utils/native-props'
import {Affix} from "antd";
import {DownFill} from "antd-mobile-icons";
import {cloneDeep} from "lodash";

const classPrefix = `adm-table`

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

export const columns = [
  {
    title: '名称',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    sorter: true,
    render: (text: any) => {
      return (
        <a href="https://blog.csdn.net/m0_51514727/article/details/135870249">{text}</a>
      )
    }
  },
  {
    title: '年龄',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    sorter: true,
    render: (text: any) => {
      return (
        <a href="https://blog.csdn.net/m0_51514727/article/details/135870249">{text}</a>
      )
    }
  },
  {title: 'Column 1', dataIndex: '1', key: '1'},
  {title: 'Column 1', dataIndex: '2', key: '1'},
  {title: 'Column 1', dataIndex: '3', key: '1'},
  {title: 'Column 1', dataIndex: '4', key: '1'},
  {title: 'Column 1', dataIndex: '5', key: '1'},
];

export const dataSource1: any = [
  {
    key: '1',
    name: 'John Brown111111',
    age: 32,
    address: 'New York Park',
    "1": 'London Park',
  },
  {
    key: '2',
    name: 'aaaaaJim Green',
    age: 40,
    address: 'London Park',
    "1": 'London Park',

  }, {
    key: '3',
    name: 'Jim Green',
    age: 100,
    address: 'London Park',
    "1": 'London Park',
  }
];

export type CardProps = {
  title?: ReactNode
  rowKey?: string

} & NativeProps

// 4.左上角表头
// 3.右边表头
// 2.左侧fixed
// 1.右侧主体


let hideFunBody = (col: any, layer = main, type = "head"): any => {
  if (layer === main || layer === head) {
    if (col.fixed) {
      return {visibility: "hidden"}
    }
  }

  // 左侧背景
  if (layer === leftBackground) {
    if (!col.fixed) {
      return {display: "none"}
    } else {
      return {visibility: "hidden"}
    }
  }

  // 左侧
  if (layer === left) {
    if (!col.fixed) {
      return {visibility: "hidden"}
    }
  }
  // 3头部滚动

  // 4控制所有的滚动
  // if (layer === mask) {
  //   return {visibility: "hidden"}
  // }


  // 5左上角头部
  if (layer === headLeft) {
    if (!col.fixed || type === "body") {
      return {display: "none", pointerEvents: "none"}
    }
  }
}

let mask = 1;
let main = 2;
let leftBackground = 3;
let left = 4;
let head = 5;

let headLeft = 6;

const sortArr = [{
  order: "undefined",
  index: 0
}, {
  order: "ascend",
  index: 1
}, {
  order: "descend",
  index: 2
},]

const sortFun = (data: any, sortObj: any) => {
  if (data.dataIndex === sortObj.field) {
    if (!sortObj.orderIndex) {
      return 1
    }
    if (sortObj.orderIndex === 2) {
      return 0
    } else {
      return 2
    }
  } else {
    return 1
  }
}
// console.log(777,dataSource1.sort((a, b) => a.name.localeCompare(b.name)))

export const Table: FC<any> = (props) => {
  const {
    rowKey = "key", onChange = () => {
    }, dataSource = dataSource1, style = {}, className="", HeadExtra
  } = props;

  let sortHandler = (data: any, sortObj: any, key = 1) => {

    if (sortObj.field === data.dataIndex && sortObj.orderIndex === key) {
      return "#1C6AFF"
    } else {
      return "#C9CDD4"
    }
  }


  let HeadDom = ({layer, setDataSource, sortObj, setSortObj}: any) => {


    return (
      <div
        className={`${classPrefix}-head`}
        style={{
          // ...(layer === headLeft ? {background: "#fff"} : {}),
        }}
      >
        {layer === head && HeadExtra?<HeadExtra columns={columns}/>:null}
        {columns.map((data: any) => {
          return (
            <div
              key={data.dataIndex}
              style={{
                ...hideFunBody(data, layer),
              }}
            >
              <div
                className={`${classPrefix}-head-item`}
                style={{width: (data.width || 80)}}
                onClick={data.sorter ? () => {

                  let orderIndex = sortFun(data, sortObj);

                  // 先处理数据
                  if (!data.sort) {
                    setDataSource((org: any) => {
                      let _org = cloneDeep(org)

                      // 字符串排序
                      if (typeof _org[0][data.dataIndex] === "string") {
                        if (orderIndex === 1) {
                          _org.sort((a: any, b: any) => {
                            // 如果a和b都以'-'开头，则按正常顺序排序
                            if (a[data.dataIndex].startsWith('-') && b[data.dataIndex].startsWith('-')) {
                              return a[data.dataIndex].localeCompare(b[data.dataIndex]);
                            }
                            // 如果a以'-'开头而b不是，则a排在b后面
                            else if (a[data.dataIndex].startsWith('-')) {
                              return 1;
                            }
                            // 如果b以'-'开头而a不是，则b排在a后面
                            else if (b[data.dataIndex].startsWith('-')) {
                              return -1;
                            }
                            // 如果a和b都不以'-'开头，则按正常顺序排序
                            else {
                              return a[data.dataIndex].localeCompare(b[data.dataIndex]);
                            }

                          })

                        } else if (orderIndex === 2) {
                          _org.sort((a: any, b: any) => {
                            // 如果a和b都不以'-'开头，则按降序排序
                            if (!a[data.dataIndex].startsWith('-') && !b[data.dataIndex].startsWith('-')) {
                              return b[data.dataIndex].localeCompare(a[data.dataIndex]); // 注意这里是 b 减 a，实现降序
                            }
                            // 如果a以'-'开头而b不是，则a排在b前面（但仍在'-'开头的内部）
                            else if (a[data.dataIndex].startsWith('-') && !b[data.dataIndex].startsWith('-')) {
                              return -1;
                            }
                            // 如果b以'-'开头而a不是，则b排在a前面（但b仍在a之前的其他'-'开头字符串之后）
                            else if (!a[data.dataIndex].startsWith('-') && b[data.dataIndex].startsWith('-')) {
                              return 1;
                            }
                            // 如果a和b都以'-'开头，则按正常顺序排序（或者你可以选择保持它们的原始顺序）
                            else {
                              return a[data.dataIndex].localeCompare(b[data.dataIndex]);
                            }
                          });
                        }
                      }

                      // 数字排序
                      if (typeof _org[0][data.dataIndex] === "number") {
                        if (orderIndex === 1) {
                          _org.sort((a: any, b: any) => a[data.dataIndex] - b[data.dataIndex]);
                        } else if (orderIndex === 2) {
                          _org.sort((a: any, b: any) => b[data.dataIndex] - a[data.dataIndex]);
                        }
                      }

                      console.log(111, _org)
                      return _org
                    })
                  }

                  setSortObj((org: any) => {
                    let obj = {
                      field: data.dataIndex,
                      orderIndex: orderIndex,
                      order: sortArr[orderIndex].order
                    }

                    onChange({current: 1, pageSize: 10}, {}, obj, {})
                    return obj
                  })
                } : () => {
                }}
              >
                <div
                  className={`${classPrefix}-head-item-title`}
                  style={{
                    ...(data.align ? {textAlign: data.align} : {})
                  }}
                >
                  {typeof data.title === "function" ? data.title(data) : data.title}
                </div>
                {data.sorter ? <div className={`${classPrefix}-head-item-sort`}>
                  <div>
                    <DownFill
                      fontSize={8}
                      style={{transform: "rotate(180deg)", color: sortHandler(data, sortObj, 1)}}
                    />
                  </div>
                  <div>
                    <DownFill
                      fontSize={8}
                      style={{color: sortHandler(data, sortObj, 2)}}
                    />
                  </div>
                </div> : null}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  let BodyDom = ({layer, dataSource}: any) => {

    return (
      <div className={`${classPrefix}-body`} style={{
        ...(layer === main ? {background: "#fff"} : {})
      }}>
        {
          dataSource.map((dataItem: any) => {

            return (
              <div
                className={`${classPrefix}-body-item ${layer === main ? `${classPrefix}-body-item-background` : ""} ${layer === left ? `${classPrefix}-body-item-background-left` : ""}`}
                key={dataItem[rowKey]}>
                {columns.map((data: any, i) => {
                  return (
                    <div
                      className={`${classPrefix}-body-item-text`}
                      key={i}
                      style={{
                        ...hideFunBody(data, layer, "body"),
                      }}
                    >
                      <div
                        style={{width: (data.width || 80)}}
                      >
                        {data.render ? data.render(dataItem[data.dataIndex]) : dataItem[data.dataIndex]}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })
        }
      </div>
    );
  }
  // <Affix>

  let TableDomLayer = ({
                         layer = main,
                         onScroll = null,
                         offset = 0,
                         setDataSource,
                         dataSource,
                         sortObj,
                         setSortObj
                       }: any) => {

    let scrollRef: any = useRef(null);

    useEffect(() => {

      if (layer === main || layer === head) {
        scrollRef.current.scrollLeft = offset
      }
    }, [offset])

    let dom = (
      <div
        ref={scrollRef}
        className={`${classPrefix}-warp`}
        style={{
          // ...(layer === left ? {overflowX: "visible"} : {})
          ...(layer === left ? {pointerEvents: "none"} : {}),
          ...(layer === leftBackground ? {pointerEvents: "none"} : {}),

        }}
        onScroll={onScroll ? (e: any) => {
          onScroll(e.target.scrollLeft)
        } : () => {
        }}
      >
        <HeadDom layer={layer} setDataSource={setDataSource} setSortObj={setSortObj} sortObj={sortObj}/>
        {layer === head || layer === headLeft ? null : <BodyDom layer={layer} dataSource={dataSource}/>}
      </div>
    )

    return (
      <div
        className={`${classPrefix}-warp-abs ${className}`}
        style={{
          zIndex: layer * 500,
          ...(layer !== mask ? {position: "absolute"} : {}),
          ...(layer === main ? {background: "#fff"} : {}),
          ...(layer === leftBackground ? {
            background: "#fff",
            boxShadow: "20px 0 24px 0px rgba(0, 0, 0, 0.05)",
            height: "100%"
          } : {}),
          ...(layer === main || layer === left || layer === leftBackground || layer === head ? {pointerEvents: "none"} : {}),
          ...style
        }}>
        {layer === head || layer === headLeft ? <Affix>{dom}</Affix> : dom}
      </div>
    )
  }

  let TableDom = ({}) => {
    const [scrollValue, setScrollValue] = useState(0)
    const [dataSource_, setDataSource] = useState(dataSource)
    const [sortObj, setSortObj] = useState({});

    return (
      <div className={`${classPrefix}-fixed`}>
        <TableDomLayer
          layer={mask}
          onScroll={(data: any) => {
            setScrollValue(data)
          }}
          dataSource={dataSource_}
          setDataSource={setDataSource}
          setSortObj={setSortObj} sortObj={sortObj}
        />
        <TableDomLayer offset={scrollValue} layer={main} dataSource={dataSource_} setSortObj={setSortObj}
                       sortObj={sortObj}/>
        <TableDomLayer offset={scrollValue} layer={leftBackground} dataSource={dataSource_} setSortObj={setSortObj}
                       sortObj={sortObj}/>
        <TableDomLayer layer={left} dataSource={dataSource_} setSortObj={setSortObj} sortObj={sortObj}/>

        <TableDomLayer offset={scrollValue} layer={head} setDataSource={setDataSource} setSortObj={setSortObj}
                       sortObj={sortObj}/>

        <TableDomLayer offset={scrollValue} layer={headLeft} setDataSource={setDataSource} dataSource={dataSource_}
                       setSortObj={setSortObj} sortObj={sortObj}/>
      </div>
    )
  }

  return withNativeProps(
    props,
    <div className={classPrefix}>
      <TableDom/>
    </div>
  )
}
