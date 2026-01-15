'use client'

import { GrDeploy, GrHelpBook } from "react-icons/gr";
import { WiStars } from "react-icons/wi";
import SidebarItem from "./SidebarItem";
import { MdOutlineAutoGraph } from "react-icons/md";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { FaBookBookmark } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { IoChatbubbleOutline, IoMoon, IoPeopleSharp } from "react-icons/io5";
import { CiBrightnessUp } from "react-icons/ci";

const Sidebar = () => {
  const sidebarNavItem = [
    {
       title: 'Deploy & Integration',
      href: '/deploy',
      icon: GrDeploy

    },
    {
      title: 'Templates',
      href: '/templates',
      icon: FaBookBookmark

    },

     {
      title: 'Chat logs',
      href: '/chat-logs',
      icon: IoChatbubbleOutline
    },
    
    {
      title: 'Ask ai',
      href: '/ai',
      icon: WiStars

    },
    {
      title: 'Analytic',
      href: 'Analytic',
      icon: GoGraph
    },
    {
      title: 'help&support',
      href: '/help',
      icon: GrHelpBook
    },
    {
      title: 'Billing',
      href: '/billing',
      icon: IoMoon
    },
     {
      title: 'Organisation',
      href: '/organisation',
      icon: IoPeopleSharp
    },

    {
      title: 'Change Mode',
      href: '/change-mode',
      icon: CiBrightnessUp
    },
    
  ]
  return (
   <aside className="fixed left-0 top-12 h-[calc(100vh-3rem)] w-50 border-r bg-background overflow-y-scroll">
      <div className="flex flex-col p-3 gap-4">
        <div className="flex items-center justify-start w-full">
          <Button className="flex items-center justify-center gap-2 rounded-lg border  py-2 text-sm 
          font-medium transition-colors w-full hover:bg-muted cursor-pointer" variant={'ghost'} size={'lg'}>
            <Plus className="w-4 h-4" />
            <span>Create </span> 
          </Button>
        </div>
        {
          sidebarNavItem.map((item, index) => (
            <SidebarItem
              key={index}
              title={item.title}
              href={item.href}
              icon={item.icon}
            />
          ))
        }

      </div>
    </aside>
  )
}

export default Sidebar
