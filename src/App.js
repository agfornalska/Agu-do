import './App.css'
import { TabsComponent } from './components/TabsComponent'
import { LoggingComponent } from './components/LoggingComponent'

function App() {
  return (
    <div className='App'>
      <header>
        <TabsComponent />
      </header>
      <LoggingComponent />
    </div>
  )
}

export default App
