import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../context/authContext';
import { Button, InputLabel, Input, Card } from '@mui/material';
import { Link } from 'react-router-dom'

interface Inputs {
  email: string;
  password: string;
}

interface Props {
  isLogin: boolean;
}
function Login({ isLogin }: Props) {
  const [login, setLogin] = useState(isLogin);
  const { signIn, signUp, error } = useAuth();
  const [isPasswordError, setIsPasswordError] = useState(false)
  const [isEmailError, setIsEmailError] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    setLogin(isLogin)
    errors.password ? setIsPasswordError(true) : setIsPasswordError(false)
    errors.email ? setIsEmailError(true) : setIsEmailError(false)




  }, [isLogin, errors.password, errors.email])


  const handleClick = () => {

    setLogin(true)


  }

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  return (
    <div className='Auth'>

      <Card sx={{ padding: '2em', margin: 'auto' }}>

        <form className='auth-form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className='auth-heading'>{login ? 'Sign in' : 'Sign up'}</h1>
          {errors.email?.type === 'required' && (

            <p className='error-text'>
              Please enter a valid email.
            </p>
          )}
          {errors.password && (

            <p className='error-text'>
              Your password must contain between 4 and 60 characters.
            </p>

          )}
          <InputLabel>
            <Input
              type='email'
              placeholder='Email'
              className='input'
              error={isEmailError}
              // error={isError}
              {...register('email', { required: true })}
            />


          </InputLabel>
          <InputLabel>
            <Input
              type='password'
              placeholder='Password'
              className='input'
              error={isPasswordError}
              // error={isError}

              {...register('password', { required: true })}
            />{' '}

          </InputLabel>
          {error && <p className='error-text firebase-error'>
            {error} </p>}

          <Button variant='outlined' onClick={handleClick} type='submit'>
            {login ? 'Sign In' : 'Sign up'}
          </Button>
          {login ?
            <div className='auth-link-ctn'>
              <p><span>New to moodZ?
              </span> <Link className='auth-link' to='/signup'>Create an account</Link></p>
            </div>
            :
            <div className='auth-link-ctn'>
              <p><span>
                Already have an account?
              </span> <Link className='auth-link' to='/login'>sign in</Link></p>
            </div>

          }


        </form>
      </Card>
    </div>
  );
}

export default Login;
