import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider } from './ui/tooltip'
import { TooltipTrigger } from '@radix-ui/react-tooltip'

interface Props {
    label: string
    align?: 'end' | 'start' | 'center'
    side?: "top" | "right" | "bottom" | "left";
    children: React.ReactElement
}

const ToolOver = ({ align = 'center', label, children,side }: Props) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    {children}
                </TooltipTrigger>
                <TooltipContent align={align} side={side}>
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ToolOver
