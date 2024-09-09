import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  exp: number;
}
export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  const decodedToken: DecodedToken = jwtDecode(token);
  const expirationTime = decodedToken.exp * 1000;
  const currentTime = Date.now();

  return currentTime >= expirationTime;
};
