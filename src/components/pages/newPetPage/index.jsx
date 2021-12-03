import './styles.css';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useHistory} from 'react-router-dom';

export const NewPetPage = (props) => {
    const {register, handleSubmit} = useForm();

    const history = useHistory();

    const submitPet = async(formVals) => {
        const formattedData = {
            fields: {
                id: {
                    stringValue: formVals.id
                },
                breed: {
                    stringValue: formVals.breed
                },
                age: {
                    stringValue: formVals.age
                },
                name: {
                    stringValue: formVals.name
                },
                petType: {
                    stringValue: formVals.petType
                },
                image: {
                    stringValue: formVals.image
                },
                isAdopted: {
                    booleanValue: false
                },
            }
            
        }

        console.log(formVals, formattedData);

        try{
            const response = await fetch('https://firestore.googleapis.com/v1/projects/pet-store-73122/databases/(default)/documents/pets/', 
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(formattedData)
            });
            history.push('/');
        }
        catch(error){
            console.log(error);
        }
    };

    return(
        <div className="pets-page">
            <form onSubmit={handleSubmit(submitPet)} className="form-layout">
                <h2>Submit a new pet: </h2>
                <br />

                <label htmlFor="petType">Pet Type</label>
                <input
                    {...register("petType")}
                    name="petType"
                    required
                />

                <label htmlFor="name">Name</label>
                <input
                    {...register("name")}
                    name="name"
                    required
                    type="text"
                />

                <label htmlFor="breed">Breed</label>
                <input
                    {...register("breed")}
                    name="breed"
                    required
                />

                <label htmlFor="image">Image URL</label>
                <input 
                    {...register("image")}
                    name="image"
                    required
                />

                <label htmlFor="age">Age</label>
                <input
                    {...register('age')}
                    name='age'
                    required
                />

                <label htmlFor="id">Unique ID</label>
                <input
                    {...register("id")}
                    name="id"
                    required
                />

                <input type="submit" value="Submit Pet"/>
                <br />
            </form>
        </div>
    );
}