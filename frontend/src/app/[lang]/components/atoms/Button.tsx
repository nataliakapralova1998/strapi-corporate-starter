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
      return "bg-primary/80 hover:bg-primary text-white";
    case "secondary":
      return "border-2 border-primary text-primary";
    case "bordered-light":
      return "border-2 border-white text-white";
    default:
      return "bg-primary/80 hover:bg-primary text-white";
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
      )} px-8 py-3 text-lg font-semibold rounded w-full ${className} `}
    >
      {text}
    </button>
  );
};

export default Button;
