import { useDispatch, useSelector } from "react-redux";
import { setNavbarAct } from "../redux/reducer/navbarReducer";

const useNavbar = () => {
  const { isHidden } = useSelector((state: any) => state.navbar);
  const dispatch = useDispatch();
  const showNavbar = () => {
    dispatch(setNavbarAct({ isHidden: false }));
  };

  const hideNavbar = () => {
    dispatch(setNavbarAct({ isHidden: true }));
  }

  return { isHidden, showNavbar, hideNavbar };
};

export default useNavbar;
