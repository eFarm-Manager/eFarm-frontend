import { useEffect, useState, useContext } from 'react';
import {useNavigate} from "react-router-dom";
import PropTypes from 'prop-types';
import Navbar from '../Navbar/Navbar';
import { AuthContext } from '../../AuthContext.jsx';

const Dashboard = () => {
    const { isAuthenticated, userRoles, expireCodeInfo, handleLogout, username, } = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(() => {
        const username = sessionStorage.getItem('username');

        if (!username || !isAuthenticated) {
            navigate('/sign-in');
            return;
        }
    }, [navigate, isAuthenticated, userRoles]);

    const userRole = userRoles.includes('ROLE_FARM_OWNER')
        ? 'OWNER'
        : userRoles.includes('ROLE_FARM_MANAGER')
            ? 'MANAGER'
            : userRoles.includes('ROLE_FARM_EQUIPMENT_OPERATOR')
                ? 'OPERATOR'
                : 'OTHER_ROLE';

    const showExpireCodeInfo = expireCodeInfo !== null && expireCodeInfo !== undefined;
    return (
        <div>
            <Navbar userRole={userRole} username={username} onLogout={handleLogout} />
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

export default Dashboard;
