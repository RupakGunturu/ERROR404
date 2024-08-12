import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { api } from '../action/api';
import axios from 'axios';

export const StudentData = () => {
    const [data, setData] = useState([]);

    const doto = async () => {
        try {
            const res = await axios.post(api + '/studat');
            setData(res?.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        doto();
    }, []); // Empty dependency array to run only on mount

    return (
        <TableContainer>
            <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                        <Th>To convert</Th>
                        <Th>into</Th>
                        <Th isNumeric>multiply by</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.convertFrom}</Td>
                            <Td>{item.convertTo}</Td>
                            <Td isNumeric>{item.multiplyBy}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
