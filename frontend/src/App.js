import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/homepage';
import { SignIn } from './components/signin/Signin';
import { SignUp } from './components/signup/Signup';
import { Dashboard } from './components/board/dashboard';
import { AdminLogin } from './components/admin/login';
import { AdminDashboard } from './components/admin/dashboard';
import { AdminUpdate } from './components/admin/adminupdate';
import { ProtectedRoute } from './components/admin/adminprot';
import { StudentData } from './components/players/details';
import { PTsirLogin } from './components/PTsir/ptlogin';
import { PTdashboard } from './components/PTsir/ptdash';
import { SlotBook } from './components/PTsir/slotbook';
import { SlotProtectedRoute } from './components/signin/slotProt';
import { ForgotPass } from './components/fpass/forgot';
import AppLayout from './components/wrapper/ProtectedLayout';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route element={<AppLayout/>}>
        <Route path="/live" element={<Dashboard/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/forgot" element={<ForgotPass/>}/>
        <Route path="/admin" element={<AdminLogin/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/score"
          element={
            <ProtectedRoute>
              <AdminUpdate/>
            </ProtectedRoute>
          }
        />
        <Route path="/player-info" element={<StudentData/>}/>
        <Route path="/Dept-login" element={<PTsirLogin/>}/>
        <Route path="/PTdash" element={<PTdashboard/>}/>
        <Route
          path="/slot-booking"
          element={
            <SlotProtectedRoute>
              <SlotBook/>
            </SlotProtectedRoute>
          }
        />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
