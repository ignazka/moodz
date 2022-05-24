import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect } from 'react'
import { useMoodz } from '../hooks/useMoodz';
import { Mood } from '../typings'

function List() {
    const { getMoodz, moodz } = useMoodz();

    useEffect(() => {
        getMoodz();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (

        <TableContainer className='List' component={Paper}>
            <Table sx={{ minWidth: 650 }} >
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell >Note</TableCell>
                        <TableCell >Mood Level</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {moodz?.map((singleMoodObject: Mood) => {
                        return (
                            <TableRow
                                key={singleMoodObject.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {singleMoodObject.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {singleMoodObject.note}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {singleMoodObject.moodLevel}
                                </TableCell>


                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>




    )
}

export default List;