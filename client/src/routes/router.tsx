
import { Route, Routes } from "react-router-dom";
import SignUp from "../pages/auth/register/SignUp";
import Dashboard from "../pages/dashboard/Dashboard";
import SignIn from "../pages/auth/signIn/SignIn";

 const AppRouter = () => {
  return (
<Routes>
  <Route index path='/register' element={<SignUp />} />
  <Route index path='/login' element={<SignIn />} />
  <Route index path='/dashboard' element={<Dashboard />} />
</Routes>
  )
}
export default AppRouter

