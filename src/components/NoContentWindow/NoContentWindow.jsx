import { Button } from 'antd'
import React from 'react'

export default function NoContentWindow({ message, action }) {
  return (
    <>
      <div>{message}</div>
      <Button onClick={action}>Create new snippet</Button>
    </>
  )
}
