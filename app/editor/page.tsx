"use client"

import LeftSide from '@/components/editor/LeftSide'
import Main from '@/components/editor/Main'

import MainEdit from '@/components/editor/MainEdit'
import Middle from '@/components/editor/Middle'

import RightSidebar from '@/components/editor/RightSidebar'

const page = () => {
  return (
    <section className=" overflow-hidden">
      <div className="  flex flex-col md:flex-row  h-full">
        {/* LEFT */}
        <div className="w-full md:w-60 border-r">
          <LeftSide />
        </div>

        {/* MAIN */}
        <div className="flex-1 ">
          <Middle />
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-70 border-l">
          <RightSidebar />
        </div>
      </div>
    </section>
  )
}

export default page