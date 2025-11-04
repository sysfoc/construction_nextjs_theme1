// app/components/General/buttons/SlantedButton.tsx
import { RiArrowRightDoubleLine } from "react-icons/ri";
import React from "react";

interface SlantedButtonProps {
  text?: string;
  onClick?: () => void;
}

const SlantedButton: React.FC<SlantedButtonProps> = ({ text = "GET STARTED", onClick }) => {
  return (
    <div className="">
      <button
        onClick={onClick}
        className="relative cursor-pointer flex items-center font-semibold px-4 text-[var(--color-primary-foreground)] text-sm overflow-hidden clip-slant"
      >
        {/* Orange main area */}
        <span className="bg-[var(--color-primary)] py-3 px-5 pr-12">
          {text}
        </span>

        {/* Black diagonal side */}
        <span className="absolute right-0 top-0 h-full w-[50px] bg-[var(--color-foreground)] dark:bg-gray-800 clip-button-side flex items-center justify-center">
          <RiArrowRightDoubleLine className="w-5 h-5 text-[var(--color-primary-foreground)]" />
        </span>
      </button>
    </div>
  );
};

export default SlantedButton;
