// components/Navbar/Navbar.jsx
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ onLogout, userRole }) => {
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
            <div>
                {(userRole === 'MANAGER_OR_OWNER') && (
                    <Link to="/signup-user">
                        <button>Zarejestruj Użytkownika</button>
                    </Link>
                )}
            </div>
            <button onClick={onLogout}>Wyloguj</button>
        </nav>
    );
};

Navbar.propTypes = {
    onLogout: PropTypes.func.isRequired,
    userRole: PropTypes.string.isRequired,
};

export default Navbar;
