'use client';

import { useEffect, useState } from "react";

export function CursorDot() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    }

    function handlePointerLeave() {
      setVisible(false);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[55] rounded-full bg-[#1268f4] shadow-[0_0_18px_rgba(18,104,244,0.75),0_0_40px_rgba(18,104,244,0.35)] transition-[opacity,transform] duration-150 ease-out"
      style={{
        width: "10px",
        height: "10px",
        opacity: visible ? 1 : 0,
        transform: `translate3d(${position.x - 5}px, ${position.y - 5}px, 0) scale(${visible ? 1 : 0.5})`,
      }}
    />
  );
}