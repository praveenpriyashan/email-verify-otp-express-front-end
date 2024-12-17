// import react from "@vitejs/plugin-react-swc";
import './App.css'
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import EmailVerify from "./pages/EmailVerify.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import Login from "./pages/Login.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

    return (
        <div className={'text-2xl'}>
            <ToastContainer/>
            <Routes>
                <Route path={'/'} element={<Home/>} />
                <Route path={'/login'} element={<Login/>} />
                <Route path={'/emailVerify'} element={<EmailVerify/>} />
                <Route path={'/resetPassword'} element={<ResetPassword/>} />
            </Routes>
        </div>
    )
}

export default App
