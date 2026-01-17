import { ImageIcon } from 'lucide-react'
import { FaCircle } from 'react-icons/fa';
import { FiType } from 'react-icons/fi';
import { LuContainer } from "react-icons/lu";
import { MdEmojiEmotions } from 'react-icons/md';
import { PiNumberFiveFill } from 'react-icons/pi';
import { TbInputSpark } from 'react-icons/tb';
import { Button } from '../ui/button';

const LeftSidebar = () => {


    const items=[
        {
            name:'Button',
            label:'What do you like',
            icon: ImageIcon
        },
        {
            name:'Container',
            label:'What do you like',
            icon: LuContainer
        },
        {
            name:'Input',
            label:'Join our newLetter',
            icon: TbInputSpark
        },
        {
            name:'Title',
            label:'We be glad to hear from you',
            icon: FiType
        },
        {
            name:'Ratio ',
            label:'How to you rate our service',
            icon: PiNumberFiveFill
        },
        {
            name:'Emoji',
            label:'What do is you feeling',
            icon: MdEmojiEmotions
        },
        {
            name:'Options',
            label:'What did you like most',
            icon: FaCircle
        },
    ]

  return (
    <div className='flex p-3 flex-col items-center'>
     {
        items.map((item, index)=>(
            <Button variant={'ghost'} className='flex items-center gap-3 text-wrap' >
              <item.icon  size={12}/>
              <span>{item.label}</span>
            </Button>
        ))
     }
    </div>
  )
}

export default LeftSidebar
