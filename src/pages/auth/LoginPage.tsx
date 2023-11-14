import { Button, InputText } from '../../components/input'
import { useLogin } from '../../hooks/fetch/auth/useLogin'

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        onSubmit,
        errors
    } = useLogin()

    return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full h-screen flex bg-gray-100 justify-center items-center'>
                    <div className='w-5/12 bg-white shadow-md p-8 rounded-lg space-y-4'>
                        <label className='flex justify-center font-bold text-3xl'>
                            Login
                        </label>
                        <InputText 
                            name='username'
                            label='Username'
                            type='text'
                            register={register}
                            errors={errors}
                        />
                        <InputText 
                            name='password'
                            label='Password'
                            type='password'
                            register={register}
                            errors={errors}
                        />
                        <div className='w-full flex justify-end'>
                            <Button variant='primary' type='submit'>
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
    )
}

export default LoginPage