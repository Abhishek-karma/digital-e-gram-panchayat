import { auth, db } from "./firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";


const validRoles = ["user", "admin", "staff"];

export const signup = async (email, password, name, role , phone, address) => {
  try {
    if (!validRoles.includes(role)) {
      throw new Error("Invalid role");
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: email,
      name: name,
      role: role,
      uid: user.uid,
      phone: phone,
      address: address,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        user.role = userData.role;
        return user;

    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    await signOut(auth);
}

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
}

export const fetchUserRole = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      if (userDoc.exists()) {
        return userDoc.data().role;
      }
      return null;
    } catch (error) {
      throw error;
    }
  };