import React, { useState } from 'react'
import './App.css'
// import { TabsComponent } from './components/TabsComponent'
// import { LoggingComponent } from './components/LoggingComponent'
import { Sider } from './components/Sider/Sider'

const initialItems = [
  {
    id: '1user',
    title: '1 sadtitle',
    snippet: '1snippet1 snippet 1snippet1 b; ippet1 snippet1snippet1',
  },
  {
    id: '2user',
    title: '2title',
    snippet: '2snippet',
  },
  {
    id: '3user',
    title: '2tsdaditle',
    snippet: '2sfasfanippet',
  },
]
function App() {
  const [current, setCurrent] = useState('1')
  const [items, setItems] = useState(initialItems)
  return (
    <Sider
      items={items}
      setItems={setItems}
      current={current}
      setCurrent={setCurrent}
    />
  )
}

export default App
