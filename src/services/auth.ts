import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase-config";

const loginInUserWithPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

const userLogout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    throw err;
  }
};

export { loginInUserWithPassword, userLogout };
