import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HostLayout from "./pages/HostComponents/HostLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Accommodations from "./pages/HostComponents/Accommodations";
import Profile from "./pages/HostComponents/Profile";
import Bookings from "./pages/HostComponents/Bookings";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Error from "./pages/Error";
import axios from "axios";
import { UserContextProvider } from "./components/UserContext";

axios.defaults.baseURL = "http://127.0.0.1:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="host" element={<HostLayout />}>
            <Route index element={<Profile />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="accommodations" element={<Accommodations />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="resetPassword" element={<ResetPassword />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
