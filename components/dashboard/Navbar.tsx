
import Logo from '../Logo'
import { IoMdHelpCircle } from 'react-icons/io'
import { FaBell, FaUser } from 'react-icons/fa6'
import Link from 'next/link'
import Menu from '../Menu'



const Navbar = () => {

  const navItem=[
    {
      icon: IoMdHelpCircle,
      href:'/help',
    },
    {
      icon: FaBell,
      href:'/notification',
    },
    {
      icon: FaUser,
      href:'/user',
    },
    
  ]
  return (
    <header className='h-12 w-full top-0 left-0 border-b flex text-center items-center  sticky'>
      <nav className=' flex flex-row items-center w-full justify-between '>
        <div className='p-2'>
              <Logo href='/dashboard'/>
        </div>
        <Menu/>
        <div className='md:flex md:flex-row gap-x-12 pr-10 hidden '>
         {
          navItem.map((item, index)=>(
            <Link href={item.href} key={index} className='flex items-center gap-2 cursor-pointer p-2'>
                <item.icon  size={18}/>
            </Link>
          ))
         }
        </div>
       
      </nav>

    </header>
  )
}

export default Navbar
