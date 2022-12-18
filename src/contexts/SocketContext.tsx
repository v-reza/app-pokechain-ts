import { io } from "socket.io-client";
import { createContext, useEffect, useReducer } from "react";
import { SocketReducer } from "./SocketReducer";
import useUser from "../hooks/useUser";
import useAuth from "../hooks/useAuth";

type SocketContextType = {
  socket: any;
};

type SocketContextValue = {
  state: SocketContextType;
  dispatch: React.Dispatch<any>;
};

type SocketContextProps = {
  children: React.ReactNode;
};

const initialState = {
  socket: null,
};
export const SocketContext = createContext<SocketContextValue>({
  state: initialState,
  dispatch: (action) => action,
});

export const SocketContextProvider = ({ children }: SocketContextProps) => {
  const [state, dispatch] = useReducer(SocketReducer, initialState)
  const { currentUser } = useUser()
  const { isAuthenticated } = useAuth()
  const BASE_DOMAIN = "http://localhost:3000";

  const socketIsAuthenticated = async (socket: any): Promise<void> => {
    await socket.emit("addUser", {
      userId: currentUser?.userId,
      domain: BASE_DOMAIN,
    })
  }

  useEffect(() => {
    const serverSocket = "http://localhost:5001";
    const socket = io(serverSocket)
    socket.connect()
    dispatch({
      type: "SOCKET",
      payload: {
        socket
      }
    })

    if (isAuthenticated) {
      socket.emit("addUser", {
        userId: currentUser?.userId,
        domain: BASE_DOMAIN,
      })
    }

    return () => {
      socket.disconnect()
    }
  }, [isAuthenticated, currentUser?.userId, BASE_DOMAIN])


  return (
    <SocketContext.Provider value={{ state, dispatch }}>
      {children}
    </SocketContext.Provider>
  )
};
