"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";



interface SidebarItem {
    title: string;
    href: string;
    icon: IconType

}

const SidebarItem = ({ href, icon: Icon, title }: SidebarItem) => {
    const pathname = usePathname();
    const isActive = pathname === href

    return (
        <div className="flex justify-start items-center space-y-6 p-2 w-full">
      
                <Link
                    key={href}
                    href={href}
                    className={
                        "group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors w-full " +
                        (isActive
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground")
                    }
                >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{title}</span>
                </Link>
        
        </div>
    )
}

export default SidebarItem
