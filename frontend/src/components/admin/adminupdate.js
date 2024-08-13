import React, { useState } from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, Select } from '@chakra-ui/react';
import axios from 'axios';
import { api } from '../actions/api';

export const AdminUpdate=()=>{
    const [matchId, setMatchId] = useState('');
  const [runs, setRuns] = useState('');
  const [wickets, setWickets] = useState('');
  const [overs, setOvers] = useState('');

  const Adminupdate=async()=>{
    await axios.post(api+'/score',{matchId,runs,wickets,overs})
    .then((res)=>{
        console.log(res?.data?.values);
        alert('Score updated successfully!');
    })
    .catch((e)=>console.log(e));
  }


return (
    <Box p={8} maxW="md" mx="auto">
      <Heading mb={6}>Update Live Scores</Heading>
      <FormControl mb={4}>
        <FormLabel>Select Match</FormLabel>
        <Select placeholder="Select match" value={matchId} onChange={(e) => setMatchId(e.target.value)}>
          <option value="match1">Match 1</option>
          <option value="match2">Match 2</option>
          {/* Add dynamic matches here */}
        </Select>
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Runs</FormLabel>
        <Input type="number" onChange={(e)=>setRuns(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Wickets</FormLabel>
        <Input type="number" value={wickets} onChange={(e) => setWickets(e.target.value)} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Overs</FormLabel>
        <Input type="number" value={overs} onChange={(e) => setOvers(e.target.value)} />
      </FormControl>
      <Button colorScheme="red" onClick={Adminupdate}>
        Update Score
      </Button>
    </Box>
  );
}