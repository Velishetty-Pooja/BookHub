import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './index.css'; // Ensure this is the correct path

function Header() {
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/', { replace: true });
  };

  return (
    <nav className="nav-h">
      <div>
        <NavLink to="/">
          <img src="https://tse3.mm.bing.net/th/id/OIP.TmQ70MqWMNNhmUq7Url2-gAAAA?pid=Api&P=0&h=180" alt="BookHub Logo" className="logo" />
        </NavLink>
      </div>
      <div className="allLinks">
        <ul className="Links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bookshelf"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Bookshelves
            </NavLink>
          </li>
        </ul>
        <button onClick={onClickLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Header;
