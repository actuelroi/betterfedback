
import { MenuIcon } from 'lucide-react'
import Logo from '../Logo'
import ToolOver from '../ToolOver'

const EditorHeader = () => {
  return (
    <header className='border-b p-4'>
      <nav className='flex flex-row justify-between'>
        <Logo/>
        <MenuIcon className='md:hidden mr-6 h-5 w-5'/>
        <div className='hidden md:flex flex-row justify-between items-center gap-x-6 '>
          <ToolOver label='Generate question from ai'>
            <h1 className='cursor-pointer'>
            Ask ai
          </h1>
          </ToolOver>
          <ToolOver label='Inspired by template'>
            <h1 className='cursor-pointer'>
            Templates
          </h1>
          </ToolOver>
          
        <h1 className='cursor-pointer'>
          Export
        </h1>
        <h1 className='cursor-pointer'>
          Save
        </h1>
        <ToolOver label='Play around'>
         <h1 className='cursor-pointer'>
          Test
        </h1>
        </ToolOver>
        
        <h1 className='cursor-pointer'>
          Deploy
        </h1>
        <h1>

        </h1>


      </div>
      </nav>
      
    </header>
  )
}

export default EditorHeader
