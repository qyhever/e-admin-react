import React from 'react'
import { Button } from 'antd'
import img from '@/assets/images/404-images/404.png'
import imgChild from '@/assets/images/404-images/404_cloud.png'

export default ({history}) => (
  <div className="wscn-http404-container">
    <div className="wscn-http404">
      <div className="pic-404">
        <img className="pic-404__parent" src={img} alt="404" />
        <img className="pic-404__child left" src={imgChild} alt="404" />
        <img className="pic-404__child mid" src={imgChild} alt="404" />
        <img className="pic-404__child right" src={imgChild} alt="404" />
      </div>
      <div className="bullshit">
        <div className="bullshit__oops">OOPS!</div>
        <div className="bullshit__headline">网管说这个页面你不能进......</div>
        <div className="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
        <Button type="primary" shape="round" className="bullshit__return-home" onClick={() => history.go(-1)}>
          返回
        </Button>
      </div>
    </div>
  </div>
)