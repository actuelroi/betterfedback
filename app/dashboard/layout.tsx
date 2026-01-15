import Navbar from '@/components/dashboard/Navbar'
import Sidebar from '@/components/dashboard/Sidebar'

import React, { PropsWithChildren } from 'react'

const layout = ({children}:PropsWithChildren) => {
  return (
   <>
     <Navbar/>
      <Sidebar className='hidden md:block md:fixed '/>
      <main className='md:pl-55 top-12'>
      {children}
      </main>
   </>
   
  )
}

export default layout
