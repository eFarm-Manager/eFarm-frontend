import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Navbar = ({ onLogout, userRole, username }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleUsernameClick = () => {
        setShowDropdown(!showDropdown);
    };
    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f8f8f8' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <Link to="/dashboard">
                    <button>Gospodarstwo</button>
                </Link>
                <Link to="#">
                    <button>Zabiegi</button>
                </Link>
                <Link to="/equipment">
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
                {(userRole === 'OWNER' || userRole === 'MANAGER') && (
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
                            <Link to="/farm-details" onClick={() => setShowDropdown(false)}>
                                <div style={{ padding: '10px' }}>Farm Details</div>
                            </Link>
                            <Link to="/change-password" onClick={() => setShowDropdown(false)}>
                                <div style={{ padding: '10px' }}>Change Password</div>
                            </Link>
                            <Link to="/new-activation-code" onClick={() => setShowDropdown(false)}>
                                <div style={{ padding: '10px' }}>New Activation Code</div>
                            </Link>
                        </div>
                    )}
                </div>
                <button onClick={onLogout}>Wyloguj</button>
            </div>
        </nav>
    );
};

Navbar.propTypes = {
    onLogout: PropTypes.func.isRequired,
    userRole: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
};

export default Navbar;
