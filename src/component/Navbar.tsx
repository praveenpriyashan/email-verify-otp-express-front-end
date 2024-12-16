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
        try {
            axios.defaults.withCredentials = true;
            const {data} = await axios.post(backendUrl + '/api/auth/logout');
            data.success && setIsLoggedIn(false);
            data.success && setUserData(false);
            navigate('/')
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to log out';
            toast.error(errorMessage);
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
                                    <li className={'py-1 px-2 hover:bg-gray-200 cursor-pointer'}>verify email</li>
                                }
                                <li onClick={logOut} className={'py-1 px-2 hover:bg-gray-200 cursor-pointer'}>Logout</li>
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
