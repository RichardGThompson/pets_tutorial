import "./styles.css";
import { Button } from "../button";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PetsOrderContext from '../../context/petsOrderContext';
import { useContext } from "react";

export const PetItem = (props) => {
    const {image, age, name, breed, type, id} = props;

    const globalState = useContext(PetsOrderContext);

    // Display the pet's age with the proper singularity.
    const returnYears = (age) => {
        if(age.age === "1"){
            return("1 Year Old")
        }
        else{
            return(`${age.age} Years Old`);
        }
    }

    const addPetToCart = () => {
        const pet = {
            id,
            name,
            image,
            breed,
            type,
            age
        }
        
        globalState.addPetToOrder(pet);
        console.log(globalState.order);
        alert("Pet was added!");
    }
    
    return(
        <div className="pet">
            <img src={image} alt={`Photo of ${name}, ${breed}`} className="pet-photo" />
            <Link to={`/pet/${id}`}>
                <h1 className="pet-name uppercase">{name}</h1>
            </Link>
            <p className="pet-breed uppercase">{breed}</p>
            <p className="pet-age uppercase">{returnYears({age})}</p>
            <Button text="Request Pet" type="primary" isDisabled={false} action={addPetToCart}/>
        </div>
    );
}