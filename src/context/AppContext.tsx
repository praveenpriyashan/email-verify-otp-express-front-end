import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export const AppContent = createContext()
export const AppContextProvider = (props) => {

    axios.defaults.withCredentials=true;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedIn,setIsLoggedIn]=useState(false)
    const [userData,setUserData]=useState(false)

    const getAuthenticate=async ()=>{
        console.log("inside the getAuthenticate function in appcontext")
        try {
            const {data} = await axios.get(backendUrl + '/api/auth/isAuth')
            if (data.success){
                console.log('successfully getauthenticate data', data)
                setIsLoggedIn(true);
                console.log('successfully setLoggedIn true')
                getUserData();
                console.log('successfully call getUserData method inside the getAuthenticate method')
            }
        } catch (error) {
            const errorMessage = error?.response?.data?.message || 'Failed to authenticate';
            toast.error(errorMessage);
        }
    }

    const getUserData=async ():Promise<void>=>{
        // try {
        //     console.log('inside the getUserdata function')
        //     const {data} = await axios.get(backendUrl + '/api/user/user-data')
        //     console.log('user data', data)
        //     data.success ? setUserData(data.userData) : toast.error(data.message)
        //     console.log('userData', userData)
        //     console.log('success getUserData function')
        // } catch (error) {
        //     const errorMessage = error?.response?.data?.message || 'Failed to fetch user data';
        //     toast.error(errorMessage);
        // }

        try {
            console.log('inside the getUserData method ')
            const res = await axios.get(backendUrl + '/api/user/user-data')
            if (!res) {
                console.log('no res in the backend in getUserData method ')
                toast.error('Failed to fetch user data')
            }
            console.log('res is available')
            setUserData(res.data.userData)
            console.log('setUserData in the getUserData method & end ex OF getUserdata method')
        } catch (error) {
             toast.error('Failed to fetch user data')
            console.error(e)
        }
    }

    useEffect(()=>{
        getAuthenticate();
        console.log('getAuthenticate called in useEffect')
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