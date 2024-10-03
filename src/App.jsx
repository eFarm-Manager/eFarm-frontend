// App.jsx
import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';

import SignupFarm from './components/SignupFarm/SignupFarm';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import SignupUser from './components/SignupUser/SignupUser';
//import UpdateActivationCode from './components/UpdateActivationCode/UpdateActivationCode';
import './App.css';
//import { deleteCookie, getCookie, setCookie } from './components/helpers/cookieHelper';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const username = sessionStorage.getItem('username');
        const roles = sessionStorage.getItem('roles');

        console.log('useEffect - Checking sessionStorage:', { username, roles }); // Dodaj log

        if (username && roles) {
            setIsAuthenticated(true);
            console.log('User is authenticated'); // Dodaj log
        }else{
            console.log('User is NOT authenticated'); // Dodaj log, jeśli dane nie są dostępne
        }
    }, [isAuthenticated]);

    const handleLogin = () => {
        console.log('isAuthenticated true');
        setIsAuthenticated(true);
    };


    const handleLogout = () => {
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
