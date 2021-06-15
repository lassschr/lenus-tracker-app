import './MeasurementsTimeline.css';
import presentTime from '../../assets/present_time.png';
import startTime from '../../assets/start_time.png';
import editIcon from '../../assets/edit.png';
import Measurement from './Measurement';
import happinessIcon1 from '../../assets/happiness_low.png';
import happinessIcon2 from '../../assets/happiness_medium.png';
import happinessIcon3 from '../../assets/happiness_high.png';
import { useState } from 'react';
import Modal from '../shared/Modal';
import PrimaryButton from '../buttons/PrimaryButton';
import SecondaryButton from '../buttons/SecondaryButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DELETE_MEASUREMENT from '../../graphql/DeleteMeasurement';
import UPDATE_MEASUREMENT from '../../graphql/UpdateMeasurement';
import { useMutation } from "@apollo/client";



const MeasurementsTimeline = ({measurements, className}) => {    
    const [ deleteMeasurement ] = useMutation(DELETE_MEASUREMENT);
    const [ updateMeasurement ] = useMutation(UPDATE_MEASUREMENT);
    const [ showEditModal, setShowEditModal ] = useState(false);
    const [ editId, setEditId] = useState(null);
    const [ editDate, setEditDate] = useState(new Date());
    const [ editHappiness, setEditHappiness] = useState("");
    const [ editWeight, setEditWeight] = useState("");
    const happinessIcons = [ happinessIcon1, happinessIcon2, happinessIcon3 ];
    const happinessOptions = { low: 1, medium: 2, high: 3 };

    const openEditModal = (measurement) => {
        setEditId(measurement.id);
        setEditWeight(measurement.weight);
        setEditHappiness(measurement.happiness);
        setEditDate(new Date(measurement.date_measured * 1000)); 
        setShowEditModal(true);
    };

    return (
        <div className={`MeasurementsTimeline ${className}`}>
            <div className="MeasurementsTimeline-wrapper">
                <ol className={`MeasurementsTimeline-items`}>
                    <Measurement objectID="Present" icon={presentTime} details={{ date_measured: 'Present' }}></Measurement>
                    
                    {
                        measurements.length ? measurements.map(measurement => 
                            <Measurement className="Measurement-hoverable" objectID={measurement.date_measured} icon={happinessIcons[measurement.happiness - 1]} 
                                details={{ date_measured: measurement.date_measured, weight: measurement.weight }} 
                                    onClick={() => openEditModal(measurement)}></Measurement>
                        ) : ''
                    }

                    <Measurement objectID="Start" className={`Measurement-end`} icon={startTime} details={{ date_measured: 'Start' }}></Measurement>
                </ol>
            </div>

            <Modal identifer="modal-edit" show={showEditModal} handleClose={() => setShowEditModal(false)}>
                <span className="Modal-header">
                    <img src={editIcon} height="25" width="25" alt="Edit measurement"/>
                    <h2>Edit measurement</h2>
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
                                                checked={editHappiness === happinessOptions[hapinessKey]} onChange={() => setEditHappiness(happinessOptions[hapinessKey])}></input>
                                        </div>
                                    ])
                                })
                            }
                        </fieldset>
                    </div>

                    <div className="Modal-form-element">
                        <label htmlFor="weight">Bodyweight (kilogram)</label>
                        <input name="weight" type="number" min="1" value={editWeight} onChange={(event) => {setEditWeight(parseInt(event.target.value))}}/>
                    </div>

                    <div className="Modal-form-element">
                        <label htmlFor="date">Date measured</label>
                        <DatePicker maxDate={Date.now()} wrapperClassName="Modal-form-datepicker" name="date" selected={editDate} onChange={(date) => setEditDate(date)} />
                    </div>
                </form>

                <div className="Modal-measurement-edit-actions">
                        <SecondaryButton onClick={() => {
                            deleteMeasurement({ 
                                variables: { id: editId },
                                update(cache) {
                                    const normalizedId = cache.identify({ id: editId, __typename: 'Measurement' });
                                    cache.evict({ id: normalizedId });
                                    cache.gc();
                                }
                            });
                            setShowEditModal(false);
                        }}><span>Delete</span></SecondaryButton>
                        <PrimaryButton onClick={() => {
                            updateMeasurement({ variables: { id: editId, weight: editWeight, date_measured: new Date(editDate).getTime() / 1000, happiness: editHappiness } });
                            setShowEditModal(false);
                        }}><span>Save</span></PrimaryButton>
                </div>
            </Modal>
        </div>
    )
}


export default MeasurementsTimeline;