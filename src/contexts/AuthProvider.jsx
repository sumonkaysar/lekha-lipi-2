import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import Cookies from "js-cookie";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = Cookies.get("lekhaLipiToken");
    const authHeader = { "headers": { "authorization": `Bearer ${token}` } };

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const login = (email, password) => {
        setLoading(true);
        Cookies.remove('lekhaLipiToken', { path: '/' });
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }

    const logout = (navigate) => {
        signOut(auth).then(() => {
            setUser(null);
            navigate("/login")
        })
    };

    const providerLogin = (provider) => {
        return signInWithPopup(auth, provider);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            }
            setLoading(false);
        });
        return () => {
            return unsubscribe();
        };
    }, []);

    const authInfo = { loading, user, createUser, login, updateUser, providerLogin, logout, authHeader, setLoading };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;