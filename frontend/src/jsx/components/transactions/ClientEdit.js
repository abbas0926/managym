import React, { useState, useEffect } from "react";
import axios from 'axios';

import { useGetAPI, usePutAPI } from '../useAPI'
import {  useHistory } from "react-router-dom";

 
function refreshPage() {
  window.location.reload(false);
}
const EditClient = (props) => {
  let creneauxEnd = `${process.env.REACT_APP_API_URL}/creneau/`
  const currentClientId = props.match.params.id;
  let maladiesEnd = `${process.env.REACT_APP_API_URL}/maladie/`

  let clientURI = `${process.env.REACT_APP_API_URL}/clients/${currentClientId}/`
  const maladies = useGetAPI(maladiesEnd)
  
  const creneaux = useGetAPI(creneauxEnd)
  const history = useHistory();
  const [realMaladies, setRealMaladies] = useState([])
  const [selectedMaladies, setSelectedMaladies] = useState([])

  const [civility, setCivility] = useState();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nationality, setNationality] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [blood, setBlood] = useState("");
  const [note, setNote] = useState("");
  const [etat, setEtat] = useState("");
  const [dette, setDette] = useState("");
  //FK 
  const [creneau, setCreneau] = useState("");
  useEffect(() => {
    axios.get(clientURI).then((res) => {
      setCivility(res.data.civility)
      setLastName(res.data.last_name)
      setFirstName(res.data.first_name)
      setAdress(res.data.adress)
      setPhone(res.data.phone)
      setEmail(res.data.email)
      setNationality(res.data.nationality)
      setBirthDate(res.data.birth_date)
      setBlood(res.data.blood)
      setNote(res.data.note)
      setEtat(res.data.etat)
      setRealMaladies(res.data.maladie)
      setDette(res.data.dette)
      setCreneau(res.data.creneau)
      console.log('the real maladies', res.data.maladies);
  })
  }, []);
  const handleCheckbox = (event) => {
    const maladie = event.target.name
    if ( event.target.checked){

      setSelectedMaladies(checkedMaladies => [...checkedMaladies, Number(maladie)])
      console.log('maladiieiieiis=======>', selectedMaladies);
    }else {
      for ( var i = 0 ; i < selectedMaladies.length; i++){
        if (selectedMaladies[i] === Number(maladie)){
          selectedMaladies.splice(i, 1)
        } 
      }

      selectedMaladies.splice(Number(maladie) , 1)
      console.log('unchecked=======>', selectedMaladies);
  }
}
  const HandleSubmit = async e => {
      e.preventDefault();
      const newClient = {
        civility :civility,
        last_name :lastName,
        first_name :firstName,
        adress :adress,
        phone :phone,
        email :email,
        nationality :nationality,
        birth_date :birthDate,
        state: etat,
        blood :blood,
        note :note,
        dette :Number(dette),
        creneau :Number(creneau),
      }
      usePutAPI(clientURI, newClient)
      history.push("/client")
      refreshPage()

  }
  return (
        <div className="">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Profile Abonné</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={HandleSubmit}>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Nom </label>
                      <input type="text" name="last_name" className="form-control"value={lastName} placeholder="Nom du client" onChange={e => setLastName(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Prénom</label>
                      <input  type="text" name="first_name"  className="form-control" value={firstName} placeholder="Prénom du client"onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Email </label>
                      <input  type="email" name="email"  className="form-control" value={email} placeholder="Email"onChange={e => setEmail(e.target.value)}/>
                    </div>

                    <div className="form-group col-md-6">
                      <label>Adresse</label>
                      <input type="text"name="adress" className="form-control"value={adress} onChange={e => setAdress(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Date de naissance </label>
                      <input type="date" name="birth_date" className="form-control" value={birthDate}onChange={e => setBirthDate(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-6">
                      <label>Nationalité</label>
                      <input type="text" name="nationality" className="form-control"value={nationality} onChange={e => setNationality(e.target.value)} />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Téléphone</label>
                      <input type="text" name="phone" className="form-control" value={phone}onChange={e => setPhone(e.target.value)} />
                    </div>
                  </div>
                
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label>Civilité</label>
                      <select  defaultValue={"option"} name="civility"  className="form-control" value={civility}onChange={e => setCivility(e.target.value)}>
                      <option value="option" disabled>Cliquez pour choisir</option>
                        <option value="MLL" >Mlle</option>
                        <option value="MME" >Mme</option>
                        <option value="MR" >Mr</option>
                      </select>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Groupe sanguin</label>
                      <select defaultValue={"option"} name="blood" className="form-control"value={blood} onChange={e => setBlood(e.target.value)}>
                      <option value="option" disabled>Cliquez pour choisir</option>
                        <option value='A-' >A-</option>
                        <option value='A+' >A+</option>
                        <option value='B-' >B-</option>
                        <option value='B+' >B+</option>
                        <option value='O-' >O-</option>
                        <option value='O+' >O+</option>
                        <option value='AB-'>AB-</option>
                        <option value='AB+'>AB+</option>
                      </select>
                      
                    </div>
                    <div className="form-group col-md-4">
                      <label>état</label>
                      <select  defaultValue={"option"} name="state" className="form-control"value={etat} onChange={e => setEtat(e.target.value)}>
                        <option value="option" disabled>Cliquez pour choisir</option>
                        <option value="A" >Active</option>
                        <option value="N" >Non active</option>
                        <option value="S" >Suspendue</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                    <label>Dettes</label>
                      <input type="number" name="dette" className="form-control"value={dette} onChange={e => setDette(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-4">
                      <label>Creneau</label>
                      <select defaultValue={"option"} name="creneau" className="form-control"value={creneau} onChange={e => setCreneau(e.target.value)}>
                        <option value="option" disabled>Cliquez pour choisir</option>
                        { creneaux.map(creneau =>
                          <option value={creneau.id}>{creneau.hour_start}</option>
                      )}
                      </select>
                    </div>
                </div>
                    <div className="form-row">
                      <div className="form-group">
                      <label>
                        Maladies
                      </label>
                      <div className="">
                          { maladies.map(maladie =>
                            <div className="custom-control custom-checkbox mb-3">
                              {/* <input type="checkbox" checked={maladie.id in maladies ? true : false} name={maladie.id} className="custom-control-input" id={maladie.id}  /> */}
                              <input type="checkbox"  name={maladie.id} className="custom-control-input" id={maladie.id} onClick={handleCheckbox} />
                              <label className="custom-control-label" htmlFor={maladie.id}> {maladie.name}</label>
                            </div>
                          )}
                      </div>
                      </div>
                    </div>
                  <div className="form-row">
                      <label>Note</label>
                      <textarea name="note" className="form-control"value={note} onChange={e => setNote(e.target.value)}/>
                </div>

                  <button type="submit" className="btn btn-primary">
                    Creer
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      
  )
}
export default EditClient;




