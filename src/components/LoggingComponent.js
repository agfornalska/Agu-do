import React, { useState } from 'react'

import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Input, Tooltip, Menu, Button } from 'antd'

const items = [
  {
    label: 'Login',
    key: 'login',
  },
  {
    label: 'Sign up',
    key: 'sign up',
  },
]

function handleClick(loginType, givenName) {
  console.log(
    '🚀 ~ file: LoggingComponent.js:18 ~ handleClick ~ givenName',
    givenName
  )
  const requestBody = {
    userName: givenName,
  }

  if (loginType === 'login') {
    fetch('/auth', { method: 'POST', body: JSON.stringify(requestBody) })
      .then((response) => response.json())
      .then((responseBody) => {
        console.log('Success:', responseBody)
      })
  }
}

function Login({ loginType }) {
  const [userName, setUserName] = React.useState(null)

  return (
    <>
      <Input
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder='Enter your username'
        prefix={<UserOutlined className='site-form-item-icon' />}
        suffix={
          <Tooltip title='Extra information'>
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
      />

      <Button type='primary' onClick={() => handleClick(loginType, userName)}>
        {loginType}
      </Button>
    </>
  )
}

export function LoggingComponent() {
  const [current, setCurrent] = useState('login')
  console.log(
    '🚀 ~ file: LoggingComponent.js:56 ~ LoggingComponent ~ current',
    current
  )

  return (
    <>
      <Menu
        onClick={(e) => setCurrent(e.key)}
        selectedKeys={current}
        mode='horizontal'
        items={items}
      />
      <br />
      <Login loginType={current} />
    </>
  )
}
