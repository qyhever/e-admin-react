import React, { useState } from 'react'
import { Tree } from 'antd'

function ResourceTree(props) {
  const { resourceTree, value, onChange } = props
  // console.log(value)
  const [expandedKeys, setExpandedKeys] = useState(resourceTree.map(v => v.key))
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const onExpand = expandedKeys => {
    // console.log('onExpand', expandedKeys) // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeys)
    setAutoExpandParent(false)
  }

  const onCheck = (checkedKeys, { halfCheckedKeys }) => {
    const totalKeys = [...checkedKeys, ...halfCheckedKeys]
    onChange({
      totalKeys, // 传递后给后端的数据
      totalSubKeys: checkedKeys // 受控组件显示需要的勾选列表
    })
  }
  return (
    <Tree
      checkable
      selectable={false}
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={value.totalSubKeys}
      treeData={resourceTree}
    >
    </Tree>
  )
}

export default React.memo(ResourceTree)
