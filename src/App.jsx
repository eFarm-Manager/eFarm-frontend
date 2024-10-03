import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

import SignupFarm from './components/SignupFarm/SignupFarm';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import SignupUser from './components/SignupUser/SignupUser';
//import UpdateActivationCode from './components/UpdateActivationCode/UpdateActivationCode';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        const roles = sessionStorage.getItem('roles');


        if (username && roles) {
            setIsAuthenticated(true);
        }

    }, [isAuthenticated]);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };


    const handleLogout = async () => {
        try {
            // Wywołanie API na backend, aby wylogować i wyczyścić cookies
            const response = await fetch('/api/auth/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error logging out:', error);
        }
        setIsAuthenticated(false);
        sessionStorage.clear();
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
                                <Dashboard onLogout={handleLogout} />
                            ) : (
                                <Navigate to="/sign-in" />
                            )
                        }
                    />

                    <Route
                        path="/sign-in"
                        element={<SignIn onLogin={handleLogin} />}
                    />

                    <Route path="/signup-farm" element={<SignupFarm />} />
                    <Route path="/signup-user" element={<SignupUser />} />
                    {/*<Route path="/update-activation-code" element={<UpdateActivationCode />} /> */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
