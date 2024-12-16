import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const AppContent = createContext()
export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [userData,setUserData]=useState(false)

    const getAuthenticate=async ()=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/isAuth')
            console.log('authenticate data', data)
            if (data.success){
                setIsLoggedIn(true);
                getUserData();
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to authenticate';
            toast.error(errorMessage);
        }
    }

    const getUserData=async ()=>{
        try {
            console.log('inside the getUserdata function')
            const {data} = await axios.get(backendUrl + '/api/user/user-data')
            console.log('user data', data)
            data.success ? setUserData(data.userData) : toast.error(data.message)
            console.log('userData', userData)
            console.log('success getUserData function')
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to fetch user data';
            toast.error(errorMessage);
        }
    }

    useEffect(()=>{
        getAuthenticate();
    },[])

    const value = {
        backendUrl,
        isLoggedIn,setIsLoggedIn,
        userData, setUserData,getUserData,getAuthenticate
    }
    return (
        <AppContent.Provider value={value}>
            {props.children}
        </AppContent.Provider>
    )
}