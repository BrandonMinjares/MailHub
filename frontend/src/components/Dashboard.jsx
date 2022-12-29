
import SideBar from './SideBar';
import NavBar from './NavBar';
import Emails from './Emails';


/**
 * @return {void}
 */
export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <SideBar />
      <Emails />
    </div>
  );
}
