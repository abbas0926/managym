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

    const today = new Date().toISOString().slice(0, 10)
    const [samedi, setSamedi] = useState([]);

    const [startDate, setStartDate] = useState(today);

    const [dimanche, setDimanche] = useState([]);
    const [lundi, setLundi] = useState([]);
    const [mardi, setMardi] = useState([]);
    const [mercredi, setMercredi] = useState([]);
    const [jeudi, setJeudi] = useState([]);
    const [vendredi, setVendredi] = useState([]);

    const [abonnements, setAbonnements] = useState([]);
    
    const [tousLesCreneaux, setTousLesCreneaux] = useState([]);
    
    const [creneaux, setCreneaux] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    // const [day, setDay] = useState([]);
    // const [startDay, setStartDay] = useState(today);
    const [dureeAbonnement, setDureeAbonnement] = useState('');

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
    // console.log('the daaaaaays', selectedDays);
    // console.log('the iduuuuuuus', creneaux);

    useEffect(() => {

      if (show == true) {
        axios.get(abonnementEND).then(res =>{
          setAbonnements(res.data)
          setDureeAbonnement(res.data.number_of_days)
        })
      }
    }, [show]);


    useEffect(() => {
      
      if (showCreneau == true) {
        axios.get(creneauPerAbonnementEND).then(res =>{
          console.log('creneaux end', res.data);
          setTousLesCreneaux(res.data)
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

    const getSelectedDays = (creneauxIds, tousLesCreneaux) => {
      const days = []
      for (let i = 0; i < creneauxIds.length; i++) {
        const item = creneauxIds[i];
        for (let j = 0; j < tousLesCreneaux.length; j++) {
          const element = tousLesCreneaux[j];
          if (item == element.id ) {
            days.push(element.day)
          }
          
        }
        
      }
      return days
    }

function getDayIndex(day){ // this function returns the index of the currente day in the list of days
  switch (day) {
    case 'SA':
        return 6
    case 'DI':
        return 0
    case 'LU':
        return 1
    case 'MA':
        return 2
    case 'ME':
        return 3
    case 'JE':
        return 4
    case 'VE':
        return 5
  }
  
  }
    const getLastSelectedDay = (startDate, selectedDays) => {
      // let resultDate = new Date(startDate);
      var resultDate = new Date(startDate.getTime());
      const biggestDate = new Date() 
      for (let i = 0; i < selectedDays.length; i++) {
        // const day = selectedDays[i];
        const dayInd = getDayIndex(selectedDays[i])

        const dateResult = resultDate.setDate(startDate.getDate() + (7 + dayInd - startDate.getDay()) % 7);
        if (dateResult > biggestDate) {
         const biggestDate = dateResult
        }
      }
      return biggestDate.getDay();
    }
    const calculeDateFinABC = (startDate, dayOfWeek, nombreDeSemaine) => {

    }




    const handleSubmit = e => {
console.log('getLastSelectedDay',getLastSelectedDay(new Date(), getSelectedDays(creneaux, tousLesCreneaux)));
console.log('selected creeneaux',creneaux);
console.log('selected getSelectedDays(creneaux, tousLesCreneaux)',getSelectedDays(creneaux, tousLesCreneaux));

      e.preventDefault();
        const newABC = {
          client :Number(clientId),
          type_abonnement :Number(selectAbonnement),
          creneaux :creneaux,
        
        }
        console.log(" =================> new Creneau ", newABC);
        // axios.post(abonnementClientCreateEND, newABC)
        // refreshPage()
        // setCreneaux([])
        // setShowCreneau(false)
        // handleShow()
      }
// -------------------------------------- start abonnement calculation



return ( 

    <Modal  className="fade bd-example-modal-lg" size="xl" show={show}>
    <Modal.Header>
      <Modal.Title>Creer un nouvel abonnement pour : {clientId}</Modal.Title>
      <Button variant="" className="close" onClick={handleShow} > <span>&times;</span></Button>
    </Modal.Header>
    <Modal.Body>
        <form onSubmit={handleSubmit}>
        <div className="row">
              <div className="form-group col-md-6">
              <label>Abonnement Type</label>

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
                      renderInput={(params) => <TextField {...params}  label="..." name="activity" variant="outlined" fullWidth />}
                    />
              </div>
              <div className="form-group col-md-6">
                <label>Date de début</label>
                <input type="date" name="start_date"  value={startDate} className="form-control" onChange={e => setStartDate(e.target.value)}/>
              </div>
      </div>
      <div className="row">
          <label>Selectionner tout</label>
          <input className="h-80 ml-3" type="checkbox"/>
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
                      }
                      
                      }}>
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
                     <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                      const creneauId = creneaux.indexOf(day.id)
                      const creneauDay = selectedDays.indexOf(day.day)
                      if (creneauId !== -1) {
                        const neawCren = creneaux.filter(cren => cren !== day.id)
                        setCreneaux(neawCren) 
                      } else{
                        setCreneaux([...creneaux, day.id]) 
                      }
                      if (creneauDay !== -1) {
                        const neawdays = selectedDays.filter(cren => cren !== day.day)
                        setSelectedDays(neawdays) 
                      } else{
                        setSelectedDays([...selectedDays, day.day]) 
                      }

                      }}>
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
                      <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                        const creneauId = creneaux.indexOf(day.id)
                        const creneauDay = selectedDays.indexOf(day.day)
                        if (creneauId !== -1) {
                          const neawCren = creneaux.filter(cren => cren !== day.id)
                          setCreneaux(neawCren) 
                        } else{
                          setCreneaux([...creneaux, day.id]) 
                        }
                        if (creneauDay !== -1) {
                          const neawdays = selectedDays.filter(cren => cren !== day.day)
                          setSelectedDays(neawdays) 
                        } else{
                          setSelectedDays([...selectedDays, day.day]) 
                        }
  
                        }}>
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
                   <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                    const creneauId = creneaux.indexOf(day.id)
                    const creneauDay = selectedDays.indexOf(day.day)
                    if (creneauId !== -1) {
                      const neawCren = creneaux.filter(cren => cren !== day.id)
                      setCreneaux(neawCren) 
                    } else{
                      setCreneaux([...creneaux, day.id]) 
                    }
                    if (creneauDay !== -1) {
                      const neawdays = selectedDays.filter(cren => cren !== day.day)
                      setSelectedDays(neawdays) 
                    } else{
                      setSelectedDays([...selectedDays, day.day]) 
                    }

                    }}>
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
                     <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                      const creneauId = creneaux.indexOf(day.id)
                      const creneauDay = selectedDays.indexOf(day.day)
                      if (creneauId !== -1) {
                        const neawCren = creneaux.filter(cren => cren !== day.id)
                        setCreneaux(neawCren) 
                      } else{
                        setCreneaux([...creneaux, day.id]) 
                      }
                      if (creneauDay !== -1) {
                        const neawdays = selectedDays.filter(cren => cren !== day.day)
                        setSelectedDays(neawdays) 
                      } else{
                        setSelectedDays([...selectedDays, day.day]) 
                      }

                      }}>
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
                    <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                      const creneauId = creneaux.indexOf(day.id)
                      const creneauDay = selectedDays.indexOf(day.day)
                      if (creneauId !== -1) {
                        const neawCren = creneaux.filter(cren => cren !== day.id)
                        setCreneaux(neawCren) 
                      } else{
                        setCreneaux([...creneaux, day.id]) 
                      }
                      if (creneauDay !== -1) {
                        const neawdays = selectedDays.filter(cren => cren !== day.day)
                        setSelectedDays(neawdays) 
                      } else{
                        setSelectedDays([...selectedDays, day.day]) 
                      }

                      }}>
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
                    <td style={{border: "none", width: day.width, maxWidth: '300px', padding : '6px'}}  key={day.id}  onClick={e => { 
                      const creneauId = creneaux.indexOf(day.id)
                      const creneauDay = selectedDays.indexOf(day.day)
                      if (creneauId !== -1) {
                        const neawCren = creneaux.filter(cren => cren !== day.id)
                        setCreneaux(neawCren) 
                      } else{
                        setCreneaux([...creneaux, day.id]) 
                      }
                      if (creneauDay !== -1) {
                        const neawdays = selectedDays.filter(cren => cren !== day.day)
                        setSelectedDays(neawdays) 
                      } else{
                        setSelectedDays([...selectedDays, day.day]) 
                      }

                      }}>
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