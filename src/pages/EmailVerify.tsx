import {assets} from "../assets/assets";
import React, {useContext, useEffect} from "react";
import {AppContent} from "../context/AppContext.tsx";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


const EmailVerify = () => {
    axios.defaults.withCredentials = true;
    const {backendUrl, isLoggedIn, userData, getUserData} = useContext(AppContent)
    const navigate = useNavigate()

    const inputRef = React.useRef([])
    //to auto jump
    const handleInput = (e, index) => {
        if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
            inputRef.current[index + 1].focus();
        }
    }

    //to delete the input of verify otp
    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
            inputRef.current[index - 1].focus();
        }
    }

    //to paste the otp number
    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('')
        pasteArray.forEach((char, index) => {
            if (inputRef.current[index].value === '') {
                inputRef.current[index].value = char
            }
        })
    }

    //submit the otp
    const submitHandler = async (e) => {
        console.log('start submit the verify-otp  (submitHandler) in EmailVerify page')
        try {
            e.preventDefault();
            const otpArray = inputRef.current.map(e => e.value)
            const otp = otpArray.join('')
            const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp})
            if (data.success) {
                console.log('suscees the api calling')
                toast.success(data.message)
                getUserData()
                navigate('/')
                console.log('getUserData,navigateHome')
            } else {
                toast.error(data.message)
                console.log('error api call')
            }
        } catch (e) {
            toast.error(e.message)
            console.log('error submit the otp')
        }
    }

    //user is already verify or loggedin then naviaget home
    useEffect(() => {
        isLoggedIn && userData && userData.isAccountVerified && navigate('/')
        console.log('in the useEffect in EmailVerify method (only execute when logged in and userData)')
    }, [isLoggedIn, userData])

    return (
        <div className={'flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'}>
            <img src={assets.logo} alt={'logo'}
                 className={'absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'}/>
            <form onSubmit={submitHandler} className={'bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'}>
                <h1 className={'text-white text-2xl  text-center mb-4'}>Email verify otp</h1>
                <p className={'text-white text-center mb-6'}>Enter a 6 digit code sent to your email</p>
                <div className={'flex justify-between mb-8'} onPaste={handlePaste}>
                    {Array(6).fill(0).map((_, index) => (
                        <input type={"text"} maxLength={'1'} key={index} required className={'w-12 h-12 bg-[#333A5C] ' +
                            'text-white text-center text-xl rounded'} ref={e => inputRef.current[index] = e}
                               onInput={(e) => handleInput(e, index)}
                               onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    ))}
                </div>
                <button type={"submit"}
                    className={'w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'}>verify
                    email
                </button>
            </form>
        </div>
    )
}

export default EmailVerify
