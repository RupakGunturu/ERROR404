import { Card, CardBody, FormControl, FormHelperText, FormLabel, Input, Button } from "@chakra-ui/react"; 
import axios from "axios";
import { api } from "../action/api";
import { useState } from "react";


export const Updatepass = () => {
    const [Gmail,setGMail]=useState()
    const [Password,setPassword]=useState()
    const [otp,setOtp]=useState()

    const Updatepass=async()=>{
      if (otp==='0000') {
      await axios.post(api+"/updateone",{Gmail,Password})
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
    }
    else{
      alert("Wrong otp")
      nav('/forgot')
    }
    }
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
      padding: '20px'
    }}>
      <Card style={{
        width: '100%',
        maxWidth: '400px',
        background: '#ffffff',
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
            Forgot Password
          </h2>
          
          <FormControl marginBottom="15px">
            <FormLabel>Email address</FormLabel>
            <Input type='email' placeholder="Enter your email" style={{
              borderRadius: '10px',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              marginBottom: '5px'
            }}/>
            <FormHelperText>We'll never share your email.</FormHelperText>
          </FormControl>

          <FormControl marginBottom="20px">
            <FormLabel>New Password</FormLabel>
            <Input type='password' placeholder="Set a new password" style={{
              borderRadius: '10px',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              marginBottom: '5px'
            }}/>
            <FormHelperText>We'll never share your password.</FormHelperText>
          </FormControl>

          <FormControl marginBottom="20px">
            <FormLabel>Enter New Password again</FormLabel>
            <Input type='password' placeholder="Type Password" style={{
              borderRadius: '10px',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              marginBottom: '5px'
            }}/>
          </FormControl>

          <FormControl marginBottom="20px">
            <FormLabel>Enter OTP</FormLabel>
            <Input type='number' placeholder="otp has been already sent" style={{
              borderRadius: '10px',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              marginBottom: '5px'
            }}/>
          </FormControl>

          <Button colorScheme="purple" style={{
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
            SET Password
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};