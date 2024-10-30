import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRoles, setUserRoles] = useState([]);
    const [username, setUsername] = useState('');
    const [expireCodeInfo, setExpireCodeInfo] = useState(null);

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        const roles = sessionStorage.getItem('roles');
        if (username && roles) {
            setIsAuthenticated(true);
            setUserRoles(JSON.parse(roles));
            setUsername(username);
        }
    }, []);

    const handleLogin = (expireCodeInfoFromLogin) => {
        setIsAuthenticated(true);
        const roles = sessionStorage.getItem('roles');
        const username = sessionStorage.getItem('username');
        if (roles) {
            setUserRoles(JSON.parse(roles));
        }
        if (username) {
            setUsername(username);
        }
        setExpireCodeInfo(expireCodeInfoFromLogin);
    };

    const handleExpireCodeInfoUpdate = (newExpireCodeInfo) => {
        setExpireCodeInfo(newExpireCodeInfo);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                console.log('Logged out from backend');
            } else {
                console.error('Failed to log out from backend');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
        setIsAuthenticated(false);
        setUserRoles([]);
        setUsername('');
        setExpireCodeInfo(null);
        sessionStorage.clear();
    };

    const hasRole = (role) => {
        return userRoles.includes(role);
    };

    const hasAnyRole = (roles) => {
        return roles.some((role) => userRoles.includes(role));
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                userRoles,
                username,
                expireCodeInfo,
                handleLogin,
                handleLogout,
                handleExpireCodeInfoUpdate,
                hasRole,
                hasAnyRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
