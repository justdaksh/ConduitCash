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
import { Loading } from "../Loading/Loading";

export const Login = React.memo(function Login() {
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setFirstname = useSetRecoilState(firstnameAtom);
  const setLastname = useSetRecoilState(lastnameAtom);
  const setEmail = useSetRecoilState(emailAtom);
  const setNumber = useSetRecoilState(numberAtom);

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
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
        setLoading(false);
        console.warn("No token received from backend:", response.data);
        navigate("/login");
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
      navigate("/login");
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
  return !isLoading ? (
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
  ) : (
    <Loading />
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
      />
      <div className="space-y-6">
        <SimpleInput
          label="Username"
          id="username"
          placeholder="Enter your username"
          value={username}
          onChange={onChange}
        />
        <Password
          label="Password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={onChange}
        />
      </div>

      <div className="mt-8">
        <SubmitButton title="Log In" />
      </div>
      <FormFooter link="signup" text="Don't have an account?" title="Sign Up" />
    </>
  );
};
