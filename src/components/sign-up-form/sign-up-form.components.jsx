import { useState } from "react";

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import FormInput from "../form-input/form-input.components";
import './sign-up-form.styles.scss';
import Button from "../button/button.components";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
} 



const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword){
            alert('passwords do not match')
            return;
        }

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            await createUserDocumentFromAuth(user, {displayName})
            resetFormFields();

        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Email already in use')
            }else{
                console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    return(
        <div className="sign-up-container">
            <h2>Don't Have an Acount?</h2>
            <span>Sign Up With Email and Password</span>
            <form onSubmit={handleSubmit}>
                <FormInput lable="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>

                <FormInput lable='Email' type="email" required onChange={handleChange} name="email" value={email}/>

                <FormInput lable='Password' type="password" required onChange={handleChange} name="password" value={password}/>

                <FormInput lable='Confirm Password' type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

                <Button buttonType='default' type="submit">Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;