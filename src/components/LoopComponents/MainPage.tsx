import { Navbar } from "./Navbar";
import { DashboardCard } from "./DashboardCard";
import { Loopy } from "../LoopySectionComponents/Loopy";
import { License } from "./License";
import { ProfileSection } from "./ProfileSection";
import { AuthorSection } from "./AuthorSection";
import { SupportSection } from "./SupportSection";
import { UsedToolsBar } from "./UsedToolsBar";

export function MainPage() {
  
  return (
    <div>
      <div className="relative flex flex-col justify-center gap-12 items-center min-h-screen w-full bg-siteBackground px-4 sm:px-6 lg:px-8">
        <Navbar />
        <DashboardCard />
        <Loopy />
        <UsedToolsBar/>
        <ProfileSection />
        <SupportSection />
        <AuthorSection />
        <License />
      </div>
    </div>
  );
}
