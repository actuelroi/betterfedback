import { title } from 'process'
import React from 'react'
import ToolOver from '../ToolOver'

const EditorNav = () => {

    const items=[
        {
            title: 'Previews',
            href: '/',
            hint: false
        },
        {
            title: 'Ask ai',
            href: '/',
            hint: true,
            hintText:'Generate question from ai'
        },
        {
            title: 'Templates',
            href: '/',
            hint: true,
            hintText:'Inspired by template'
        },
        {
            title: 'Export',
            href: '/',
            hint: false,

        },
        {
            title: 'Save',
            href: '/',
            hint: false,
    
        },
        {
            title: 'Test',
            href: '/',
            hint: true,
            hintText:'Play around'
        },
        {
            title: 'Deploy',
            href: '/',
            hint: false
        },
    ]
  return (
    <div className='hidden md:flex flex-row justify-between items-center gap-x-6 '>
      {
        items.map((item, index)=>(
            <div key={index}>

            {
                item.hint ? (
                    <ToolOver label={item.hintText || ''} >
                    <h1 className='cursor-pointer'>{item.title}</h1>
                </ToolOver>
                ) :(
                    <h1 className='cursor-pointer' key={index}>{item.title}</h1>
                )
            }
            </div>
              
         
           
        ))
      }
    </div>
  )
}

export default EditorNav
