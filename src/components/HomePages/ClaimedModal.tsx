/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getClaimReward } from "constant-pokechain";
import tabBundle from "../../dist/assets/tab-bundle.png";
import { useAxios } from "../../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setNotification } from "../../redux/reducer/notificationReducer";

type ClaimedModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
  setInvalidateArena: (invalidateArena: boolean) => void;
};

interface Reward {
  name: string;
  img: string;
}

type ClaimReward = {
  items: Reward[];
  arenaChallengeId: string;
};


export default function ClaimedModal({ open, setOpen, id, setInvalidateArena }: ClaimedModalProps) {
  const cancelButtonRef = useRef(null);
  const [reward, setReward] = useState<Reward[]>([]);
  const axiosInstance = useAxios();
  const dispatchRedux = useDispatch()

  useEffect(() => {
    if (open) {
      setReward(getClaimReward());
    }
  }, [open]);

  const claimReward = async ({
    items,
    arenaChallengeId,
  }: ClaimReward): Promise<void> => {
    try {
      const data = {
        items,
        arenaChallengeId,
      }

      const response = await axiosInstance.post("/arena/claim-reward", data)
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
  };

  useEffect(() => {
    if (reward.length === 6 && open) {
      claimReward({
        items: reward,
        arenaChallengeId: id,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reward, open])

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100">
                  <img alt="reward" src={tabBundle} className="w-8 h-8" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Your Reward
                  </Dialog.Title>
                  <div className="mt-4">
                    <div className="flex items-center flex-col">
                      <div className="py-10 flex items-center justify-center flex-row flex-wrap space-x-6 ">
                        {reward.map((r, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center justify-center mb-10"
                          >
                            <img
                              key={i}
                              src={r.img}
                              className="w-20 h-20"
                              alt={r.name}
                            />
                            <span className="capitalize text-lg font-bold">
                              {r.name.replace("-", " ")}
                            </span>
                            <span className="text-red-500">Qty 1</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 ">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                    // setReward(getClaimReward());
                  }}
                >
                  Claim
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
