import React, { useState , useEffect, useContext} from "react";
import { useGetAPI, usePutAPI } from '../useAPI'
import axios from 'axios';
import CreneauEditModal from './CreneauEditModal';
import CreneauCreateModal from './CreneauCreateModal';
import {
   Row,
   Col,
   Card,
   Table,
   Badge,
   Dropdown,
   ProgressBar,
   Button,
   Modal,
 } from "react-bootstrap";
import { Link } from "react-router-dom";

import PageTitle from "../../layouts/PageTitle";
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const ModalState = React.createContext()


let sallesEnd = `${process.env.REACT_APP_API_URL}/salle-activite/`
let coachEnd = `${process.env.REACT_APP_API_URL}/coach/`
let planningEND = `${process.env.REACT_APP_API_URL}/planning/`
let activitiesEnd = `${process.env.REACT_APP_API_URL}/salle-activite/activite`
const Calendar = () => {
  const activities = useGetAPI(activitiesEnd)
  const coachs = useGetAPI(coachEnd)
  const plannings = useGetAPI(planningEND)
  const salles = useGetAPI(sallesEnd)

  const [modal, setModal] = useState(false);
  const [modalCreate, setModalCreate] = useState(false);

  const [salle, setSalle] = useState(salles[0]);

  const [samedi, setSamedi] = useState([]);
  const [dimanche, setDimanche] = useState([]);
  const [lundi, setLundi] = useState([]);
  const [mardi, setMardi] = useState([]);
  const [mercredi, setMercredi] = useState([]);
  const [jeudi, setJeudi] = useState([]);
  const [vendredi, setVendredi] = useState([]);

  const [selectedCreneau, setSelectedCreneau] = useState("")
  const [creneauActi, setCreneauActi] = useState("")
  const [creneauCoach, setCreneauCoach] = useState("")
  const [creneauPlanning, setCreneauPlanning] = useState("")
  const [creneauDay, setCreneauDay] = useState("")
  const [startHour, setStartHour] = useState("")
  const [endHour, setEndHour] = useState("")
  const [clients, setClients] = useState([])

  
    let result1=[]
    let result2=[]
    let result3=[]
    let result4=[]
    let result5=[]
    let result6=[]
    let result7=[]

    const  DAYS_CHOICES = [
      {day :'SA', label : 'Samedi'},
      {day :'DI', label : 'Dimanche'},
      {day :'LU', label : 'Lundi'},
      {day :'MA', label : 'Mardi'},
      {day :'ME', label : 'Mercredi'},
      {day :'JE', label : 'Jeudi'},
      {day :'VE', label : 'Vendredi'},
]
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_URL}/creneau/by-salle?salle=${salle}`)
  .then(function (response) {

    console.log('salle',salle);
    response.data.forEach((req) => {
         if (req.day == "SA") {
                console.log('req.day', req.day);
                result1.push(req);
              }else if(req.day== "DI"){
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
                  console.log('req.dsdcvdcvscay', result1);
                  setSamedi(result1)
                  setDimanche(result2)
                  setLundi(result3)
                  setMardi(result4)
                  setMercredi(result5)
                  setJeudi(result6)
                  setVendredi(result7)
                })
  
}, [salle]);

  console.log('sected creneaux', selectedCreneau);

const handleSelectedCreneau = (e) => {
  setSelectedCreneau(e.target.name)
  setModal(true)
}

 const getActivity = (acti,creneauActi) => {
  console.log('acti w acti', acti);
  console.log('creneau w creneau', creneauActi);
  for (let i = 0; i < acti.length; i++) {
    if (creneauActi == acti[i].id){
       return i
      }            
  }
}
const getDay = (days,creneauDay) => {
  console.log('acti w acti', days);
  console.log('creneau w creneau', creneauDay);
  for (let i = 0; i < days.length; i++) {
    if (creneauDay == days[i].day){
      console.log('the day is :', creneauDay);
       return i
      }            
  }
}

   return (
      <div className="h-80">
         <PageTitle activeMenu="Planning" motherMenu="App" />
         <div>
          <div className="row d-flex justify-content-between mb-5">
             <div className="col-4">
             <label>PLanning par Salle</label>
              <select   name="activities" className="form-control" onChange={e => setSalle(e.target.value)  }>
                {salles.map( salle => (
                  <option value={salle.id} name={salle.name}>{salle.name}</option>
                ))}
              </select>
             </div>
            <div className="btn btn-primary m-3 ml-auto" onClick={e => setModalCreate(true)  }>
                    + Creneau 
            </div>
          </div>
         <Col lg={12}>
          <Card>
            
            {/* <Card.Body> */}
            <Table responsive bordered className="verticle-middle calendar">
              <tr>
                <th style={{verticalAlign: "middle", width: "130px"}}>
                      <h4>Dimanche</h4>
                </th>
                <td>
                { dimanche.map(day=>   ( 
                  
                   <td style={{border: "none"}}  id={day.id}  onClick={e => {
                     setModal(true) 
                     setSelectedCreneau(day.id)
                     setCreneauActi(getActivity(activities, day.activity))
                     setCreneauCoach(getActivity(coachs, day.coach))
                     setCreneauPlanning(getActivity(plannings, day.planning))
                     setCreneauDay(getDay(DAYS_CHOICES, day.day))
                     setStartHour(day.hour_start)
                     setEndHour(day.hour_finish)
                     setClients(day.clients)
                    }
                     }>
                        <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5> {day.hour_start}<span> - </span> {day.hour_finish}</h5> 
                          <ul className='text-left'>
                           <li>  {day.coach_name}</li>
                           <li> {day.clients_count} Abonné</li>
                           <li>{day.activtiy_name}</li>
                          </ul> 
                        </div>
                    </td> 
                    ))}

                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Lundi</h4>
                </th>
                <td style={{ padding: '3px'}}>
                { lundi.map(day=>   ( 
                     
                     <td style={{border: "none"}}  id={day.id}  onClick={e => {
                    setModal(true) 
                    setSelectedCreneau(day.id)
                    setCreneauActi(getActivity(activities, day.activity))
                    setCreneauCoach(getActivity(coachs, day.coach))
                    setCreneauPlanning(getActivity(plannings, day.planning))
                    setCreneauDay(getDay(DAYS_CHOICES, day.day))
                    setStartHour(day.hour_start)
                    setEndHour(day.hour_finish)
                    setClients(day.clients)
                   }
                    }>
                       <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5> {day.hour_start}<span> - </span> {day.hour_finish}</h5> 
                          <ul className='text-left'>
                           <li>  {day.coach_name}</li>
                           <li> {day.clients_count} Abonné</li>
                           <li>{day.activtiy_name}</li>
                          </ul> 
                        </div>
                     </td> 
                    ))}
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Mardi</h4>
                </th>
                <td>
                { mardi.map(day=>   ( 
                      
                      <td style={{border: "none"}}  id={day.id}  onClick={e => {
                    setModal(true) 
                    setSelectedCreneau(day.id)
                    setCreneauActi(getActivity(activities, day.activity))
                    setCreneauCoach(getActivity(coachs, day.coach))
                    setCreneauPlanning(getActivity(plannings, day.planning))
                    setCreneauDay(getDay(DAYS_CHOICES, day.day))
                    setStartHour(day.hour_start)
                    setEndHour(day.hour_finish)
                    setClients(day.clients)
                   }
                    }>
                       <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5> {day.hour_start}<span> - </span> {day.hour_finish}</h5> 
                          <ul className='text-left'>
                           <li>  {day.coach_name}</li>
                           <li> {day.clients_count} Abonné</li>
                           <li>{day.activtiy_name}</li>
                          </ul> 
                        </div>
                     </td> 
                    ))}
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Mercredi</h4>
                </th>
                <td>
                { mercredi.map(day=>   ( 
                    
                    <td style={{border: "none"}}  id={day.id}  onClick={e => {
                    setModal(true) 
                    setSelectedCreneau(day.id)
                    setCreneauActi(getActivity(activities, day.activity))
                    setCreneauCoach(getActivity(coachs, day.coach))
                    setCreneauPlanning(getActivity(plannings, day.planning))
                    setCreneauDay(getDay(DAYS_CHOICES, day.day))
                    setStartHour(day.hour_start)
                    setEndHour(day.hour_finish)
                    setClients(day.clients)
                   }
                    }>
                      <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5> {day.hour_start}<span> - </span> {day.hour_finish}</h5> 
                          <ul className='text-left'>
                           <li>  {day.coach_name}</li>
                           <li> {day.clients_count} Abonné</li>
                           <li>{day.activtiy_name}</li>
                          </ul> 
                        </div>
                     </td> 
                    ))}
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Jeudi</h4>
                </th>
                <td>
                { jeudi.map(day=>   ( 
                     
                    <td style={{border: "none"}}  id={day.id}  onClick={e => {
                    setModal(true) 
                    setSelectedCreneau(day.id)
                    setCreneauActi(getActivity(activities, day.activity))
                    setCreneauCoach(getActivity(coachs, day.coach))
                    setCreneauPlanning(getActivity(plannings, day.planning))
                    setCreneauDay(getDay(DAYS_CHOICES, day.day))
                    setStartHour(day.hour_start)
                    setEndHour(day.hour_finish)
                    setClients(day.clients)
                   }
                    }>
                       <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5> {day.hour_start}<span> - </span> {day.hour_finish}</h5> 
                          <ul className='text-left'>
                           <li>  {day.coach_name}</li>
                           <li> {day.clients_count} Abonné</li>
                           <li>{day.activtiy_name}</li>
                          </ul> 
                        </div>
                     </td> 
                    ))}
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Vendredi</h4>
                </th>
                <td>
                { vendredi.map(day=>   ( 
                     
                     <td style={{border: "none"}}  id={day.id}  onClick={e => {
                    setModal(true) 
                    setSelectedCreneau(day.id)
                    setCreneauActi(getActivity(activities, day.activity))
                    setCreneauCoach(getActivity(coachs, day.coach))
                    setCreneauPlanning(getActivity(plannings, day.planning))
                    setCreneauDay(getDay(DAYS_CHOICES, day.day))
                    setStartHour(day.hour_start)
                    setEndHour(day.hour_finish)
                    setClients(day.clients)
                   }
                    }>
                      <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5> {day.hour_start}<span> - </span> {day.hour_finish}</h5> 
                          <ul className='text-left'>
                           <li>  {day.coach_name}</li>
                           <li> {day.clients_count} Abonné</li>
                           <li>{day.activtiy_name}</li>
                          </ul> 
                        </div>
                     </td> 
                    ))}
                </td>
              </tr>
              <tr>
                <th style={{verticalAlign: "middle"}}>
                      <h4>Samedi</h4>
                </th>
                <td>
                { samedi.map(day=>   ( 
                    
                   <td style={{border: "none"}}  id={day.id}  onClick={e => {
                    setModal(true) 
                    setSelectedCreneau(day.id)
                    setCreneauActi(getActivity(activities, day.activity))
                    setCreneauCoach(getActivity(coachs, day.coach))
                    setCreneauPlanning(getActivity(plannings, day.planning))
                    setCreneauDay(getDay(DAYS_CHOICES, day.day))
                    setStartHour(day.hour_start)
                    setEndHour(day.hour_finish)
                    setClients(day.clients)
                   }
                    }>
                      <div className="fc-event-calendar mt-0 ml-0 mb-2 btn btn-block rounded" style={{backgroundColor: day.color}}>
                          <h5> {day.hour_start}<span> - </span> {day.hour_finish}</h5> 
                          <ul className='text-left'>
                           <li>  {day.coach_name}</li>
                           <li> {day.clients_count} Abonné</li>
                           <li>{day.activtiy_name}</li>
                          </ul> 
                        </div>
                     </td> 

                    ))}
                </td>
              </tr>
              </Table>
              <div>
              
              <CreneauCreateModal show={modalCreate} onShowShange={setModalCreate} 
                creneauData={{
                creneauId : selectedCreneau,
                activite :creneauActi,
                activities : activities,
                coach : creneauCoach,
                planning: creneauPlanning,
                coachs: coachs,
                plannings: plannings,
                days : DAYS_CHOICES,
                day : creneauDay ,
                startHour: startHour,
                endHour: endHour, 
                clients : clients
                }} 
              />
              <CreneauEditModal show={modal} onShowShange={setModal} creneauData={{
                      creneauId : selectedCreneau,
                      activite :creneauActi,
                      activities : activities,
                      coach : creneauCoach,
                      planning: creneauPlanning,
                      coachs: coachs,
                      plannings: plannings,
                      days : DAYS_CHOICES,
                      day : creneauDay ,
                      startHour: startHour,
                      endHour: endHour, 
                      clients : clients
                      }} />
              </div>
                
                      
          </Card>
        </Col>
         </div>
      </div>
   );
};

export default Calendar;
