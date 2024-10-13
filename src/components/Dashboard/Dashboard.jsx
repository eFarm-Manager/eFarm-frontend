import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';

const Dashboard = ({ onLogout, expireCodeInfo }) => {
    const [userRole, setUserRole] = useState('');
    const [username, setUsername] = useState('');
    const [showExpireCodeInfo, setShowExpireCodeInfo] = useState(!!expireCodeInfo);
    const navigate = useNavigate();

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

    const handleOk = () => {
        setShowExpireCodeInfo(false);
    };

    const handleUpdate = () => {
        navigate('/new-activation-code');
    };

    return (
        <div>
            <Navbar onLogout={onLogout} userRole={userRole} username={username} />
            <div style={{ padding: '20px' }}>
                <h2>Witaj w panelu zarządzania, {username}!</h2>
                {showExpireCodeInfo && expireCodeInfo &&(
                    <div className="notification" style={{ border: '1px solid orange', padding: '10px', marginTop: '20px' }}>
                        <p>{expireCodeInfo}</p>
                        <button onClick={handleOk}>OK</button>
                        <button onClick={handleUpdate}>Aktualizuj</button>
                    </div>
                )}
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    onLogout: PropTypes.func.isRequired,
    expireCodeInfo: PropTypes.string,
};

export default Dashboard;
