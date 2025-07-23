"use client";
import { useEffect } from "react";
import AvatarSVG from "../atoms/illustrations/AvatarSVG";

export default function AvatarHero() {
  useEffect(() => {
    const moveEye = (id: string, e: MouseEvent) => {
      const eye = document.getElementById(id);
      if (!eye) return;

      const rect = eye.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
      const x = Math.cos(angle) * 3;
      const y = Math.sin(angle) * 3;

      eye.setAttribute("transform", `translate(${x}, ${y})`);
    };

    const onMouseMove = (e: MouseEvent) => {
      moveEye("eyeLeft", e);
      moveEye("eyeRight", e);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div className="w-full h-screen flex items-end justify-center bg-sky-100">
      <AvatarSVG  />
    </div>
  );
}
