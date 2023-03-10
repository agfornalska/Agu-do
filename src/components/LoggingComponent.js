import React, { useState } from 'react'
import './LoggingComponent.css'
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

export function LoggingComponent({ userData, setUserData, handleLoggedIn }) {
  const [current, setCurrent] = useState('login')
  const { id, name } = userData

  function handleClick() {
    const requestBody = { userName: name }

    if (current === 'login') {
      fetch('/auth', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })
        .then((response) => {
          return response.json()
        })
        .then((responseBody) => {
          if (responseBody.errorMessage)
            throw new Error(responseBody.errorMessage)

          handleLoggedIn(responseBody)
        })
        .catch(console.log)
    } else
      fetch('/user', { method: 'POST', body: JSON.stringify(requestBody) })
        .then((response) => response.json())
        .then((responseBody) => {
          if (responseBody.errorMessage)
            throw new Error(responseBody.errorMessage)
          handleLoggedIn(responseBody)
        })
  }
  function handleChange(event) {
    setUserData({ ...userData, name: event.target.value })
  }
  return (
    <div className='boksik'>
      <Menu
        onClick={(e) => setCurrent(e.key)}
        selectedKeys={current}
        mode='horizontal'
        items={items}
      />

      <Input
        onChange={handleChange}
        placeholder='Enter your username'
        prefix={<UserOutlined className='site-form-item-icon' />}
        suffix={
          <Tooltip title='Extra information'>
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
      />

      <Button type='primary' onClick={() => handleClick()}>
        {current}
      </Button>
    </div>
  )
}
