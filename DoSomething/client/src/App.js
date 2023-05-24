import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {useState} from 'react';
import './App.css';
import AddEventForm from './components/AddEventForm';
import LogoutForm from './components/LogoutForm';
import DashboardForm from './components/DashboardForm';
import EditEventForm from './components/EditEventForm';
import MyAccountForm from './components/MyAccountForm';
import EventDetail from './components/EventDetail';
import ParticipantDetail from './components/ParticipantDetail';
import Register from './components/Register';
import Login from './components/Login';
import Nav from './components/Nav';

function App() {
  const [username, setUsername] = useState("");
  return (
    <div className="App">
      <BrowserRouter>
      <Nav username={username} setUsername={setUsername} />
        <Routes>
          <Route path = '/' element={<Login username={username} setUsername={setUsername} />} />
          <Route path = '/register' element={<Register username={username} setUsername={setUsername} />} />
          <Route path="/logout" element={<LogoutForm username={username} setUsername={setUsername} />} />
          <Route path="/dashboard" element={<DashboardForm username={username} setUsername={setUsername} />} />
          <Route path="/createEvent" element={<AddEventForm username={username} setUsername={setUsername} />} />
          <Route path="/editEvent/:id" element={<EditEventForm username={username} setUsername={setUsername} />} />
          <Route path="/myAccount" element={<MyAccountForm username={username} setUsername={setUsername} />} />
          <Route path="/eventDetail/:id" element={<EventDetail username={username} setUsername={setUsername} />} />
          <Route path="/participantDetail/:id" element={<ParticipantDetail username={username} setUsername={setUsername} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
