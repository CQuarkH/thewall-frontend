import Modal from '@components/atoms/Modal'
import LoginForm from '@components/organisms/LoginForm';
import RegisterForm from '@components/organisms/RegisterForm';
import React, { useState } from 'react'

interface Props {
    startWithLogin?: boolean
}

function AuthButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    }

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className='px-6 py-2 rounded-md bg-white
            text-black hover:text-gray-300 transition-colors cursor-pointer'>
                Login
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} panoramic={true}>
                <div className='flex flex-col p-6 gap-6'>
                    <h1 className='flex items-center gap-4 justify-center text-xl'>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd" />
                        </svg>

                        {isLogin ? 'Login' : 'Register'}</h1>
                    {
                        isLogin ? <LoginForm onRegisterClick={toggleForm} /> : <RegisterForm onLoginClick={toggleForm} />
                    }
                </div>
            </Modal>
        </>
    )
}

export default AuthButton