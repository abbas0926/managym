import React, { useState, useCallback, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
import { useGetAPI, usePutAPI , usePostAPI} from '../useAPI'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { Dropdown, Tab, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
 
function refreshPage() {
  window.location.reload(false);
}
const RemunerationPersonnelModal = ({show, onShowShange, transactionData}) => {
    const handleShow = useCallback( () => {onShowShange(false)}, [onShowShange])

   
  let personnelEnd = `${process.env.REACT_APP_API_URL}/personnel/`
  // let abonnementEnd = `${process.env.REACT_APP_API_URL}/abonnement/`
  
  const personnels = useGetAPI(personnelEnd)
  
  // const history = useHistory();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [nom, setNom] = useState("");


  //FK 

  const HandleSubmit = async e => {
    // console.log('les maladiiiies', maladies);
    let endpoint = `${process.env.REACT_APP_API_URL}/transactions/remuneration/create`
    e.preventDefault();
    const newClient = {
      amount : amount ,
      notes : note ,
      nom : nom
      }
      await usePostAPI(endpoint, newClient)
      refreshPage()
      handleShow()
      console.log('THE NEW CLIENT ', newClient);
    }
return ( 

    <Modal className="fade bd-example-modal-lg" size="lg" show={show}>
    <Modal.Header>
      <Modal.Title>Rémuneration Personnel </Modal.Title>
      <Button
          variant=""
          className="close"
          onClick={handleShow}
          >
          <span>&times;</span>
      </Button>
    </Modal.Header>
    <Modal.Body>
      
    <form onSubmit={HandleSubmit}>
      <div className="form-row">
        {/* <div className="form-group col-md-6">
          <Autocomplete
            // id={(option) =>  option['id']}
            onChange={(event, value) => setAbonnement(value.id)}
            // onChange={handleSubmit}
            options={abonnements}
            //  value={activities[creneauActivite]}
            getOptionSelected={(option) =>  option['id']}
            getOptionLabel={(option) =>  option['name']}
            renderInput={(params) => <TextField {...params}  label="Type de Transaction" variant="outlined" fullWidth />}
          />
        </div> */}
        <div className="form-group col-md-6">
          <Autocomplete
            // id={(option) =>  option['id']}
            onChange={(event, value) => setNom(value.id)}
            // onChange={handleSubmit}
            options={personnels}
            //  value={activities[creneauActivite]}
            getOptionSelected={(option) =>  option['id']}
            getOptionLabel={(option) =>  ( option['last_name'] )}
            renderInput={(params) => <TextField {...params}  label="Personnel" variant="outlined" fullWidth />}
          />
        </div>
        <div className="form-group col-md-6">
        <TextField
          type="number"
        //   defaultValue={}
          label="Montant"
          variant="outlined"
          onChange={e=> setAmount(e.currentTarget.value)}
          // onChange={(event, value) => setNewStartHour(value)}
          fullWidth
        />
        </div>
        <div className="form-group col-md-6">
        <TextField
          type="text"
          onChange={e=> setNote(e.currentTarget.value)}

        //   defaultValue={endHour}
          // value={creneauDetail.hour_finish}
          // className={classes.textField}
          variant="outlined"
          label="Note"

          fullWidth
          // defaultValue={coachs[coach]}
        //   onChange={e => setNewEndHour(e.currentTarget.value)}
        />
        </div>
      </div>
      <Button
          onClick={handleShow}
          variant="danger light"
          className='m-2'
          >
          Annulé
      </Button>
      <Button variant="primary" type="submit">Confirmer</Button>
      </form>
     </Modal.Body>




     


    </Modal>
)

}
export default RemunerationPersonnelModal;