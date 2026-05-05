import { LoopyIcon } from "./LoopyIcon";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";


type NavButtonProps = {
    click: () => void;
    text: string;
}

function NavbarItem({children} : {children: React.ReactNode})
{
    return(
        <motion.div
          className="relative w-fit"
          initial="initial"
          whileHover="hover"
        >
            {children}

          <motion.div
            variants={{
              initial: { scaleX: 0 },
              hover: { scaleX: 1 },
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="absolute w-full h-px bottom-0 left-0 translate-y-1 bg-buttonBg origin-left"
          />
        </motion.div>
    );
}


function NavigateButton({click, text} : NavButtonProps)
{
    return(
        <button onClick={click} 
        className="bg-buttonBg px-2 py-1 text-white rounded-lg flex items-center justify-center">
                {text}
        </button>
    );
}

export function LoopyPageNavbar() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-fit flex justify-between items-center">
      <LoopyIcon />
      <div className="flex gap-8 items-center text-lg tracking-wide ">
            <NavigateButton click={() => navigate("/")} text="Home Page"/>
            <NavbarItem children={<a href="#liveloop">Live loops</a>}/>
            <NavbarItem children={<a href="#createloop">Create loop</a>}/>
            <NavigateButton click={() => navigate("/profile")} text="Profile" />
      </div>
      <div className="m-4">something here</div>
    </div>
  );
}
