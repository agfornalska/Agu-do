import React, { useState } from 'react'
import './App.css'
import { TabsComponent } from './components/TabsComponent'
import { LoggingComponent } from './components/LoggingComponent'
import { Sider } from './components/Sider/Sider'
import { LoggedContent } from './components/LoggedContent/LoggedContent'

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
  {
    id: '4user',
    title: '2tsdaditle',
    snippet: '2sfa sfsad anippet',
  },
]
function App() {
  const [current, setCurrent] = useState('1user')
  const [items, setItems] = useState(initialItems)
  return (
    <div>
      <LoggedContent current={current} />
    </div>
  )
}

export default App
