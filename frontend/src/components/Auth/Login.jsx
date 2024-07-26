import React from "react";
import axios from "axios"; 
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { firstnameAtom, lastnameAtom, passwordAtom,usernameAtom } from "../../state/atom";
import { Header } from "../Form/Header";
import { SimpleInput } from "../Form/SimpleInput";
import { Password } from "../Form/Password";
import { RememberMe } from "../Form/RememberMe";
import { SubmitButton } from "../Form/SubmitButton";
import { FormFooter } from "../Form/FormFooter";

export const Login = React.memo(function Login() {
    const [username,setUsername] = useRecoilState(usernameAtom);
    const [password,setPassword] = useRecoilState(passwordAtom);
    const setFirstname = useSetRecoilState(firstnameAtom);
    const setLastname = useSetRecoilState(lastnameAtom);

    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/v1/auth/login",{
                username: username,
                password: password
            })
            if (response.data.token) {
                localStorage.setItem("token", `Bearer ${response.data.token}`);
                axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
                setFirstname(response.data.firstname);
                setLastname(response.data.lastname);
                navigate("/dashboard");
            } else {
                console.error("No token received from backend:", response.data);
            }
        } catch (error) {
            console.error("Login Error:", error.response ? error.response.data : error.message);
        }
    }

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
    }
  return (
    <>
      <div className="flex justify-center items-center h-lvh bg-gradient-to-br from-gray-700 to-gray-900">
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-sm bg-gray-100/90">
          <LoginForm onChange={handleChange}/>
        </form>
      </div>
    </>
  );
});

const LoginForm = ({onChange}) => {
    const username = useRecoilValue(usernameAtom);
    const password = useRecoilValue(passwordAtom);
  return (
    <>
      <Header
        title="Log In"
        desc="Enter Your credentials to access your account"
      />

      <SimpleInput label="Username" id="username" placeholder="Write your username" value={username} onChange={onChange}/>

      <Password label="Password" id="password" value={password} onChange={onChange} />

      <RememberMe label="Remember Me" />

      <SubmitButton title="Log In" />

      <FormFooter text="Don't have an account?" title="Sign Up" link="signup" />
    </>
  );
};
