import useTokenStore from "@/store/tokenProvider";
import axios from "axios";

export default async function RefreshToken() {
  try {
    const refresh_token = localStorage.getItem("refresh_token");
    const response = await axios.post(
      "https://api-cookoff-prod.codechefvit.com/auth/refresh",
      {
        refreshToken: refresh_token,
      }
    );

    useTokenStore.setState({
      access_token: response.data.accessToken,
    });
    localStorage.setItem("access_token", response.data.accessToken);
  } catch (error) {
    if (error.response.status === 404 || error.response.status === 400) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      useTokenStore.setState({
        access_token: "",
      });
      router.push("/login");
    }
  }
}
