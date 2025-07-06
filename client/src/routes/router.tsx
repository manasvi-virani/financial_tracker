// routes/AppRouter.tsx
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "../pages/auth/register/SignUp";
import SignIn from "../pages/auth/signIn/SignIn";
import Dashboard from "../pages/dashboard/Dashboard";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Transaction from "../pages/transaction/Transaction";
import Accounts from "../pages/accounts/Accounts";
import { useDispatch } from "react-redux";
import { getLocalStorage } from "../utils/localStorage";
import { setUserData } from "../reducer/userSlice";
import type { IUserInfo } from "../component/auth/authType";
// import Setting from "../pages/setting/Setting";

const AppRouter: React.FC = () => {
  const dispatch =  useDispatch()
   
  useEffect(() => {
    const user = getLocalStorage<IUserInfo>("user");
    if(user) dispatch(setUserData(user))

  }, [])
  
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/register"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        }
      />

      {/* Protected Route */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transaction />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accounts"
        element={
          <ProtectedRoute>
            <Accounts />
          </ProtectedRoute>
        }
      />
      {/* <Route
        path="/setting"
        element={
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
};

export default AppRouter;
