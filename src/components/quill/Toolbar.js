import React from 'react'
export const fontList = ['Helvetica', 'Arial', 'sans-serif', 'Simsun', 'Consolas', 'monospace']
export const sizeList = ['12', '13', '14', '16', '18', '20', '24', '28']
export const lineHeightList = ['18', '20', '22', '24', '28', '32', '36']
export const colorList = ['#e60000','#ff9900','#ffff00','#008a00','#0066cc','#9933ff','#ffffff','#facccc','#ffebcc','#ffffcc','#cce8cc','#cce0f5','#ebd6ff','#bbbbbb','#f06666','#ffc266','#ffff66','#66b966','#66a3e0','#c285ff','#888888','#a10000','#b26b00','#b2b200','#006100','#0047b2','#6b24b2','#444444','#5c0000','#663d00','#666600','#003700','#002966','#3d1466']

export default function Toolbar() {
  return (
    <>
      <select className="ql-header" defaultValue="">
        <option value="">标题</option>
        <option value="1">标题1</option>
        <option value="2">标题2</option>
        <option value="3">标题3</option>
        <option value="4">标题4</option>
        <option value="5">标题5</option>
        <option value="6">标题6</option>
      </select>
      <select className="ql-font">
        {fontList.map(item => <option value={item} key={item}>{item}</option>)}
      </select>
      <select className="ql-size">
        <option value="">字体大小</option>
        {sizeList.map(item => <option value={item} key={item}>{item + 'px'}</option>)}
      </select>
      {/* <select className="ql-lineHeight" defaultValue="">
        <option value="">行高</option>
        {lineHeightList.map(item => <option value={item} key={item}>{item + 'px'}</option>)}
      </select> */}
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-underline"></button>
      <button className="ql-strike"></button>
      <select className="ql-color" defaultValue="#00000">
        <option value="#00000"></option>
        {colorList.map(item => <option value={item} key={item}/>)}
      </select>
      <select className="ql-background">
        <option value="#00000"></option>
        {colorList.map(item => <option value={item} key={item}/>)}
      </select>
      <select className="ql-align" defaultValue="">
        <option value=""></option>
        <option value="center"></option>
        <option value="right"></option>
        <option value="justify"></option>
      </select>
      <button className="ql-blockquote"></button>
      <button className="ql-code-block"></button>
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-indent" value="-1"></button>
      <button className="ql-indent" value="+1"></button>
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-video"></button>
      <button className="ql-script" value="sub"></button>
      <button className="ql-script" value="super"></button>
      <button className="ql-formula"></button>
      <button className="ql-clean"></button>
    </>
  )
}
