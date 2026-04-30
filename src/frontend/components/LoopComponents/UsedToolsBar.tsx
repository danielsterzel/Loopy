import reactIcon from "../../assets/react-svgrepo-com.svg";
import springIcon from "../../assets/spring-icon-svgrepo-com.svg";
import postgresqlIcon from "../../assets/postgresql-logo-svgrepo-com.svg";
import spotifyIcon from "../../assets/Primary_Logo_Green_RGB.svg";

export function UsedToolsBar() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1 className="mb-4 text-4xl underline">Developed thanks to:</h1>
      <div className="flex space-around gap-8 ">
        <div className="flex flex-col gap-4 items-center justify-center  rounded-xl w-32 aspect-square">
          <img src={reactIcon} className="w-[50%]" />
          <p>React</p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center rounded-xl w-32 aspect-square">
          <img src={springIcon} className="w-[50%]" />
          <p>Java Spring</p>
        </div>
        <div className="flex flex-col gap-4 items-center justify-center  rounded-xl w-32 aspect-square">
          <img src={postgresqlIcon} className="w-[50%]" />
          <p>PostgreSQL</p>
        </div>
        <div className="flex flex-col gap-4 w-fit items-center justify-center  rounded-xl w-32 aspect-square">
            <img src={spotifyIcon} className="w-[50%]" />
          <p>Spotify Web API</p>
        </div>
      </div>
    </div>
  );
}
