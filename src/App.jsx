import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

import SignupFarm from './components/SignupFarm/SignupFarm';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import SignupUser from './components/SignupUser/SignupUser';
import UpdateActivationCode from './components/UpdateActivationCode/UpdateActivationCode';
import NotAuthorized from './components/NotAuthorized/NotAuthorized';
import FarmDetails from './components/FarmDetails/FarmDetails';
import ChangePassword from './components/ChangePassword/ChangePassword';
import NewActivationCode from './components/NewActivationCode/NewActivationCode';
import './App.css';
import "leaflet/dist/leaflet.css";
//import Navbar from "./components/Navbar/Navbar.jsx";
import EquipmentList from './components/Equipment/EquipmentList';
import EquipmentDetail from './components/Equipment/EquipmentDetail';
//import AddLandparcel from './components/AddLandparcel/AddLandparcel';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRoles, setUserRoles] = useState([]);
    const [expireCodeInfo, setExpireCodeInfo] = useState(null);

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        const roles = sessionStorage.getItem('roles');


        if (username && roles) {
            setIsAuthenticated(true);
            setUserRoles(JSON.parse(roles));
        }

    }, []);

    const handleLogin = (expireCodeInfoFromLogin) => {
        setIsAuthenticated(true);
        const roles = sessionStorage.getItem('roles');
        if (roles) {
            setUserRoles(JSON.parse(roles));
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
        setExpireCodeInfo(null);
        sessionStorage.clear();
    };
    const hasRole = (role) => {
        return userRoles.includes(role);
    };

    return (
        <Router>

            <div className="app-container">
                {!isAuthenticated && (
                    <>
                        <h1>Witamy na eFarm</h1>
                        <div className="buttons-container">
                            <Link to="/signup-farm">
                                <button>Zarejestruj Farmę</button>
                            </Link>
                            <Link to="/sign-in">
                                <button>Zaloguj się</button>
                            </Link>
                        </div>
                    </>
                )}

                {/* Nawigacja */}
                <Routes>
                    <Route
                        path="/dashboard"
                        element={
                            isAuthenticated ? (
                                <Dashboard onLogout={handleLogout} expireCodeInfo={expireCodeInfo}/>
                            ) : (
                                <Navigate to="/sign-in" />
                            )
                        }
                    />

                    <Route
                        path="/sign-in"
                        element={<SignIn onLogin={handleLogin} />}
                    />

                    <Route
                        path="/signup-user"
                        element={
                            isAuthenticated && (hasRole('ROLE_FARM_OWNER') || hasRole('ROLE_FARM_MANAGER')) ? (
                                <SignupUser onLogout={handleLogout} />
                            ) : isAuthenticated ? (
                                // User is authenticated but doesn't have the required role
                                <Navigate to="/not-authorized" />
                            ) : (
                                // User is not authenticated
                                <Navigate to="/sign-in" />
                            )
                        }
                    />
                    <Route
                        path="/farm-details"
                        element={
                            isAuthenticated && (hasRole('ROLE_FARM_OWNER') || hasRole('ROLE_FARM_MANAGER')) ? (
                                <FarmDetails onLogout={handleLogout} />
                            ) : isAuthenticated ? (
                                <Navigate to="/not-authorized" />
                            ) : (
                                <Navigate to="/sign-in" />
                            )
                        }
                    />
                    <Route
                        path="/change-password"
                        element={
                            isAuthenticated ? (
                                <ChangePassword onLogout={handleLogout} />
                            ) : (
                                <Navigate to="/sign-in" />
                            )
                        }
                    />
                    <Route
                        path="/new-activation-code"
                        element={
                            isAuthenticated && hasRole('ROLE_FARM_OWNER') ? (
                                <NewActivationCode onLogout={handleLogout} onExpireCodeInfoUpdate={handleExpireCodeInfoUpdate} />
                            ) : isAuthenticated ? (
                                <Navigate to="/not-authorized" />
                            ) : (
                                <Navigate to="/sign-in" />
                            )
                        }
                    />
                    <Route
                        path="/equipment"
                        element={
                            isAuthenticated ? (
                                <EquipmentList onLogout={handleLogout} />
                            ) : (
                                <Navigate to="/sign-in" />
                            )
                        }
                    />
                    <Route
                        path="/equipment/:id"
                        element={
                            isAuthenticated ? (
                                <EquipmentDetail onLogout={handleLogout} />
                            ) : (
                                <Navigate to="/sign-in" />
                            )
                        }
                    />

                    <Route path="/signup-farm" element={<SignupFarm />} />
                    <Route path="/update-activation-code" element={<UpdateActivationCode />} />
                    <Route path="/not-authorized" element={<NotAuthorized />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
