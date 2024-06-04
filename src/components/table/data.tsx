import React from "react";

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
    render: (text) => {
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
    render: (text) => {
      return (
        <a href="https://blog.csdn.net/m0_51514727/article/details/135870249">{text}</a>
      )
    }
  },
  {title: 'Column 1', dataIndex: '1', key: '1'},
  {title: 'Column 2', dataIndex: '2', key: '2'},
  {title: 'Column 3', dataIndex: '3', key: '3'},
  {title: 'Column 4', dataIndex: '4', key: '4'},
  {title: 'Column 5', dataIndex: '5', key: '5'},
  {title: 'Column 6', dataIndex: '6', key: '6'},
  {title: 'Column 7', dataIndex: '7', key: '7'},
  {title: 'Column 8', dataIndex: '8', key: '8'},

];

export const dataSource1: DataType[] = [
  {
    key: '1',
    name: 'John Brown111111',
    age: 32,
    address: 'New York Park', 1: 'London Park',
    2: 'London Park',
    3: 'London Park',
    4: 'London Park',
    5: 'London Park',
    6: 'London Park',
    7: 'London Park',
    8: 'London Park',
  },
  {
    key: '2',
    name: 'aaaaaJim Green',
    age: 40,
    address: 'London Park', 1: 'London Park',
    2: 'London Park',
    3: 'London Park',
    4: 'London Park',
    5: 'London Park',
    6: 'London Park',
    7: 'London Park',
    8: 'London Park',
  }, {
    key: '3',
    name: 'Jim Green',
    age: 100,
    address: 'London Park',
    1: '22222London Park',
    2: 'London Park',
    3: 'London Park',
    4: 'London Park',
    5: 'London Park',
    6: 'London Park',
    7: 'London Park',
    8: 'London Park',
  }, {
    key: '4',
    name: 'Jim Green',
    age: 40,
    address: 'London Park', 1: 'London Park',
    2: 'London Park',
    3: 'London Park',
    4: 'London Park',
    5: 'London Park',
    6: 'London Park',
    7: 'London Park',
    8: 'London Park',
  }, {
    key: '5',
    name: 'Jim Green',
    age: 40,
    address: 'London Park', 1: 'London Park',
    2: 'London Park',
    3: 'London Park',
    4: 'London Park',
    5: 'London Park',
    6: 'London Park',
    7: 'London Park',
    8: 'London Park',
  }, {
    key: '6',
    name: 'Jim Green',
    age: 40,
    address: 'London Park', 1: 'London Park',
    2: 'London Park',
    3: 'London Park',
    4: 'London Park',
    5: 'London Park',
    6: 'London Park',
    7: 'London Park',
    8: 'London Park',
  }, {
    key: '7',
    name: 'Jim Green',
    age: 40,
    address: 'London Park', 1: 'London Park',
    2: 'London Park',
    3: 'London Park',
    4: 'London Park',
    5: 'London Park',
    6: 'London Park',
    7: 'London Park',
    8: 'London Park',
  }, {
    key: '8',
    name: 'Jim Green',
    age: 40,
    address: 'London Park', 1: 'London Park',
    2: 'London Park',
    3: 'London Park',
    4: 'London Park',
    5: 'London Park',
    6: 'London Park',
    7: 'London Park',
    8: 'London Park',
  }, {
    key: '9',
    name: 'Jim Green',
    age: 40,
    address: 'London Park', 1: 'London Park',
    2: 'London Park',
    3: 'London Park',
    4: 'London Park',
    5: 'London Park',
    6: 'London Park',
    7: 'London Park',
    8: 'London Park',
  }, {
    key: '10',
    name: 'Jim Green',
    age: 40,
    address: 'London Park', 1: 'London Park',
    2: 'London Park',
    3: 'London Park',
    4: 'London Park',
    5: 'London Park',
    6: 'London Park',
    7: 'London Park',
    8: 'London Park',
  }, {
    key: '11',
    name: 'Jim Green',
    age: 40,
    address: 'London Park', 1: 'London Park',
    2: 'London Park',
    3: 'London Park',
    4: 'London Park',
    5: 'London Park',
    6: 'London Park',
    7: 'London Park',
    8: 'London Park',
  }, {
    key: '12',
    name: 'Jim Green',
    age: 40,
    address: 'London Park', 1: 'London Park',
    2: 'London Park',
    3: 'London Park',
    4: 'London Park',
    5: 'London Park',
    6: 'London Park',
    7: 'London Park',
    8: 'London Park',
  },
];

