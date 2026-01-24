import type { Message } from "@/types";
import { Brick } from "./Brick";
import { cn } from "@/lib/utils";

interface BrickWallProps {
  messages: Message[];
  onBrickClick: () => void;
  onMessageClick: (msg: Message) => void;
}

export function BrickWall({ messages, onBrickClick, onMessageClick }: BrickWallProps) {
  // Ensure we have a LARGE buffer of empty bricks to simulate infinity
  // If user scrolls near bottom, we'd ideally load more, but for now just render A LOT.
  // 500 bricks should feel pretty infinite for an MVP.
  const MIN_BRICKS = 300; 
  const totalSlots = Math.max(messages.length + 50, MIN_BRICKS);

  const slots = Array.from({ length: totalSlots }).map((_, i) => {
    return messages[i] || null;
  });

  return (
    <div className="w-full px-2 md:px-4">
      <div className={cn(
        "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3", 
        "pb-40" // Extra padding at bottom
      )}>
        {slots.map((msg, idx) => (
          <Brick 
            key={msg ? msg.id : `empty-${idx}`} 
            index={idx}
            message={msg || undefined} 
            onClick={() => msg ? onMessageClick(msg) : onBrickClick()}
          />
        ))}
      </div>
    </div>
  );
}
