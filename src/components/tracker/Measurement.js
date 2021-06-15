import './Measurement.css';


const Measurement = ({ objectID, icon, details, className, onClick }) => {
    return (
        <li className={`Measurement ${className}`} key={objectID} onClick={onClick}>  
            <div className="Measurement-dot">
                <img src={icon} height="30" width="30" alt="Timeline point" />
            </div>

            <svg width="125" height="50" className="Measurement-details-line">
                <line x1="0" y1="0" x2="71" y2="0" stroke="#141414" strokeWidth="10"/>
                <line x1="70" y1="0" x2="125" y2="50" stroke="#141414" strokeWidth="5"/>
            </svg>
            
            <div className="Measurement-details">
                <h3 className="Measurement-details-date">{
                    typeof details.date_measured === 'string' 
                        ? details.date_measured 
                        : (new Date(details.date_measured * 1000)).toLocaleDateString('da')
                }</h3>

                {
                    details.weight && (
                        <span className="Measurement-details-stats">Weight: {details.weight} kg.</span>
                    )
                }
            </div>

            <div className="Measurement-line"></div>
        </li>
    )
}


export default Measurement;





