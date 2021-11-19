import { useContext, useEffect, useState } from "react";
import "./styles.css";
import PetsOrderContext from "../../../context/petsOrderContext";
import { OrderItem } from "../../orderItem";
import { Button } from "../../button";

export const ShoppingCartPage = () => {

  const [order, setOrder] = useState([]);

  const globalState = useContext(PetsOrderContext);

  useEffect( () => {
    setOrder(globalState.order);
  }, [globalState]);

  return (
    <div className="pets-page">
      <h1 className="pets-title">My Shopping Cart</h1>
      <div className="order">
        {order.map((item) => <OrderItem image={item.image} age={item.age} name={item.name} id={item.id}/>)}

        {
          order.length === 0 && <p>Nothing in your order yet...</p>
        }
      </div>
      <Button text="Checkout" type="primary"/> 
    </div>
  );
};
