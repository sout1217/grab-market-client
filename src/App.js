import 'antd/dist/antd.css'
import './App.css'
import MainPageComponent from './main'
import { Switch, Route, Link, useHistory } from 'react-router-dom'
import UploadPage from './upload'
import ProductPage from './product'
import React from 'react'
import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

function App() {
  console.log('NODE_ENV= ', process.env.NODE_ENV)
  const history = useHistory()
  return (
    <div>
      <div id="header">
        <div id="header-area">
          <Link to={'/'}>
            <img src="/images/icons/logo.png" alt="" />
          </Link>
          <Button
            size="large"
            onClick={function () {
              history.push('/upload')
            }}
            icon={<DownloadOutlined />}
          >
            상품 업로드
          </Button>
        </div>
      </div>
      <div id="body">
        <Switch>
          <Route exact={true} path={'/'}>
            {/* 메인페이지 경로*/}
            <MainPageComponent />
          </Route>
          <Route exact={true} path={'/upload'}>
            {/* 메인페이지 경로*/}
            <UploadPage />
          </Route>
          <Route exact={true} path={'/products/:id'}>
            {/* 메인페이지 경로*/}
            <ProductPage />
          </Route>
        </Switch>
      </div>
      <div id="footer"></div>
    </div>
  )
}

export default App
