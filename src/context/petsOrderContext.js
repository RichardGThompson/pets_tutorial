import React, {useState} from 'react';

const PetsOrderContext = React.createContext({
    pets: [],
    order: [],
    addPetToOrder: () => {},
    initPets: () => {},
    removePetFromOrder: () => {},
});

export const PetsOrderContextProvider = (props) => {
    const [order, setOrder] = useState([]);

    const [pets, setPets] = useState([]);

    const initPets = (petsFromApi) => {        
        setPets(petsFromApi);
    }

    const addPetToOrder = (pet) => {
        let newOrder = order; 
        newOrder.push (pet);
        setOrder(order);
    }

    const removePetFromOrder = (petId) => {
        let prevOrder = order;
        const found = order.findIndex( (pet ) => {
            return (pet.id === petId); 
        })
        if (found !== -1) {
            prevOrder.splice(found, 1); // delete one
            setOrder([...prevOrder]);
        } else {
            console.log ("error delete");
        }
    }
    
    return (<PetsOrderContext.Provider
     value={{pets: pets, order: order, addPetToOrder: addPetToOrder, removePetFromOrder: removePetFromOrder, initPets:initPets }}
    >
        {props.children}
    </PetsOrderContext.Provider>)

} 

export default PetsOrderContext;