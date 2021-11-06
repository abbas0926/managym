import React, { Fragment, useState, useEffect } from "react";
import { Dropdown, Tab, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useGetAPI, usePutAPI } from '../useAPI'

// imeges
import bit_1 from "../../../images/svg/bitcoin-1.svg";
import bit_2 from "../../../images/svg/ethereum-1.svg";
import bit_3 from "../../../images/svg/ripple-1.svg";
import bit_4 from "../../../images/svg/litecoin-1.svg";

// Chart
import WidgetChart1 from "../Dhrev/Home/chart/WidgetChart1";
import WidetChart2 from "../Dhrev/Home/chart/WidetChart2";
import WidetChart3 from "../Dhrev/Home/chart/WidetChart3";
import WidetChart4 from "../Dhrev/Home/chart/WidetChart4";
import ActivityLine from "../Dhrev/Home/chart/ActivityLine";
import ActivityLine2 from "../Dhrev/Home/chart/ActivityLine2";
import ActivityLine3 from "../Dhrev/Home/chart/ActivityLine3";
import Donut from "../Dhrev/Home/chart/Donut";

import axios from 'axios';
import PerfectScrollbar from "react-perfect-scrollbar";

// Slider
import CardSlider from "../Dhrev/Home/slider/CardSlider";
import Contacts from "../Dhrev/Home/slider/Contacts";

import AbonnementCreateModal from './AbonnementCreateModal';
import AbonnementEditModal from './AbonnementEditModal';
import SalleActiviteCreateModal from './SalleActiviteCreateModal'
import SalleActiviteEditModal from './SalleActiviteEditModal'
import ActivityCreateModal from './ActivityCreateModal'
import ActivityEditModal from './ActivityEditModal'

const Configuration = (props) => {
    const abonnementsListEND = `${process.env.REACT_APP_API_URL}/abonnement/`
    const activitiesEND = `${process.env.REACT_APP_API_URL}/salle-activite/activite/`
    const salleActivitiesEND = `${process.env.REACT_APP_API_URL}/salle-activite/`
    
    const [ abonnements , setAbonnements] =useState([])

    const [ abonnementCreateModal , setAbonnementCreateModal] =useState(false)
    const [ salleActiviteCreateModal , setSalleActiviteCreateModal] =useState(false)
    const [ salleActiviteEditModal , setSalleActiviteEditModal] =useState(false)
    const [ abonnementEditModal , setAbonnementEditModal] =useState(false)
    const [ selectedActivities, setSelectedActivities] = useState([])
    
    const [abonnementId, setAbonnementId] = useState('')
    const [activityId, setActivityId] = useState('')
    const [salleId, setSalleId] = useState('')
    const [salleName, setSalleName] = useState('')
    const [activityCreateModal, setActivityCreateModal] = useState(false)
    const [activityEditModal, setActivityEditModal] = useState(false)

    const [color, setColor] = useState("")
    const [salle, setSalle] = useState("")
    const [activityName, setActivityName] = useState("")
    
    


    // const [activity, setActivity] = useState([])
    // const [name, setName] = useState('')
    // const [price, setPrice] = useState('')
    // const [numberOfDays, setNumberOfDays] = useState('')
    // const [seancesQuantity, setSeancesQuantity] = useState('')
    
    
    // // const [abonnementId, setAbonnementId] = useState();
    // const [abonnementDetail, setAbonnementDetail] = useState();

    const activities = useGetAPI(activitiesEND)
    const salllesActivities = useGetAPI(salleActivitiesEND)
    const getAbonnementsActitivties = (actiAbon) => {

        const provActiId = []
        const indexesList = []
        // const 
        for (let i = 0; i < activities.length; i++) {
          const element = activities[i];
          provActiId.push(element.id)
        }
        console.log(provActiId);
        for (let i = 0; i < actiAbon.length; i++) {
          const acti = actiAbon[i];
          const index = provActiId.indexOf(acti) 
          // console.log('indexes', indexes);
          indexesList.push(activities[index])
        }
        return indexesList    
    }
    const setSelectedSalle = (salles, salleId ) => {
        for (let i = 0; i < salles.length; i++) {
            if (salleId == salles[i].id){
               return i
              }            
          }
    }
 
    useEffect(() => {
        //  const clientId = props.match.params.id;
         const fetchData = async () => {
            try {
               const res = await axios.get(abonnementsListEND);
               setAbonnements(res.data)
     
                console.log('ghirrrr =creneauxClient', abonnements);
            } catch (error) {
               console.log(error, 'erreur presneces');
            }
         }
         fetchData();
      }, [props.match.params.id] );

      console.log('selected activities', selectedActivities);
   return (
      <Fragment>
         <>
            {/* <div className="form-head d-flex mb-4 mb-md-5 align-items-start">
               <div className="input-group search-area d-inline-flex">
                  <div className="input-group-append">
                     <span className="input-group-text">
                        <i className="flaticon-381-search-2" />
                     </span>
                  </div>
                  <input
                     type="text"
                     className="form-control"
                     placeholder="Search here"
                  />
               </div>
               <Link to="/" className="btn btn-primary ml-auto">
                  + Add New Cyrpto
               </Link>
            </div> */}
            <div className="row">
                <div className="col-xl-5 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Salle</h4>
                            <Button onClick={e => { setSalleActiviteCreateModal(true)}}>Ajouter</Button>

                        </div>
                        <div className="card-body">
                        <table className="table text-center bg-warning-hover">
                  <thead>
                    <tr>
                      <th>Nom de la salle </th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  {salllesActivities.map( salle => (
                    <tr className='cursor-abonnement' key={salle.id} onClick={e => {
                        setSalleActiviteEditModal(true)
                        setSalleId(salle.id)
                        setSalleName(salle.name)
                        // setSelectedActivities(getsallesActitivties(salle.activity))

                    }}>
                      <td >{salle.name}</td>
                      
                    </tr>
                  ))}
                  </tbody>
                </table>
                        </div>
                    </div>
                </div>
                {/* type abonnement va au modal */}
                <div className="col-xl-6 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Activitées</h4>
                            <Button onClick={e => { setActivityCreateModal(true)}}>Ajouter</Button>
                        </div>
                        <div className="card-body">
                            <PerfectScrollbar   style={{ height: "370px" }}   id="DZ_W_TimeLine" className="widget-timeline dz-scroll height370 ps ps--active-y" >
                                <div className="table-responsive card-table">
                                    <table className="table text-center bg-warning-hover">
                                        <thead>
                                            <tr>
                                                <th className="text-left">Nom</th>
                                                <th >Salle</th>
                                                <th>Couleur</th>
                                                
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {activities.map( activity => (
                                            <tr className='cursor-abonnement' key={activity.id} onClick={e => {
                                                setActivityEditModal(true)
                                                setActivityId(activity.id)
                                                setColor(activity.color)
                                                setActivityName(activity.name)
                                                setSalle(setSelectedSalle(salllesActivities, activity.id))
                                                
                                                           

                                            }}>
                                                <td className="text-left">{activity.name}</td>
                                                <td >{activity.salle_name}</td>
                                                
                                                <td className='m-5' >
                                                <input type="text" style={{backgroundColor: activity.color, height: '17px', width : '60px', border: 'None'}}/>
                                                </td>
                                               
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </PerfectScrollbar>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Type D'abonnement</h4>
                            <Button onClick={e => { setAbonnementCreateModal(true)}}>Ajouter</Button>
                        </div>
                        <div className="card-body">
                            <PerfectScrollbar   style={{ height: "370px" }}   id="DZ_W_TimeLine" className="widget-timeline dz-scroll height370 ps ps--active-y" >
                                <div className="table-responsive card-table">
                                    <table className="table text-center bg-warning-hover">
                                        <thead>
                                            <tr>
                                                <th className="text-left">Abonnement</th>
                                                <th>Nombre de Séance </th>
                                                <th >Nombre jours / semaine</th>
                                                <th className="text-right">Nombre d'activités'</th>
                                                <th >Inscrits</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {abonnements.map( abonnement => (
                                            <tr className='cursor-abonnement' key={abonnement.id} onClick={e => {
                                                setAbonnementEditModal(true)
                                                setAbonnementId(abonnement.id)
                                                setSelectedActivities(getAbonnementsActitivties(abonnement.activity))
                                            }}>
                                                <td className="text-left">{abonnement.name}</td>
                                                <td>{abonnement.seances_quantity}</td>
                                                <td >{abonnement.number_of_days}</td>
                                                <td className="text-right">{abonnement.activity.length}</td>
                                                <td className="text-right">{abonnement.clients_number}</td>
                                            
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </PerfectScrollbar>
                        </div>
                    </div>
                </div>
            </div>
        <div className="row">
            
        {/* <div className="col-xl-6 col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h4 className="card-title">Activités</h4>
                        </div>
                        <div className="card-body">
                            <div className="basic-form">
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Nom de la salle</label>
                                        <div className="col-sm-9">
                                        <input type="text" className="form-control" placeholder="..." />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-10">
                                            <button type="submit" className="btn btn-primary">
                                                Valider
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div> */}
                
        </div>
        <AbonnementCreateModal show={abonnementCreateModal} onShowShange={setAbonnementCreateModal} abonnementData={{abonnementId: abonnementId}} />
        <ActivityCreateModal show={activityCreateModal} onShowShange={setActivityCreateModal} activityData={{activityId: activityId, salllesActivities : salllesActivities }} />
        <ActivityEditModal show={activityEditModal} onShowShange={setActivityEditModal} activityData={{activityId: activityId, salllesActivities : salllesActivities, color:color, salle: salle, activityName: activityName, salles: salllesActivities}} />
        < SalleActiviteCreateModal  show={salleActiviteCreateModal} onShowShange={setSalleActiviteCreateModal}  />
        < SalleActiviteEditModal  show={salleActiviteEditModal} onShowShange={setSalleActiviteEditModal}  salleData={{
            salleId : salleId,
            salleName : salleName
            }} />
        <AbonnementEditModal show={abonnementEditModal} onShowShange={setAbonnementEditModal} 
        abonnementData={
            {
                abonnementId: abonnementId,
                selectedActivities: selectedActivities,
                activities : activities
            }
            } />
         </>
      </Fragment>
   );
};

export default Configuration;
