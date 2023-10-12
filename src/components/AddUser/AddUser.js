import React, { useState, useRef } from 'react';
import Card from '../Card/Card';
import Button from '../Button/Button';
import classes from './AddUser.module.css';
import ErrorModal from '../ErrorModal/ErrorModal';

const AddUser = (props) => {

    /* Using refs instead of state to read NOT manipulate the actual DOM when prudent (not used often) */
    /* Form inputs would be an example. */
    /* These inputs are also called "Uncontrolled Components" */

    //const [enteredUserName,  setEnteredUserName] = useState('');
    //const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();

    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const addUserHandler = (e) => {
        e.preventDefault();

        const enteredName = nameInputRef.current.value; //use this in place of state which would log every key stroke.
        const enteredAge = ageInputRef.current.value;

        if(enteredName.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non-empty values).'
            })
            return;
        }
        if(+enteredAge < 1){ //The plus sign forces a conversion from string to number
            setError({
                title: 'Invalid Age',
                message: 'Please enter a valid age (> 0).'
            })
            return;
        }
        props.onAddUser(enteredName, enteredAge);
        //setEnteredUserName('');
        //setEnteredAge('');
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    }

    /* NO LONGER NEEDED with refs
    const userNameChangeHandler = (e) => {
        setEnteredUserName(e.target.value);
    }

    const ageChangeHandler = (e) => {
        setEnteredAge(e.target.value);
    }

    */

    const errorHandler = () => {
        setError(null);
    }
  
    return(
        
            <div>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler} >
                    <label htmlFor="name">Name</label>
                    <input  id="username" 
                            type="text" 
                            //value={enteredUserName}
                            //onChange={userNameChangeHandler}
                            ref={nameInputRef}
                            
                    />
                    <label htmlFor="age">Age (years)</label>
                    <input id="age"
                            type="number"
                            //value={enteredAge}
                            //onChange={ageChangeHandler}
                            ref={ageInputRef}
                     />
                    <Button className={classes.button} type="submit">Add User</Button>
                </form>
            </Card>
            </div>
            
    );

}

export default AddUser;