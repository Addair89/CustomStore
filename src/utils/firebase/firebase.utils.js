import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import{ getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBnU4U92CnP7blW0l81Q-Lq4IC6OSQPhQA",
    authDomain: "custom-store-9a30d.firebaseapp.com",
    projectId: "custom-store-9a30d",
    storageBucket: "custom-store-9a30d.appspot.com",
    messagingSenderId: "449731329760",
    appId: "1:449731329760:web:4eb7941114fa3582f5da85",
    measurementId: "G-7WW0237L54"
  };
  
  // Initialize Firebase
  const fireBaseApp = initializeApp(firebaseConfig);
 
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: 'select_account'
  })

  export const auth = getAuth();
  export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionInformation={}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);

    if(!userSnapShot.exists()){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionInformation 
        })
      }catch(error){
        console.log(error)
      }
    }
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }