// App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Zaktualizowane importy
import SignupFarm from './components/SignupFarm/SignupFarm';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import SignupUser from './components/SignupUser/SignupUser';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <h1>Witamy na eFarm</h1>

                <div className="buttons-container">
                    <Link to="/signup-farm">
                        <button>Zarejestruj Farmę</button>
                    </Link>
                    <Link to="/sign-in">
                        <button>Zaloguj się</button>
                    </Link>
                </div>

                <Routes>
                    <Route path="/signup-farm" element={<SignupFarm/>}/>
                    <Route path="/signup-user" element={<SignupUser/>}/>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Routes>
            </div>
        </Router>
    );
};

export default App;
