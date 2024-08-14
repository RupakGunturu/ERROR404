// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
// import { Home } from './components/homepage';
import { SignIn } from './components/signin/signin';
import { SignUp } from './components/signup/signup';
// import { Dashboard } from './components/board/dashboard';
import { AdminLogin } from './components/admin/login';
import { Dashboard } from './components/board/dashboard';
import { AdminDashboard } from './components/admin/dashboard';
import { AdminUpdate } from './components/admin/adminupdate';
import { ProtectedRoute } from './components/admin/adminprot';
import { StudentData } from './components/players/details';
// import { Navbar } from './components/navbar/nav';
import { PTsirLogin } from './components/PTsir/ptlogin';
import { PTdashboard } from './components/PTsir/ptdash';
import { SlotBook, SlotBooking } from './components/PTsir/slotbook';
import { slotProtectedRoute } from './components/signin/slotProt';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      {/* <Route element={<Navbar/>}> */}
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/admin' element={<AdminLogin/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard/>
              </ProtectedRoute>
            }
          />
          <Route path='/score' element={<ProtectedRoute>
            <AdminUpdate/>
          </ProtectedRoute>}/>
          <Route path='/player-info' element={<StudentData/>}/>
          <Route path='/Dept-login' element={<PTsirLogin/>}/>
          <Route path='/PTdash' element={<PTdashboard/>}/>
          <Route
            path="/slot-booking"
            element={
              <slotProtectedRoute>
                <SlotBook/>
              </slotProtectedRoute>
            }
          />
          {/* </Route> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;
