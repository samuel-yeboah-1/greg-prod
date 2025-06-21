import React from "react";

interface ToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const ToggleButton = ({ isOpen, onClick }: ToggleButtonProps) => {
  return (
    <button
      id="menu-toggle"
      onClick={onClick}
      className="relative flex flex-col gap-2 p-3 bg-transparent border-none outline-none focus:outline-none active:translate-y-1 w-10 h-10 justify-center items-center"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <span
        className={`block absolute w-8 h-1 rounded bg-gray-500 transition-all duration-500 ease-in-out ${
          isOpen ? "rotate-45 top-4" : "top-2"
        }`}
        style={{
          left: 0,
          transitionProperty: "top, transform, opacity",
          transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
          transitionDuration: "500ms",
        }}
      />
      <span
        className={`block absolute w-8 h-1 rounded bg-gray-500 transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-0" : "top-4"
        }`}
        style={{
          left: 0,
          transitionProperty: "top, transform, opacity",
          transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
          transitionDuration: "500ms",
        }}
      />
      <span
        className={`block absolute w-8 h-1 rounded bg-gray-500 transition-all duration-500 ease-in-out ${
          isOpen ? "-rotate-45 top-4" : "top-6"
        }`}
        style={{
          left: 0,
          transitionProperty: "top, transform, opacity",
          transitionTimingFunction: "cubic-bezier(0.4,0,0.2,1)",
          transitionDuration: "500ms",
        }}
      />
    </button>
  );
};

export default ToggleButton;
