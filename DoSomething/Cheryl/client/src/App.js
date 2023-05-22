import React, {useState} from 'react';
import {Routes, Route, Link, BrowserRouter} from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';


function App() {
  const [username, setUsername] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
      <Nav username={username} setUsername={setUsername} />
        <Routes>
          <Route path = '/' element={<Login username={username} setUsername={setUsername} />} />
          <Route path = '/register' element={<Register username={username} setUsername={setUsername} />} />
          <Route path = '/dashboard' element={<Dashboard username={username} setUsername={setUsername}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
