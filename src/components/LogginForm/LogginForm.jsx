import React, { useState } from 'react'
import './LogginForm.css'
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

export default function LogginForm({ handleNameChange, name, handleClick }) {
  const [current, setCurrent] = useState('login')

  return (
    <div className='boksik'>
      <Menu
        onClick={(e) => setCurrent(e.key)}
        selectedKeys={current}
        mode='horizontal'
        items={items}
      />

      <Input
        onChange={handleNameChange}
        value={name}
        placeholder='Enter your username'
        prefix={<UserOutlined className='site-form-item-icon' />}
        suffix={
          <Tooltip title='Extra information'>
            <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
          </Tooltip>
        }
      />

      <Button type='primary' onClick={() => handleClick(current)}>
        {current}
      </Button>
    </div>
  )
}
