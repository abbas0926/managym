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
function refreshPage() {
  window.location.reload(false);
}
const ABCCreateModal = ({show, onShowShange, clientData}) => {
  const [showCreneau, setShowCreneau] = useState(false)

    const handleShow = useCallback( () => {
      onShowShange(false)
      setShowCreneau(false)
    
    }, [onShowShange])


    const clientId = clientData['clientId']

    const [samedi, setSamedi] = useState([]);
    const [dimanche, setDimanche] = useState([]);
    const [lundi, setLundi] = useState([]);
    const [mardi, setMardi] = useState([]);
    const [mercredi, setMercredi] = useState([]);
    const [jeudi, setJeudi] = useState([]);
    const [vendredi, setVendredi] = useState([]);

    const [abonnements, setAbonnements] = useState([]);
  
    const [creneaux, setCreneaux] = useState([]);

    const [selectAbonnement, setSelectAbonnement] = useState("")

    let creneauPerAbonnementEND = `${process.env.REACT_APP_API_URL}/creneau/by-abonnement?ab=${selectAbonnement}`
    const abonnementClientCreateEND = `${process.env.REACT_APP_API_URL}/abonnement-client/create`
    const abonnementEND = `${process.env.REACT_APP_API_URL}/abonnement/`
    let result1=[]
    let result2=[]
    let result3=[]
    let result4=[]
    let result5=[]
    let result6=[]
    let result7=[]
    useEffect(() => {

      if (show == true) {
        axios.get(abonnementEND).then(res =>{
          setAbonnements(res.data)
        })
      }
    }, [show]);


    useEffect(() => {
      
      if (showCreneau == true) {
        axios.get(creneauPerAbonnementEND).then(res =>{
          console.log('creneaux end', res.data);
          res.data.forEach((req) => {
          if (req.day == "SA") {
            console.log('req.day', res.data);
            result1.push(req);
          }else if(req.day== "DI"){
            console.log('le resultat du dimanche', req);
                  result2.push(req);
                }else if (req.day== "LU"){
                  result3.push(req);
                }else if(req.day== "MA"){
                  result4.push(req);
                }else if(req.day== "ME"){
                  result5.push(req);
                }else if(req.day== "JE"){
                  result6.push(req);
                }else if(req.day== "VE"){
                  result7.push(req);
                }
             
    })
              setCreneaux([])
              setSamedi(result1)
              setDimanche(result2)
              setLundi(result3)
              setMardi(result4)
              setMercredi(result5)
              setJeudi(result6)
              setVendredi(result7)
            })



            console.log('req.dsdcvdcvscay', result2, dimanche);
     
      }
    }, [selectAbonnement]);

    const changingStyle = (id) => {
      // const creneau = e.currentTarget.id
      // console.log('the creneay ??? ', creneau);
      if (creneaux.indexOf(id) !== -1) {
       return true
      //  tdClass = 'hett-test'
      }
    }
    const handleSubmit = e => {
      e.preventDefault();
        const newABC = {
          client :Number(clientId),
          type_abonnement :Number(selectAbonnement),
          creneaux :creneaux,
        
        }
        console.log(" =================> new Creneau ", newABC);
        axios.post(abonnementClientCreateEND, newABC)
        // refreshPage()
        setCreneaux([])
        setShowCreneau(false)
        handleShow()
      }
return ( 

    <Modal  className="fade bd-example-modal-lg" size="xl" show={show}>
    <Modal.Header>
      <Modal.Title>Creer un nouvel abonnement pour : {clientId}</Modal.Title>
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
      <div>
        <Autocomplete
              // id={(option) =>  option['id']}
              onChange={(event, value) => 
                {try {
                  setSelectAbonnement(value.id)
                  setShowCreneau(true)
                } catch (error) {
                  setSelectAbonnement('')
                  setShowCreneau(false)
                }}
                }
              // onChange={handleSubmit}
              options={abonnements}
              getOptionSelected={(option) =>  option['id']}
              getOptionLabel={(option) =>  option['name']}
              renderInput={(params) => <TextField {...params}  label="Abonnement Type" name="activity" variant="outlined" fullWidth />}
            />
      </div>
    <div className="h-80 mt-3">
         {/* <PageTitle activeMenu="Planning" motherMenu="App" /> */}
         <div>
        { showCreneau &&
        <Col lg={12}>
          <Card>
            
            {/* <Card.Body> */}
            <Table responsive bordered className="verticle-middle">
              <tr>
                <th style={{verticalAlign: "middle", width: "150px", border: ' 1px solid #000000'}}>
                      <h4>Dimanche</h4>
                </th>
                <td>
                  <div>
                { dimanche.map(day=>   ( 
                     <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                      const creneauId = creneaux.indexOf(day.id)
                      if (creneauId !== -1) {
                        const neawCren = creneaux.filter(cren => cren !== day.id)
                        setCreneaux(neawCren) 
                      } else{
                        setCreneaux([...creneaux, day.id]) 
                      }}}>
                        <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'} style={{backgroundColor: day.color}}>
                          <h6 style={{color: "#ffffff"}}  > {day.hour_start}
                          <span> - </span> 
                          {day.hour_finish}</h6> 
                          <p style={{color: "#ffffff"}}>-{day.coach_name}- {day.activity}</p> 
                        </div>
                      </td> 
                    ))}
                    </div>
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Lundi</h4>
                </th>
                <td style={{ padding: '3px'}}>

                <div>
                { lundi.map(day=>   ( 
                     <td style={{border: "none", width: day.width}}  id={day.id} onClick={e => { 
                      const creneauId = creneaux.indexOf(day.id)
                      if (creneauId !== -1) {
                        const neawCren = creneaux.filter(cren => cren !== day.id)
                        setCreneaux(neawCren) 
                      } else{
                        setCreneaux([...creneaux, day.id]) 
                      }}}>
                         <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'}style={{backgroundColor: day.color}}>
                           <h5 style={{color: "#ffffff"}}> {day.hour_start}
                           <span> - </span> 
                           {day.hour_finish}</h5> 
                           <h6 style={{color: "#ffffff"}}>-{day.coach_name}- {day.id}</h6> 
                         </div>
                       </td> 
                      ))}
                </div>
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Mardi</h4>
                </th>
                <td>
                <div>
                { mardi.map(day=>   ( 
                      
                      <td style={{border: "none", width: day.width}}  id={day.id}  onClick={e =>  { 
                        const creneauId = creneaux.indexOf(day.id)
                        if (creneauId !== -1) {
                          const neawCren = creneaux.filter(cren => cren !== day.id)
                          setCreneaux(neawCren) 
                        } else{
                          setCreneaux([...creneaux, day.id]) 
                        }}}>
                          <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'} style={{backgroundColor: day.color}}>
                            <h5 style={{color: "#ffffff"}}> {day.hour_start}
                            <span> - </span> 
                            {day.hour_finish}</h5> 
                            <h6 style={{color: "#ffffff"}}>-{day.coach_name}- {day.id}</h6> 
                          </div>
                        </td> 
                       ))}
                </div>
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Mercredi</h4>
                </th>
                <td>
                <div>
                { mercredi.map(day=>   ( 
                    
                    <td style={{border: "none", width: day.width}}  id={day.id} onClick={e => { 
                      const creneauId = creneaux.indexOf(day.id)
                      if (creneauId !== -1) {
                        const neawCren = creneaux.filter(cren => cren !== day.id)
                        setCreneaux(neawCren) 
                      } else{
                        setCreneaux([...creneaux, day.id]) 
                      }}}>
                        <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'} style={{backgroundColor: day.color}}>
                          <h5 style={{color: "#ffffff"}}> {day.hour_start}
                          <span> - </span> 
                          {day.hour_finish}</h5> 
                          <h6 style={{color: "#ffffff"}}>-{day.coach_name}- {day.id}</h6> 
                        </div>
                      </td> 
                     ))}
                </div>
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Jeudi</h4>
                </th>
                <td>
                <div>
                { jeudi.map(day=>   ( 
                     
                     <td style={{border: "none", width: day.width}}  id={day.id} onClick={e =>  { 
                      const creneauId = creneaux.indexOf(day.id)
                      if (creneauId !== -1) {
                        const neawCren = creneaux.filter(cren => cren !== day.id)
                        setCreneaux(neawCren) 
                      } else{
                        setCreneaux([...creneaux, day.id]) 
                      }}}>
                         <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'} style={{backgroundColor: day.color}}>
                           <h5 style={{color: "#ffffff"}}> {day.hour_start}
                           <span> - </span> 
                           {day.hour_finish}</h5> 
                           <h6 style={{color: "#ffffff"}}>-{day.coach_name}- {day.id}</h6> 
                         </div>
                       </td> 
                      ))}
                </div>
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Vendredi</h4>
                </th>
                <td>
                <div>
                { vendredi.map(day=>   ( 
                     <td style={{border: "none", width: day.width}}  id={day.id} onClick={e =>  { 
                      const creneauId = creneaux.indexOf(day.id)
                      if (creneauId !== -1) {
                        const neawCren = creneaux.filter(cren => cren !== day.id)
                        setCreneaux(neawCren) 
                      } else{
                        setCreneaux([...creneaux, day.id]) 
                      }}}>
                         <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'} style={{backgroundColor: day.color}}>
                           <h5 style={{color: "#ffffff"}}> {day.hour_start}
                           <span> - </span> 
                           {day.hour_finish}</h5> 
                           <h6 style={{color: "#ffffff"}}>-{day.coach_name}- {day.id}</h6> 
                         </div>
                       </td> 
                      ))}
                </div>
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Samedi</h4>
                </th>
                <td>
                <div>
                { samedi.map(day=>   ( 
                    
                    <td style={{border: "none", width: day.width}}  id={day.id} onClick={e =>  { 
                      const creneauId = creneaux.indexOf(day.id)
                      if (creneauId !== -1) {
                        const neawCren = creneaux.filter(cren => cren !== day.id)
                        setCreneaux(neawCren) 
                      } else{
                        setCreneaux([...creneaux, day.id]) 
                      }}}>
                        <div className={changingStyle(day.id) ? 'selected-creneau fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded': 'fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded'} style={{backgroundColor: day.color}}>
                          <h5 style={{color: "#ffffff"}}> {day.hour_start}
                          <span> - </span> 
                          {day.hour_finish}</h5> 
                          <h6 style={{color: "#ffffff"}}>-{day.coach_name}- {day.id}</h6> 
                        </div>
                      </td> 
                     ))}
                </div>
                </td>
              </tr>
              </Table>
              <div>
              
              
              </div>
                
                      
          </Card>
        </Col>
          }
         
         </div>
      </div>
      <Button
            onClick={handleShow}
            variant="danger light"
            className='m-2'
            >
            Fermer
        </Button>
        <Button variant="primary" type="submit">Valider</Button>
      </form>

     </Modal.Body>

    </Modal>
)

}
export default ABCCreateModal;