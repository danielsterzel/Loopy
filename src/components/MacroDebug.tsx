import { useEffect, useState } from "react";
import type { Macro } from "../types/Macro";

export function MacroDebug()
{
    const [macros, setMacros] = useState<Macro[]>([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8080/api/macros",{
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {console.log("MACROS: ", data); setMacros(data);});
    }, []);

    return <pre>{JSON.stringify(macros, null)}</pre>
}