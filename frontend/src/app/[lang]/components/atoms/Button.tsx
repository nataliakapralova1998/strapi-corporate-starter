"use client";
import React from "react";

export interface ButtonValues {
  id?: string;
  url?: string;
  text: string;
  type: "primary" | "secondary" | "bordered-light";
  newTab?: boolean;
  onClick?: () => void;
  className?: string;
}

export function renderButtonStyle(type: string) {
  switch (type) {
    case "primary":
      return "bg-black/80 text-white hover:bg-black";
    case "secondary":
      return "border border-black text-black bg-white hover:bg-black hover:text-white";
    case "bordered-light":
      return "border-2 border-white text-white hover:bg-white hover:text-black";
    default:
      return "bg-black/80 text-white hover:bg-black";
  }
}

const Button: React.FC<ButtonValues> = ({
  type,
  text,
  onClick,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${renderButtonStyle(
        type
      )} px-3 lg:px-8 py-3 text-sm tracking-widest uppercase rounded-full transition-colors duration-300 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
