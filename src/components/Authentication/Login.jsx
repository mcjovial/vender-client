import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import httpClient from '../../utils/api';
import { toast } from 'react-toastify';

const Login = ({ authorized, role, setAuthorized }) => {
  const history = useHistory();
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const inputChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  useEffect(() => {
    if (authorized) {
      if (role === 'seller') {
        history.push('/seller');
      } else {
        history.push('/');
      }
    }
  }, [authorized]);
  

  const login = async () => {
    const postData = {
      username: input.username,
      password: input.password,
    };
    try {
      const response = await httpClient.post('/user/login', postData);
      const { data } = response;
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.username);
      setAuthorized(true);
      if (data.role === 'seller') {
        history.push('/seller');
      } else {
        history.push('/');
      }
    } catch (error) {
      const response = error.response.data;
      if (response.error) {
        toast.error(response.error)
      } else {
        toast.error(response.message)
      }
    }
  };

  return (
    <div className='w-full min-h-screen bg-yellow-400 p-8 py-40 space-y-12'>
      <div className='flex flex-col items-center space-y-8'>
        <p className='font-bold text-4xl'>Welcome Back!</p>
        <p className='text-xl font-medium'>Sign into your account</p>
      </div>
      <div className='h-full w-full px-8 space-y-12'>
        <div className='flex flex-col items-center'>
          <input
            type='text'
            className='h-12 w-80 px-4 rounded-full shadow-lg'
            id='username'
            placeholder='Username'
            name='username'
            onChange={(e) => inputChange(e)}
          />
        </div>
        <div className='flex flex-col items-center'>
          <input
            type='password'
            className='h-12 w-80 px-4 rounded-full shadow-lg'
            placeholder='Password'
            name='password'
            onChange={(e) => inputChange(e)}
          />
        </div>
      </div>
      <div className='flex justify-center w-full h-full'>
        <button
          type='button'
          onClick={() => login()}
          className='flex justify-center items-center py-2 px-2 bg-green-400 hover:bg-green-300 h-12 w-32 rounded-xl shawdow-xl'
        >
          Sign In
        </button>
      </div>
      <div className='flex items-center flex-col'>
        <Link to='/register' className='text-md font-sm'>
          Don&apos;t have an account?{' '}
          <span className='text-lg font-bold underline'>Register</span>
        </Link>
      <Link to='/logout/all' className='text-md font-sm'>
        <span className='text-lg font-bold underline'>Logout</span>
        {'  '}  from all devices
      </Link>
      </div>
    </div>
  );
};

export default Login;
