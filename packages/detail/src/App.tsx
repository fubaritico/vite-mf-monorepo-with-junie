import { Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Movie Detail</h1>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
