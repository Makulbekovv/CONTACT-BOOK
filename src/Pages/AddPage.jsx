import React, { useState } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../context/MainProvider';

const AddPage = () => {
    const [name,setName] = useState("")
    const [surname, setSurname] = useState("")
    const [phoneNumber, setPhoneNumber]= useState("")
    const [image, setImage] = useState("")

// ! Перенаправлять пользователя
const navigate = useNavigate()


// !получаем данные с контекста
const value = React.useContext(MainContext)


    const handleSubmit =(event)=>{
        event.preventDefault()
        const newContact= {
            name,
            surname,
            phoneNumber,
            image
        }
        value.addContact(newContact)
        setName("")
        setSurname("")
        setPhoneNumber("")
        setImage("")
        // ! Перенаправляем
        // ! -1 назад на одну страницу
        // ! 1 вперед
        navigate("/")
    }
    return (
        <div className='container edit-add-page'>
            <h2>Add Page</h2>
            <form onSubmit={handleSubmit}>
                <FormControl onChange={(e)=>setName(e.target.value)} value={name} type='text' placeholder='enter name...'/>
                <FormControl onChange={(e)=> setSurname(e.target.value)} value={surname} type='text' placeholder='enter surname...'/>
                <FormControl onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber} type='number' placeholder='enter phone number...'/>
                <FormControl onChange={(e)=>setImage(e.target.value)} value={image} placeholder='enter image' />
                <Button type='submit'>Add</Button>
            </form>
        </div>
    );
};

export default AddPage;