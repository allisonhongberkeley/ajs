import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../database/clientApp';

const signup = async (email: string, password: string): Promise<void> => {
  const auth = getAuth(app);
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered!");
  } catch (error: any) {
    console.error("Signup failed:", error.message);
    throw error; // 👈 re-throw the error so screen can handle it!
  }
};

export default signup;
