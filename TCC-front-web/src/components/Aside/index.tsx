import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import User from "../../assets/icons/User.png";
import Notification from "../../assets/icons/Notification.png";
import Blood from "../../assets/icons/Blood.png";
import { Container } from "./styles";
import Logout from "../../assets/icons/logout.png";

function Aside() {
  return (
    <Container>
      <aside className="py-6 px-10 w-60 bg-primary">
        <div className="bg-white p-5 rounded-md">
          <img src={Logo} alt="" className="w-36" />
        </div>
        <ul className="flex flex-col gap-y-6 pt-10">
          <li>
            <Link
              to="/"
              className="flex gap-x-4 items-center py-2 text-white hover:text-gray-200 group"
            >
              <span className="absolute w-1.5 h-8 bg-[#01f0C8] rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"></span>
              <img src={User} className="logo" />
              <span className="title">Usuários</span>
            </Link>
          </li>
          <li>
            <Link
              to="/donations"
              className="flex gap-x-4 items-center py-2 text-white hover:text-gray-200 group"
            >
              <span className="absolute w-1.5 h-8 bg-[#01f0C8] rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"></span>
              <img src={Blood} className="logo" />
              <span className="title">Doações</span>
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className="flex gap-x-4 items-center py-2 text-white hover:text-gray-200 group"
            >
              <span className="absolute w-1.5 h-8 bg-[#01f0C8] rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"></span>
              <img src={Notification} className="logo" />
              <span className="title">Notificações</span>
            </Link>
          </li>

        </ul>
        <ul className="flex flex-col gap-y-6 pt-96">

          <li>
            <Link
              to="#"
              className="flex gap-x-4 items-center py-2 text-white font-semibold hover:text-gray-200 group"
            >
              <span className="absolute w-1.5 h-8 bg-[#f00101] rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"></span>
              <img src={Logout} className="logo" />
              <span className="title">Sair</span>
            </Link>
          </li>
        </ul>
      </aside>
    </Container>
  );
}
export default Aside;