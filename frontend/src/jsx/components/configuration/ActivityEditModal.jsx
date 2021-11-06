import React, { useState, useCallback, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Table } from "react-bootstrap";
import { useGetAPI, usePutAPI } from '../useAPI'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import PageTitle from "../../layouts/PageTitle";
// import ColorPicker from "./Color";
import ColorPicker_ from "material-ui-color-picker";

// import { Dropdown, Tab, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
import useForm from 'react-hook-form';
import createPalette from "@material-ui/core/styles/createPalette";
function refreshPage() {
  window.location.reload(false);
}
const ActivityEditModal = ({show, onShowShange, activityData}) => {
  const handleShow = useCallback( () => {onShowShange(false)}, [onShowShange])
  const activitiesEND = `${process.env.REACT_APP_API_URL}/salle-activite/activite/`
  const activityEditEND = `${process.env.REACT_APP_API_URL}/salle-activite/activite/${activityData['activityId']}`
    // const creneauPerAbonnementEND = `${process.env.REACT_APP_API_URL}/abonnement/`
    const [selectedActivities, setSelectedActivities] = useState([])
    const [ showModal, setShowModal]  = useState(false)

const [name, setName] = useState('')
const [activtiyId, setActivtiyId] = useState('')
const [color, setColor] = useState('#ff0000')
const [salle, setSalle] = useState('')
const salles = activityData['salles']
useEffect(() => {
  if (selectedActivities !== [] ) {
    setShowModal(true)   
   }
  if (show == true) {
      setActivtiyId(activityData['activtiyId'])
      setName(activityData['activityName'])
      setColor(activityData['color'])
      setSalle(activityData['salle'])
      // setActivity(res.data.activity)
      // getAbonnementsActitivties()
  }
}, [showModal, activityData['activityId']]);


    const handleSubmit = async e => {
        e.preventDefault();
        const activityFormData = {
            name              : name,
            color             : color,
            salle              : Number(salle),
          
        }
        console.log(" =================> new Creneau ", activityFormData);
        await axios.patch(activityEditEND, activityFormData)
        refreshPage()
        handleShow()

      }
return ( 
    <Modal  className="fade bd-example-modal-lg" size="xl" show={show}>
    <Modal.Header>
      <Modal.Title>modifier l'activité  </Modal.Title>
      <Button
          variant=""
          className="close"
          onClick={handleShow}
          >
          <span>&times;</span>
      </Button>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleSubmit}>
          <div className="form-group row">
              <label className="col-sm-3 col-form-label">Nom </label>
              <div className="col-sm-9">
                  <input type="text" value={name} className="form-control" placeholder="..." onChange={e => setName(e.target.value)}/>
              </div>
          </div>
          
          <div className="form-group row">
              <label className="col-sm-3 col-form-label">Couleur </label>
              <div className="col-sm-9">
              <div className="row">
                <div className="col-xl-4 col-lg-6 mb-3">
                  <div className="example">
                    <input
                      type="color"
                      className="as_colorpicker form-control"
                      value={color}
                      onChange={(e, value) => setColor(e.target.value)}
                    />
                  </div>
                </div>
                
                
              </div>
              </div>
          </div>

       
          <div className="form-group row">
              <label className="col-sm-3 col-form-label">Salle </label>
              <div className="col-sm-9">
                  <Autocomplete
                      
                      onChange={((event, value) =>  
                        {
                        setSalle(value.id)
                    }
                        )} 
                      // defaultValue={salle}
                      defaultValue={salles[salle]}
                      options={activityData['salllesActivities']}
                      getOptionSelected={(option) =>  option['id']}
                      id="size-small-standard-multi"
                      getOptionLabel={(option) =>  ( option['name'])}
                      renderInput={(params) =>
                  (<TextField {...params} name="salle" label="salle" variant="outlined" fullWidth />)}
                />
              </div>
          </div>
          <div className="form-group row">
              <div className="col-sm-10">
                  <button type="submit" className="btn btn-primary">
                      Valider
                  </button>
              </div>
          </div>
      </form>
     </Modal.Body>

    </Modal>
)

}
export default ActivityEditModal;