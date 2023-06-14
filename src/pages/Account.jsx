import { useContext } from "react";
import { UserContext } from "../components/UserContext";
import { Navigate } from "react-router-dom";

export default function Account() {
  const { ready, user } = useContext(UserContext);

if (!ready) return "Loading..."

  if (ready && !user) {
    return <Navigate to="login" />;
  }
  return <div>My Account name {user.userName}.</div>;
}
