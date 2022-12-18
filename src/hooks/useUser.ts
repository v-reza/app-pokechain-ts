import { useSelector } from "react-redux";

type ProfileUser = {
  id: string;
  balance: number;
  full_name: string | null;
  increment_id: number;
  level: number;
  picture: string | null;
  point: number;
  tier: number;
  token: string;
};

export interface CurrentUserInterface {
  userId: string;
  username: string;
  email: string;
  profile: ProfileUser;
  refresh_token: string
}
const useUser = () => {
  const { currentUser }: { currentUser: CurrentUserInterface } = useSelector(
    (state: any) => state.user
  );
  return { currentUser };
};

export default useUser;
