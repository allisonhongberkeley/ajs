import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from '../database/clientApp';

const signup = async (email: string, password: string): Promise<void> => {
  try {
    const auth = getAuth(app); 
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered!");
  } catch (error: any) {
    console.error(error.message);
  }
};

export default signup;
