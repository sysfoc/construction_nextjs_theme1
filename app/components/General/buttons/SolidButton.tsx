import { RiArrowRightDoubleLine } from "react-icons/ri";
import React from "react";

interface SolidButtonProps {
  text?: string;
  onClick?: () => void;
}

const SolidButton: React.FC<SolidButtonProps> = ({ text = "GET STARTED", onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] cursor-pointer px-8 py-3 font-semibold hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-xl clip-slant flex items-center gap-2"
    >
      {text}
      <RiArrowRightDoubleLine className="w-5 h-5" />
    </button>
  );
};

export default SolidButton;
