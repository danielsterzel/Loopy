import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth.ts";

import { Loading } from "../components/UtilComponents/Loading.tsx";

export function ProtectedRoute()
{
    const location = useLocation();
    const {user, loading }= useAuth();
    if(loading) return (
        <Loading />
    );
    if(!user)
    {
        localStorage.setItem("redirectAfterLogin", location.pathname + location.search);
        console.log("STORED pathway", localStorage.getItem("redirectAfterLogin"));
        return <Navigate to="/login" replace/>;
    }
    
    return <Outlet />;

}