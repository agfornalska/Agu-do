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

export function LoggingComponent({ userData, setUserData }) {
  const [current, setCurrent] = useState('login')
  const { id, name } = userData

  function handleClick() {
    const requestBody = { userName: name }

    if (current === 'login') {
      fetch('/auth', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      }).then((response) => console.log('Success:', response))
      // .then((responseBody) => {
      //   console.log('Success:', responseBody)
      //   setUserData({ name: responseBody.name, id: responseBody.id })
      // })
      // .catch((error) => {
      //   console.error('Error:', error)
      // })
    } else
      fetch('/user', { method: 'POST', body: JSON.stringify(requestBody) })
        .then((response) => response.json())
        .then((responseBody) => {
          console.log('Success:', responseBody)
          setUserData({ name: responseBody.name, id: responseBody.id })
        })
  }

  return (
    <>
      <Menu
        onClick={(e) => setCurrent(e.key)}
        selectedKeys={current}
        mode='horizontal'
        items={items}
      />
      <br />
      <>
        <Input
          value={name}
          onChange={(e) => setUserData({ name: e.target.value, id })}
          placeholder='Enter your username'
          prefix={<UserOutlined className='site-form-item-icon' />}
          suffix={
            <Tooltip title='Extra information'>
              <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
        <br />
        <br />
        <Button
          type='primary'
          onClick={() => handleClick(current, userData, setUserData)}
        >
          {current}
        </Button>
      </>
    </>
  )
}
