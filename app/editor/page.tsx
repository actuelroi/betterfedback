"use client"

import MainEditor from '@/components/editor/MainEditor'


const page = () => {
  return (
    <section>
        <div>
            <div className='grid grid-cols-1 md:grid-cols-6'>
              <div className='md:col-span-1 border-r '>
                right side
              </div>
              <div className='md:col-span-4'>
               <MainEditor/>
              </div>
              <div className='md:col-span-1 border-l '>
                left side
              </div>
            </div>
        </div>
    </section>
  )
}

export default page
