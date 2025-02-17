import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  
  return (
    <div>
      <div className="navbar bg-base-100 align-center text-center">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">BrandSports</Link>
        </div>
        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {user?.email ? (
              <>
                <li id="app-title">
                  <NavLink to="/allequip">All Queries</NavLink>
                </li>
                <li id="app-title2">
                  <NavLink to="/myRecommendations">My Recommendations</NavLink>
                </li>
                <li id="app-title2">
                  <NavLink to="/Recommendations_forMe">Recommendations For Me</NavLink>
                </li>
                <li>
                  <NavLink to="/myequip">My Queries</NavLink>
                </li>
              </>
            ) : (
              <li id="app-title">
                <NavLink to="/allequip">Queries</NavLink>
              </li>
            )}
          </ul>
        </div>

        <div className="navbar-end gap-6">
          {user?.email && (
            <div className="text-sm font-semibold">
              <h1>{user.displayName}</h1>
            </div>
          )}

          <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center border border-gray-300">
            {user?.photoURL ? (
              <img 
                referrerPolicy='no-referrer'
                className="w-full h-full object-cover"
                src={user.photoURL}
                alt="User Avatar"
              />
            ) : (
              <FaUserCircle className="w-full h-full text-gray-600" />
            )}
          </div>

          {user?.email ? (
            <button
              onClick={logoutUser}
              className="btn btn-neutral rounded-none"
            >
              Log Out
            </button>
          ) : (
            <Link to="/login" className="btn btn-neutral rounded-none">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
