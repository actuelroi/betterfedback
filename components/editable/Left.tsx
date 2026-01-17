'use client'

import React from 'react';
import { Smartphone, Monitor, Box, Image as ImageIcon, Paintbrush, MoreHorizontal, ChevronUp, ChevronDown as ChevronDownIcon, 
  Square, Type,Mail,Tag,Minus,Pilcrow,Heading,
  MousePointer2,
  Hash} from 'lucide-react';
import { ElementType } from '@/types/canvas';



interface LeftSideProps {
  addElement: (elementType: ElementType) => void;
 
  
}

interface LayerItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isChild?: boolean;
  onClick?: () => void;
}

const LeftSide: React.FC<LeftSideProps> = ({ addElement }) => {
  const handleAddElement = (elementType: ElementType) => {
    addElement(elementType);
  };

  const element =  [
    { type: 'text' as ElementType, label: 'Text', icon: <Type size={14} />, color: 'text-blue-500' },
    { type: 'title' as ElementType, label: 'Title', icon: <Heading size={14} />, color: 'text-red-500' },
    { type: 'paragraph' as ElementType, label: 'Paragraph', icon: <Pilcrow size={14} />, color: 'text-indigo-500' },
    { type: 'button' as ElementType, label: 'Button', icon: <Square size={14} />, color: 'text-green-500' },
    { type: 'email' as ElementType, label: 'Email input', icon: <Mail size={14} />, color: 'text-pink-500' },
    { type: 'label' as ElementType, label: 'Label', icon: <Tag size={14} />, color: 'text-teal-500' },
    { type: 'container' as ElementType, label: 'Container', icon: <Paintbrush size={14} />, color: 'text-purple-500' },
    { type: 'divider' as ElementType, label: 'Divider', icon: <Minus size={14} />, color: 'text-gray-500' },
    { type: 'icon' as ElementType, label: 'Icon', icon: <ImageIcon size={14} />, color: 'text-yellow-500' },
    { type: 'input' as ElementType, label: 'Input', icon: <MousePointer2 size={14} />, color: 'text-pink-500' },
      { type: 'phone' as ElementType, label: 'Number', icon: <Hash size={18} />, color: 'text-violet-500' },
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full max-h-screen flex flex-col text-sm text-gray-600">

      {/* Breadcrumb Info */}
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
        <LayerItem icon={<Box size={14}/>} label="Container" active />
        <div className="pl-4 space-y-1">
          
 {element.map((item,i)=>(
  <LayerItem icon={item.icon} label={item.label} onClick={() => handleAddElement(item.type)} key={i} />
 ))}


        </div>
      </div>

    </div>
  );
};

const LayerItem: React.FC<LayerItemProps> = ({ icon, label, active = false, isChild = false, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 ${active ? 'bg-gray-100 text-gray-900 font-medium' : ''} ${isChild ? 'pl-8' : ''}`}
  >
    <span className="text-gray-400">{icon}</span>
    <span>{label}</span>
  </div>
);

export default LeftSide;