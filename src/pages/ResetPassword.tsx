import React, {useContext, useState} from "react";
import {assets} from "../assets/assets";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AppContent} from "../context/AppContext.tsx";
import {toast} from "react-toastify";

const ResetPassword = () => {
    axios.defaults.withCredentials = true;
    const {backendUrl, isLoggedIn, userData, getUserData} = useContext(AppContent)

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [otp, setOtp] = useState(0);
    const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

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

    const onSubmitEmail = async (e) => {
        console.log('inside the onSubmitEmail function in rsetPassword page - submit the email')
        e.preventDefault();
        try {
            const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
            data.success ? toast.success(data.message) : toast.error(data.message)
            data.success && setIsEmailSent(true)
        } catch (e) {
            toast.error(e.message)
        }
    }

    const onSubmitOtp = async (e) => {
        e.preventDefault();
        const otpArray = inputRef.current.map(e => e.value)
        setOtp(otpArray.join(''))
        setIsOtpSubmitted(true)
    }

    const onSubmitPassword = async (e) => {
        console.log('inside the onSubmitPassword function in rsetPassword page - submit the password')
        e.preventDefault();
        try {
            const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email,otp,newPassword})
            console.log(`data  -  ${data}`)
            data.success ? toast.success(data.message) : toast.error(data.message)
            data.success && navigate('/login')
        } catch (e) {
            toast.error(e.message)
        }
    }

    return (
        <div className={'flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'}>
            <img src={assets.logo} alt={'logo'}
                 className={'absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer'}/>

            {/*entre email*/}
            {!isEmailSent &&
                <form onSubmit={onSubmitEmail} className={'bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'}>
                    <h1 className={'text-white text-2xl  text-center mb-4'}>Reset password</h1>
                    <p className={'text-white text-center mb-6'}>Enter registered email address</p>
                    <div className={'mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'}>
                        <img src={assets.mail_icon} alt={'mail icon'}/>
                        <input required value={email} onChange={e => setEmail(e.target.value)} type={'email'}
                               placeholder={'Email id'} className={'bg-transparent outline-none text-white'}/>
                    </div>
                    <button type={"submit"}
                            className={'w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'}>submit
                    </button>
                </form>
            }

            {/*entre otp form*/}
            {!isOtpSubmitted && isEmailSent &&
                <form onSubmit={onSubmitOtp} className={'bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'}>
                    <h1 className={'text-white text-2xl  text-center mb-4'}>Reset Password otp</h1>
                    <p className={'text-white text-center mb-6'}>Enter a 6 digit code sent to your email</p>
                    <div className={'flex justify-between mb-8'} onPaste={handlePaste}>
                        {Array(6).fill(0).map((_, index) => (
                            <input type={"text"} maxLength={'1'} key={index} required
                                   className={'w-12 h-12 bg-[#333A5C] ' +
                                       'text-white text-center text-xl rounded'} ref={e => inputRef.current[index] = e}
                                   onInput={(e) => handleInput(e, index)}
                                   onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                        ))}
                    </div>
                    <button type={"submit"}
                            className={'w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'}>submit
                    </button>
                </form>
            }


            {/*entre new password*/}
            {isOtpSubmitted && isEmailSent &&
                <form onSubmit={onSubmitPassword} className={'bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'}>
                    <h1 className={'text-white text-2xl  text-center mb-4'}>new password</h1>
                    <p className={'text-white text-center mb-6'}>Enter new password </p>
                    <div className={'mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'}>
                        <img src={assets.lock_icon} alt={'lock icon'}/>
                        <input required value={newPassword} onChange={e => setnewPassword(e.target.value)}
                               type={'password'}
                               placeholder={'Password'} className={'bg-transparent outline-none text-white'}/>
                    </div>
                    <button type={"submit"}
                            className={'w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full'}>submit
                    </button>
                </form>
            }
        </div>
    )
}

export default ResetPassword
