import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../context/authContext';
import { Button, InputLabel, Input } from '@mui/material';

interface Inputs {
  email: string;
  password: string;
}
function Login() {
  const [login, setLogin] = useState(false);
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      console.log('hwet');
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
        <h1 className='text-4xl font-semibold '>Sign In</h1>
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
        <Button variant='outlined' onClick={() => setLogin(true)} type='submit'>
          Sign In
        </Button>
        <div className='text-[gray]'>
          New to moodZ ?{' '}
          <Button onClick={() => setLogin(false)} type='submit'>
            Sign up now
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
