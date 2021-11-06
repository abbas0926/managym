import React, { useState, useCallback, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Table } from "react-bootstrap";
import { useGetAPI, usePutAPI } from '../useAPI'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import PageTitle from "../../layouts/PageTitle";

// import { Dropdown, Tab, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
import useForm from 'react-hook-form';
import createPalette from "@material-ui/core/styles/createPalette";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
function refreshPage() {
  window.location.reload(false);
}
const AbonnementCreateModal = ({show, onShowShange}) => {
    const handleShow = useCallback( () => {onShowShange(false)}, [onShowShange])
    const activitiesEND = `${process.env.REACT_APP_API_URL}/salle-activite/activite/`
    const abonnementCreateEND = `${process.env.REACT_APP_API_URL}/abonnement/create`
    // const creneauPerAbonnementEND = `${process.env.REACT_APP_API_URL}/abonnement/`
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [numberOfDays, setNumberOfDays] = useState('')
    const [seancesQuantity, setSeancesQuantity] = useState('')
    const [activity, setActivity] = useState([])
    const [selectedActivities, setSelectedActivities] = useState([])
    const [systemeCochage, setSystemeCochage] = useState(false)
    const [numOfWeek, setNumOfWeek] = useState(false)
    

    const activities = useGetAPI(activitiesEND)

  
    // const provArray = []

    const getSelectedActivities = () => {
    
        console.log(
            'les activitesss', activity
        );
      for (let i = 0; i < activity.length; i++) {
          // setRealMaladies([...realMaladies, selectedMaladies[i]['id']])
          selectedActivities.push(activity[i]['id'])
      }
      console.log(
        // 'les provArray', provArray
    );
    //   setSelectedActivities(provArray)
    }

    
    const handleSubmit = async e => {
        for (let i = 0; i < activity.length; i++) {
            // setRealMaladies([...realMaladies, selectedMaladies[i]['id']])
            selectedActivities.push(activity[i]['id'])
        }
        e.preventDefault();
        const abonnementFormData = {
            name              : name,
            price             : price,
            // number_of_days    : numberOfDays,
            seances_quantity  : Number(seancesQuantity),
            activity          : selectedActivities
        }
        if (systemeCochage === true ) {
            abonnementFormData.number_of_days = Number(numberOfDays)
            console.log('yesss par semaine');
        }else {
            abonnementFormData.number_of_days = Number(numOfWeek) * 7
            console.log('yesss par jour');

        }
        console.log(" =================> new Creneau ", abonnementFormData);
        await axios.post(abonnementCreateEND, abonnementFormData)
        refreshPage()
        // handleShow()
      }
return ( 
    <Modal  className="fade bd-example-modal-lg" size="xl" show={show}>
    <Modal.Header>
      <Modal.Title>Creer un nouvel abonnement </Modal.Title>
      <Button variant="" className="close" onClick={handleShow} > <span>&times;</span>
      </Button>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={handleSubmit}>
      <div className="form-group row">
              <label className="col-sm-3 col-form-label">Systeme d'abonnement : </label>
              <div className="col-sm-9">
                <FormControlLabel
                    // value={abonnementNormal}
                    control={<Switch checked={systemeCochage}  onChange={e => setSystemeCochage(!systemeCochage)} color="primary" />}
                    label={systemeCochage ? 'Prépayé ': 'Normal'}
                    labelPlacement={systemeCochage ? 'end': 'start'}
                    />
              </div>
          </div>
          <div className="form-group row">
              <label className="col-sm-3 col-form-label">Nom </label>
              <div className="col-sm-9">
                  <input type="text" value={name} className="form-control" placeholder="..." onChange={e => setName(e.target.value)}/>
              </div>
          </div>
          <div className="form-group row">
              <label className="col-sm-3 col-form-label">Prix </label>
              <div className="col-sm-9">
                  <input type="number"value={price} className="form-control" placeholder="..." onChange={e => setPrice(e.target.value)}/>
              </div>
          </div>
            {systemeCochage ? 
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label">Nombre de jours </label>
                    <div className="col-sm-9">
                        <input type="number"value={numberOfDays} className="form-control" placeholder="..." onChange={e => setNumberOfDays(e.target.value)}/>
                    </div>
                </div> 
            :
            <div className="form-group row">
                <label className="col-sm-3 col-form-label">Nombre de semaine </label>
                <div className="col-sm-9">
                    <input type="number"value={numOfWeek} className="form-control" placeholder="..." onChange={e => setNumOfWeek(e.target.value)}/>
                </div>
            </div>
            }

          
          <div className="form-group row">
              <label className="col-sm-3 col-form-label">Nombre de Séances </label>
              <div className="col-sm-9">
                  <input type="number"value={seancesQuantity} className="form-control" placeholder="..." onChange={e => setSeancesQuantity(e.target.value)}/>
              </div>
          </div>
          <div className="form-group row">
              <label className="col-sm-3 col-form-label">Activités </label>
              <div className="col-sm-9">
                  <Autocomplete
                      multiple
                      onChange={((event, value) =>  setActivity(value))} 
                      options={activities}
                      id="size-small-standard-multi"
                      getOptionLabel={(option) =>  ( option['name'])}
                      renderInput={(params) =>
                  (<TextField {...params} name="activities" label="Activités" variant="outlined" fullWidth />)}
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
export default AbonnementCreateModal;