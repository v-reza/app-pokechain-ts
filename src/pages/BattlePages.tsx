import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ChoosePokemon, {
  DetailPokemon,
  MyPokemon,
  ReadyBattleInterface,
} from "../components/BattlePages/ChoosePokemon";
import useNavbar from "../hooks/useNavbar";
import useRoom from "../hooks/useRoom";
import useSocket from "../hooks/useSocket";
import useUser, { CurrentUserInterface } from "../hooks/useUser";
import { setRoomId } from "../redux/reducer/roomReducer";

type MyRoom = {
  roomId: string;
  socketId: string;
  player: [CurrentUserInterface];
};

const BattlePages = () => {
  const { hideNavbar } = useNavbar();
  const { currentUser } = useUser();
  const { socket } = useSocket();
  const { roomId } = useRoom();
  const dispatchRedux = useDispatch();
  const [myPokemon, setMyPokemon] = useState<MyPokemon[]>();
  const [enemyPokemon, setEnemyPokemon] = useState<MyPokemon[]>();
  useEffect(() => {
    hideNavbar();
  }, []);

  const [isChoosePokemon, setIsChoosePokemon] = useState<boolean>(false);
  const [findOpenRoom, setFindOpenRoom] = useState<boolean>(false);
  const [messageRoom, setMessageRoom] = useState<string>(
    "Please wait find room..."
  );
  useEffect(() => {
    socket?.emit("joinOpenRoom", {
      player: currentUser,
    });

    socket?.on("getMyRoom", (data: MyRoom) => {
      dispatchRedux(
        setRoomId({
          roomId: data.roomId,
        })
      );
      if (data.player.length === 1) {
        setFindOpenRoom(false);
        setTimeout(() => {
          setMessageRoom(
            `Cannot find open room, your room id is ${data.roomId}, please wait for another player....`
          );
        }, 4000);
      } else {
        setFindOpenRoom(true);
      }
    });
    socket?.on("getReadyBattle", (data: ReadyBattleInterface) => {
      console.log("readybattle on pages", data);
      // if (isChoosePokemon) {
      setMyPokemon(
        data.playerPokemon.find(
          (player) => player.userId === currentUser?.userId
        )?.pokemon
      );
      setEnemyPokemon(
        data.playerPokemon.find(
          (player) => player.userId !== currentUser?.userId
        )?.pokemon
      );
      // }
    });
  }, [socket, roomId, isChoosePokemon]);
  console.log(myPokemon);

  return (
    <>
      {!findOpenRoom ? (
        <div className="flex items-center justify-center">
          <div className="mt-40 flex space-x-6">
            <Spinner color="gray" />
            <span className="text-lg font-bold">{messageRoom}</span>
          </div>
        </div>
      ) : !isChoosePokemon ? (
        <ChoosePokemon setChoosePokemon={setIsChoosePokemon} />
      ) : (
        <div
          className="min-h-screen flex bg-gray-900"
          style={{
            backgroundImage: "url('/assets/images/background/astral.jpeg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="w-full">
            <div className="flex items-center justify-center">
              <div>
                <div className="flex flex-col items-center justify-between h-screen">
                  <div className="bg-red-500 w-full h-20">t</div>
                  <div className="bg-red-500 w-full h-20">test</div>
                </div>
              </div>
            </div>
            {/* <div className="flex items-center justify-center mt-5">
              {myPokemon?.map((pokemon: MyPokemon) => (
                <div key={pokemon.id}>
                  <div className="flex bg-red-500">
                    <img
                      src={pokemon.detail_pokemon.front_default_gif}
                      width={100}
                      height={100}
                      alt="mypokemon"
                    />
                  </div>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      )}
      {/* {!isChoosePokemon ? (
        <ChoosePokemon />
      ) : (
        
      )} */}
    </>
  );
};

export default BattlePages;
