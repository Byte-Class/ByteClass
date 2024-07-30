import Navbar from "@/components/navbar";
import SideBar from "@/components/dashboard/sidebar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main>
        <SideBar />

        {/* widgets */}
        <div></div>
      </main>
    </>
  );
}
