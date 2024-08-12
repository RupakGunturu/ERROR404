import { 
  Card, 
  CardBody, 
  FormControl, 
  FormHelperText, 
  FormLabel, 
  Input, 
  Button,
  Text,
} from "@chakra-ui/react";
import axios from 'axios'
import { api } from "../action/api";
import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
// import { SignUp } from "../signup/Signup";

export const SignIn = () => {
  const [Gmail, setGmail] = useState();
  const [Password, setPassword] = useState();
  const nav = useNavigate();

  const Signin = async () => {
      await axios.post(api + "/signin", { Gmail, Password })
          .then((res) => {
              if (res.data.message) {
                  console.log(res?.data?.values);
                  alert(res.data.message);
              } else {
                  alert(res.data.error);
                  nav('/signup');
              }
          })
          .catch((e) => console.log(e));
  };

  return (
      <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh', 
          backgroundImage: `url('https://i.ibb.co/XFJpjkB/pixelcut-export.jpg')`, 
          backgroundSize: 'cover',
          padding: '20px',
          width:'100vw',
          overflow:'hidden',
          margin:'0',
        }}>
          <header style={{ 
              width: '100%', 
              position: 'absolute', 
              top: '20px', 
              left: '20px',
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '0 20px'
          }}>
              {/* <img src="https://i.ibb.co/GxQvXzZ/zr25d8fw5sglkz0isnuh.webp" alt="Logo 1" style={{ height: '400px',paddingTop:"200px" }} />
              <img src="https://i.ibb.co/LY3XqxX/Untitled-removebg-preview.png" alt="Logo 2" style={{ height: '400px',paddingRight:'100px' }} /> */}
          </header>
          <Card style={{
            width: '100%',
            maxWidth: '400px',
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            padding: '20px'
          }}>
            <CardBody>
              <h2 style={{ 
                textAlign: 'center', 
                fontSize: '24px', 
                fontWeight: 'bold', 
                marginBottom: '20px', 
                color: '#1a202c'
              }}>
                Sign In
              </h2>
              
              <FormControl marginBottom="15px">
                <FormLabel color="#1a202c">Email address</FormLabel> 
                  <Input type='email' placeholder="Enter your email" onChange={(e)=>setGmail(e.target.value)} style={{
                  borderRadius: '10px',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  marginBottom: '5px',
                  color: '#1a202c'
                }}/>
                <FormHelperText color="#1a202c">We'll never share your email.</FormHelperText>  
              </FormControl>
    
              <FormControl marginBottom="20px">
                <FormLabel color="#1a202c">Password</FormLabel> 
                <Input type='password' placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}style={{
                  borderRadius: '10px',
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  marginBottom: '5px',
                  color: '#1a202c'  
                }}/>
                <FormHelperText color="#1a202c">We'll never share your password.</FormHelperText> 
              </FormControl>
    
              <Button colorScheme="purple" onClick={Signin} style={{
                width: '100%',
                padding: '10px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #a777e3, #6e8efb)',
                color: '#fff',
                fontSize: '18px',
                fontWeight: 'bold',
                transition: 'background 0.3s ease',
                cursor: 'pointer',
              }}
              _hover={{ background: 'linear-gradient(135deg, #6e8efb, #a777e3)' }}
              >
                Sign In
              </Button>
              <Text color="#1a202c"> <br></br>
                  Don't have an account? <Link to={"/signup"}>
                      <Button colorScheme="purple">
                          Sign Up
                      </Button>
                  </Link>
              </Text>
            </CardBody>
          </Card>
        </div>
      );
};
