import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PUSH_ROOMS, pushToRoom, roomsFor, type PushRoom } from "@/lib/push";

export function PushBar({
  text,
  url,
  platform,
}: {
  text: string;
  url?: string | null;
  platform?: string;
}) {
  const rooms = platform ? roomsFor(platform) : PUSH_ROOMS;

  async function go(room: PushRoom) {
    await pushToRoom(room, text, url ?? undefined);
    toast.success(`${room.label} is open. Caption is on your clipboard. Paste and publish.`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {rooms.map((room) => (
        <Button
          key={room.id}
          type="button"
          variant={room.id === rooms[0]?.id ? "default" : "outline"}
          onClick={() => void go(room)}
        >
          {room.label}
        </Button>
      ))}
    </div>
  );
}
