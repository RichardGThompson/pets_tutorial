import "./styles.css";
import { Button } from "../button";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const PetItem = (props) => {
    const {image, age, name, breed, type, id} = props;

    // Display the pet's age with the proper singularity.
    const returnYears = (age) => {
        if(age.age === "1"){
            return("1 Year Old")
        }
        else{
            return(`${age.age} Years Old`);
        }
    }
    
    return(
        <div className="pet">
            <img src={image} alt={`Photo of ${name}, ${breed}`} className="pet-photo" />
            <Link to={`/pet/${id}`}>
                <h1 className="pet-name uppercase">{name}</h1>
            </Link>
            <p className="pet-breed uppercase">{breed}</p>
            <p className="pet-age uppercase">{returnYears({age})}</p>
            <Button text="Request Pet" type="primary" isDisabled={false} action={() => alert("Requested Pet.")}/>
        </div>
    );
}