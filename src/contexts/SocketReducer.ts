import { stat } from "fs";

type SocketContextType = {
  socket: any;
};

type SocketAction = {
  type: string;
  payload?: SocketContextType;
};

export const SocketReducer = (
  state: SocketContextType,
  action: SocketAction
): SocketContextType => {
  switch (action.type) {
    case "SOCKET":
      return {
        ...state,
        socket: action.payload!.socket,
      };
    default:
      return state
  }
};
