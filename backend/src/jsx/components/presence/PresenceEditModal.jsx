import React, { useState, useCallback, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
import { useGetAPI, usePutAPI } from '../useAPI'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { Dropdown, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
 
function refreshPage() {
  window.location.reload(false);
}
const PresenceEditModal = ({show, onShowShange, presenceData}) => {
    const handleShow = useCallback( () => {onShowShange(false)}, [onShowShange])
    const client  =presenceData['client']
    const clientID  =presenceData['clientId']
    const hourIn  =presenceData['hourIn']
    const hourOut  =presenceData['hourOut']
   //  const creneau  =presenceData['creneau']
    const notes  =presenceData['note']
    const date  =presenceData['date']
    const activity  =presenceData['activity']
    const presenceId = presenceData['presenceId']
    const [hourIn2, setHourIn2] = useState('')
    const [hourOut2,setHourOut2] = useState('')
    const [note,setNote] = useState('')
    let presenceUpdateEND = `${process.env.REACT_APP_API_URL}/presence/${presenceId}/`

    useEffect(() => {
 
      if (show == true) {
         setHourIn2(hourIn)
         setHourOut2(hourOut)
         setNote(notes)

           console.log('THE NEW CLIENT ONEEE ');
      }
        console.log('rani hab naafer creneau DATAAA============>', note,
        hourOut);
    }, [presenceData['presenceId']])


    const handleSubmit = async e => {
      e.preventDefault();
      const newCreneau = {
         hour_entree :hourIn2,
         hour_sortie :hourOut2,
         note :note,
      }
      console.log(" =================> new Creneau ", newCreneau);
      await axios.put(presenceUpdateEND, newCreneau)
      refreshPage()
    }

return ( 

    <Modal className="fade bd-example-modal-lg" size="lg" show={show}>
    <Modal.Header>
      <Modal.Title className='text-capitalize'>Presence de <span className='text-danger ml-3 mr-4'> {client}</span> ID: <span className=' ml-1 text-danger'>{clientID}</span></Modal.Title>
      <Button variant="" className="close" onClick={handleShow} > <span>&times;</span> </Button>
    </Modal.Header>
    <Modal.Body>
      <div>
         <form onSubmit={handleSubmit}>
            <div className="form-row">
               <div className="col-12 mb-3">
               <h4>Date : <span className='text-primary'> {date}</span></h4>
               <h4>Activité : <span className='text-primary'> {activity}</span></h4>
               </div>
               <div className="form-group col-md-6">
                  <TextField type="time" label="Heure d'entrée" variant="outlined" value={hourIn2} onChange={e=> setHourIn2(e.currentTarget.value)} fullWidth/>
               </div>
               <div className="form-group col-md-6">
                  <TextField type="time" value={hourOut2} variant="outlined" label="Heure de Sortie" fullWidth onChange={e => setHourOut2(e.currentTarget.value)}/>
               </div>
               <div className="form-group col-md-6">
                  <TextField type="text" value={note} label="Note" variant="outlined" onChange={e=> setNote(e.currentTarget.value)} fullWidth/>
               </div>
            </div>
               <Button onClick={handleShow} variant="danger light" className='m-2' > Fermer </Button>
               <Button variant="primary" type="submit">Sauvgarder</Button>
         </form>
      </div>
     </Modal.Body>
    </Modal>
)}
export default PresenceEditModal;