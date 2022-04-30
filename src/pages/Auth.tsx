import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../context/authContext';
import { Button, InputLabel, Input } from '@mui/material';
import {Link} from 'react-router-dom'

interface Inputs {
  email: string;
  password: string;
}

interface Props {
  isLogin: boolean;
}
function Login({isLogin} : Props) {
  const [login, setLogin] = useState(isLogin);
  const { signIn, signUp , error} = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    setLogin(isLogin)
  }, [isLogin])

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className='relative flex h-screen w-screen flex-col px-6 md:items-center md:justify-center md:bg-transparent' 
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 md:bg-white'
        style={{background:'white'}}
      >
        <h1 className='text-4xl font-semibold '>{login ? 'Sign in' : 'Sign up'}</h1>
        <div className='space-y-4'>
          <InputLabel>
            <Input
              type='email'
              placeholder='Email'
              className='input'
              {...register('email', { required: true })}
            />
            {errors.email?.type === 'required' && (
              <p className='p-1 text-[13px] font-light text-orange-500'>
                Please enter a valid email.
              </p>
            )}

          </InputLabel>
          <InputLabel>
            <Input
              type='password'
              placeholder='Password'
              className='input'
              {...register('password', { required: true })}
            />{' '}
            {errors.password && (
              <p className='p-1 text-[13px] font-light text-orange-500'>
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </InputLabel>
        </div>
        {error && <p className='p-1 text-[13px] font-light text-orange-500'>
             {error} </p>}
            
        <Button variant='outlined' onClick={() => setLogin(true)} type='submit'>
          {login? 'Sign In' : 'Sign up'}
        </Button>
        {login? 
         <div>
            <p>New to moodZ? <Link className='underline text-blue-500 hover:text-blue-600' to='/signup'>Create an account</Link></p>
         </div>
         :
         <div>
            <p>Already have an account? <Link className='underline text-blue-500 hover:text-blue-600' to='/login'>sign in</Link></p>
         </div>
      
      }
         
      </form>
    </div>
  );
}

export default Login;
