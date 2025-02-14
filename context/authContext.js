import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { getDoc, setDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import {auth, db} from '../firebaseConfig'


export const AuthContext = createContext();
export const AuthContextProvider = ({children})=>{
    [user, setUser] = useState(null);
    [isAuthenticated, setisAuthenticated] = useState(undefined);

    useEffect(()=>{

        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                setisAuthenticated(true);
                setUser(user);
                updateUserData(user.uid)
            }
            else{
                setisAuthenticated(false);
                setUser(null);
            }
        });

        return unsub;
    }, [])

    const updateUserData = async(userId)=>{
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            let data = docSnap.data();
            setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId})
        }
    }

    const login = async (email, password) =>{
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);

            return {success: true}
        } catch (error) {
            let msg = error.message;
            if(msg.includes('(auth/invalid-email)')) msg='Некорректный email'
            if(msg.includes('(auth/invalid-credential)')) msg='Неверные логин или пароль'

            return {success: false, msg}
        }
    }
    const logout = async () =>{
        try {
            await signOut(auth);
            return {success: true}
            
        } catch (error) {
            return {success: false, msg: error.message, error: error}
            
        }
    }
    const register = async (email, password, username, profileUrl) =>{
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('response.user : ', response?.user);

            //setUser(response?.user);
            await setDoc(doc(db, "users", response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid
            });
            return {success: true, data: response?.user}
            
        } catch (error) {
            let msg = error.message;
            if(msg.includes('(auth/invalid-email)')) msg='Некорректный email'
            if(msg.includes('(auth/week-password)')) msg='Пароль должен содержать не менее 6 символов'
            if(msg.includes('(auth/email-already-in-use)')) msg='Пользователь с таким email уже существует'
            return {success: false, msg}
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const value = useContext(AuthContext)

    if(!value){
        throw new Error('useAuth must be wrap inside AuthContextPRovider')
    }

    return value;
}