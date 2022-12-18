/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from "react";
import useThrowNotification from "../../hooks/useThrowNotification";
import { useAxios } from "../../utils/axiosInstance";
import { getPokemonElementType } from "constant-pokechain";
import { Tooltip } from "flowbite-react";
import { classNames } from "../../utils/constant";
import useSocket from "../../hooks/useSocket";
import useUser, { CurrentUserInterface } from "../../hooks/useUser";
import useRoom from "../../hooks/useRoom";

export type DetailPokemon = {
  id: string;
  attack: number;
  back_default_gif: string;
  defense: number;
  element: string;
  front_default: string;
  front_default_gif: string;
  health: number;
  level: number;
  name: string;
};

export type MyPokemon = {
  id: string;
  detail_pokemon: DetailPokemon;
  profile_id: string;
};

type IsReadyBattleUser = {
  userId: string;
};

interface Pokemon {
  my_pokemons: [MyPokemon];
}

interface ChoosePokemonProps {
  setChoosePokemon: (choosePokemon: boolean) => void;
}

export interface ReadyBattleInterface {
  roomId: string;
  socketId: string;
  player: [CurrentUserInterface];
  isReadyBattle: IsReadyBattleUser[];
  playerPokemon: [IsReadyBattleUser & { pokemon: MyPokemon[] }];
}

const ChoosePokemon = ({ setChoosePokemon }: ChoosePokemonProps) => {
  const [listPokemon, setListPokemon] = useState<Pokemon>();
  const [selectedPokemon, setSelectedPokemon] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const axiosInstance = useAxios();
  const { socket } = useSocket();
  const { currentUser } = useUser();
  const { roomId } = useRoom();
  const [isWaitOpponent, setIsWaitOpponent] = useState<boolean>(false);
  const { throwError, handleError } = useThrowNotification();
  useEffect(() => {
    const getBackpackPokemon = async (): Promise<void> => {
      try {
        const response = await axiosInstance.get("/backpack/pokemon");
        setListPokemon(response.data);
        setLoading(false);
      } catch (error: any) {
        throwError(error);
      }
    };
    getBackpackPokemon();
  }, []);

  useEffect(() => {
    socket?.on("getReadyBattle", (data: ReadyBattleInterface) => {
      console.log(data);
      const isWaitOpponent = data.isReadyBattle.some(
        (user) => user.userId === currentUser?.userId
      );
      if (isWaitOpponent) {
        const isReadyBattle = data.isReadyBattle.length === 2;
        if (isReadyBattle) {
          setChoosePokemon(true);
        } else {
          setIsWaitOpponent(true);
        }
      }
    });
  }, [socket]);

  const readyBattle = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    socket?.emit("isReadyBattle", {
      roomId,
      playerId: currentUser?.userId,
      pokemon: selectedPokemon,
    });
  };

  return (
    <div>
      <div className="flex flex-1 items-center justify-center">
        {!isWaitOpponent ? (
          <div className="mt-40 flex flex-col space-y-6">
            <span className="text-2xl font-bold">Choose your 3 Pokemon</span>
            <button
              type="button"
              disabled={selectedPokemon.length !== 3}
              onClick={(e) => readyBattle(e)}
              className={classNames(
                selectedPokemon.length === 3
                  ? " bg-[#3D00B7] hover:bg-[#3d00b7a1] cursor-pointer"
                  : "bg-gray-500 hover:bg-gray-600 cursor-not-allowed",
                "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none"
              )}
            >
              Battle
            </button>
          </div>
        ) : (
          <div>
            <span className="text-2xl font-bold">
              Waiting for opponent to choose pokemon
            </span>
          </div>
        )}
      </div>
      <div className="mt-8 pb-16">
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6
        md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 px-20"
        >
          {!loading &&
            listPokemon?.my_pokemons.map((item) => (
              <li
                key={item.id}
                className="relative"
                onClick={() => {
                  if (selectedPokemon.find((s) => s.id === item.id)) {
                    setSelectedPokemon(
                      selectedPokemon.filter((s) => s.id !== item.id)
                    );
                  } else {
                    if (selectedPokemon.length === 3) {
                      return handleError("You can only choose 3 pokemon");
                    }
                    setSelectedPokemon([...selectedPokemon, item]);
                  }
                }}
              >
                <div className="flex flex-col items-start space-y-2">
                  <div
                    className={classNames(
                      selectedPokemon.includes(item)
                        ? "border-4 border-rose-600  hover:border-rose-500"
                        : "border-slate-600  hover:border-slate-500",
                      "shadow-lg hover:shadow-xl flex flex-col rounded-lg w-full bg-gray-700 border cursor-pointer"
                    )}
                  >
                    <div
                      className={`h-56 w-full bg-opacity-25 rounded-t-lg shadow-lg `}
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(175,219,27,0),${
                          getPokemonElementType(
                            item.detail_pokemon.element.split(",")[0]
                          ).rgba
                        })`,
                      }}
                    >
                      <div className="flex items-center w-full">
                        <div className="px-4 flex items-start justify-start py-2 ">
                          <div className="flex flex-col">
                            <div
                              className={`flex items-center  rounded-md px-2 w-max py-1 space-x-1`}
                            >
                              {item.detail_pokemon.element
                                .split(",")
                                .map((element, index) => {
                                  const elementImage =
                                    getPokemonElementType(element);
                                  return (
                                    <div
                                      key={index}
                                      className="text-sm font-extrabold text-white "
                                    >
                                      <Tooltip
                                        placement="top"
                                        content={
                                          <span className="capitalize">
                                            {element}
                                          </span>
                                        }
                                      >
                                        <img
                                          alt={element}
                                          src={elementImage.img}
                                          width={20}
                                          height={20}
                                          style={{ marginTop: "1px" }}
                                        />
                                      </Tooltip>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                          <img
                            alt="pokemon"
                            src={item.detail_pokemon.front_default}
                            width={100}
                            height={100}
                            placeholder="blur"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-700 rounded-b-lg p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col">
                            <div className="flex items-center space-x-1">
                              <div
                                className={`flex items-center  text-md font-medium capitalize ${
                                  item.detail_pokemon.element.split(",")
                                    .length > 0 &&
                                  "text-transparent bg-clip-text"
                                }`}
                                style={
                                  item.detail_pokemon.element.split(",")
                                    .length === 1
                                    ? {
                                        color: getPokemonElementType(
                                          item.detail_pokemon.element.split(
                                            ","
                                          )[0]
                                        ).hex,
                                      }
                                    : {
                                        backgroundImage: `linear-gradient(to right, ${
                                          getPokemonElementType(
                                            item.detail_pokemon.element.split(
                                              ","
                                            )[0]
                                          ).hex
                                        }, ${
                                          getPokemonElementType(
                                            item.detail_pokemon.element.split(
                                              ","
                                            )[1]
                                          ).hex
                                        })`,
                                      }
                                }
                              >
                                {item.detail_pokemon.name}
                              </div>
                            </div>
                          </div>
                          <span className="text-md font-medium text-white capitalize">
                            Level {item.detail_pokemon.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ChoosePokemon;
