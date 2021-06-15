import './PrimaryButton.css';


const PrimaryButton = ({children, className, onClick, onMouseEnter}) => {
    return (
        <button className={`PrimaryButton ${className}`} onClick={onClick} onMouseEnter={onMouseEnter}>
            {children}
        </button>
    )
}


export default PrimaryButton;