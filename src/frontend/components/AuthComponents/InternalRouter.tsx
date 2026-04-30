import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

import { Loading } from "../UtilComponents/Loading.tsx";

export function InternalRouter()
{
    const navigate = useNavigate();
    const hasRun = useRef(false);
    useEffect(() => {
        if(hasRun.current) return;
        hasRun.current = true;

        const pathway = localStorage.getItem("redirectAfterLogin");
        console.log("READ pathway:", pathway);
        localStorage.removeItem("redirectAfterLogin");
        if(!pathway)
        {
            navigate("/", {replace: true});
            return;
        }
        navigate(pathway, {replace: true});
    }, [navigate]);

    return (<Loading />);
}