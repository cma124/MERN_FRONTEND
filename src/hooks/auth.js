import { useEffect } from "react";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { auth } from "../shared/auth.state";
const currentUserData = atom({
  key: "currentUser",
  default: null,
});
export const useAuth = () => {
  const isAuth = useRecoilValue(auth);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserData);
  
  useEffect(() => {
    localStorage.getItem("user")
      ? setCurrentUser(JSON.parse(localStorage.getItem("user")))
      : setCurrentUser(null);
  }, [isAuth]);
  return currentUser;
};
