import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';
import ChangePasswordModal from './ChangePasswordModal';
import EditUserModal from './EditUserModal';
import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [userRole, setUserRole] = useState('');
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const roleLabels = {
        'ROLE_FARM_OWNER': 'Właściciel gospodarstwa',
        'ROLE_FARM_MANAGER': 'Manager gospodarstwa',
        'ROLE_FARM_EQUIPMENT_OPERATOR': 'Operator sprzętu',
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/sign-in');
            return;
        }

        const role = user.roles.includes('ROLE_FARM_OWNER')
            ? 'OWNER'
            : user.roles.includes('ROLE_FARM_MANAGER')
                ? 'MANAGER'
                : user.roles.includes('ROLE_FARM_EQUIPMENT_OPERATOR')
                    ? 'OPERATOR'
                    : 'OTHER_ROLE';
        setUserRole(role);

        // Oryginalny kod pobierający listę użytkowników z backendu

        fetch('/api/users/all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));

        // Mockowane dane użytkowników
        /*
        const mockUsers = [
            {
                id: 1,
                username: 'jan_kowalski',
                role: 'ROLE_FARM_MANAGER',
                email: 'jan.kowalski@example.com',
                firstName: 'Jan',
                lastName: 'Kowalski',
                phone: '+48123456789',
                active: true,
            },
            {
                id: 2,
                username: 'anna_nowak',
                role: 'ROLE_FARM_EQUIPMENT_OPERATOR',
                email: 'anna.nowak@example.com',
                firstName: 'Anna',
                lastName: 'Nowak',
                phone: '+48987654321',
                active: false,
            },
        ];
        setUsers(mockUsers);
         */
    }, [navigate, isAuthenticated, user, userRole]);

    const toggleActiveStatus = (userId) => {
        // Oryginalny kod wysyłający żądanie do backendu

        fetch(`/api/users/toggle-active/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    setUsers(prevUsers =>
                        prevUsers.map(user =>
                            user.id === userId ? { ...user, isActive: !user.isActive } : user
                        )
                    );
                } else {
                    const data =  response.json();
                    setErrorMessage(data.message);
                    console.error('Failed to toggle user active status');
                }
            })
            .catch(error => console.error('Error toggling user active status:', error));


        // Mockowanie akcji
        /*
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user.id === userId ? { ...user, active: !user.isActive } : user
            )
        );
         */
    };

    const handleChangePassword = (user) => {
        setSelectedUser(user);
        setShowChangePasswordModal(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowEditUserModal(true);
    };

    const closeModals = () => {
        setShowChangePasswordModal(false);
        setShowEditUserModal(false);
        setSelectedUser(null);
    };

    const closePopup = () => {
        setErrorMessage(null);
    };

    return (
        <div className="user-list-container">
            <h3>Lista Użytkowników</h3>
            <table className="user-list-table">
                <thead>
                <tr>
                    <th className="table-header">Imię</th>
                    <th className="table-header">Nazwisko</th>
                    <th className="table-header">Rola</th>
                    <th className="table-header">Aktywny</th>
                    <th className="table-header">Akcje</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id} className="table-row">
                        <td className="table-cell">{user.firstName}</td>
                        <td className="table-cell">{user.lastName}</td>
                        <td className="table-cell">{roleLabels[user.role] || user.role}</td>
                        <td className="table-cell">{user.isActive ? 'Tak' : 'Nie'}</td>
                        <td className="table-cell">
                            <button className="action-button" onClick={() => toggleActiveStatus(user.id)}>
                                {user.isActive ? 'Dezaktywuj' : 'Aktywuj'}
                            </button>
                            <button className="action-button" onClick={() => handleChangePassword(user)}>
                                Zmień Hasło
                            </button>
                            <button className="action-button" onClick={() => handleEditUser(user)}>
                                Edytuj
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modale do zmiany hasła i edycji użytkownika */}
            {showChangePasswordModal && (
                <ChangePasswordModal user={selectedUser} onClose={closeModals} />
            )}
            {showEditUserModal && (
                <EditUserModal user={selectedUser} onClose={closeModals} />
            )}
            {errorMessage && (
                <div style={{
                    position: 'fixed',
                    top: '20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'red',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px'
                }}>
                    <span>{errorMessage}</span>
                    <button onClick={closePopup} style={{ marginLeft: '10px', color: 'white', background: 'transparent', border: 'none' }}>Zamknij</button>
                </div>
            )}
        </div>
    );
};

export default UserList;
