import React, { useState, useCallback, useEffect } from "react";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";
import { useGetAPI, usePutAPI } from '../useAPI'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
// import { Dropdown, Tab, Nav } from "react-bootstrap";
// import { Link } from "react-router-dom";
import useForm from 'react-hook-form';
function refreshPage() {
  window.location.reload(false);
}
const PaiementCreateModal = ({show, onShowShange}) => {
    const handleShow = useCallback( () => {onShowShange(false)}, [onShowShange])

    // const {register, handleSubmit, errors } = useForm();

    let paiementCreateEnd = `${process.env.REACT_APP_API_URL}/transactions/paiement/create`
    // let abonnementTypeEnd = `${process.env.REACT_APP_API_URL}/abonnement/`
    let clientsEnd = `${process.env.REACT_APP_API_URL}/clients-name/`

   const [people, setPeople] = useState([])
   const [client, setClient] = useState("")
   const [dettes, showDettes] = useState(false)
   const [erreur, seterreur] = useState(false)
   const [amount, setAmount] = useState("");

  //  const [abonnement, setAbonnement] = useState("")
   const [note, setNote] = useState("")
   const clients = useGetAPI(clientsEnd)
  //  const abonnements = useGetAPI(abonnementTypeEnd)
   //  useEffect(() => {
         // setPeople(clients)
      //   console.log('THE NEW CLIENT ONEEE ', res.data);

      //   setCreneauDetail(res.data)
      //   console.log(res.data);
      //   setNewActivity(activities[creneauActivite].id)
      //   setNewCoach(coachs[creneauCoach].id)
      //   setNewStartHour(startHour)
      //   setNewEndHour(endHour)
      //   setNewDay(days[day].day)
      //   setNewPlanning(plannings[creneauPlanning].id)
       
   //  }, [])

    // }, [transactionData['creneauId']]);
    const handleSubmit =async e => {
      e.preventDefault();
      const newTransaction = {
        amount : amount ,
        client: Number(client),
        // type : Number(abonnement),
        note : note
      }
      await axios.post(paiementCreateEnd, newTransaction)
      refreshPage()
      handleShow()
    }
    console.log('creneaux detail');

return ( 

    <Modal className="fade bd-example-modal-lg" size="lg" show={show}>
    <Modal.Header>
      <Modal.Title>Paiement</Modal.Title>
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
                                        renderInput={(params) => <TextField {...params} required label="Type de Transaction" variant="outlined" fullWidth />}
                                      />
                                    </div> */}
                                    <div className="form-group col-md-6">
                                      <Autocomplete
                                        // id={(option) =>  option['id']}
                                        onChange={((event, value) =>  {
                                          try {
                                            setClient(value.id)
                                            seterreur(false)
                                            showDettes(true)
                                          } catch (error) {
                                            setClient('')
                                            seterreur(true)
                                          }
                                        })}
                                        // onChange={handleSubmit}
                                        options={clients}
                                       //  value={activities[creneauActivite]}
                                        getOptionSelected={(option) =>  option['id']}
                                        getOptionLabel={(option) =>  (  option['id'] +' - '+ option['last_name'])}
                                        renderInput={(params) => 
                                          <TextField {...params}  label="Clients" variant="outlined" fullWidth required />}
                                      />
                                      {erreur && <p style={{color:'red'}}>veuillez choisir un client pour le paiement</p>}
                                        
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
export default PaiementCreateModal;