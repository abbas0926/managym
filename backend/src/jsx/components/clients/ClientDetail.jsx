import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";
// import productData from "../productData";
import { ToastContainer, toast } from 'react-toastify'

import axios from 'axios';
import { useGetAPI } from '../useAPI'
import { Dropdown, Tab, Nav, Button } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { notifyTopRight } from '../widgets/alertes'
import product1 from "../../../images/product/1.jpg";
import Search from "../../layouts/Search";
import ModalEdit from "../widgets/Modal"
import { createContext } from "react";
import ABCCreateModal from './ABCCreateModal';
import PaiementModal from './PaiementModal'
import RenewAbonnementModal from './RenewAbonnementModal'
const ProductDetail = (props) => {
   const [client, setClient] = useState({});
   const [aBCmodalCreate, setABCModalCreate] = useState(false);
   const [paiementModal, setPaiementModal] = useState(false);
   const [abonDetailModal, setAbonDetailModal] = useState(false);
   const [abonClient, setAbonClient] = useState([]);
   const [transClient, setTransClient] = useState([]);
   const [presencesClient, setPresnecesClient] = useState([]);
   const [creneauxClient, setCreneauxClient] = useState([]);
   const [abonClientID, setAbonClientID] = useState("");
   const [abonClientType, setAbonClientType] = useState("");
   const [abonClientTypeName, setAbonClientTypeName] = useState("");
   
   const [abonClientEnd, setAbonClientEnd] = useState("");
   const [abonClientpresences, setAbonClientpresences] = useState("");
   const [abonnementClientCreneaux, setAbonnementClientCreneaux] = useState([]);
   
   const clientId = props.match.params.id;
  const presenceCreateEND = `${process.env.REACT_APP_API_URL}/presence/create`
  const transactionClientEND = `${process.env.REACT_APP_API_URL}/clients-transactions/${clientId}`
  const creneauClientEND = `${process.env.REACT_APP_API_URL}/creneau/by-client?cl=${clientId}`
const presnecesClientEND = `${process.env.REACT_APP_API_URL}/presence/client/?cl=${clientId}`
  // console.log('les trnasactions ',transactions);
  // console.log('le id de labonnd client est ', abonnementClientCreneaux);

  const addPresence = () => {
    const clientData =  {
      client : Number(clientId)
    }

    axios.post(presenceCreateEND, clientData)
    .catch (e => {

      alert('le client avec ID :',clientId,"n'a pas le droit d'assisté a ce")
    })
  }
  useEffect(() => {
    //  const clientId = props.match.params.id;
     const fetchData = async () => {
        try {
           const res = await axios.get(creneauClientEND);
           setCreneauxClient(res.data)
 
            // console.log('ghirrrr =creneauxClient', creneauxClient);
        } catch (error) {
           console.log(error, 'erreur presneces');
        }
     }
     fetchData();
  }, [props.match.params.id] );

  useEffect(() => {
    //  const clientId = props.match.params.id;
     const fetchData = async () => {
        try {
           const res = await axios.get(presnecesClientEND);
           setPresnecesClient(res.data)
 
            // console.log('ghirrrr =Presneces', presencesClient);
        } catch (error) {
           console.log(error, 'erreur presneces');
        }
     }
     fetchData();
  }, [props.match.params.id] );
  useEffect(() => {
    //  const clientId = props.match.params.id;
     const fetchData = async () => {
        try {
           const res = await axios.get(transactionClientEND);
           setTransClient(res.data.transactions)
 
            // console.log('ghirrrr =transClient', transClient);
        } catch (error) {
           console.log(error);
        }
     }
     fetchData();
  }, [props.match.params.id] );
  
  useEffect(() => {
    //  const clientId = props.match.params.id;
     const fetchData = async () => {
        try {
           const res = await axios.get(`${process.env.REACT_APP_API_URL}/abonnement-by-client/?cl=${clientId}`);
           setAbonClient(res.data)
          //  console.log('ceci est le resultat de labonnement client ', res.data);
        } catch (error) {
           console.log(error);
        }
     }
     fetchData();
  }, [props.match.params.id] );
useEffect(() => {
  //  const clientId = props.match.params.id;
   const fetchData = async () => {
      try {
         const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients/${clientId}/`);
         setClient(res.data);
      } catch (error) {
         console.log(error);
      }
   }
   fetchData();
}, [props.match.params.id] );

const capitalizeFirstLetter = (word) => {
   if (word)
       return word.charAt(0).toUpperCase() + word.slice(1);
   return '';
};

  return (
    <>

      <div className="page-titles">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/client">Clients</Link>
          </li>
          <li className="breadcrumb-item active">
            <Link to="#">ID: {client.id} - {client.last_name}</Link>
          </li>
        </ol>
      </div>
      {/* <button
                onClick={notifyTopRight}
                type='button'
                className='btn btn-dark mb-2 mr-2'
                id='toastr-success-top-right'
              >
                <ToastContainer
                  position='top-right'
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
                Top Right
              </button> */}
      <div className="row">
        
      <div className="col-xl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-primary">
            <div className="card-body  p-4">
                <div className="media">
                  <span className="mr-3 ajouter"onClick= { e => setABCModalCreate(true)} >
                      <h1 style={{color:'#ffffff', fontSize: '60px', marginTop:'5px'}} >+</h1>
                  </span>
                  <div className="media-body text-white">
                    <h3 className="text-white">Abonnement</h3>
                    <div className="progress mb-2 bg-secondary">
                      <div
                        className="progress-bar progress-animated bg-light"
                        style={{ width: "100%" }}
                      ></div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-primary">
            <div className="card-body  p-4">
              <div className="media">
                <span className="mr-3 ajouter" onClick={ e => addPresence(clientId)}>
                  <h1 style={{color:'#ffffff', fontSize: '60px', marginTop:'5px'}} >+</h1>
                </span>
                <div className="media-body text-white">
                  <h3 className="text-white">Présence</h3>
                  <div className="progress mb-2 bg-secondary">
                    <div
                      className="progress-bar progress-animated bg-light"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-success">
            <div className="card-body  p-4">
              <div className="media">
                <span className="mr-3 ajouter" onClick= { e => setPaiementModal(true)}>
                  <h1 style={{color:'#ffffff', fontSize: '60px', marginTop:'5px'}} >+</h1>
                </span>
                <div className="media-body text-white">
                  <h3 className="text-white">Paiement</h3>
                  <div className="progress mb-2 bg-secondary">
                    <div
                      className="progress-bar progress-animated bg-light"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-sm-6">
          <div className="widget-stat card bg-danger">
            <div className="card-body  p-4">
              <div className="media">
                <div className='d-block'>
                <h3 className="text-white ">Dettes</h3>
                </div>
                  
                  
                  <br/>
               
              </div>
                  <div className='d-block'><h4 className="text-white">{client.dette}</h4></div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
              <div className="card-body bg-white ">
                <div className="media profile-bx">
                      <img src={client.picture} alt="" />
                      <div className="media-body align-items-center">
                        <h2 className="text-black font-w600">
                          {capitalizeFirstLetter(client.last_name)} {capitalizeFirstLetter(client.first_name)}
                        </h2>
                        <h4 className="mb-2">ID: <span className='text-danger'>{client.id}</span></h4>
                        <h6 className="text-black">
                            inscrit le : <span className="text-primary">{client.date_added}</span>
                        </h6>
                        <div className="social-icons">
                            <Link
                              to={`/client/edit/${client.id}`}
                              className="btn btn-outline-dark"
                            >
                              Modifier Profile
                            </Link>
                        </div>
                      </div>
                      
                      <div className="social-icons m-3">
                        <h6 className='text-primary'>Civilité:                   <a className="item text-dark"> {client.civility_display}</a> </h6>
                        <h6 className='text-primary'>Téléphone:                  <span className="item text-dark"><a href={`tel:${client.phone}`}> {client.phone}</a></span></h6>
                        <h6 className='text-primary'>email:                      <span className="item text-dark"><a href={`mailto:${client.email}`}> {client.email}</a></span></h6>
                        <h6 className='text-primary'>Groupe sanguin:&nbsp;&nbsp; <span className="badge badge-danger light">{client.blood}</span> </h6>
                      </div>
                      <div className="social-icons m-3">
                        <h6 className='text-primary'>Nationalité:                 <span className="item text-dark">{client.nationality}</span> </h6>
                    <h6 className='text-primary'>   Date de naissance:               <span className="item text-dark">{client.birth_date}</span> </h6>
                      </div>
                      <div className="social-icons m-3">
                        <h5 className='text-primary'>Maladies:</h5>
                        {client.maladie_name && client.maladie_name.map(maladie =>
                            <h6 key={maladie.id} class='ml-2'>{maladie.name}</h6>
                          )}
                      </div>
                  </div>
                </div>
                {/*Tab slider End*/}
                <div className="col-xl-9 col-lg-6  col-md-6 col-xxl-7 col-sm-12">
                  <div className="product-detail-content">
                    {/*Product details*/}
                    <div className="new-arrival-content pr">
                      <ul>
                        {/* 
                          { client.maladie_name.map(maladie =>
                            <div className="custom-control custom-checkbox mb-3">
                              <li className="custom-control-label" key={maladie.id} htmlFor={maladie.id}> {maladie.name}</li>
                            </div>
                          )}
                           */}
                      </ul>
                      <div className='row d-flex'>
                        <div className="shopping-cart mt-3 col- col-md-6">
                          <h4>Note :</h4>
                          <p>{client.note}</p>
                        </div>
                        <div className="shopping-cart mt-3 col- col-md-6">
                          <h4>Adresse :</h4>
                          <p>{client.adress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-12">
          <div className="card">
            <div className="card-header border-0">
              <h4 className="mb-0 text-black fs-20">Abonnements</h4>
              
            </div>
            <div className="card-body p-0">
            <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_TimeLine"
                className="widget-timeline dz-scroll height370 ps ps--active-y"
              >
              <div className="table-responsive card-table">
                <table className="table text-center bg-warning-hover">
                  <thead>
                    <tr>
                      <th className="text-left">Abonnement</th>
                      <th>Séance restante</th>
                      <th className="text-right">Date d'éxpiration</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  {abonClient.map( abonnement => (
                    <tr className='cursor-abonnement' key={abonnement.id} onClick={e => {
                      setAbonDetailModal(true)
                      setAbonClientID(abonnement.id)
                      setAbonClientType(abonnement.type_abonnement)
                      setAbonClientTypeName(abonnement.type_abonnement_name)
                      setAbonClientEnd(abonnement.end_date)
                      setAbonClientpresences(abonnement.presence_quantity)
                      setAbonnementClientCreneaux(abonnement.creneaux)
                    }}>
                      <td className="text-left">{abonnement.type_abonnement_name}</td>
                      <td>{abonnement.presence_quantity}</td>
                      <td className="text-right">{abonnement.end_date}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </PerfectScrollbar>

            </div>
            <div className="card-footer border-0 pt-0 text-center">
              <Link to="/coin-details" className="btn-link">
                Creer <i className="fa fa-caret-right ml-2 scale-2" />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-xxl-6 col-lg-6 col-md-12">
          <div className="card">
            <div className="card-header border-0">
              <h4 className="mb-0 text-black fs-20">Creneaux</h4>
              
            </div>
            <div className="card-body p-0">
            <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_TimeLine"
                className="widget-timeline dz-scroll height370 ps ps--active-y"
              >
              <div className="table-responsive card-table">
                <table className="table text-center bg-warning-hover">
                  <thead>
                    <tr>
                      <th className="text-left">Début</th>
                      <th>Fin</th>
                      <th>Jour</th>
                      <th>Activité</th>
                      <th>Coach</th>
                      {/* <th className="text-right">Total</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    
                    {creneauxClient.map(creneau => (
                      <tr key={creneau.id}>
                      <td className="text-left">{creneau.hour_start}</td>
                      {/* <td>0.18</td> */}
                      <td>{creneau.hour_finish}</td>
                      <td>{creneau.day}</td>
                      <td>{creneau.activity_name}</td>
                      <td className="text-right">{creneau.coach_name}</td>
                    </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            </PerfectScrollbar>

            </div>
            <div className="card-footer border-0 pt-0 text-center">
              <Link to="/coin-details" className="btn-link">
                Creer <i className="fa fa-caret-right ml-2 scale-2" />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-xxl-4 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-header border-0">
              <h4 className="mb-0 text-black fs-20">Transactions</h4>
              
            </div>
            <div className="card-body p-0">
            <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_TimeLine"
                className="widget-timeline dz-scroll height370 ps ps--active-y"
              >
              <div className="table-responsive card-table">
                <table className="table text-center bg-warning-hover">
                  <thead>
                    <tr>
                      <th className="text-left">Mantant</th>
                      <th>Date</th>
                      {/* <th className="text-right">Total</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    
                    {transClient.map(trans => (
                      <tr key={trans.id}>
                      <td className="text-left">{trans.amount}</td>
                      {/* <td>0.18</td> */}
                      <td className="text-right">{trans.date_creation}</td>
                    </tr>
                    ))
                    }
                  </tbody>
                </table>
              </div>
            </PerfectScrollbar>

            </div>
            <div className="card-footer border-0 pt-0 text-center">
              <Link to="/coin-details" className="btn-link">
                Creer <i className="fa fa-caret-right ml-2 scale-2" />
              </Link>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-xxl-4 col-lg-6 col-sm-6">
          <div className="card">
            <div className="card-header border-0">
              <h4 className="mb-0 text-black fs-20">Presences</h4>
              
            </div>
            <div className="card-body p-0">
            <PerfectScrollbar
                style={{ height: "370px" }}
                id="DZ_W_TimeLine"
                className="widget-timeline dz-scroll height370 ps ps--active-y"
              >
              <div className="table-responsive card-table">
                <table className="table text-center bg-warning-hover">
                  <thead>
                    <tr >
                      <th className="text-left">Entrée</th>
                      <th>Sortie</th>
                      <th className="text-right">Activité</th>
                      <th className="text-right">Date</th>
                    </tr>
                  { presencesClient.map ( presence => (
                    <tr key={presence.id}>
                      <td>{presence.hour_entree}</td>
                      <td>{presence.hour_sortie}</td>
                      <td>{presence.client_activity}</td>
                      <td className="text-right">{presence.date}</td>
                    </tr>
                  
                    ))}
                  </thead>
                  <tbody>
                    
                    
                    
                  </tbody>
                </table>
              </div>
            </PerfectScrollbar>


            </div>
            <div className="card-footer border-0 pt-0 text-center">
              <Link to="/coin-details" className="btn-link">
                Creer <i className="fa fa-caret-right ml-2 scale-2" />
              </Link>
            </div>
          </div>
        </div>
        {/* creneauData={} */}
        <ABCCreateModal show={aBCmodalCreate} onShowShange={setABCModalCreate} clientData={{clientId: clientId}} />
        <PaiementModal show={paiementModal} onShowShange={setPaiementModal} clientData={{clientId: clientId}} />
        <RenewAbonnementModal show={abonDetailModal} onShowShange={setAbonDetailModal} abonnementData={{
          clientId: clientId, 
          abonClientID: abonClientID,
          abonClientType : abonClientType,
          abonClientEnd : abonClientEnd,
          abonClientpresences : abonClientpresences,
          abonClientTypeName : abonClientTypeName,
          abonnementClientCreneaux :abonnementClientCreneaux
          }} />
      </div>
    </>
  );
};

export default ProductDetail;
