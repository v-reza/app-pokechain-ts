import React, { useEffect, useState } from "react";
import closedChest from "../../dist/assets/closed-chest.png";
import openChest from "../../dist/assets/open-chest.png";
import { Progress } from "flowbite-react";
import { classNames, getArena } from "../../utils/constant";
import useUser from "../../hooks/useUser";
import { useAxios } from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setNotification } from "../../redux/reducer/notificationReducer";
import ClaimedModal from "./ClaimedModal";

type ArenaType = {
  id: string;
  tier: number;
};

type ArenaChallenge = {
  id: string;
  arena_id: string;
  challenge: string;
};

type CompleteArena = {
  id: string;
  arena_challenge_id: string;
  profile_id: string;
  is_claimed: boolean;
};

interface ArenaInterface {
  arena: [ArenaType] & {
    arena_challenge: [ArenaChallenge];
  };
  completeArena: [CompleteArena];
}

const Arena = () => {
  const { currentUser } = useUser();
  const axiosInstance = useAxios();
  const dispatchRedux = useDispatch();
  const [arena, setArena] = useState<ArenaInterface>();
  const [loading, setLoading] = useState<boolean>(true);
  const [claim, setClaim] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [invalidateArena, setInvalidateArena] = useState<boolean>(false);

  useEffect(() => {
    const getArenaData = async (): Promise<void> => {
      try {
        const response = await axiosInstance.get("/arena/tier");
        setArena(response.data);
        setLoading(false);
      } catch (error: any) {
        const { message } = error.response.data;
        dispatchRedux(
          setNotification({
            isNotification: true,
            isSuccess: false,
            message: message,
          })
        );
      }
    };
    getArenaData();
    if (invalidateArena) {
      setInvalidateArena(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invalidateArena]);

  const isCompleteArena = (item: ArenaChallenge) => {
    let isComplete: boolean = false;
    let isClaimed: boolean = false;
    arena!.completeArena.filter((completeArena) => {
      if (completeArena.arena_challenge_id === item.id) {
        isComplete = true;
        isClaimed = completeArena.is_claimed;
      }
      return true;
    });
    return { isComplete, isClaimed };
  };

  const updateLoginReward = async(): Promise<void> => {
    try {
      const response = await axiosInstance.put("/arena/update-login-reward")
      if (response.data) {
        setInvalidateArena(true)
      }
    } catch (error: any) {
      const { message } = error.response.data;
        dispatchRedux(
          setNotification({
            isNotification: true,
            isSuccess: false,
            message: message,
          })
        );
    }
  }

  useEffect(() => {
    updateLoginReward()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <ClaimedModal open={claim} setOpen={setClaim} id={id} setInvalidateArena={setInvalidateArena}/>
      <div className="border border-slate-600 col-span-4 rounded-md shadow-lg">
        <div className="w-full">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-center">
              <span className="text-xl text-slate-600 font-bold py-1">
                Arena
              </span>
            </div>
            <div className="px-4 flex flex-col h-[36rem]  overflow-y-auto">
              {!loading &&
                arena?.arena.arena_challenge.map((item, i) => {
                  const isCompletedArena = isCompleteArena(item);
                  return (
                    <div className="flex items-center justify-between" key={i}>
                      <div className="flex items-center space-x-4">
                        <img
                          src={
                            isCompletedArena.isComplete
                              ? isCompletedArena.isClaimed
                                ? openChest
                                : closedChest
                              : closedChest
                          }
                          width={70}
                          height={70}
                          alt=""
                        />
                        <div className="flex flex-col items-center">
                          <span className="text-slate-600 font-bold">
                            {item.challenge}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (isCompletedArena.isComplete) {
                            if (!isCompletedArena.isClaimed) {
                              setClaim(true);
                              setId(item.id);
                            }
                          } else {
                            return;
                          }
                        }}
                        className={classNames(
                          isCompletedArena.isComplete
                            ? isCompletedArena.isClaimed
                              ? " bg-gray-500 hover:bg-gray-600 cursor-not-allowed"
                              : "bg-amber-500 hover:bg-amber-600 cursor-pointer"
                            : "bg-green-500 hover:bg-green-600 cursor-pointer",
                          "px-6 py-1  rounded-md"
                        )}
                      >
                        <span className="text-sm font-medium text-white">
                          {isCompletedArena.isComplete
                            ? isCompletedArena.isClaimed
                              ? "Claimed"
                              : "Claim"
                            : "Go"}
                        </span>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="h-20 flex items-center justify-between">
          <div className="px-4">Arena 1</div>
          <div className="w-60 px-4 flex flex-col">
            {getArena(currentUser?.profile.tier)!?.required_point_level_up -
              currentUser?.profile.point >
            0 ? (
              <>
                <span className="text-sm">
                  Need{" "}
                  {getArena(currentUser?.profile.tier)!
                    ?.required_point_level_up - currentUser?.profile.point}{" "}
                  points to level up
                </span>
                <Progress
                  progress={
                    currentUser?.profile?.point /
                    getArena(currentUser?.profile.tier)!.value_level
                  }
                />
              </>
            ) : (
              <div className="rounded-lg bg-indigo-500 hover:bg-indigo-600 cursor-pointer p-2 flex items-center justify-center">
                <span className="text-sm font-medium text-white">Level up</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Arena;
