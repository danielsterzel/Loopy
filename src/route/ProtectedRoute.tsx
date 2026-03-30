import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

import { Loading } from "../components/UtilComponents/Loading";

export function ProtectedRoute()
{
    const {user, loading }= useAuth();
    if(loading) return (
        <Loading />
    );
    
    return user ? <Outlet /> : <Navigate to="/login" />

}