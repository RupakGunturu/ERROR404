// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/homepage';
import { SignIn } from './components/signin/signin';
import { SignUp } from './components/signup/signup';
// import { Dashboard } from './components/board/dashboard';
import { AdminLogin } from './components/admin/login';
import { Dashboard } from './components/board/dashboard';
import { AdminDashboard } from './components/admin/dashboard';
import { AdminUpdate } from './components/admin/adminupdate';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/admin' element={<AdminLogin/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route
            path="/admin-dashboard"
            element={<AdminDashboard/>
              // <ProtectedRoute>
              //   <AdminDashboard />
              // </ProtectedRoute>
            }
          />
          <Route path='/score' element={<AdminUpdate/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
