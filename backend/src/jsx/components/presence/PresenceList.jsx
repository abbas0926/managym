import React, { Fragment , useState, useEffect} from "react";
import PageTitle from "../../layouts/PageTitle";
import { Dropdown } from "react-bootstrap";
import axios from 'axios';
import Search from "../../layouts/Search";
import { Row, Card, Col, Button, Modal, Container } from "react-bootstrap";

/// images
import avartar5 from "../../../images/avatar/5.png";
import avartar1 from "../../../images/avatar/1.png";
import { Link } from "react-router-dom";
import { useGetAPI, usePostAPI } from '../useAPI'

import PresenceEditModal from './PresenceEditModal'
import PresenceCreateModal from './PresenceCreateModal'
import { set } from "date-fns";


export const ClientContext = React.createContext()
// function refreshPage() {
//    window.location.reload(false);
//  }

function refreshPage() {
   window.location.reload(false);
 }
 const removeObject = async (props) => {
   let endpoint = `${process.env.REACT_APP_API_URL}/presence/delete/`
   await axios.delete(endpoint + props.id)
  }
const Drop = (props) => {
   return <Dropdown>
            <Dropdown.Toggle variant="" className="table-dropdown i-false">
               <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                  <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                     <rect x="0" y="0" width="24" height="24"></rect>
                     <circle fill="#000000" cx="5" cy="12" r="2"></circle>
                     <circle fill="#000000" cx="12" cy="12" r="2"></circle>
                     <circle fill="#000000" cx="19" cy="12" r="2"></circle>
                  </g>
               </svg>
            </Dropdown.Toggle>
            <Dropdown.Menu>
               <Dropdown.Item href={`/presence/edit/${props.id}`}>Modifier</Dropdown.Item>
               <Dropdown.Item type='button' className="text-danger" onClick={ async () => {
                    await axios.delete(`${process.env.REACT_APP_API_URL}/presence/delete/${props.id}`)
                    refreshPage()
                    }}>
                   Supprimer
                </Dropdown.Item>
            </Dropdown.Menu>
         </Dropdown>
};

const PresenceList = () => {
const [editModal, setEditModal] = useState(false);
const [presneceCreateModal, setPresneceCreateModal] = useState(false);

   const [client, setClient ] = useState('')
   const [clientId, setClientId ] = useState('')
   const [presenceId, setPresenceId ] = useState('')
   const [hourIn, setHourIn ] = useState('') 
   const [hourOut, setHourOut ] = useState('') 
   const [creneau,setCreneau] = useState('')
   const [note, setNote] = useState('')
   const [date, setDate] = useState('')
   const [activity, setActivity] = useState('')
   let endpoint = `${process.env.REACT_APP_API_URL}/presence/`
   
   
   const [presenceData, setPresenceData] = useState([]);
   const savedPresences = useGetAPI(endpoint)
   // console.table('els clieeents', salle);
   const capitalizeFirstLetter = (word) => {
      if (word)
          return word.charAt(0).toUpperCase() + word.slice(1);
      return '';
   };
   let presenceCreateEND =  `${process.env.REACT_APP_API_URL}/presence/create`
   // let clientDetailEND =  `${process.env.REACT_APP_API_URL}/client${client}/`
   // let presenceDetailEND =  `${process.env.REACT_APP_API_URL}/presence/${presenceId}/`

   // const getIdPresence = (client) => {
   //    axios.get(`${process.env.REACT_APP_API_URL}/clients/${client}/`).then(function (res) {
   //       console.log('the last dataaa presence,', res.data.last_presence, client);
   //       setPresenceId(res.data.last_presence)
   //       // return res.data.last_presence
   //    })

   // }

   const HandleSubmit = (e) => {
         e.preventDefault();
         const clientId = {client : Number(client)}
         // getIdPresence(client)
         axios.get(`${process.env.REACT_APP_API_URL}/clients/${client}/`).then(res=> {
            if (res.data.last_presence) {
               console.log('id de la presence', res.data.last_presence);
               setPresenceId(res.data.last_presence)
               console.log('erreur lors du cposr ligne 85', presenceId);
               axios.patch( `${process.env.REACT_APP_API_URL}/presence/edit/${res.data.last_presence}/`)
            }else {
               axios.post(presenceCreateEND, clientId)
            }
         }).catch( err => {
            console.log('erreur lors du cposr',err);
         }
      )
      // refreshPage()
   }


   // const HandleSubmit = (e) => {
   //    e.preventDefault();
   //    const clientId = {client : Number(client)}
   //    // getIdPresence(client)
   //    axios.post(presenceCreateEND, clientId).then(res=> {
   //       // console.log('id de la presence', res.data.last_presence);
   //       // setPresenceId(res.data.last_presence)
   //       // console.log('erreur lors du cposr ligne 85', presenceId);
   //       // axios.patch( `${process.env.REACT_APP_API_URL}/presence/edit/${res.data.last_presence}/`)
   //    }).catch( err => {

   //       axios.get(`${process.env.REACT_APP_API_URL}/clients/${client}/`).then(res=> {
   //          console.log('id de la presence', res.data.last_presence);
   //          setPresenceId(res.data.last_presence)
   //          console.log('erreur lors du cposr ligne 85', presenceId);
   //          axios.patch( `${process.env.REACT_APP_API_URL}/presence/edit/${res.data.last_presence}/`)
   //       })
   //    }

   // )}




   return (
      <Fragment>
         <div className="form-head d-flex mb-4 mb-md-5 align-items-start">
            <div className="d-flex justify-content-between">
               <div className="  ">
                  <form onSubmit={HandleSubmit}>
                  <input type="text" className="form-control" placeholder="ID client" onChange={e => { 
                     setClient(e.target.value)                  }} />
                  </form>
               </div>
               <div className=" ml-5">
                  <Button variant="primary" type="submit" onClick={e => setPresneceCreateModal(true)}> Présence Manuelle</Button>
               </div>
            </div>
            {/* <Link  className="btn btn-primary ml-auto">
                  + Nouvel  
            </Link> */}
         </div>
         <div className="row">
            <div className="col-lg-12">
               <div className="card">
                  <div className="card-body" style={{padding: '5px'}}>
                     <div className="table-responsive">
                        <table className="table mb-0 table-striped">
                           <thead>
                              <tr>
                                 <th className="customer_shop"> ID </th>
                                 <th>Nom</th>
                                 <th>Activité</th>
                                 <th> Date </th>
                                 <th className="pl-5 width200"> Heure d'entrée </th>
                                 <th> Heure de sortie </th>
                                 <th className='text-right'>Dettes </th>
                                 {/* <th>Adhesion</th>
                                 <th></th> */}
                              </tr>
                           </thead>
                           <tbody id="customers">
                           {savedPresences.map(presence => (
                              <tr role="row presences" key={presence.id} className="btn-reveal-trigger cursor-abonnement p-0"onClick={e => {
                                 setEditModal(true)
                                 setClient(presence.client_last_name)
                                 setClientId(presence.client)
                                 setPresenceId(presence.id)
                                 setHourIn(presence.hour_entree)
                                 setHourOut(presence.hour_sortie)
                                 setCreneau(presence.creneau)
                                 setNote(presence.note)
                                 setDate(presence.date)
                                 setActivity(presence.activity)
                              }
                              }>
                                 <td className="customer_shop_single"> {presence.client} </td>
                                 <td className="">
                                    {/* <Link to={`/presence/detail/${presence.id}`}> */}
                                       <div className="media d-flex align-items-center">
                                        
                                          <div className="media-body">
                                             <h5 className="mb-0 fs--1">
                                             {presence.client_last_name}
                                             </h5>
                                          </div>
                                       </div>
                                    {/* </Link> */}
                                 </td>
                                
                                 
                                             
                                 <td className="">{presence.client_activity}</td>
                                 <td className="">{presence.date}</td>
                                 <td className=" pl-5 wspace-no"> {presence.hour_entree} </td>
                                 <td >{presence.hour_sortie}</td>
                                 <td className=" text-right text-danger">{presence.dettes}</td>
                                 {/* <td className="py-2 text-right">
                                    <Drop id={presence.id}/>
                                 </td> */}
                              </tr>
                              ))}
                              </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
            <PresenceEditModal show={editModal} onShowShange={setEditModal} presenceData={{presenceId:presenceId, client:client, hourIn:hourIn, hourOut: hourOut, creneau:creneau, note:note, clientId:clientId, date:date, activity:activity}}/>
            <PresenceCreateModal show={presneceCreateModal} onShowShange={setPresneceCreateModal} />
         </div>
      </Fragment>
   );
};

export default PresenceList;
