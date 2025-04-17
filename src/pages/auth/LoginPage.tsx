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
                        <div>
                            <label className="inline-flex items-center me-5 cursor-pointer">
                                <input
                                    {...register('type')}
                                    type="checkbox"
                                    defaultValue=""
                                    className="sr-only peer"
                                />
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-2">
                                    Login Sebagai Admin
                                </span>
                                <div className="relative w-11 h-6 bg-blue-200 rounded-full peer dark:bg-blue-700 peer-focus:ring-4 focus:ring-green-300  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-blue-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-blue-600 peer-checked:bg-green-600 dark:peer-checked:bg-green-600" />
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    Login Sebagai Pakar
                                </span>
                            </label>

                        </div>
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