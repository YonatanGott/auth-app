import { useSelector } from 'react-redux';
import {
  Routes, Route,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom"
import { getTokens, selectAuth } from '_store/auth/authSlice';

//Utils functions import

//App views
import AuthView from '_views/AuthView';
import HomeView from '_views/HomeView';


const Router = () => {
  let location = useLocation();
  let token = sessionStorage.getItem("token")

  const ProtectedRoutes = (props: any) => {
    return token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<AuthView />} />
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/home" element={<HomeView></HomeView>} />
      </Route>
    </Routes>
  )
}



export default Router