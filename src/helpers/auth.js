import { clearUser, clearAccessToken } from "./local-storage";

const signOut = () => {
  clearUser();
  clearAccessToken();
};



export { signOut };
