import { createContext, useState, useEffect, ReactNode } from 'react';
// Hooks 
import { firebase, auth } from '../services/firebase';
// Firebase ->

type UserType = {
    id: string,
    nome: string,
    avatar: string
}
type AuthContextType = {
    user: UserType | undefined,
    signInWidthGoogle: () => Promise<void>
}
type AuthContextProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = (props: AuthContextProviderProps) => {

    const [user, setUser] = useState<UserType>()

    // Guardar contenxt da autenticação do Google em caso de reload da tela
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
                const { displayName, photoURL, uid } = user
    
                if(!displayName || !photoURL){
                    throw new Error('Missing information from Google Account.')
                }
    
                setUser({
                    id: uid,
                    nome: displayName,
                    avatar: photoURL
                })
            }
        })

        return () => {
            unsubscribe();
        }
    }, [])

    // Popup de autenticação com Google
    async function signInWidthGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();

        const result = await firebase.auth().signInWithPopup(provider);

        if(result.user){
            const { displayName, photoURL, uid } = result.user

            if(!displayName || !photoURL){
                throw new Error('Missing information from Google Account.')
            }

            setUser({
                id: uid,
                nome: displayName,
                avatar: photoURL
            })
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWidthGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}