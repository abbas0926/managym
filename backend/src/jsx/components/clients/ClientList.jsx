import React, { Fragment , useState, useEffect} from "react";
import PageTitle from "../../layouts/PageTitle";
import { Dropdown, Button } from "react-bootstrap";
import axios from 'axios';
import Search from "../../layouts/Search";

/// images
import avartar5 from "../../../images/avatar/5.png";
import avartar1 from "../../../images/avatar/1.png";
import { Link } from "react-router-dom";
import { useGetAPI } from '../useAPI'




export const ClientContext = React.createContext()
// function refreshPage() {
//    window.location.reload(false);
//  }
function refreshPage() {
   window.location.reload(false);
 }
 const removeObject = async (props) => {
   let endpoint = `${process.env.REACT_APP_API_URL}/clients/delete/`
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



const ClientList = () => {
   const [nextpage, setNextpage] = useState(1);
   const [clientData, setclientData] = useState([]);
   const [searchValue, setSearchValue] = useState('')
   const [searchBarActivated, setSearchBarActivated] = useState(false)
   var endpoint = `${process.env.REACT_APP_API_URL}/clients-name/?page=${nextpage}`
   var searchEndpoint = `${process.env.REACT_APP_API_URL}/clients-name/?search=${searchValue}`
   
useEffect(() =>  {
   if (searchValue !== '') {
      axios.get(searchEndpoint).then(res => {
         setclientData(res.data.results)
         console.log('le resultat des clients est ', res.data);
      })
   }else {
      axios.get(endpoint).then(res => {
         setclientData(res.data.results)
         console.log('le resultat des clients est ', res.data);
      })}
}, [nextpage, searchValue]);

console.log('le searchValue des searchValue est ', searchValue);


   const capitalizeFirstLetter = (word) => {
      if (word)
          return word.charAt(0).toUpperCase() + word.slice(1);
      return '';
   };

 return (
      <Fragment>
         <PageTitle activeMenu="Liste" motherMenu="Abonnées" />
         <div className="form-head d-flex mb-4 mb-md-5 align-items-start">
            <div className="input-group search-area d-inline-flex">
               <div className="input-group-append">
                  <span className="input-group-text">
                     <i className="flaticon-381-search-2"/>
                  </span>
               </div>
               <input type="text" className="form-control" placeholder="rechercher un client" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
            </div>
            <Link to="/client/create" className="btn btn-primary ml-auto">
            Ajouter un abonné
            </Link>
         </div>
           {/* <div className="card-action card-tabs mt-3 mt-sm-0">
              <div className="nav nav-tabs nav" role ="tablist">
                 <div className="nav-item"  ><a href="#" role="tab" data-rb-event-key="previous" aria-selected="true" class="nav-link active">Monthly</a>
                    </div>
                    <div className="nav-item" onClick ={() => setNextpage(nextpage + 1)}><a href="#" role="tab" data-rb-event-key="monthly" aria-selected="true" class="nav-link active">Monthly</a>
                    </div>
                    <div className="nav-item" ><a  role="tab" data-rb-event-key="next" aria-selected="true" class="nav-link active">Monthly</a>
                    </div>
              </div>
           </div> */}
         <div className="row">
            <div className="col-lg-12">
               <div className="card">
                  <div className="card-body">
                     <div className="table-responsive">
                        <table className="table mb-0 table-striped">
                           <thead>
                              <tr>
                                 <th className="customer_shop"> ID </th>
                                 <th>Nom</th>
                                 <th>Prénom</th>
                                 <th>Téléphone</th>
                                 <th className="pl-5 width200"> Addresse </th>
                                 <th>Adhesion</th>
                                 <th>Ancien ID</th>
                              </tr>
                           </thead>
                           <tbody id="customers">
                           {clientData.map(client => (
                              <tr role="row" key={client.id} className="btn-reveal-trigger">
                                 <td className="customer_shop_single"> {client.id} </td>
                                 <td className="py-3">
                                    <Link to={`/client/${client.id}`}>
                                       <div className="media d-flex align-items-center">
                                          <div className="avatar avatar-xl mr-2">
                                             <div className="">
                                                <img className="rounded-circle img-fluid" src={avartar5} width="30" alt="" />
                                             </div>
                                          </div>
                                          <div className="media-body">
                                             <h5 className="mb-0 fs--1">
                                             {capitalizeFirstLetter(client.last_name)}
                                             </h5>
                                          </div>
                                       </div>
                                    </Link>
                                 </td>
                                 <td className="py-2">
                                 {capitalizeFirstLetter(client.first_name)}

                                 </td>
                                 <td className="py-2">
                                    <a href="tel:{client.phone}">{client.phone}</a>
                                 </td>
                                 <td className="py-2 pl-5 wspace-no"> {client.adress} </td>
                                 <td className="py-2">{client.date_added}</td>
                                 <td className="py-2 text-right">
                                    {client.faux_id}
                                 </td>
                              </tr>
                              ))}
                              </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {
            !searchBarActivated &&

            <div className='d-flex text-center justify-content-end'>

                <div className='dataTables_info text-black' id='example5_info '>
                  {/* Showing {activePag.current * sort + 1} to{' '}
                  {data.length > (activePag.current + 1) * sort
                    ? (activePag.current + 1) * sort
                    : data.length}{' '}
                  of {data.length} entries{' '} */}
                </div>
                <div
                  className='dataTables_paginate paging_simple_numbers'
                  id='example5_paginate'
                >
                  <Button
                    onClick={() =>
                     nextpage > 0 && setNextpage(nextpage - 1)

                  }
                  style={{width: '100px', border: 'none', height:'48px', color:'#ffffff',textAlign: 'left', fontSize:'15px', paddingLeft:'8px'}}>
                    Précédent
                  </Button>
                  <span>
                      <input
                        to='/transactions'
                        type='number'
                        className='paginate_button_client  '
                        onChange={e => setNextpage(e.target.value)}
                      value={nextpage}
                      style={{width: '100px', border: 'none', height:'99%', textAlign: 'center', fontSize:'15px'}}
                      />
                  </span>
                  <Button
                  style={{width: '100px', border: 'none', height:'48px', color:'#ffffff',textAlign: 'center', fontSize:'15px', padding:'2px'}}

                    onClick={() =>
                     nextpage > 0 && setNextpage(nextpage + 1)
                    }
                  >
                    Suivant
                  </Button>
                </div>

              </div>
         }
      </Fragment>
   );
};

export default ClientList;
