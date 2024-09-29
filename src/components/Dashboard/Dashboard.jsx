import { Link, useEffect, useState } from 'react';

const Dashboard = ({ onLogout }) => {
    const [userRole, setUserRole] = useState('');

    const getUserRoleFromToken = () => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.role;
        }
        return '';
    };

    useEffect(() => {
        const role = getUserRoleFromToken();
        setUserRole(role);
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
                    {(userRole === 'ROLE_FARM_MANAGER' || userRole === 'ROLE_FARM_OWNER') && (
                        <Link to="/signup-user">
                            <button>Zarejestruj Użytkownika</button>
                        </Link>
                    )}
                </div>
                <button onClick={onLogout}>Wyloguj</button>
            </nav>

            <div style={{ padding: '20px' }}>
                <h2>Witaj w panelu zarządzania</h2>
            </div>
        </div>
    );
};

export default Dashboard;
