import React from "react";
import { Header } from "./Form/Header";
import { Email } from "./Form/Email";
import { Password } from "./Form/Password";
import { RememberMe } from "./Form/RememberMe";
import { SubmitButton } from "./Form/SubmitButton";
import { SimpleInput } from "./Form/SimpleInput";
import { FormFooter } from "./Form/FormFooter";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  emailAtom,
  firstnameAtom,
  lastnameAtom,
  numberAtom,
  passwordAtom,
  usernameAtom,
} from "../state/atom";
import { useRecoilState } from "recoil";

export const SignUp = React.memo(function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [firstname, setFirstname] = useRecoilState(firstnameAtom);
  const [lastname, setLastname] = useRecoilState(lastnameAtom);
  const [email, setEmail] = useRecoilState(emailAtom);
  const [password, setPassword] = useRecoilState(passwordAtom);
  const [number, setNumber] = useRecoilState(numberAtom);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/signup",
        {
          username: username,
          password: password,
          firstname: firstname,
          lastname: lastname,
          number: number,
          email: email,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);

        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;

        navigate("/dashboard");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.error("SignUp Error:", error);
    }
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "username":
        setUsername(value);
        break;
      case "firstname":
        setFirstname(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "number":
        setNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        console.warn(`Unhandled input field: ${id}`);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-lvh bg-gradient-to-br from-gray-700 to-gray-900">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-2xl shadow-black/50 backdrop-blur-sm bg-gray-100/90"
        >
          <SignUpForm
            username={username}
            firstname={firstname}
            lastname={lastname}
            number={number}
            email={email}
            password={password}
            handleChange={handleChange}
          />
        </form>
      </div>
    </>
  );
});

const SignUpForm = ({
  username,
  firstname,
  lastname,
  number,
  email,
  password,
  handleChange,
}) => {
  return (
    <>
      <Header
        title="Sign Up"
        desc="Enter Your Information to create an account"
      />
      <SimpleInput
        label="Username"
        id="username"
        placeholder="Write your username"
        value={username}
        onChange={handleChange}
      />

      <SimpleInput
        label="FirstName"
        id="firstname"
        placeholder="Write your firstname"
        value={firstname}
        onChange={handleChange}
      />

      <SimpleInput
        label="LastName"
        id="lastname"
        placeholder="Write your lastname"
        value={lastname}
        onChange={handleChange}
      />

      <SimpleInput
        label="Mobile Number"
        id="number"
        placeholder="Write your number"
        value={number}
        onChange={handleChange}
      />

      <Email label="Email" id="email" value={email} onChange={handleChange} />

      <Password
        label="Password"
        id="password"
        value={password}
        onChange={handleChange}
      />

      <RememberMe label="Remember Me"/>

      <SubmitButton title="SignUp" />

      <FormFooter text="Already have an account?" title="Login" link="login" />
    </>
  );
};
