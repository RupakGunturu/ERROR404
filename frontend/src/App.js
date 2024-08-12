import './App.css';
import { SignUp } from './components/signup/Signup';
// import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignIn } from './components/signin/Signin';
import { StudentData } from './components/students/studata';
import { Updatepass } from './components/fpass/forgot';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/forgot' element={<Updatepass/>}/>
      <Route path='/studata' element={<StudentData/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
