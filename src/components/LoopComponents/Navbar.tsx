import { useState, useEffect } from "react";
import { useActiveSection } from "../../hooks/UseActiveSection";
import { useAuth } from "../../auth/useAuth";
import { Loading } from "../UtilComponents/Loading";

const HARDEN_MENU_THRESHOLD = 100;


export function Navbar() {

    const {user, loading} = useAuth();

    const [hardenMenu, setHardenMenu] = useState(false);
    
    const active = useActiveSection(["dashboard", "Loopy", "License", "Support"]);

    useEffect(() => {
        const hardenMenu = () => {
        if (window.scrollY > HARDEN_MENU_THRESHOLD) {
            setHardenMenu(true);
            return;
        } else {
            setHardenMenu(false);
        }
        };
        window.addEventListener("scroll", hardenMenu);

        return () => window.removeEventListener("scroll", hardenMenu);
    }, []);

    if (loading) return <Loading />
    return (
    <div
      className={`fixed top-5 z-10
            left-50 box-border py-4 px-4 h-max-[150px] w-fit 
            rounded-xl
            flex justify-center items-center gap-8
            transition-all
            duration-500
            ${hardenMenu ? "bg-cardBackground border border-white/70" : "border border-transparent"}`}
    >
      <div className="text-3xl font-semibold whitespace-nowrap">
        L<i className="fa-solid fa-infinity text-spotifyGreen"></i>py
      </div>
      <ul className="flex gap-12 ">
        <li>
          <a
            href="#dashboard"
            className={`
              ${active === "dashboard" ? "border rounded-xl px-2 py-2" : "0"}`}
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#Loopy"
            className={`${active === "Loopy" ? "border rounded-xl px-2 py-2" : "0"}`}
          >
            Loopy
          </a>
        </li>
        <li>License</li>
        <li>Profile</li>
        <li>Author</li>
        <li>Support</li>
        {user ? (
            <>
            <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-spotifyGreen"/>
                {user.display_name}
            </li>
            <li><button className="">Logout</button></li></>
            ) : (<li><button className="text-sm opacity-70">Login </button></li>)}
        
      </ul>
    </div>
    
  );
}
