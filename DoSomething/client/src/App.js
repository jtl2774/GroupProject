import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import AddActivityForm from './components/AddActivityForm';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import LogoutForm from './components/LogoutForm';
import DashboardForm from './components/DashboardForm';
import EditActivityForm from './components/EditActivityForm';
import MyAccountForm from './components/MyAccountForm';
import ActivityDetail from './components/ActivityDetail';
import ParticipantDetail from './components/ParticipantDetail';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
          <Route element={<LoginForm></LoginForm>} path="/" />
          <Route element={<LogoutForm></LogoutForm>} path="/logout" />
          <Route element={<RegistrationForm></RegistrationForm>} path="/register" />
          <Route element={<DashboardForm></DashboardForm>} path="/dashboard" />
          <Route element={<AddActivityForm></AddActivityForm>} path="/createActivity" />
          <Route element={<EditActivityForm></EditActivityForm>} path="/editActivity/:id" />
          <Route element={<MyAccountForm></MyAccountForm>} path="/myAccount" />
          <Route element={<ActivityDetail></ActivityDetail>} path="/activityDetail/:id" />
          <Route element={<ParticipantDetail></ParticipantDetail>} path="/participantDetail/:id" />
          
      </Routes>
    </BrowserRouter>                           
  </div>
  );
}

export default App;
