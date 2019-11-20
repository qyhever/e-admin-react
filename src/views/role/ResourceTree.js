import React, { Component } from 'react'
import { Tree } from 'antd'

const { TreeNode } = Tree

class MenuTree extends Component {
  constructor(props) {
    super(props)
    const { checkedKeys, keys } = props.value
    this.state = {
      checkedKeys: checkedKeys || [], // 当前状态为 勾选 的节点 keys
      keys: keys || [], // 需要传给后端的 keys，包含半勾选的 父节点
      resourceTree: [],
      expandedKeys: [],
      autoExpandParent: true
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.value.checkedKeys.length !== state.checkedKeys.length) {
      const { checkedKeys } = props.value
      return { checkedKeys }
    }
    if (props.value.keys.length !== state.keys.length) {
      const { keys } = props.value
      return { keys }
    }
    if (props.resourceTree.length !== state.resourceTree.length) {
      // init expandedKeys by async resourceTree
      const expandedKeys = props.resourceTree.map(item => item.id)
      return { expandedKeys, resourceTree: props.resourceTree }
    }
    return null
  }

  onCheck = (checkedKeys, { halfCheckedKeys }) => {
    // console.log('onCheck', checkedKeys)
    // console.log('info ', halfCheckedKeys)
    const keys = [...checkedKeys, ...halfCheckedKeys]
    this.setState({
      checkedKeys,
      keys
    })
    this.props.onChange({ checkedKeys, keys })
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: true
    })
  }

  renderTreeNodes = data => data.map(item => {
    if (item.children) {
      return (
        <TreeNode title={item.name} key={item.id} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      )
    }
    return <TreeNode key={item.id} title={item.name} />
  })

  render() {
    const { resourceTree }  = this.props
    // // expandedKeys：默认全部展开
    // const expandedKeys = resourceTree.map(item => item.name)
    
    return (
      <Tree
        autoExpandParent={this.state.autoExpandParent}
        checkable
        selectable={false}
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
      >
        {this.renderTreeNodes(resourceTree)}
      </Tree>
    )
  }
}

export default MenuTree