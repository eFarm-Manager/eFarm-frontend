// App.jsx
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Zaktualizowane importy
import SignupFarm from './components/SignupFarm/SignupFarm';
import SignupUser from './components/SignupUser/SignupUser';
import SignIn from './components/SignIn/SignIn';

const App = () => {
    return (
        <Router>
            <div style={{ padding: '20px' }}>
                <h1>Witamy na stronie</h1>

                {/* Przyciski do różnych stron */}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to="/signup-farm">
                        <button>Zarejestruj Farmę</button>
                    </Link>
                    <Link to="/signup-user">
                        <button>Zarejestruj Użytkownika</button>
                    </Link>
                    <Link to="/sign-in">
                        <button>Zaloguj się</button>
                    </Link>
                </div>

                {/* Definiowanie ścieżek do odpowiednich komponentów */}
                <Routes>
                    <Route path="/signup-farm" element={<SignupFarm />} />
                    <Route path="/signup-user" element={<SignupUser />} />
                    <Route path="/sign-in" element={<SignIn />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
