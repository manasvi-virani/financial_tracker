import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { postHttps } from "../../../utils/api";
import { handleAxiosError } from "../../../utils/handleAxiosError";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../../../component/form/InputField";
import SelectField from "../../../component/form/SelectField";
import { setUserData, } from "../../../reducer/userSlice";
import { useAppDispatch } from "../../../hooks";
import type { IUserInfo, IUserResponse } from "../../../component/auth/authType";
import { Link, useNavigate } from "react-router-dom";
const countries = ["Canada", "United States", "India", "Australia"];
const currencies = ["CAD", "USD", "INR", "AUD"];

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });
  const [message, setMessage] = useState<string>("");

  const onSubmit: SubmitHandler<RegisterFormValues> = async (formData) => {
    try {
      const payload = {
        ...formData,
      };

      const response:IUserResponse = await postHttps("/auth/register", payload);
      dispatch(setUserData(response.user as IUserInfo));
      navigate("/");

    } catch (error: unknown) {
      const errorMessage = handleAxiosError(error);
      setMessage(errorMessage);
    }
  };

  return (
    <div className="max-w-xl m-auto p-6 bg-white rounded-xl shadow-md mt-10 text-left">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      {message && <p className="mb-4 text-center text-red-600">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <div className="w-1/2">
            <InputField
              name="firstname"
              label="First Name"
              placeholder="First Name"
              register={register}
              error={errors.firstname}
              required ={true}
            />
          </div>
          <div className="w-1/2">
            <InputField
              name="lastname"
              label="Last Name"
              placeholder="First Name"
              register={register}
              error={errors.lastname}
              required ={true}
            />
          </div>
        </div>
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
            name="number"
            label="Phone Number"
            placeholder="Phone Number"
            register={register}
            error={errors.number}
            required ={true}
          />
        </div>
        <div>
          <SelectField
            name="country"
            label="Country"
            options={countries}
            register={register}
            error={errors.country}
            required ={true}
            getLabel={(val: string) => val}
          />
        </div>
        <div>
          <SelectField
            name="currency"
            label="Currency"
            options={currencies}
            register={register}
            error={errors.currency}
            required ={true}
            getLabel={(val: string) => val}
          />
        </div>
        <div>
          <InputField
            name="password"
            label="Password"
            type="password"
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
          Sign Up
        </button>
      </form>
      <div className="text-center mt-2"><p>Already Have a account ? <Link className="link"  to={"/login"}>SignIn</Link> </p></div>
    </div>
  );
};
export default SignUp;
