// Import Link (react-router-dom not reg browser to handle rendering; will render as <a></a> tag)
import { Link } from 'react-router-dom';
import { logOut } from '../utilities/users-service';

function NavBar({ user, setUser }) {
  const handleLogOut = () => {
    logOut();
    setUser(null);
  };
  return (
    <nav>
      <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>
      <h4> Welcome, {user.name}! </h4>
      <Link to="" onClick={handleLogOut}>
        Logout
      </Link>
    </nav>
  );
}

export default NavBar;
