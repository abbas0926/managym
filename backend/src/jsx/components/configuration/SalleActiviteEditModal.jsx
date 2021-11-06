import React, { useState, useCallback, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Table } from "react-bootstrap";
import { useGetAPI, usePutAPI, usePostAPI } from '../useAPI'
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
const SalleActiviteEditModal = ({show, onShowShange, salleData}) => {
    const handleShow = useCallback( () => {onShowShange(false)}, [onShowShange])
    // const creneauPerAbonnementEND = `${process.env.REACT_APP_API_URL}/abonnement/`
    const salleActiviteUpdateEnd = `${process.env.REACT_APP_API_URL}/salle-activite/${salleData['salleId']}/`
    const [name, setName] = useState('')

    useEffect(() => {
       
      if (show == true) {
          setName(salleData['salleName'])
         
        //   console.log('fedfef', selectedActivities);
      }
    }, [salleData['salleId']]);
    const HandleSubmit = e => {
        e.preventDefault();
        const ebonnementFormData = {
            name : name,
        }
        console.log(" =================> new Creneau ", ebonnementFormData);
        axios.put(salleActiviteUpdateEnd, ebonnementFormData).then(
            refreshPage(),
            handleShow()
        )
      }
return ( 
    <Modal  className="fade bd-example-modal-lg" size="xl" show={show}>
    <Modal.Header>
      <Modal.Title>Creer un nouvel abonnement </Modal.Title>
      <Button variant="" className="close" onClick={handleShow} >
          <span>&times;</span>
      </Button>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={HandleSubmit}>
          <div className="form-group row">
              <label className="col-sm-3 col-form-label">Nom  </label>
              <div className="col-sm-9">
                  <input type="text" value={name} className="form-control" placeholder="..." onChange={e => setName(e.target.value)}/>
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
                await axios.delete(`${process.env.REACT_APP_API_URL}/salle-activite/delete/${salleData['salleId']}`)
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
export default SalleActiviteEditModal;