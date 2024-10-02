import { Link, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCookie } from '../helpers/cookieHelper';

const Dashboard = ({ onLogout }) => {
    const [userRole, setUserRole] = useState('');
    const [username, setUsername] = useState(''); // Dodajemy stan do przechowywania nazwy użytkownika

    useEffect(() => {
        const fetchUserData = async () => {
            const token = getCookie('jwtToken');
            if (token) {
                try {
                    // Wydobycie nazwy użytkownika z tokena
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    setUsername(payload.sub); // Zakładamy, że sub to nazwa użytkownika

                    // Sprawdzanie roli użytkownika na podstawie nazwy użytkownika
                    const response = await fetch(`/api/user/role?username=${payload.sub}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserRole(data.role); // Zakładamy, że API zwraca obiekt z właściwością 'role'
                    } else {
                        console.error('Failed to fetch user role.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        fetchUserData();
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
                    {/* Sprawdzenie, czy użytkownik ma rolę ROLE_FARM_OWNER */}
                    {(userRole === 'ROLE_FARM_MANAGER' || userRole === 'ROLE_FARM_OWNER') && (
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
