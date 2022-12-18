import { useContext } from "react"
import { SocketContext } from "../contexts/SocketContext"
const useSocket = () => {
  const { state, dispatch } = useContext(SocketContext)
  const { socket } = state
  return { socket, dispatch }
}

export default useSocket