import './Modal.css';
import closeIcon from '../../assets/close.png';


const Modal = ({handleClose, show, children, className, identifer}) => {
    const classShowHide = show ? "Modal-display" : "Modal-display-none";

    function handleClickOutside(event) {
        const modal = document.getElementById(identifer);
        
        if (!event?.path.includes(modal)) {
            handleClose();
        }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return (
        <div className={`Modal-overlay ${classShowHide}`}>
            <div id={identifer} className={`Modal ${className}`}>
                {children}
                <button className="Modal-close" type="button" onClick={handleClose}>
                    <img src={closeIcon} height="25" width="25" alt="Close modal" />
                </button>
            </div>
        </div>
    )
}


export default Modal;





