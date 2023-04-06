import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DynamicForm from './Forms/DynamicForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <DynamicForm />
    </div>
  )
}

export default App
