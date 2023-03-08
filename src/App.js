import React, { useState } from 'react'
import './App.css'

import { Sider } from './components/Sider/Sider'
import { LoggedContent } from './components/LoggedContent/LoggedContent'
import { Header } from './components/Header/Header'

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
  console.log('🚀 ~ file: App.js:30 ~ i:', initialItems)
  return (
    <div>
      <Header />
    </div>
  )
}

export default App
