import { Link, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
//import { getCookie } from '../helpers/cookieHelper';

const Dashboard = ({ onLogout }) => {
    const [userRole, setUserRole] = useState('');
    const [username, setUsername] = useState(''); // Dodajemy stan do przechowywania nazwy użytkownika

    useEffect(() => {
        const storedRoles = sessionStorage.getItem('roles');
        const username = sessionStorage.getItem('username');

        setUsername(username);

        if (storedRoles) {
            const roles = JSON.parse(storedRoles);
            if (roles.includes('ROLE_FARM_MANAGER') || roles.includes('ROLE_FARM_OWNER')) {
                setUserRole('MANAGER_OR_OWNER');
            } else {
                setUserRole('OTHER_ROLE');
            }
        }
    }, []);


    return (
        <div>
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

            <div style={{ padding: '20px' }}>
                <h2>Witaj w panelu zarządzania, {username}!</h2>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default Dashboard;
