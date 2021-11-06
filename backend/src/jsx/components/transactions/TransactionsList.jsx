import React, { Fragment , useState, useEffect} from "react";
import PageTitle from "../../layouts/PageTitle";
import { Dropdown } from "react-bootstrap";
import axios from 'axios';
import Search from "../../layouts/Search";

/// Transaction Modal
// import TransactionCreateModal from './TransactionCreateModal';
import PaiementCreateModal from './PaiementCreateModal';
import RemunerationCoachModal from './RemunerationCoachModal';
import AssuranceCreateModal from './AssuranceCreateModal';
import RemunerationPersonnelModal from './RemunerationPersonnelModal';
import AutreCreateModal from './AutreCreateModal';
// import DetteCreateModal from './DetteCreateModal';
/// images 
import avartar5 from "../../../images/avatar/5.png";
import avartar1 from "../../../images/avatar/1.png";
import { Link } from "react-router-dom";
import { useGetAPI } from '../useAPI'
import { transformToNestObject } from "react-hook-form";




function refreshPage() {
   window.location.reload(false);
 }
 const removeObject = async (props) => {
   let endpoint = `${process.env.REACT_APP_API_URL}/transactions/delete/`
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
               <Dropdown.Item href={`/client/edit/${props.id}`}>Modifier</Dropdown.Item>
               <Dropdown.Item type='button' className="text-danger" onClick={ async () => {
                    await axios.delete(`${process.env.REACT_APP_API_URL}/clients/delete/${props.id}`)
                    refreshPage()
                    }}>
                   Supprimer
                </Dropdown.Item>
            </Dropdown.Menu>
         </Dropdown>
};


const TransactionList = () => {
   let endpoint = `${process.env.REACT_APP_API_URL}/transactions/`
   const [paiementModal, setPaiementModal] = useState(false);
   const [assuranceModal, setAssuranceModal] = useState(false);
   const [autreModal, setAutreModal] = useState(false);
   const [remunerationCoachModal, setRemunerationCoachModal] = useState(false);
   const [remunerationPersonnelModal, setRemunerationPersonnelModal] = useState(false);
   const [detteModal, setDetteModal] = useState(false);
   // const [modal, setModal] = useState(false);

   const [clientData, setclientData] = useState([]);
   const savedTransactions = useGetAPI(endpoint)
   console.log('els clieeents', savedTransactions);
   const capitalizeFirstLetter = (word) => {
      if (word)
          return word.charAt(0).toUpperCase() + word.slice(1);
      return '';
   };

   return (
      <Fragment>
         <PageTitle activeMenu="Liste" motherMenu="Abonnées" />
            {/* <Search name= 'Abonnée' lien= "/client/create"/> */}
            <div className="row d-flex justify-content-arround">
                  <div className="btn btn-success m-3 ml-auto" onClick={e => setPaiementModal(true) }>
                  + Paiement 
                  </div>
                  {/* <div className="btn btn-success m-3 ml-auto" onClick={e => setDetteModal(true) }>
                  + Réglement Dette 
                  </div> */}
                  <div className="btn btn-danger m-3 ml-auto" onClick={e => setRemunerationPersonnelModal(true) }>
                  + Remunération Personnel 
                  </div>
                  <div className="btn btn-info m-3 ml-auto" onClick={e => setRemunerationCoachModal(true) }>
                  + Remunération Coach
                  </div>
                  <div className="btn btn-primary m-3 ml-auto" onClick={e => setAutreModal(true) }>
                  + Autre Transaction
                  </div>
                  <div className="btn btn-primary m-3 ml-auto" onClick={e => setAssuranceModal(true) }>
                  + Assurance
                  </div>
               {/* <div>
                  <Link to='/' className="btn btn-success ml-auto">
                  + Nouvel  Transaction 
                  </Link>
               </div> */}
            </div>
         <div className="row">
            <div className="col-lg-12">
               <div className="card">
                  <div className="card-body">
                     <div className="table-responsive">
                        <table className="table mb-0 table-striped">
                           <thead>
                              <tr>
                                 {/* <th className="customer_shop"> ID </th> */}
                                 <th>Date</th>
                                 <th>montant</th>
                                 <th>Type</th>
                                 <th className="pl-5 width200"> Nom </th>
                                 <th className="pl-5 width200">Note</th>
                                 <th></th>
                              </tr>
                           </thead>
                           <tbody id="customers">
                           {savedTransactions.map(tran => (
                              <tr role="row" key={tran.id} className="btn-reveal-trigger">
                                 <td className="py-3">
                                    <Link to={`/transactions/${tran.id}`}>
                                       <div className="media d-flex align-items-center">
                                          <div className="media-body">
                                             <h5 className="mb-0 fs--1">
                                             {capitalizeFirstLetter(tran.last_modified)}
                                             </h5>
                                          </div>
                                       </div>
                                    </Link>
                                 </td>
                           
                                 <td className="py-2">
                                     
                                    
                                    <h5 style={
                                       tran.type === 'remunerationProf' || tran.type === 'remuneration'  ? {color: '#FF2E2E'} : tran.type === 'paiement' || tran.type === 'assurance' ? {color: '#24a247'} :  {color: '#000000'}
                                       
                                       
                                       }>{tran.amount}</h5>
                                    
                                 </td>
                                 <td className="py-2">
                                  {tran.type === 'remunerationProf' ? 'Rémuneration Coach' : capitalizeFirstLetter(tran.type)} 
                                 </td>
                                     { tran.coach &&
                                       <td className="py-2 pl-5 wspace-no">
                                          <Link to={`/coach/${tran.coach.id}`} >
                                             {tran.coach.name} 
                                          </Link> 
                                       </td>
                                     }

                                     {tran.client && 
                                       <td className="py-2 pl-5 wspace-no"> 
                                          <Link to={`/client/${tran.client.id}`} >
                                             {tran.client.name}  
                                          </Link> 
                                       </td>
                                     }

                                       {tran.type === 'autre' &&
                                             <td className="py-2 pl-5 wspace-no"> 
                                             --
                                             </td>
                                       }
                                 <td className="py-2 pl-5"> {tran.notes} </td>
                                 {/* <td className="py-2">30/03/2018</td> */}
                                 <td className="py-2 text-right">
                                    <Drop id={tran.id}/>
                                 </td>
                              </tr>
                              ))}
                              </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
            {/* <TransactionCreateModal show={modal} onShowShange={setModal}/> */}
            <PaiementCreateModal show={paiementModal} onShowShange={setPaiementModal}/>
            <RemunerationCoachModal show={remunerationCoachModal} onShowShange={setRemunerationCoachModal}/>
            <AssuranceCreateModal show={assuranceModal} onShowShange={setAssuranceModal}/>
            <RemunerationPersonnelModal show={remunerationPersonnelModal} onShowShange={setRemunerationPersonnelModal}/>
            <AutreCreateModal show={autreModal} onShowShange={setAutreModal}/>
         </div>
      </Fragment>
   );
};

export default TransactionList;
