import { useState } from "react";
import { useForm } from "react-hook-form";
import "./styles.css";

export const LoginPage = () => {
    
    const [mode, setMode] = useState("login");

    const {register, handleSubmit} = useForm();

    const loginUser = (formVals) => {
        console.log("Login submitted", formVals);
    }

    const signUpUser = (formVals) => {
        console.log("Sign up submitted", formVals);
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

                        <input type="submit" value="Login"/>

                        <p>Already have an account? Login</p>
                        <button onClick={() => setMode("login")}>Login</button>
                    </form>
                )
            }
        </div>
    );
}