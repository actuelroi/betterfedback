
import {
    Smartphone, Monitor, Box, Image as ImageIcon, Paintbrush, MoreHorizontal, ChevronUp, ChevronDown as ChevronDownIcon,
    Square, Type, Mail, Tag, Minus, Pilcrow, Heading,
    MousePointer2,
    Hash
} from 'lucide-react';




import { LayerItem } from "./LayerItem";
import { useCanvasStore } from '@/store/useCanvasStore';


export type ElementType = 'button' | 'text' | 'container' | 'icon' | 'title' | 'label' | 'input' | 'email' | 'phone' | 'divider' | 'paragraph'




interface LeftSideProps {
    addElement?: (elementType: ElementType) => void;

}



const LeftSide: React.FC<LeftSideProps> = () => {
    // const handleAddElement = (elementType: ElementType) => {
    //     addElement(elementType);
    // };



    type TextStyle = "heading" | "subheading" | "small";


    const addText = (text: string) => {


    };


    const addTitle = (text: string) => {

    };



    const addRect = (text: string) => {

    };


    const addButton = (label: string) => {

    };

    const { addElement } = useCanvasStore()








    return (
        <div className="w-full bg-white border-r border-gray-200 h-full max-h-screen flex flex-col text-sm text-gray-600">

            <div className="px-4 py-3 flex justify-between items-center">
                <div>
                    <p className="text-[11px] text-gray-400">Used by all steps</p>
                </div>
                <div className="flex gap-1 text-gray-400">
                    <ChevronUp size={14} /><ChevronDownIcon size={14} /><MoreHorizontal size={14} />
                </div>
            </div>

            {/* Layer List */}
            <div className="flex-1 overflow-y-auto px-2 space-y-1">
                <LayerItem icon={<Box size={14} />} label="Add items" active />
                <div className="pl-4 space-y-1">

                    <LayerItem
                        icon={<Type size={14} />}
                        label='Text'
                        onClick={() =>
                            addElement({
                                type: "title",
                                props: { text: "Title", fontSize: 28 },
                            })
                        }
                    />


                    <LayerItem
                        icon={<Heading size={14} />}
                        label='Title'
                        onClick={() => addTitle("Title",)}
                    />
                    <LayerItem
                        icon={<Pilcrow size={14} />}
                        label='Paragraph'
                        onClick={() => addText("Title",)}
                    />
                    <LayerItem
                        icon={<Square size={14} />}
                        label='Button'
                        onClick={() => addButton("Button",)}
                    />
                    <LayerItem
                        icon={<Mail size={14} />}
                        label='Email input'
                        onClick={() => addText("Title",)}
                    />
                    <LayerItem
                        icon={<Tag size={14} />}
                        label='Label'
                        onClick={() => addText("Title",)}
                    />
                    <LayerItem
                        icon={<Paintbrush size={14} />}
                        label='Container'
                        onClick={() => addText("Title",)}
                    />
                    <LayerItem
                        icon={<Minus size={14} />}
                        label='Divider'
                        onClick={() => addText("Title",)}
                    />
                    <LayerItem
                        icon={<ImageIcon size={14} />}
                        label='Icon'
                        onClick={() => addText("Title",)}
                    />

                    <LayerItem
                        icon={<MousePointer2 size={14} />}
                        label='Input'
                        onClick={() => addText("Title",)}
                    />

                    <LayerItem
                        icon={<Hash size={18} />}
                        label='Number'
                        onClick={() => addText("Title",)}
                    />





                </div>
            </div>

        </div>
    );
};



export default LeftSide;