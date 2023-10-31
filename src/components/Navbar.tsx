import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '../config/firebase'

function Navbar() {
    const [isVisible, setIsVisible] = useState(false)

    const signOutOnClick = () => {
        signOut(auth)
        location.reload();
    }

    const signInOnClick = async () => {
        const response  = await signInWithPopup(auth, provider);
        if ( response.user ) {
            location.reload();
        }
    }

    const dropDown = () => {
        setIsVisible(!isVisible)
    }

    const clicked = () => {
        setIsVisible(false)
    }

    return (
        <nav className='flex flex-wrap items-center justify-between bg-pink-200 p-5'>
            <div className='flex items-center flex-shrink-0  text-black mr-20'>
                <Link to='/' className='font-bold text-xl tracking-tight'>Digital Dealership</Link>
            </div>
            <div className='block'>
                <button 
                onClick={dropDown} 
                className='flex items-center px-10 py-3 ml-10 mb-2 text-teal-200 
                border rounded border-black hover:text-white hover:border-white'
                >
                    <i className='fas fa-bars'></i>
                </button>
            </div>
           
            { isVisible ? (
     <div className='w-full block flex-grow items-center'>
     <div className="text-sm lg:flex-grow">
         <Button className='p-3 ml-20 bg-gray-400 border rounded font-bold justify-center'>
             <div>
                 <Link to='/' onClick={ clicked } className='flex place-itmes-center  lg:inline-block lg:mt-0
                  text-black-200 hover:text-white mr-4'>
                    Home
                    </Link>
             </div>
         </Button>
         <Button className='p-3 ml-20 bg-gray-400 font-bold border rounded justify-center'>
             <div>
                 <Link to='/dashboard' onClick={ clicked } className='flex place-itmes-center mt-4 lg:inline-block lg:mt-0
                  text-black-200 hover:text-white mr-4'>
                    Sign In / My Collection
                    </Link>
             </div>
         </Button>
         <Button className='p-3 ml-20 bg-gray-400 font-bold border rounded justify-center'>
             <div>
                 <Link to='/contact' onClick={ clicked } className='flex place-itmes-center mt-4 lg:inline-block lg:mt-0
                  text-black-200 hover:text-white mr-4'>
                    About Us
                    </Link>
             </div>
         </Button>
         {
            !auth.currentUser ?
            <Button className='p-3 ml-20 bg-gray-400 justify-center'>
            <div>
                <Link to="/" onClick={signInOnClick} className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white'>
                    Login
                </Link>
            </div>
        </Button>
        :
        <Button className='p-3 ml-20 mt-2 bg-gray-400 font-bold border rounded justify-center'>
            <div>
                <Link to="/" onClick={signOutOnClick} className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-black-200 hover:text-white'>
                    Sign Out
                </Link>
            </div>
        </Button>
    }
</div>
</div>
) : (
<></>
)}
</nav>
);
}

export default Navbar