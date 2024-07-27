import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  emailAtom,
  firstnameAtom,
  lastnameAtom,
  numberAtom,
  passwordAtom,
  usernameAtom,
} from "../../state/atom";
import { Header } from "../Form/Header";
import { SimpleInput } from "../Form/SimpleInput";
import { Password } from "../Form/Password";
import { SubmitButton } from "../Form/SubmitButton";
import { FormFooter } from "../Form/FormFooter";

export const Login = React.memo(function Login() {
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [error, setError] = useState("");

  const setFirstname = useSetRecoilState(firstnameAtom);
  const setLastname = useSetRecoilState(lastnameAtom);
  const setEmail = useSetRecoilState(emailAtom);
  const setNumber = useSetRecoilState(numberAtom);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}auth/login`,
        {
          username: username,
          password: password,
        }
      );
      if (response.data.token) {
        localStorage.setItem("token", `Bearer ${response.data.token}`);
        setFirstname(`${response.data.firstname}`);
        setLastname(`${response.data.lastname}`);
        setEmail(`${response.data.email}`);
        setNumber(`${response.data.number}`);
        navigate("/dashboard");
      } else {
        console.warn("No token received from backend:", response.data);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        console.warn(`Unhandled input change for id: ${id}`);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg"
        >
          <LoginForm onChange={handleChange} />
          {error && (
            <div className="text-red-500 text-sm text-center mt-3">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
});

const LoginForm = ({ onChange }) => {
  const username = useRecoilValue(usernameAtom);
  const password = useRecoilValue(passwordAtom);
  return (
    <>
      <Header
        title="Log In"
        desc="Enter your credentials to access your account"
        className="text-center mb-8"
      />
      <div className="space-y-6">
        <SimpleInput
          label="Username"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={onChange}
          className="w-full"
        />
        <Password
          label="Password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={onChange}
          className="w-full"
        />
      </div>

      <div className="mt-8">
        <SubmitButton
          title="Log In"
          className="w-full py-3 px-6 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out"
        />
      </div>
      <FormFooter link="signup" text="Don't have an account?" />
    </>
  );
};
