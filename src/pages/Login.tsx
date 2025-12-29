import { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { CiLock } from 'react-icons/ci';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
const logo = '/images/fleetflow-logo.png';
import { useFormSubmission } from '../hooks/useFormSubmission ';

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // Force update for deployment sync

  const { handleSubmit, isLoading } = useFormSubmission({
    redirectPath: '/dashboard',
    successMessage: 'Login successful',
  });

  return (
    <div className='flex justify-center items-center w-screen h-screen max-h-screen overflow-y-hidden scroll-container'>
      {isLoading && (
        <div className={`fixed inset-0 flex justify-center items-center z-50 bg-opacity-15`}>
          <span className='loader'></span>
        </div>
      )}
      <div className='w-full max-w-lg shadow-2xl border bg-[#FCFCFC] mx-2 md:mx-0 px-8 py-6 rounded-xl -mt-24 sm:-mt-12'>
        <div className='flex flex-col justify-center items-center mb-6 gap-3'>
          <div className='flex items-center justify-center gap-3'>
            <img
              src={logo}
              alt='logo'
              className='w-16 h-16 object-contain'
              style={{ background: 'transparent' }}
            />
            <span className='text-3xl font-bold text-[#333333] leading-none'>FleetFlow Studio</span>
          </div>
          <span className='text-sm text-[#666666]'>Fleet & Logistics Operations</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-start gap-1'
        >
          <label
            htmlFor='userName'
            className='text-[#333333] text-sm'
          >
            Username
          </label>
          <div className='relative w-full mb-6'>
            <input
              id='userName'
              className='border border-gray-200 w-full rounded-md py-2 ps-10 focus:outline-none font-Rubik'
              placeholder='Enter username'
            />
            <CgProfile
              size={20}
              color='#666666'
              className='absolute left-3 top-1/2 transform -translate-y-1/2 '
            />
          </div>
          <label
            htmlFor='password'
            className='text-[#333333] text-sm'
          >
            Password
          </label>
          <div className='relative w-full mb-4'>
            <input
              id='password'
              type={isPasswordVisible ? 'text' : 'password'}
              className='border border-gray-200 w-full rounded-md py-2 ps-10 focus:outline-none font-Rubik'
              placeholder='Enter password'
            />
            <CiLock
              size={20}
              color='#666666'
              className='absolute left-3 top-1/2 transform -translate-y-1/2'
            />
            <button
              type='button'
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className='absolute right-4 top-1/2 transform -translate-y-1/2'
              aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            >
              {isPasswordVisible ? (
                <IoEyeOffOutline
                  size={20}
                  color='#666666'
                />
              ) : (
                <IoEyeOutline
                  size={20}
                  color='#666666'
                />
              )}
            </button>
          </div>

          <button
            type='submit'
            className='w-full px-10 py-2 text-[#FCFCFC] font-thin bg-primary rounded-lg mt-4'
          >
            Access Fleet Dashboard
          </button>
        </form>
      </div>
      <div className='fixed bottom-6 w-full text-center'>
        <p className='text-gray-500 text-sm font-Rubik'>
          © 2025 FleetFlow Studio. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
