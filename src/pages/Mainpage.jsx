import { Link, useNavigate, Outlet } from 'react-router-dom';
import UserGreeting from '../comps/UserGreeting';
import { useState } from 'react';
import '../styles/Navigation.css';

const Mainpage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem('user') || '{}');
  const permissions = userData.permissions || {};

  // Check if user has any view permissions
  const hasAnyViewPermission = permissions.viewMovies || permissions.viewSubscriptions;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <nav className="nav-container">
        <div className="nav-content">
          <UserGreeting />

          <div className="nav-links">
            {hasAnyViewPermission && (
              <h1 className="nav-title">
                <Link to="/main_page/" className="nav-link">
                  Movies & Subscriptions
                </Link>
              </h1>
            )}
            {permissions.viewMovies && (
              <Link to="movies" className="nav-link">
                Movies
              </Link>
            )}
            {permissions.viewSubscriptions && (
              <Link to="subscription" className="nav-link">
                Subscriptions
              </Link>
            )}
            <Link to="user-managemant" className="nav-link">
              User Management
            </Link>
          </div>

          <button
            onClick={() => navigate('/')}
            className="logout-button"
          >
            Log Out
          </button>

          <button
            className="mobile-menu-button"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <i className={`fas fa-${isMobileMenuOpen ? 'times' : 'bars'}`}></i>
          </button>
        </div>

        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          {hasAnyViewPermission && (
            <Link to="/main_page/" className="nav-link" onClick={toggleMobileMenu}>
              Movies & Subscriptions
            </Link>
          )}
          {permissions.viewMovies && (
            <Link to="movies" className="nav-link" onClick={toggleMobileMenu}>
              Movies
            </Link>
          )}
          {permissions.viewSubscriptions && (
            <Link to="subscription" className="nav-link" onClick={toggleMobileMenu}>
              Subscriptions
            </Link>
          )}
          <Link to="user-managemant" className="nav-link" onClick={toggleMobileMenu}>
            User Management
          </Link>
        </div>
      </nav>

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Mainpage;



