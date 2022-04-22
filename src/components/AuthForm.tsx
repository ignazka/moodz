import React, { FormEvent, useState } from 'react';

interface Props {
  onSubmit: (state: any) => Promise<any>;
  submitMessage: string;
}

function AuthForm({ onSubmit, submitMessage }: Props) {
  const [state, setState] = useState({ email: '', password: '' });
  console.log(onSubmit);
  const handleChange = ({ target }: any) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(state);
    onSubmit(state);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='email'>Email</label>
      <input
        required
        name='email'
        type='email'
        value={state.email}
        onChange={handleChange}
      />
      <label htmlFor='password'>Password</label>
      <input
        required
        name='password'
        type='password'
        value={state.password}
        onChange={handleChange}
      />
      <button type='submit'>{submitMessage}</button>
    </form>
  );
}

export default AuthForm;
