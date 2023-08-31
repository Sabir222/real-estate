"use client";

interface MenuContentProps {
  onClick: () => void;
  label: string;
}
const MenuContent: React.FC<MenuContentProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="p-4 hover:bg-gray-100 ease-in-out duration-150 font-semibold"
    >
      {label}
    </div>
  );
};

export default MenuContent;
