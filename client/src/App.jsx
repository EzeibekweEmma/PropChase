import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HostLayout from "./pages/HostComponents/HostLayout";
import Home from "./pages/Home";
import Properties from "./pages/Properties/Properties";
import HostProperties from "./pages/HostComponents/Properties";
import Profile from "./pages/HostComponents/Profile";
import Bookings from "./pages/HostComponents/Bookings";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Error from "./pages/Error";
import axios from "axios";
import { UserContextProvider } from "./components/UserContext";
import AddNewProperty from "./pages/HostComponents/AddNewProperty";
import EditProfile from "./pages/HostComponents/EditProfile";
import PropertyID from "./pages/Properties/PropertyID";
import BookingID from "./pages/HostComponents/BookingID";
import About from "./pages/About";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyID />} />
          <Route path="host" element={<HostLayout />}>
            <Route index element={<Profile />} />
            <Route path="editProfile" element={<EditProfile />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="bookings/:id" element={<BookingID />} />
            <Route path="properties" element={<HostProperties />} />
            <Route path="properties/new" element={<AddNewProperty />} />
            <Route path="properties/:id" element={<AddNewProperty />} />
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
