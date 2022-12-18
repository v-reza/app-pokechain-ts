import { useDispatch } from "react-redux";
import { setNotification } from "../redux/reducer/notificationReducer";
const useThrowNotification = () => {
  const dispatch = useDispatch();

  const throwError = (error?: any) => {
    const { message } = error.response.data;
    dispatch(
      setNotification({
        isNotification: true,
        isSuccess: false,
        message,
      })
    );
  };

  const handleError = (message: string) => {
    dispatch(
      setNotification({
        isNotification: true,
        isSuccess: false,
        message,
      })
    );
  };

  return { throwError, handleError };
};

export default useThrowNotification;
