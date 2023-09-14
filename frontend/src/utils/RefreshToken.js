import useTokenStore from "@/store/tokenProvider";
import axios from "axios";

export default function RefreshToken() {
    const refresh_token = localStorage.getItem("refresh_token");
  
    return axios
      .post("http://localhost:8080/auth/refresh", {
        refreshToken: refresh_token,
      })
      .then((response) => {
        useTokenStore.setState({
          access_token: response.data.accessToken,
        });
        localStorage.setItem("access_token", response.data.accessToken);
        console.log("Token refreshed");
      })
      .catch((error) => {
        console.error("Token refresh failed:", error);
      });
  }
  
