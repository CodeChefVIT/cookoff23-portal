import Navbar from "@/components/Navbar";
import RoundWise from "@/components/roundWise";
import CurrentProfile from "@/components/CurrentProfile";

function Dashboard() {
  return (
    <>
      <main>
        <Navbar />
        <div className="flex">
          <CurrentProfile />
          <RoundWise />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
