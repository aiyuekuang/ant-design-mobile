import React from 'react'
import { Table, Toast, Button } from 'antd-mobile'
import { DemoBlock } from 'demos'
import { AntOutline, RightOutline } from 'antd-mobile-icons'

import styles from './demo1.less'

export default () => {
  const onClick = () => {
    Toast.show('点击了卡片')
  }

  const onHeaderClick = () => {
    Toast.show('点击了卡片Header区域')
  }

  const onBodyClick = () => {
    Toast.show('点击了卡片Body区域')
  }
  return (
    <>
      <DemoBlock title='基础用法' background='gray'>
        <Table title='卡片标题' onClick={onClick}>
          卡片内容
        </Table>
      </DemoBlock>
    </>
  )
}
