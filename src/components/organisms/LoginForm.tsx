import Button from '@components/atoms/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema, type Login } from '@models/formSchemas';
import { login } from '@services/authService';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface Props {
    onRegisterClick: () => void;
}

function LoginForm({ onRegisterClick }: Props) {
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
        setError
    } = useForm<Login>({
        resolver: zodResolver(LoginSchema)
    });

    const handleFormAction: SubmitHandler<Login> = async (data) => {
        try {
            const response = await login(data.email, data.password);
            localStorage.setItem('user', JSON.stringify(response));
            window.location.href = '/home';
        } catch (error: any) {
            console.error(error);
            setError("root", {
                message: error.message
            });
        }
    }

    return (
        <form className='flex flex-col w-[500px] gap-3 ' onSubmit={handleSubmit(handleFormAction)}>
            <div className='flex flex-col w-full gap-2 p-2'>
                <span className='flex items-center gap-3'>Email
                    <span className='text-red-500 text-sm'> {errors.email && errors.email.message} </span>
                </span>
                <input
                    {...register('email')}
                    id="content"
                    className="bg-transparent outline-none border border-white/20 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="example@domain.com"
                />
            </div>
            <div className='flex flex-col gap-2 p-2'>
                <span>Password</span>
                <input
                    {...register('password')}
                    id="content"
                    className="bg-transparent outline-none border border-white/20 p-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="********"
                />
            </div>
            {
                errors.root && <p className='text-red-500 text-sm'> {errors.root.message} </p>
            }

            <Button isLoading={isSubmitting} disabled={isSubmitting} type='submit'>
                Login
            </Button>

            <p
                onClick={onRegisterClick}
                className='text-white/70 text-sm mt-3 text-center cursor-pointer hover:text-white transition-all duration-300'> Don't have an account ? </p>

        </form >
    )
}

export default LoginForm