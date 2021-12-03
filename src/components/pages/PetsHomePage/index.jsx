import "./styles.css";
import {useEffect, useState, useContext} from 'react';
import { PetItem } from "../../petItem";
import PetsOrderContext from "../../../context/petsOrderContext";
import { Search } from "../../search";

import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useHistory} from 'react-router-dom';



export const PetsHomePage = () => {
  const [pets, setPets] = useState([]);

  const [filteredPets, setFilteredPets] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [loading, setLoading] = useState(true);

  const globalState = useContext(PetsOrderContext);

  const history = useHistory();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(!user){
        history.push('/login');
      }
    });
  })

  useEffect( () => {
    getPets();
  }, []);

  useEffect(() => {
    handleSearchByBreed();
  }, [searchString]);

  const handleSearchByBreed = () => {
    if(searchString === ""){
      setFilteredPets(pets);
      return;
    }
    const petsFiltered = pets.filter(
      (pet) => {
        const breed = pet.breed.stringValue.toLowerCase();
        const isMatch = breed.indexOf(searchString.trim().toLowerCase());

        return isMatch !== -1;
      }
    )

    setFilteredPets(petsFiltered);
  }

  const getPets = async() => {
    try{
      const response = await fetch('https://firestore.googleapis.com/v1/projects/pet-store-73122/databases/(default)/documents/pets/');
      const data = await response.json();
      
      const formattedData = data.documents.map((item) => {
        return item.fields;
      });

      setPets(formattedData);
      setFilteredPets(formattedData);
      globalState.initPets(formattedData);
      setLoading(false);
    } 
    catch(error){
      console.log("🚀 ~ file: index.jsx ~ line 16 ~ getPets ~ error", error);
      setLoading(false);
    }
  }

  const handleSearchUpdate = (event) => {
    setSearchString(event.target.value);
  }
  
  return (
    <div className="pets-page">
      <h1 className="pets-title uppercase">All Pets</h1>
      <Search handleSearchUpdate={handleSearchUpdate}/>
      <div className="pets-container">
        {filteredPets.map((pet) => <PetItem image={pet.image.stringValue} age={pet.age.stringValue} name={pet.name.stringValue} breed={pet.breed.stringValue} type={pet.petType.stringValue} id={pet.id.stringValue}/>)}

        {
          !loading && filteredPets.length === 0 && <p>Nothing found...</p>
        }

        {
          loading && <p>Loading data...</p>
        }
      
      </div>
    </div>
  );
};
