import './IconButton.css';


const IconButton = ({children, className, onClick, onMouseEnter}) => {
    return (
        <button className={`IconButton ${className}`} onClick={onClick} onMouseEnter={onMouseEnter}>
            {children}
        </button>
    )
}


export default IconButton;