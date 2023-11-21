import { useState, useContext } from "react";

import { createUserDocumentFromAuth, signInWithGooglePopUp, signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.components";
import './sign-in-form.styles.scss';
import Button from "../button/button.components";


const defaultFormFields = { 
    email: '',
    password: ''
} 



const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

     

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => { 
        event.preventDefault();


        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();

        }catch(error){
            switch (error.code){

                case 'auth/wrong-password':
                    alert('Incorrect password for email')
                    break;
                case 'auth/user-not-found':
                    alert('User not found.')
                    break;
                default:
                    console.log(error)
        }
    }
}

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }



    const signInGoogleUser = async () => {
        await signInWithGooglePopUp();
    }

    return(
        <div className="sign-up-container">
            <h2>Already Have An Account</h2>
            <span>Sign In With Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput lable='Email' type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput lable='Password' type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                <Button buttonType='default' type="submit">Sign In</Button>
                <Button type='button' onClick={signInGoogleUser} buttonType='google'>Google Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;