import {
    Input,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
  } from '@chakra-ui/react'
  import axios from "axios"
  import { useEffect, useState } from "react"
  import { api } from '../actions/api'
  // import { Profile } from "/profile/profile"
  
  export const StudentData = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
  
    const featchData = async () => {
        await axios.post(api + "/findmany")
            .then((res) => {
                setData(res?.data)
            })
            .catch((e) => console.log(e))
    }
  
    useEffect(() => {
        featchData()
    }, [])
  
    return (
        <>
            {/* <Profile /> */}
            <br />
            <br />
            <Input
                color='teal'
                placeholder='Enter PlayerName or Team or mobile number'
                _placeholder={{ color: 'inherit' }}
                onChange={(e) => setSearch(e.target.value)}
            />
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Bootcamp students data</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>PlayerName</Th>
                            <Th>Team</Th>
                            <Th>Runs</Th>
                            <Th>Wickets</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data?.filter((filt) => filt?.PlayerName?.toLowerCase()?.includes(search?.toLowerCase()) ||
                                filt?.Team?.toLowerCase()?.includes(search?.toLowerCase()) ||
                                filt?.Phone?.includes(search?.toLowerCase()))?.sort((a,b)=>a?.PlayerName-b?.Team)?.map((val) => (
                                    <Tr>
                                        <Td>{val.PlayerName}</Td>
                                        <Td>{val.Team}</Td>
                                        <Td>{val.Runs}</Td>
                                        <Td>{val.Wickets}</Td>
                                    </Tr>
                                ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
  }