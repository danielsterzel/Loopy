import { Navbar } from "./Navbar";
import { DashboardCard } from "./DashboardCard";
import { Loopy } from "./Loopy";

export function MainPage() {
  
  return (
    <div>
      <div className="relative flex flex-col justify-center items-center min-h-screen w-full bg-siteBackground px-4 sm:px-6 lg:px-8">
        <Navbar />
        <DashboardCard />
        <Loopy />
      </div>
    </div>
  );
}
