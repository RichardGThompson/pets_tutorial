import {useHistory} from 'react-router-dom';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';
import {useEffect, useState} from 'react';

export const Logout = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
            }
            else{
                setUser(null);
            }
        });
    }, []);
    
    const logoutUser = async() => {
        const auth = getAuth();
        try{
            await signOut(auth);
        }
        catch(err){
            console.log("🚀 ~ file: index.jsx ~ line 12 ~ logoutUser ~ err", err);
        }
    }

    return(
        user && <li className="logout-btn" onClick={logoutUser}>Logout</li>
    );
}