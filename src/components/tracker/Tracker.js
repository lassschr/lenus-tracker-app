import './Tracker.css';
import IconButton from '../buttons/IconButton';
import MeasurementsTimeline from './MeasurementsTimeline';
import addIcon from '../../assets/add.png';
import { useState } from 'react';
import happinessIcon1 from '../../assets/happiness_low.png';
import happinessIcon2 from '../../assets/happiness_medium.png';
import happinessIcon3 from '../../assets/happiness_high.png';
import Modal from '../shared/Modal';
import PrimaryButton from '../buttons/PrimaryButton';
import DatePicker from "react-datepicker";
import GET_MEASUREMENTS from '../../graphql/GetMeasurements';
import CREATE_MEASUREMENT from '../../graphql/CreateMeasurement';
import { useQuery, useMutation } from "@apollo/client";



const Tracker = ({className}) => {
    let { loading, error, data } = useQuery(GET_MEASUREMENTS);
    const [ createMeasurement ] = useMutation(CREATE_MEASUREMENT);
    const [ showCreateModal, setShowCreateModal ] = useState(false);
    const [ createDate, setCreateDate] = useState(new Date());
    const [ createHappiness, setCreateHappiness] = useState("");
    const [ createWeight, setCreateWeight] = useState("");
    const happinessIcons = [ happinessIcon1, happinessIcon2, happinessIcon3 ];
    const happinessOptions = { low: 1, medium: 2, high: 3 };

    const openCreateModal = () => {
        setCreateWeight("");
        setCreateHappiness("");
        setCreateDate(Date.now()); 
        setShowCreateModal(true);
    };

    if(loading) {
        return <h1 className="status">Loading ...</h1>;
    }

    if(error) {
        console.log(error);
        return <h1 className="status">An error occurred</h1>;
    }

    return (
        <div className={`Tracker ${className}`}>
            <IconButton className="Tracker-add-measurement" onClick={() => openCreateModal()}><img src={addIcon} height="30" width="30" alt="Create measurement"/></IconButton>
            <MeasurementsTimeline measurements={data.measurements}></MeasurementsTimeline>

            <Modal identifer="modal-create" show={showCreateModal} handleClose={() => setShowCreateModal(false)}>
                <span className="Modal-header">
                    <img src={addIcon} height="25" width="25" alt="Create measurement"/>
                    <h2>Create measurement</h2>
                </span>

                <form>
                    <div className="Modal-form-element">
                        <label htmlFor="happiness">Happiness</label>
                        <fieldset id="happiness">
                            {
                                Object.keys(happinessOptions).map(hapinessKey => {
                                    return ([
                                        <div>
                                            <label htmlFor="happiness">
                                                <img src={happinessIcons[happinessOptions[hapinessKey] - 1]} height="25" width="25" alt="Happiness label" />
                                            </label>
                                            <input type="radio" id={happinessOptions[hapinessKey]} name="happiness" value={happinessOptions[hapinessKey]}
                                                checked={createHappiness === happinessOptions[hapinessKey]} onChange={() => setCreateHappiness(happinessOptions[hapinessKey])}></input>
                                        </div>
                                    ])
                                })
                            }
                        </fieldset>
                    </div>

                    <div className="Modal-form-element"> 
                        <label htmlFor="weight">Weight (kilogram)</label>
                        <input name="weight" type="number" min="1" value={createWeight} onChange={(event) => {setCreateWeight(parseInt(event.target.value))}}/>
                    </div>

                    <div className="Modal-form-element">
                        <label htmlFor="date">Date measured</label>
                        <DatePicker maxDate={Date.now()} wrapperClassName="Modal-form-datepicker" name="date" selected={createDate} onChange={(date) => setCreateDate(date)} />
                    </div>
                </form>

                <PrimaryButton onClick={() => {
                    createMeasurement({ 
                        variables: { weight: createWeight, date_measured: new Date(createDate).getTime() / 1000, happiness: createHappiness },
                        update: (cache, { data: { createdMeasurement } }) => {
                            const data = cache.readQuery({ query: GET_MEASUREMENTS });
                            const newData = {
                                measurements: [ ...data.measurements, {
                                    ...createdMeasurement,
                                    __typename: "Measurement"
                                } ]
                            }
                            cache.writeQuery({ query: GET_MEASUREMENTS, data: newData });
                        } 
                    });
                    
                    setShowCreateModal(false);
                }}>
                    <span>Create</span>
                </PrimaryButton>
            </Modal>
        </div>
    )
}


export default Tracker;