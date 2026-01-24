import { cn } from "@/lib/utils";
import type { Message } from "@/types";
import { useMemo } from "react";
import brickTexture from "@/assets/real-brick-wall.jpg";

interface BrickProps {
  message?: Message;
  index: number;
  onClick: () => void;
}

export function Brick({ message, index, onClick }: BrickProps) {
  // Use the real texture for EACH brick
  const bgStyle = useMemo(() => ({
    backgroundImage: `url(${brickTexture})`,
    backgroundSize: "2000%", 
    backgroundPosition: `${(index * 13) % 100}% ${(index * 7) % 100}%`,
  }), [index]);

  const containerClass = cn(
    "relative cursor-pointer transition-all duration-300",
    "hover:brightness-110 hover:shadow-xl hover:z-10",
    "aspect-[2.5/1]", // Classic brick ratio
    "rounded-sm shadow-md",
    "flex items-center justify-center overflow-hidden"
  );

  // If Empty Brick
  if (!message) {
    return (
      <div
        onClick={onClick}
        className={cn(containerClass, "group")}
        style={bgStyle}
      >
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500" />
        <div className="opacity-0 group-hover:opacity-80 transition-opacity duration-300 text-white/90 font-serif text-lg tracking-widest drop-shadow-md">
          + 贴上
        </div>
      </div>
    );
  }

  // Format content: first 9 chars, then asterisk mask
  const displayContent = useMemo(() => {
    if (message.content.length <= 9) return message.content;
    return message.content.substring(0, 9) + "******";
  }, [message.content]);

  // If Occupied Brick
  return (
    <div
      onClick={onClick}
      className={cn(containerClass, "p-2")}
      style={bgStyle}
    >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        {/* Text Written on Wall - Scaled Up */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between select-none p-1">
            {/* Header: To... */}
            <div className="font-handwriting text-[24px] text-[#e0e0e0] line-clamp-1 opacity-90 tracking-wide rotate-[-1deg] leading-none"
                 style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                To {message.to}
            </div>

            {/* Content Preview (Short with Mask) */}
            <div className="font-handwriting text-[20px] text-[#f0f0f0] line-clamp-1 leading-tight opacity-95 pl-1 rotate-[0.5deg]"
                 style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                {displayContent}
            </div>

            {/* Footer: From... */}
            <div className="text-right mt-auto">
                <span className="font-handwriting text-[16px] text-[#d0d0d0] opacity-80 rotate-[-1deg] block leading-none"
                      style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                  By {message.from}
                </span>
            </div>
        </div>
    </div>
  );
}
