import { useSelector } from "react-redux";

type Room = {
  roomId: string | null
}

const useRoom = () => {
  const { roomId }: Room = useSelector((state: any) => state.room);
  return {
    roomId,
  };
};

export default useRoom;
