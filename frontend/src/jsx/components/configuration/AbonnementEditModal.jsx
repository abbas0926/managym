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
function refreshPage() {
  window.location.reload(false);
}
const AbonnementEditModal = ({show, onShowShange, abonnementData}) => {
    const handleShow = useCallback( () => {onShowShange(false)}, [onShowShange])
    // const abonnementEditEND = `${process.env.REACT_APP_API_URL}/abonnement/`
    // const creneauPerAbonnementEND = `${process.env.REACT_APP_API_URL}/abonnement/`

const [name, setName] = useState('')
const [price, setPrice] = useState('')
const [numberOfDays, setNumberOfDays] = useState('')
const [seancesQuantity, setSeancesQuantity] = useState('')
const [activity, setActivity] = useState([])


const [abonnementId, setAbonnementId] = useState();
const [abonnementDetail, setAbonnementDetail] = useState();
const [selectedActivities, setSelectedActivities] = useState([])
const [activities, setActivities] = useState([])
const [ showModal, setShowModal]  = useState(false)

const abonnementEditEND = `${process.env.REACT_APP_API_URL}/abonnement/${abonnementData['abonnementId']}/`
const abonnementDeleteEND = `${process.env.REACT_APP_API_URL}/abonnement/delete/${abonnementData['abonnementId']}`
// setSelectedActivities(abonnementData['selectedActivities'])
// const provArray = []

useEffect(() => {
    if (selectedActivities !== [] ) {
     setShowModal(true)   
    }
  if (show == true) {
    axios.get(abonnementEditEND).then(res => {
      setName(res.data.name)
      setPrice(res.data.price)
      setNumberOfDays(res.data.number_of_days)
      setSeancesQuantity(res.data.seances_quantity)
      
      // setActivity(res.data.activity)
      setActivity(abonnementData['selectedActivities'])
    //   console.log('fedfef', selectedActivities);
    })
  }
}, [abonnementData['abonnementId']]);


  
  // return indexesList
    // const getSelectedActivities = () => {
    
    //     console.log(
    //         'les activitesss', activity
    //     );
    //   for (let i = 0; i < activity.length; i++) {
    //       // setRealMaladies([...realMaladies, selectedMaladies[i]['id']])
    //       selectedActivities.push(activity[i]['id'])
    //   }
    //   console.log(
    //     // 'les provArray', provArray
    // );
    // //   setSelectedActivities(provArray)
    // }
const handleDelete = e => {
    axios.delete(abonnementDeleteEND).then(
        refreshPage(),
        handleShow()
    )
}
    
    const handleSubmit = async e => {
        for (let i = 0; i < activity.length; i++) {
            // setRealMaladies([...realMaladies, selectedMaladies[i]['id']])
            selectedActivities.push(activity[i]['id'])
        }

        console.log('fedfef', selectedActivities);
        console.log('setActivity', activity);
        e.preventDefault();
        const abonnementFormData = {
            name              : name,
            price             : price,
            number_of_days    : numberOfDays,
            seances_quantity  : seancesQuantity,
            activity : selectedActivities
        }
     
        console.log(" =================> new Creneau ", abonnementFormData);
        await axios.put(abonnementEditEND, abonnementFormData)
        refreshPage()
        handleShow()
      }
return ( 
    <Modal  className="fade bd-example-modal-lg" size="xl" show={show}>
    <Modal.Header>
      <Modal.Title>{name}</Modal.Title>
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
              <label className="col-sm-3 col-form-label">Prix </label>
              <div className="col-sm-9">
                  <input type="number"value={price} className="form-control" placeholder="..." onChange={e => setPrice(e.target.value)}/>
              </div>
          </div>
          <div className="form-group row">
              <label className="col-sm-3 col-form-label">Nombre de jours </label>
              <div className="col-sm-9">
                  <input type="number"value={numberOfDays} className="form-control" placeholder="..." onChange={e => setNumberOfDays(e.target.value)}/>
              </div>
          </div>
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
                      onChange={((event, value) =>  
                        {
                        setActivity(value)
                        console.log('the valueee', value);
                    }
                        )} 
                      value={activity}
                      options={abonnementData['activities']}
                      id="size-small-standard-multi"
                      getOptionLabel={(option) =>  ( option['name'])}
                      renderInput={(params) =>
                  (<TextField {...params} name="activities" label="Activités" variant="outlined" fullWidth />)}
                />
              </div>
          </div>

          <div className="form-group row d-flex justify-content-between">
                <div className="m-3">
                  <button type="submit" className="btn btn-primary">
                      Valider
                  </button>
                </div>
                <div className="m-3">
                  <button type="button" className="btn btn-danger" onClick={ async () => {
                    await axios.delete(`${process.env.REACT_APP_API_URL}/abonnement/delete/${abonnementData['abonnementId']}`)
                    refreshPage()
                    }}>
                      Supprimer
                  </button>
                </div>
              
              
          </div>
      </form>
     </Modal.Body>

    </Modal>
)

}
export default AbonnementEditModal;