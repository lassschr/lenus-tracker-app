import './Header.css';
import logo from '../../assets/logo.png';


const Header = ({className, onClick, onMouseEnter}) => {
    return (
        <header className={`Header ${className}`} onClick={onClick} onMouseEnter={onMouseEnter}>
            <div className="Header-content-wrapper">
                <img src={logo} className="Header-logo" alt="logo" height="15"/>
                <h1 className="Header-title">Measurements</h1>
            </div>
        </header>
    )
}


export default Header;