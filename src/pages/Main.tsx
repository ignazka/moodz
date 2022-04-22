import React, { useEffect, useState, createRef } from 'react';
import useAuth from '../context/authContext';
import { useFetch } from '../hooks/useFetch';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Button, TextField } from '@mui/material';
import styled from 'styled-components';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import { ClassNames } from '@emotion/react';
function Main() {
  const { user, logout } = useAuth();
  const { data, loading, error } = useFetch(() => {}, []);
  const [inputTerm, setInputTerm] = useState({ value: 0, note: '' });
  // styled components

  /**
   * send data to firebase
   **/
  const setMood = async () => {
    try {
      await addDoc(collection(db, 'mood'), {
        value: inputTerm?.value,
        note: inputTerm?.note,
        user: user?.uid,
        addedAt: Timestamp.fromDate(new Date()),
      });
      setInputTerm({ value: 0, note: '' });
    } catch (e) {
      console.log(e);
    }
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setMood();
  };

  const handleChange = ({ target }: any) => {
    const { name, value } = target;
    setInputTerm({ ...inputTerm, [name]: value });
  };

  return (
    <div className=''>
      <header className='w-screen flex justify-end items-end flex-row p-2 space-x-4 border-b-2 border-black'>
        <p>Hello, {user?.email}</p>
        <Button onClick={logout}>
          <LogoutIcon />
        </Button>
      </header>

      <form
        className='flex justify-center flex-col items-center m-9'
        onSubmit={handleSubmit}
      >
        <TextField
          variant='outlined'
          label='Mood Value'
          type='number'
          name='value'
          id='value'
          onChange={handleChange}
        />

        <TextField
          sx={{
            margin: '.5em',
          }}
          color='secondary'
          variant='outlined'
          label='Add Note (optional)'
          name='note'
          id='note'
          onChange={handleChange}
        />

        <Button variant='outlined' startIcon={<AddIcon />} type='submit'>
          add mood
        </Button>
      </form>
    </div>
  );
}

export default Main;
