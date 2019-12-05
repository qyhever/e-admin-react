import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import store from './store'
import RouterConfig, { history } from './router'
import './assets/styles/index.less'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <RouterConfig />
        </ConnectedRouter>
      </Provider>
    </ConfigProvider>
  )
}

export default App
