
import { MenuIcon } from 'lucide-react'
import Logo from '../Logo'
import ToolOver from '../ToolOver'
import EditorNav from './EditorNav'

const EditorHeader = () => {
  return (
    <header className='border-b p-4'>
      <nav className='flex flex-row justify-between'>
        <Logo/>
        <MenuIcon className='md:hidden mr-6 h-5 w-5'/>
        <EditorNav />
      </nav>
      
    </header>
  )
}

export default EditorHeader
