import "./styles.css"
import { Button } from "../button";
import PetsOrderContext from "../../context/petsOrderContext";
import { useContext } from "react";

export const OrderItem = (props) => {
    const {image, age, name, id} = props;

    const globalState = useContext(PetsOrderContext);

    const removePet = () => {
        globalState.removePetFromOrder(id);
    }

    return(
        <div className="order-item">
            <img className="order-item-photo" src={image} alt="Pet Photo" className="order-photo" />
            <div className="order-item-description">
                <h2 className="order-item-name">{name}</h2>
                <p className="order-item-age">{age}</p>
            </div>
            <Button text="Remove Pet" type="secondary" isDisabled={false} action={removePet}/>
        </div>
    );
}