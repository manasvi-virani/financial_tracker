import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { postHttps } from "../../../utils/api";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import {
  loginSchema,
  type LoginFormValues,
} from "../../../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../component/form/InputField";
import { setUserData, } from "../../../reducer/userSlice";
import { useAppDispatch } from "../../../hooks";
import type { IUserInfo, IUserResponse } from "../../../component/auth/authType";
import { Link, useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const [message, setMessage] = useState<string>("");

  const onSubmit: SubmitHandler<LoginFormValues> = async (formData) => {
    console.log("Form Data:", formData);
    try {
      const payload = {
        ...formData,
      };

      const response:IUserResponse = await postHttps("/auth/login", payload);
      dispatch(setUserData(response.user as IUserInfo));
      console.log('response', response)
      localStorage.setItem("token", response.user.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");

    } catch (error: unknown) {
      const errorMessage = handleAxiosError(error);
      setMessage(errorMessage);
    }
  };

  return (
    <div className="max-w-xl m-auto p-6 bg-white rounded-xl shadow-md mt-10 text-left">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      {message && <p className="mb-4 text-center text-red-600">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <InputField
            name="email"
            label="Email"
            placeholder="Email"
            register={register}
            error={errors.email}
            required ={true}
          />
        </div>
        <div>
          <InputField
            name="password"
            label="Password"
            // type="password"
            placeholder="Password"
            register={register}
            error={errors.password}
            required ={true}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Login
        </button>
      </form>
      <div className="text-center mt-2"><p>To join Expense Tracker ? <Link className="link"  to={"/register"}>Sign Up</Link> </p></div>
    </div>
  );
};
export default SignIn;
