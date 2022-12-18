import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Arena from "../components/HomePages/Arena";
import Play from "../components/HomePages/Play";
import StatsUser from "../components/HomePages/StatsUser";
import useNavbar from "../hooks/useNavbar";
import useRoom from "../hooks/useRoom";
import useSocket from "../hooks/useSocket";
import useUser from "../hooks/useUser";
import { setRoomId } from "../redux/reducer/roomReducer";

const HomePages = () => {
  const { showNavbar } = useNavbar();
  const { socket } = useSocket();
  const { roomId } = useRoom();
  
  const { currentUser } = useUser();
  const dispatchRedux = useDispatch();
  useEffect(() => {
    showNavbar();
  }, []);

  useEffect(() => {
    socket?.on("getUsers", (data: any) => {
      console.log("getUserSocket", data);
    });

    // //remove player from room
    if (roomId) {
      socket?.emit("removePlayerFromRoom", {
        roomId,
        playerId: currentUser?.userId,
      });

      socket?.on("getRemovePlayerRoom", (data: any) => {
        if ((data.roomId = roomId && data.playerId === currentUser?.userId)) {
          dispatchRedux(
            setRoomId({
              roomId: null,
            })
          );
        }
      });
    }
  }, [socket, currentUser?.userId]);
  // console.log("red room",roomId)
  return (
    <main className="max-w-full px-2 sm:px-4 lg:px-8 mx-auto h-screen">
      <div className="mt-8">
        <div className="lg:grid lg:grid-cols-8 lg:gap-8 flex flex-col space-y-8 lg:space-y-0">
          <StatsUser />
          <Play />
          <Arena />
        </div>
      </div>
    </main>
  );
};

export default HomePages;
