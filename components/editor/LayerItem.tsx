interface LayerItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  isChild?: boolean;
  onClick?: () => void;
}



export const LayerItem: React.FC<LayerItemProps> = ({ icon, label, active = false, isChild = false, onClick }) => (
  <div 
  role="button"
    onClick={onClick}
    className={`flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 ${active ? 'bg-gray-100 text-gray-900 font-medium' : ''} ${isChild ? 'pl-8' : ''}`}
  >
    <span className="text-gray-400">{icon}</span>
    <span>{label}</span>
  </div>
);