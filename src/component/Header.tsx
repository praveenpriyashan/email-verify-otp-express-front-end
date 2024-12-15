import {assets} from '../assets/assets.js'

const Header = () => {

    return (
        <div className={'flex flex-col items-center mt-20 px-4 text-center text-gray-800'}>
            <img src={assets.header_img} alt={'header'} className={'w-36 h-36 rounded-full mb-6'}/>
            <h1 className={'flex items-center gap-2 text-xl sm:text-3xl'}>Hi Developer
                <img src={assets.hand_wave} alt={'handwave'} className={'w-8 aspect-square'}/>
            </h1>
            <h2 className={'text-xl sm:text-3xl'}>Welcome to our app</h2>
            <p className={'mb-8'}>let's start with a quick product tour and we will have you up and running in no time</p>
            <button className={'border border-gray-500 rounded-full px-8 py-2 hover:bg-gray-100'}>Get Started</button>
        </div>
    )
}

export default Header
