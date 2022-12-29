
import SideBar from './SideBar';
import NavBar from './NavBar';
import Emails from './Emails';
import '../styles.css';

/**
 * @return {void}
 */
export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <div className='test'>
        <SideBar />
        <Emails />
      </div>
    </div>
  );
}
