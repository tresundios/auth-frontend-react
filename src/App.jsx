import { Routes, Route} from 'react-router-dom';
import './App.css'
import Index from './components/Index';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import EmailVerification from './components/EmailVerification';
import ForgotPassword from './components/ForgetPassword';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/changepassword' element={ <ProtectedRoute> <ChangePassword/></ProtectedRoute>}></Route>
        <Route path='/dashboard' element={ <ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path='/email-verification' element= {<EmailVerification />}></Route>
        <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
        <Route path="/profile" element = {<ProtectedRoute> <Profile/></ProtectedRoute>} ></Route>
        <Route path='/home' element={ <ProtectedRoute><Home/></ProtectedRoute>}></Route>
      </Routes>
    </div>
  )
}

export default App
