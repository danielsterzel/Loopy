import { useState } from "react";
import { BASE_URL } from "../../common/APIBase"


export function TestLoop()
{

    const [response, setResponse] = useState(null);
    const [endResponse, setEndResponse] = useState(null);
    
    const startRepeat = async() => {
        const res = await fetch(`${BASE_URL}/api/player/repeat/start`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({startMs: 125_000, endMs: 150_000}),
            credentials: "include"
        });
        const data = await res.json();
        setResponse(data);
    };
    const stopRepeat = async() => {
        const res = await fetch(`${BASE_URL}/api/player/repeat/end`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include"
            }
        );
        
        const data = await res.json();
        setEndResponse(data);
    }


    return (
        <div className="mt-24 flex flex-col gap-4 items-center justify-center">
            <button className=" w-[100px] border border-white" onClick={startRepeat}>Start Repeat</button>
            {response && <p>Response: {JSON.stringify(response)}</p>}
            <button className="w-[100px] border border-white" onClick={stopRepeat}>STOP</button>
            {endResponse && <p>END response: {JSON.stringify(endResponse)}</p>}

        </div>
    )
}