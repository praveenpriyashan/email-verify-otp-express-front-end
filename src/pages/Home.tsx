import Navbar from "../component/Navbar.tsx";
import Header from "../component/Header.tsx";


const Home = () => {

    return (
        <div className={'flex flex-col justify-center items-center min-h-screen ' +
            'bg-[url("/bg_img.png")] bg-cover bg-center'}>
            <Navbar/>
            <Header/>
        </div>
    )
}

export default Home
