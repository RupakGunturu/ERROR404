import {
    Button, Card, CardBody, FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Text
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../actions/api";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../navbar/nav";
// import { Navbar } from "../navbar/nav";

export const SignUp = () => {
    const [Gmail, setGmail] = useState()
    const [Password, setPassword] = useState()
    const [Phone, setPhone] = useState()
    const [Register, setRegister] = useState()
    const nav = useNavigate()

    const Signup = async () => {
      await axios.post(api+"/signup",{Gmail,Password,Phone,Register})
      .then((res)=>{
          console.log(res?.data)
          if(res.data.message){
              console.log(res?.data?.values)
              alert(res.data.message)
              nav('/signin')
          } else {
              alert(res.data.error)
              // window.location.href="/signup"
              nav('/signup')
          }
      })
      .catch((e)=>console.log(e))
  }

    return (
      <>
      <Navbar/>
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
                  color: '#333' 
                }}>
                  Sign Up
                </h2>
                
                <FormControl marginBottom="15px">
                  <FormLabel>Email address</FormLabel>
                  <Input type='email' placeholder="Enter your email" onChange={(e) => setGmail(e.target.value)} style={{
                    borderRadius: '10px',
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    marginBottom: '5px'
                  }}/>
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
      
                <FormControl marginBottom="15px">
                  <FormLabel>Phone number</FormLabel>
                  <Input type='number' placeholder="Enter your Ph.no" onChange={(e) => setPhone(e.target.value)} style={{
                    borderRadius: '10px',
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    marginBottom: '5px'
                  }}/>
                </FormControl>
      
                <FormControl marginBottom="15px">
                  <FormLabel>Redgno</FormLabel>
                  <Input type='text' placeholder="Enter your name" onChange={(e) => setRegister(e.target.value)} style={{
                    borderRadius: '10px',
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    marginBottom: '5px'
                  }}/>
                  <FormHelperText>By the way, sweet name.</FormHelperText>
                </FormControl>
      
                <FormControl marginBottom="20px">
                  <FormLabel>Password</FormLabel>
                  <Input type='password' placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} style={{
                    borderRadius: '10px',
                    padding: '10px',
                    fontSize: '16px',
                    border: '1px solid #ccc',
                    marginBottom: '5px'
                  }}/>
                  <FormHelperText>We'll never share your password.</FormHelperText>
                </FormControl>
      
                <Button colorScheme="purple" onClick={Signup} style={{
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
                  Sign Up
                </Button>
                <Text> <br></br>
                            already have an account ? <Link to={"/signin"}> 
                            <Button colorScheme="green">sign in
                                </Button>
                                 </Link>
                                 </Text>
              </CardBody>
            </Card>
          </div>
          </>
    )
}