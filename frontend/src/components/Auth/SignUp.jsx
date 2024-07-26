import React from "react";
import { Header } from "../Form/Header";
import { Email } from "../Form/Email";
import { Password } from "../Form/Password";
import { SubmitButton } from "../Form/SubmitButton";
import { SimpleInput } from "../Form/SimpleInput";
import { FormFooter } from "../Form/FormFooter";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  emailAtom,
  firstnameAtom,
  lastnameAtom,
  numberAtom,
  passwordAtom,
  usernameAtom,
} from "../../state/atom";
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
        `${import.meta.env.VITE_API_BASE_URL}auth/signup`,
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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-4xl p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg"
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
    </div>
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
        desc="Enter your information to create an account"
        className="text-center mb-8"
      />
  
      <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
        <div className="flex-1 space-y-4">
          <SimpleInput
            label="Username"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={handleChange}
          />
          <SimpleInput
            label="First Name"
            id="firstname"
            placeholder="Enter your first name"
            value={firstname}
            onChange={handleChange}
          />
          <SimpleInput
            label="Last Name"
            id="lastname"
            placeholder="Enter your last name"
            value={lastname}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 space-y-4">
          <SimpleInput
            label="Mobile Number"
            id="number"
            placeholder="Enter your mobile number"
            value={number}
            onChange={handleChange}
          />
          <Email
            label="Email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleChange}
          />
          <Password
            label="Password"
            id="password"
            placeholder="Create a password"
            value={password}
            onChange={handleChange}
          />
        </div>
      </div>
  
      <SubmitButton 
        title="Sign Up" 
        className="w-full py-3 px-6 text-lg font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out"
      />
  
      <FormFooter link="login" text="Already have an account?" />
    </>
  );
};
