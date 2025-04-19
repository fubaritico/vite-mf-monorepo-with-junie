import { Outlet, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Movie Explorer</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
