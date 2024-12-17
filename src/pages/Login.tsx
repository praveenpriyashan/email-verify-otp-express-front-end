import {useContext, useState} from "react";
import {assets} from "../assets/assets";
import {useNavigate} from "react-router-dom";
import {AppContent} from "../context/AppContext.tsx";
import axios from "axios";
import {toast} from 'react-toastify'

const Login = () => {


    const {backendUrl, isLoggedIn, setIsLoggedIn, userData, setUserData, getUserData} = useContext(AppContent)
    const [state, setState] = useState('Sign Up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const onSubmitHandler = async (e): Promise<void> => {
        console.log('start the onSubmit handler fun in Login page  ')
        try {
            e.preventDefault();
            axios.defaults.withCredentials = true;      //coockies
            console.log('set the credentials ')
            if (state === 'Sign Up') {
                console.log('inside the the sign up if')
                const {data} = await axios.post(backendUrl + '/api/auth/register', {name, email, password})
                if (data.success) {
                    console.log(' successful registration ')
                    setIsLoggedIn(true)
                    // setUserData(data.user)
                    getUserData()
                    navigate('/')
                    console.log('setloggedIn=true, getUserdata function called ,navigate home')
                    toast.success('Sign-up successfully')
                } else {
                    toast.error(data.message)
                    console.log('error sign up')
                }
            } else {
                console.log('inside the the login else')
                const {data} = await axios.post(backendUrl + '/api/auth/login', {email, password})
                if (data.success) {
                    setIsLoggedIn(true)
                    // setUserData(data.user)
                    console.log('before call getUserData')
                    getUserData()
                    console.log('end call getUserData')
                    navigate('/')
                    console.log('setLoggedIn,getUserData function,navigate,Logged in successfully, ')
                    toast.success('Logged in successfully')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
            toast.error(errorMessage);
        }
    }

    return (
        <div className={'flex items-center justify-center min-h-screen px-6 ' +
            'sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'}>
            <img src={assets.logo} alt={'logo'} onClick={() => {
                navigate('/')
            }} className={'absolute top-5 left-5 w-28 sm:left-20 ' +
                'sm:w-32 cursor-pointer'}/>
            <div className={'bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'}>
                <h2 className={'text-3xl font-semibold text-white text-center mb-3'}>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>
                <p className={'text-center text-sm mb-6'}>{state === 'Sign Up' ? 'Create  your account' : 'Login to your account'}</p>
                <form onSubmit={onSubmitHandler}>
                    {
                        state === 'Sign Up' && (
                            <div
                                className={'mb-4 flex items-center gap-3 w-full px-5 py-2.5 sm:h-10 rounded-full bg-[#333A5C]'}>
                                <img src={assets.person_icon} alt={'person'}/>
                                <input
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                    value={name}
                                    type={'text'}
                                    placeholder={'Full Name'}
                                    className={'bg-transparent outline-none text-xl'}
                                    required/>
                            </div>
                        )
                    }
                    <div
                        className={'mb-4 flex items-center gap-3 w-full px-5 py-2.5 sm:h-10 rounded-full bg-[#333A5C]'}>
                        <img src={assets.mail_icon} alt={'person'}/>
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            value={email}
                            type={'email'}
                            placeholder={'Email'}
                            className={'bg-transparent outline-none text-xl'}
                            required/>
                    </div>
                    <div
                        className={'mb-4 flex items-center gap-3 w-full px-5 py-2.5 sm:h-10 rounded-full bg-[#333A5C]'}>
                        <img src={assets.lock_icon} alt={'person'}/>
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            value={password}
                            type={'password'}
                            placeholder={'Password'}
                            className={'bg-transparent outline-none text-xl'}
                            required/>
                    </div>

                    <p className={'mb-4 text-indigo-500 cursor-pointer'} onClick={() => {
                        navigate('/ResetPassword')
                    }}>Forgot password ?</p>
                    <button type={"submit"} className={'w-full rounded-full py-2.5 ' +
                        'bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'}>{state}
                    </button>

                    {state === 'Sign Up' ? (
                        <p className={'text-gray-400 mt-3 text-center'}>Already have and account ?
                            <span className={'text-blue-400 cursor-pointer underline'} onClick={() => {
                                setState('Login')
                            }}>Login hear</span>
                        </p>
                    ) : (
                        <p className={'text-gray-400 mt-3 text-center'}>Dont have and account ?
                            <span className={'text-blue-400 cursor-pointer underline'} onClick={() => {
                                setState('Sign Up')
                            }}>Sign up</span>
                        </p>
                    )}
                </form>
            </div>
        </div>
    )
}
export default Login
