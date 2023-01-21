import React from 'react'
import { LoggingComponent } from './LoggingComponent'

export function TabContent() {
  const [userData, setUserData] = React.useState({ id: null, name: null })
  const { id, name } = userData
  console.log('🚀 ~ file: TabContent.js:7 ~ TabContent ~ name', name)
  console.log('🚀 ~ file: TabContent.js:6 ~ TabContent ~ id', id)

  if (!id)
    return <LoggingComponent userData={userData} setUserData={setUserData} />

  return <div>Udalo ci się zalogować {name}</div>
}
