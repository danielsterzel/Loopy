import { useState, useEffect} from "react";
import { useActiveSectionGlobal } from "../../hooks/UseActiveSectionGlobal";
import { useAuth } from "../../auth/useAuth";
import { Loading } from "../UtilComponents/Loading";

const HARDEN_MENU_THRESHOLD = 100;

export function Navbar() {
  const { user, loading } = useAuth();

  const [hardenMenu, setHardenMenu] = useState(false);

  const active = useActiveSectionGlobal([
    "dashboard",
    "loopy",
    "profile",
    "support",
    "author",
    "license",
  ]);

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

  if (loading) return <Loading />;
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
              ${active === "dashboard" ? "border rounded-xl p-2" : "0"}`}
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#loopy"
            className={`${active === "loopy" ? "border rounded-xl p-2" : ""}`}
          >
            Loopy
          </a>
        </li>

        <li>
          <a
            href="#profile"
            className={`${active === "profile" ? "border rounded-xl p-2" : ""}`}
          >
            Profile
          </a>
        </li>
          <li>
          <a
            href="#support"
            className={`${active} === "support" ? "border rounded-xl p-2" : ""`}
          >
            Support
          </a>
        </li>
        <li>
          <a
            href="#author"
            className={`${active === "author" ? "border rounded-xl p-2" : ""}`}
          >
            Author
          </a>
        </li>

        <li>
          <a
            href="#license"
            className={`${active === "license" ? "border rounded-xl px-2 py-2" : "0"}`}
          >
            License
          </a>
        </li>
        {user ? (
          <>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-spotifyGreen" />
              {user.display_name}
            </li>
            <li>
              <button className="">Logout</button>
            </li>
          </>
        ) : (
          <li>
            <button className="text-sm opacity-70">Login </button>
          </li>
        )}
      </ul>
    </div>
  );
}
