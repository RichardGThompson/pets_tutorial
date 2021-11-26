import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "./styles.css";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export const LoginPage = () => {
    
    const [mode, setMode] = useState("login");

    const {register, handleSubmit} = useForm();

    const history = useHistory();

    const loginUser = async(formVals) => {
        const auth = getAuth();
                
        try{
            const loginUser = await signInWithEmailAndPassword(auth, formVals.user, formVals.password);
            console.log("after login", auth);
            history.push("/");

        }
        catch(error){
            console.log("🚀 ~ file: index.jsx ~ line 20 ~ loginUser ~ error", error) 
        }
    }

    const signUpUser = async(formVals) => {
        const auth = getAuth();

        try{
            const auth = getAuth();
            const signUpUser = await createUserWithEmailAndPassword(auth, formVals.user, formVals.password);
            history.push("/");
        }
        catch(error){
            console.log("🚀 ~ file: index.jsx ~ line 32 ~ signUpUser ~ error", error)
        }
    }
    
    return(
        <div className="pets-page">
            {
                mode === "login" && (
                    <form action="" className="form-layout" onSubmit={handleSubmit(loginUser)}>
                        <h2>Welcome back, please sign in!</h2>
                        <br />

                        <label htmlFor="user">Username</label>
                        <input type="email" required name="user" {...register('user')}/>

                        <label htmlFor="password">Password</label>
                        <input type="password" required name="password" {...register('password')}/>

                        <input type="submit" value="Login"/>

                        <p>Create an account</p>
                        <button onClick={() => setMode("signup")}>Sign Up</button>
                    </form>
                )
            }

            {
                mode === "signup" && (
                    <form action="" className="form-layout" onSubmit={handleSubmit(signUpUser)}>
                        <h2>Create a New Account</h2>
                        <br />

                        <label htmlFor="user">Email</label>
                        <input type="email" required name="user" {...register('user')}/>

                        <label htmlFor="password">Password</label>
                        <input type="password" required name="password" {...register('password')}/>

                        <label htmlFor="password-confirm">Confirm Password</label>
                        <input type="password" required name="password-confirm" {...register('password-confirm')}/>

                        <input type="submit" value="Sign Up"/>

                        <p>Already have an account? Login</p>
                        <button onClick={() => setMode("login")}>Login</button>
                    </form>
                )
            }
        </div>
    );
}