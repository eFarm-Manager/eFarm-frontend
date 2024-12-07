import { Link } from 'react-router-dom';
import './LandingPage.css'; // Zaimportowanie stylów

const LandingPage = () => {
    return (
        <div className="landing-page">
            <h1>Witaj w eFarm</h1>
            <Link to="/sign-in">Zaloguj się</Link>
            <Link to="/signup-farm">Zarejestruj farmę</Link>
        </div>
    );
};

export default LandingPage;
