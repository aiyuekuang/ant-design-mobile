import type {FC, ReactNode} from 'react'
import React from 'react'
import {NativeProps, withNativeProps} from '../../utils/native-props'
import {Affix} from "antd";

const classPrefix = `adm-table`

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns = [
  {
    title: '名称',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: '年龄',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    sorter: true,
  },
  {title: 'Column 1', dataIndex: 'address', key: '1'},
  {title: 'Column 2', dataIndex: 'address', key: '2'},
  {title: 'Column 3', dataIndex: 'address', key: '3'},
  {title: 'Column 4', dataIndex: 'address', key: '4'},
  {title: 'Column 5', dataIndex: 'address', key: '5'},
  {title: 'Column 6', dataIndex: 'address', key: '6'},
  {title: 'Column 7', dataIndex: 'address', key: '7'},
  {title: 'Column 8', dataIndex: 'address', key: '8'},

];

const dataSource: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  }, {
    key: '3',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  }, {
    key: '4',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  }, {
    key: '5',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  }, {
    key: '6',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  }, {
    key: '7',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  }, {
    key: '8',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  }, {
    key: '9',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  }, {
    key: '10',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  }, {
    key: '11',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  }, {
    key: '12',
    name: 'Jim Green',
    age: 40,
    address: 'London Park',
  },
];


export type CardProps = {
  title?: ReactNode
  rowKey?: string

} & NativeProps

// 4.左上角表头
// 3.右边表头
// 2.左侧fixed
// 1.右侧主体


let hideFunHead = (col, layer = 1) => {
  if (layer === 1) {
    if (col.fixed) {
      return {visibility: "hidden"}
    }
  }

  if (layer === 2) {
    if (!col.fixed) {
      return {display: "none"}
    }
  }

  if (layer === 5) {
    return {}
  }
}

let hideFunBody = (col, layer = 1) => {
  if (layer === 1) {
    if (col.fixed) {
      return {visibility: "hidden"}
    }
  }

  if (layer === 2) {
    if (!col.fixed) {
      return {display: "none"}
    }
  }

  if (layer === 4 || layer === 3) {
    return {display: "none"}
  }
  if (layer === 5) {
    return {}
  }
}

export const Table: FC<any> = (props) => {
  const {rowKey} = props;

  let HeadDom = ({layer}) => {


    return (
        <div className={`${classPrefix}-head`} target={() => classPrefix}>
          {columns.map((data: any) => {
            return (
              <div key={data.dataIndex}
                   style={{
                     ...hideFunHead(data, layer)
                   }}
              >
                <div className={`${classPrefix}-head-item`} style={{width: (data.width || 80)}}
                >{data.title}
                </div>
              </div>
            )
          })}
        </div>
    )
  }
  let BodyDom = ({layer}) => {
    return (
      <div className={`${classPrefix}-body`}>
        {
          dataSource.map((dataItem: any, i) => {
            return (
              <div className={`${classPrefix}-body-item`} key={dataItem[rowKey]}>
                {columns.map((data: any, i) => {
                  return (
                    <div
                      className={`${classPrefix}-body-item-text`}
                      key={data.dataIndex}
                      style={{
                        ...hideFunBody(data, layer),
                      }}
                    >
                      <div style={{width: (data.width || 80)}}>{dataItem[data.dataIndex]}</div>
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

  let TableDomLayer = ({layer}) => {
    return (
      <div
        className={`${classPrefix}-warp`}
        style={{
          zIndex: layer * 500,
          ...(layer !== 1 ? {position: "absolute"} : {}),
          // ...(layer !== 1?{pointerEvents:"none"}:{}),
        }}
      >
        <HeadDom layer={layer}/>
        <BodyDom layer={layer}/>
      </div>
    )
  }

  let TableDom = ({}) => {
    return (
      <div className={`${classPrefix}-fixed`}>
        <TableDomLayer layer={1}/>
        <TableDomLayer layer={2}/>
        {/*<TableDomLayer layer={3}/>*/}
        {/*<TableDomLayer layer={4}/>*/}
        {/*<div className={`${classPrefix}-fixed-mask`}>*/}
        {/*  <TableDomLayer layer={5}/>*/}
        {/*</div>*/}
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
