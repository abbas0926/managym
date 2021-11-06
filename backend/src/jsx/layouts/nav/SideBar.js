import React, { Component } from "react";

/// Link
import { Link } from "react-router-dom";

/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";

/// Menu
import MetisMenu from "metismenujs";

///
// import drump from "../../../images/card/drump.png";

class MM extends Component {
   componentDidMount() {
      this.$el = this.el;
      this.mm = new MetisMenu(this.$el);
   }
   componentWillUnmount() {
      //  this.mm("dispose");
      // console.log(this.mm);
   }
   render() {
      return (
         <div className="mm-wrapper">
            <ul className="metismenu" ref={(el) => (this.el = el)}>
               {this.props.children}
            </ul>
         </div>
      );
   }
}

class SideBar extends Component {
   /// Open menu
   componentDidMount() {
      // sidebar open/close
      var btn = document.querySelector(".nav-control");
      var aaa = document.querySelector("#main-wrapper");

      function toggleFunc() {
         return aaa.classList.toggle("menu-toggle");
      }

      btn.addEventListener("click", toggleFunc);
   }
   render() {
      /// Path
      let path = window.location.pathname;
      path = path.split("/");
      path = path[path.length - 1];

      /// Active menu
      let app = ["",],
         abon = ["abonnees",'client'],
         // tresor = ["tresorie",],
         trans = ["transactions",],
         plan = ["planning",],
         cren = ["creneaux",],
         salles = ["salles",],
         activit = ["activites",],
         presen = ["presences",],
         coachPersonnel = ["coachs-personnels",],
         table = ["table-bootstrap-basic", "table-datatable-basic"],
         config = ["configuration"];

 

      return (
         <div className="deznav">
            <PerfectScrollbar className="deznav-scroll">
               <MM className="metismenu" id="menu">
                  <li className={`${ app.includes(path) ? "mm-active" : ""}`}>
                     <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
                        <i className="flaticon-381-networking"></i>
                        <span className="nav-text">Tableau de bord</span>
                     </Link>
                     <ul aria-expanded="false">
                        <li>
                           <Link className={`${path === "" ? "mm-active" : ""}`} to="/" onClick={() => this.props.onClick()}>
                              Tableau de bord
                           </Link>
                        </li>
                     </ul>
                  </li>
                  {/* DASHBOARD */}
                  {/* <li className={`${tresor.includes(path) ? "mm-active" : ""}`}>
                     <Link to="/tresorie" aria-expanded="false">
                        <i className="flaticon-381-television"></i>
                        <span className="nav-text">Trésorie</span>
                     </Link>
                     
                  </li> */}
                  {/* Fin trésorie */}
                  <li className={`${abon.includes(path) ? "mm-active"  : ""}`}>
                     <Link to="/client" aria-expanded="false">
                        <i className="flaticon-381-television"></i>
                        <span className="nav-text"> Abonnées </span>
                     </Link>
                  </li>
                  {/* Fin ABonnées */}
                  <li className={`${trans.includes(path) ? "mm-active" : ""}`}>
                     <Link to="/transactions" aria-expanded="false">
                        <i className="flaticon-381-television"></i>
                        <span className="nav-text">
                        Transactions
                           </span>
                     </Link>
                     
                  </li>
                  <li
                     className={`${plan.includes(path) ? "mm-active" : ""}`}>
                     <Link className="has-arrow ai-icon" to="/planning" aria-expanded="false">
                        <i className="flaticon-381-networking"></i>
                        <span className="nav-text">Planning</span>
                     </Link>
                     <ul aria-expanded="false">
                        <li>
                           <Link className={`${cren.includes(path) ? "mm-active" : ""}`} to="/creneaux" onClick={() => this.props.onClick()}>
                              Créneaux
                           </Link>
                        </li>
                        <li>
                           <Link className={`${salles.includes(path) ? "mm-active" : ""}`} to="/salles" onClick={() => this.props.onClick()} >
                              Salles
                           </Link>
                        </li>
                        <li>
                           <Link className={`${activit.includes(path) ? "mm-active" : ""}`} to="/activites" onClick={() => this.props.onClick()} >
                              Activités
                           </Link>
                        </li>
                     </ul>
                  </li>
                  {/* Fin planning */}
                  
                  <li className={`${presen.includes(path) ? "mm-active" : ""}`}>
                     <Link to="/presences" aria-expanded="false">
                        <i className="flaticon-381-television"></i>
                        <span className="nav-text">Présences</span>
                     </Link>
                  </li>
                  {/* Fin présences */}
                  
                  {/* Coaches & personnel */}
                  <li className={`${table.includes(path) ? "mm-active" : ""}`}>
                     <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
                        <i className="flaticon-381-network"></i>
                        <span className="nav-text">Coachs & Personnels</span>
                     </Link>
                     <ul aria-expanded="false">
                        <li>
                           <Link className={`${path === "table-bootstrap-basic"? "mm-active": ""}`} onClick={() => this.props.onClick()} to="/coach">
                              Coachs
                           </Link>
                        </li>
                        <li>
                           <Link className={`${ path === "table-datatable-basic" ? "mm-active" : ""}`} onClick={() => this.props.onClick()} to="/personnel">
                              Personnel
                           </Link>
                        </li>
                   
                     </ul>
                  </li>
                  {/* Fin Coaches & personnel  */}
                  <li className={`${config.includes(path) ? "mm-active" : ""}`}>
                     <Link to="/configuration" aria-expanded="false">
                        <i className="flaticon-381-network"></i>
                        <span className="nav-text">configuration</span>
                     </Link>
                     {/* <ul aria-expanded="false">
                        <li>
                           <Link className={`${path === "table-bootstrap-basic"? "mm-active": ""}`} onClick={() => this.props.onClick()} to="/table-bootstrap-basic">
                              Admins
                           </Link>
                        </li>
                        <li>
                           <Link className={`${ path === "table-datatable-basic" ? "mm-active" : ""}`} onClick={() => this.props.onClick()} to="/table-datatable-basic">
                              Parametres
                           </Link>
                        </li>
                        <li>
                           <Link className={`${ path === "abonnements" ? "mm-active" : ""}`} onClick={() => this.props.onClick()} to="/abonnements">
                              Abonnements
                           </Link>
                        </li>
                     </ul> */}
                  </li>
                  {/* <li className={`${presen.includes(path) ? "mm-active" : ""}`}>
                     <Link to="/presences" aria-expanded="false">
                        <i className="flaticon-381-television"></i>
                        <span className="nav-text">Présences</span>
                     </Link>
                  </li> */}
                  {/* Fin configurations */}
                   {/* <li className={`${table.includes(path) ? "mm-active" : ""}`}>
                     <Link className="has-arrow ai-icon" to="#" aria-expanded="false">
                        <i className="flaticon-381-network"></i>
                        <span className="nav-text">Table</span>
                     </Link>
                     <ul aria-expanded="false">
                        <li>
                           <Link className={`${path === "table-bootstrap-basic" ? "mm-active" : ""}`} onClick={() => this.props.onClick()} to="/table-bootstrap-basic">
                              Bootstrap
                           </Link>
                        </li>
                        <li>
                           <Link className={`${  path === "table-datatable-basic" ? "mm-active" : "" }`} onClick={() => this.props.onClick()} to="/table-datatable-basic" >
                              Datatable
                           </Link>
                        </li>
                     </ul>
                  </li> */}
                 </MM>
       
               <div className="copyright">
                  <p>
                     <strong>COPYRIGHT - OctoGym Dashboard</strong> © 2021 All
                     Rights Reserved
                  </p>
                  {/* <p>
                     Made with <i className="fa fa-heart" /> by DexignZone
                  </p> */}
               </div>
            </PerfectScrollbar>
         </div>
      );
   }
}

export default SideBar;
