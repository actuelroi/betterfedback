import EditorHeader from '@/components/editor/EditorHeader'
import React, { PropsWithChildren } from 'react'

const EditLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <EditorHeader/>
            <main className='md:max-h-[90vh] md:overflow-hidden'>
            {children}
            </main>
        </>
    )
}

export default EditLayout
