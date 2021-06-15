import './SecondaryButton.css';


const SecondaryButton = ({children, className, onClick, onMouseEnter}) => {
    return (
        <button className={`SecondaryButton ${className}`} onClick={onClick} onMouseEnter={onMouseEnter}>
            {children}
        </button>
    )
}


export default SecondaryButton;