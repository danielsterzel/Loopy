import { useState } from "react";
import { BASE_URL } from "../../common/APIBase";
import { apiPost } from "../../api/spotifyApi";

export function TestLoop() {
  const [response, setResponse] = useState<any>(null);
  const [endResponse, setEndResponse] = useState<any>(null);

  const startRepeat = async () => {
    try {
      const res = await apiPost<any>(`${BASE_URL}/api/player/repeat/start`, {
        startMs: 125_000,
        endMs: 150_000
      });

      const data = res.json;
      setResponse(data ?? "");
    } finally {}
  };
  const stopRepeat = async () => {
    try{
      const res = await apiPost<any>(`${BASE_URL}/api/player/repeat/end`, {});

      const data = res.json;
      setEndResponse(data ?? "");
    }finally{}

  };

  return (
    <div className="mt-24 flex flex-col gap-4 items-center justify-center">
      <button className=" w-[100px] border border-white" onClick={startRepeat}>
        Start Repeat
      </button>
      {response && <p>Response: {JSON.stringify(response)}</p>}
      <button className="w-[100px] border border-white" onClick={stopRepeat}>
        STOP
      </button>
      {endResponse && <p>END response: {JSON.stringify(endResponse)}</p>}
    </div>
  );
}
