import { Outlet } from "react-router-dom";
import HostHeader from "./HostHeader";
export default function HostLayout() {
  return (
    <>
      <HostHeader />
      <Outlet />
    </>
  );
}
