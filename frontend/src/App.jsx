import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Dashboard } from "./components/DashBoard/Dashboard";
import { Login } from "./components/Auth/Login";
import { SignUp } from "./components/Auth/SignUp";
import { SendMoney } from "./components/Money/SendMoney";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
