import React, { useEffect, useState } from 'react';
import useAuth from '../context/authContext';
import { collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function Main() {
  const { user, logout } = useAuth();
  // const { data, loading, error } = useFetch(() => {}, []);

  const [inputTerm, setInputTerm] = useState({ value: 0, note: '' });
  const [moodz, setMoodz] = useState<any | null>(null);

  // styled components
  const StyledButton = styled(Button)`
    padding: 0;
    min-width: 24px;
  `;
  /**
   * send data to firebase
   **/
  const setMood = async () => {
    try {
      await addDoc(collection(db, `users/${user?.uid}/moodz`), {
        value: inputTerm?.value,
        note: inputTerm?.note,
        user: user?.uid,
        addedAt: Timestamp.fromDate(new Date()),
      });
      setInputTerm({ value: 0, note: '' });
    } catch (e) {
      console.log(e);
    } finally {
      setInputTerm({ value: 0, note: '' });
    }
  };

  /**
   * get data from firebase
   */
  const getMoodz = async () => {
    const querySnapshot = await getDocs(
      collection(db, `users/${user?.uid}/moodz`)
    );
    const arr: any = [];
    querySnapshot.forEach(doc => {
      // console.log(doc.id, ' => ', doc.data());
      arr.push({
        name: new Date(doc.data().addedAt.seconds * 1000).toLocaleString(),
        maximal: doc.data().value,
        note: doc.data().note,
      });
    });
    const sorted = arr.sort((a: any, b: any) => {
      return a.name < b.name;
    });
    console.log(sorted);
    setMoodz(sorted);
  };

  // custom tooltip for chart

  function CustomTooltip({ payload, label, active }: any) {
    if (active) {
      return (
        <div className='custom-tooltip'>
          <p className='label'>{`${label} : ${payload[0]!?.value}`}</p>

          <p className='desc'>{payload[0]!?.payload?.note}</p>
        </div>
      );
    }

    return null;
  }

  // form handler

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setMood();
    getMoodz();
  };
  const handleChange = ({ target }: any) => {
    const { name, value } = target;
    setInputTerm({ ...inputTerm, [name]: value });
  };

  useEffect(() => {
    getMoodz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=''>
      <header className='flex justify-between items-center flex-row p-2  border-b-2 border-black md:px-4'>
        <div>
          <p>moodZ</p>
        </div>
        <div className='flex items-center md:space-x-4'>
          <p>Hello, {user?.email}</p>
          <StyledButton onClick={logout}>
            <LogoutIcon />
          </StyledButton>
        </div>
      </header>
      <form
        className='flex justify-center flex-col items-center m-9'
        onSubmit={handleSubmit}
      >
        <TextField
          sx={{ width: '200px' }}
          variant='outlined'
          label='Mood Value'
          type='number'
          InputProps={{ inputProps: { min: -10, max: 10 } }}
          name='value'
          id='value'
          value={inputTerm.value}
          onChange={handleChange}
          required={true}
        />

        <TextField
          sx={{
            margin: '.5em',
            width: '200px',
          }}
          color='secondary'
          variant='outlined'
          label='Add Note (optional)'
          name='note'
          multiline={true}
          id='note'
          value={inputTerm.note}
          onChange={handleChange}
        />

        <Button variant='outlined' startIcon={<AddIcon />} type='submit'>
          add mood
        </Button>
      </form>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart
          className='m-auto'
          data={moodz}
          margin={{ top: 5, right: 20, bottom: 5, left: 20 }}
        >
          <Line type='monotone' dataKey='maximal' stroke='#00acf0' />
          <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
          <XAxis dataKey='name' />
          <YAxis
            label={{ value: 'Mood Level', angle: -90 }}
            type='number'
            domain={[-10, 10]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Main;
