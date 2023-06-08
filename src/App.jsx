import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HostLayout from "./components/HostLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Host from "./pages/Host";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="host" element={<HostLayout />}>
            <Route index element={<Host />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
