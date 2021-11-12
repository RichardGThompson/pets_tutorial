import "./styles.css";
import {useEffect, useState, useContext} from 'react';
import { PetItem } from "../../petItem";
import PetsOrderContext from "../../../context/petsOrderContext";

export const PetsHomePage = () => {
  const [pets, setPets] = useState([]);

  const globalState = useContext(PetsOrderContext);

  useEffect( () => {
    getPets();
  }, []);

  const getPets = async() => {
    try{
      const response = await fetch('https://firestore.googleapis.com/v1/projects/pets-api-40916/databases/(default)/documents/pets/');
      const data = await response.json();
      
      const formattedData = data.documents.map((item) => {
        return item.fields;
      });

      setPets(formattedData);
      globalState.initPets(formattedData);
    } catch(error){
      console.log("🚀 ~ file: index.jsx ~ line 16 ~ getPets ~ error", error)
    }
  }
  
  return (
    <div className="pets-page">
      <h1 className="pets-title uppercase">All Pets</h1>
      <div className="pets-container">
        {pets.map((pet) => <PetItem image={pet.image.stringValue} age={pet.age.stringValue} name={pet.name.stringValue} breed={pet.breed.stringValue} type={pet.petType.stringValue} id={pet.id.stringValue}/>)}
      </div>
    </div>
  );
};
