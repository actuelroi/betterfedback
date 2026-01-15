import EditorHeader from '@/components/editor/EditorHeader'
import React, { PropsWithChildren } from 'react'

const EditLayout = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <EditorHeader/>
            {children}
        </div>
    )
}

export default EditLayout
