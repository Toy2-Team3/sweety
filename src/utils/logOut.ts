import { useNavigate } from 'react-router-dom';

export const logOut = async (setLogin: React.Dispatch<React.SetStateAction<boolean>>, navigate: ReturnType<typeof useNavigate>) => {
  setLogin(false);
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("isLogin");
  sessionStorage.removeItem("id");
  navigate("/");
};
