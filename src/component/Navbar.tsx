import React, {useContext} from "react";
import {assets} from '../assets/assets.js'
import {useNavigate} from "react-router-dom";
import {AppContent} from "../context/AppContext.tsx";
import axios from "axios";
import {toast} from "react-toastify";


const Navbar = () => {
    const navigate = useNavigate();
    const {
        userData,
        backendUrl,
        setIsLoggedIn,
        setUserData,
        getUserData,
        getAuthenticate
    } = useContext(AppContent)

    const logOut = async () => {
        console.log('successfully in logout function')
        try {
            axios.defaults.withCredentials = true;
            console.log('successfully use credentials')
            const {data} = await axios.post(backendUrl + '/api/auth/logout');
            data.success && setIsLoggedIn(false);
            data.success && setUserData(false);
            navigate('/')
            console.log('successfully naviagt to home page and setloggedin=false,setUserData(false)')
            toast.success('Logged out successfully')
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to log out';
            toast.error(errorMessage);
        }
    }

    const sendVerificationOtp = async () => {
        console.log('start verification otp email send')
        try {
            axios.defaults.withCredentials = true;
            console.log('set the credentials')
            const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp')
            if (data.success) {
                console.log('successfully calling api and get data')
                navigate('/EmailVerify')
                console.log('successfully naviagte to emailverify otp page')
                toast.success('Verification OTP sent successfully')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }


    return (
        <div className={'w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'}>
            <img src={assets.logo} alt={"logo"} className={'w-28 sm:w-32'}/>
            {
                userData ?
                    <div
                        className={'w-8 flex justify-center items-center rounded-full bg-black text-white relative group'}>
                        {userData.name[0].toUpperCase()}
                        <div
                            className={'absolute top-0 right-0 hidden group-hover:block z-10 text-black rounded pt-10 '}>
                            <ul className={'list-none m-0 p-2 bg-gray-100 text-sm'}>
                                {
                                    !userData.isAccountVerified &&
                                    <li onClick={sendVerificationOtp} className={'py-1 px-2 hover:bg-gray-200 cursor-pointer'}>verify email</li>
                                }
                                <li onClick={logOut} className={'py-1 px-2 hover:bg-gray-200 cursor-pointer'}>Logout
                                </li>
                            </ul>
                        </div>
                    </div>
                    : <div>
                        <button
                            className={'flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 hover:bg-gray-100 ' +
                                'transition-all text-sm'} onClick={() => {
                            navigate('/Login')
                        }}>Login
                            <img src={assets.arrow_icon} alt={"arraow"}/>
                        </button>
                    </div>
            }
        </div>
    )
}

export default Navbar
