import Button from '@components/atoms/Button';
import DragNDrop from '@components/molecules/DragNDrop';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, type Register } from '@models/formSchemas';
import { authRegister } from '@services/authService';
import { uploadPhotosService } from '@services/uploadPhotosService';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface Props {
    onLoginClick: () => void;
}

function RegisterForm({ onLoginClick }: Props) {
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [registerMessage, setRegisterMessage] = useState<string | null>(null);
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        setError
    } = useForm<Register>({
        resolver: zodResolver(RegisterSchema)
    });


    const handleFormAction: SubmitHandler<Register> = async (data) => {
        try {
            if (profilePicture) {
                data.photoUrl = (await uploadPhotosService([profilePicture]))[0];
            }
            await authRegister(data);
            setRegisterMessage("User registered successfully. Now you can login.");

        } catch (error: any) {
            console.error(error);
            setError("root", {
                message: error.message
            });
        }
    }
    return (
        <form className='flex flex-col w-[500px] gap-5' onSubmit={handleSubmit(handleFormAction)}>
            <div className='flex w-full items-center gap-4'>
                <div className='flex flex-col gap-2 flex-1'>
                    <span className='flex items-center gap-3'>Username
                        <span className='text-red-500 text-sm'> {errors.username && errors.username.message} </span>
                    </span>
                    <input
                        {...register('username')}
                        name='username'
                        id="username"
                        className="bg-transparent outline-none border border-white/20 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        placeholder="myUsername"
                    />
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                    <span className='flex items-center gap-3'>Email
                        <span className='text-red-500 text-sm'> {errors.email && errors.email.message} </span>
                    </span>
                    <input
                        {...register('email')}
                        name='email'
                        id="email"
                        className="bg-transparent outline-none border border-white/20 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        placeholder="example@domain.com"
                    />
                </div>
            </div>
            <div className='flex w-full items-center gap-4'>
                <div className='flex flex-col gap-2 flex-1'>
                    <span className='flex items-center gap-3'>Password
                        <span className='text-red-500 text-sm'> {errors.password && errors.password.message} </span>
                    </span>
                    <input
                        {...register('password')}
                        name='password'
                        id="password"
                        className="bg-transparent outline-none border border-white/20 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        placeholder="********"
                    />
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                    <span className='flex items-center gap-3'>Confirm Password
                        <span className='text-red-500 text-sm'> {errors.confirmPassword && errors.confirmPassword.message} </span>
                    </span>
                    <input
                        {...register('confirmPassword')}
                        name='confirmPassword'
                        id="confirmPassword"
                        className="bg-transparent outline-none border border-white/20 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        placeholder="********"
                    />
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <h3>Profile Picture</h3>
                {
                    profilePicture ? (
                        <picture className='w-20 h-20 relative'>
                            <img
                                src={URL.createObjectURL(profilePicture)}
                                alt='Profile Picture'
                                className='w-full h-full rounded-full object-cover'
                            />
                            <svg
                                onClick={() => setProfilePicture(null)}
                                className="w-6 h-6 text-red-500 absolute left-0 top-0 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clip-rule="evenodd" />
                            </svg>

                        </picture>
                    ) : (
                        <DragNDrop handlePhotosChange={(files) => setProfilePicture(files[0])} />
                    )
                }
            </div>

            <span className='text-red-500 text-sm'> {errors.root && errors.root.message} </span>
            <span className='text-green-500 text-sm'> {registerMessage} </span>
            <Button isLoading={isSubmitting} disabled={isSubmitting} type='submit'>
                Register
            </Button>
            <p
                onClick={onLoginClick}
                className='text-white/70 text-sm mt-3 text-center cursor-pointer hover:text-white transition-all duration-300'> Already have an account? </p>

        </form >
    )
}

export default RegisterForm