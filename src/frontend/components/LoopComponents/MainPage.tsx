import { Navbar } from "./Navbar.tsx";
import { DashboardCard } from "./DashboardCard.tsx";
import { Loopy } from "../LoopySectionComponents/Loopy.tsx";
import { License } from "./License.tsx";
import { ProfileSection } from "./ProfileSection.tsx";
import { AuthorSection } from "./AuthorSection.tsx";
import { SupportSection } from "./SupportSection.tsx";
import { UsedToolsBar } from "./UsedToolsBar.tsx";

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
