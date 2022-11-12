import { Container } from "./styles";
import UsersTable from "../../components/UsersTable";
import Navbar from "../../components/Navbar";
import Aside from "../../components/Aside";

function Dashboard() {
  return (
    <div className="w-full min-h-screen font-sans text-gray-900 bg-primary flex">
      <Aside />
      <main className="bg-background-gray p-6 rounded-l-[25px] min-w-fit w-full">
        <Navbar />
        <div className="flex gap-x-6 py-8">
          <div className="flex w-3/5 flex-col gap-y-8">
            <UsersTable />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;