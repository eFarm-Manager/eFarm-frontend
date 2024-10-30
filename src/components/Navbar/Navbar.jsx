import { Link } from 'react-router-dom';
import {useContext, useState} from 'react';
import { AuthContext } from '../../AuthContext.jsx';

const Navbar = ({ userRole, username }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { handleLogout } = useContext(AuthContext);

    const handleUsernameClick = () => {
        setShowDropdown(!showDropdown);
    };
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f8f8f8' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Link to="#">
                    <button>Gospodarstwo</button>
                </Link>
                <Link to="#">
                    <button>Zabiegi</button>
                </Link>
                <Link to="#">
                    <button>Sprzęt</button>
                </Link>
                <Link to="#">
                    <button>Finanse</button>
                </Link>
                <Link to="#">
                    <button>Ewidencja</button>
                </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative' }}>
                {(userRole === 'MANAGER_OR_OWNER') && (
                    <Link to="/signup-user">
                        <button>Zarejestruj Użytkownika</button>
                    </Link>
                )}
                <div style={{ position: 'relative' }}>
          <span onClick={handleUsernameClick} style={{ cursor: 'pointer' }}>
            {username}
          </span>
                    {showDropdown && (
                        <div
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: '100%',
                                backgroundColor: 'white',
                                border: '1px solid #ccc',
                                zIndex: 1,
                            }}
                        >
                            {(userRole === 'OWNER' || userRole === 'MANAGER') && (
                                <Link to="/farm-details" onClick={() => setShowDropdown(false)}>
                                    <div style={{ padding: '10px' }}>Farm Details</div>
                                </Link>
                            )}
                            <Link to="/change-password" onClick={() => setShowDropdown(false)}>
                                <div style={{ padding: '10px' }}>Change Password</div>
                            </Link>
                            {userRole === 'OWNER' && (
                                <Link to="/new-activation-code" onClick={() => setShowDropdown(false)}>
                                    <div style={{ padding: '10px' }}>New Activation Code</div>
                                </Link>
                            )}
                        </div>
                    )}
                </div>
                <button onClick={handleLogout}>Wyloguj</button>
            </div>
        </nav>
    );
};

export default Navbar;
