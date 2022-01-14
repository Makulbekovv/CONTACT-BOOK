import React, { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../context/MainProvider";

const EditPage = () => {
    const value = React.useContext(MainContext);
    const { contactToEdit } = value;
    const [name, setName] = useState('')
    const [surname,setSurname] =useState('')
    const [phoneNumber, setPhoneNumber] = useState("")
    const [image,setImage] = useState("")
  const params = useParams();
  useEffect(() => {
    value.getProductToEdit(params.id);
  }, []);

useEffect(()=>{
if(contactToEdit){
    setName(contactToEdit.name)
    setSurname(contactToEdit.surname)
    setPhoneNumber(contactToEdit.phoneNumber)
    setImage(contactToEdit.image)
}
},[contactToEdit])

const navigate = useNavigate()
const handleSubmit = (event)=>{
    event.preventDefault()
    let editedContact={
        name,
        surname,
        phoneNumber,
        image,
        id: contactToEdit.id,
    }
    value.saveEditedContact(editedContact)
    navigate("/")
}

  if (!contactToEdit) {
    return <h2>loading...</h2>;
  }
  return (
    <div className="container edit-add-page">
      <h2>Edit Page</h2>
      <form onSubmit={handleSubmit}>
        <FormControl
        onChange={(e)=> setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter name"
        />
        <FormControl
        onChange={(e)=>setSurname(e.target.value)}
          value={surname}
          type="text"
          placeholder="Enter surname"
        />
        <FormControl
        onChange={(e)=>setPhoneNumber(e.target.value)}
          value={phoneNumber}
          type="number"
          placeholder="Enter phone number"
        />
        <FormControl onChange={(e)=>setImage(e.target.value)} value={image} placeholder="enter image"/>
        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  );
};

export default EditPage;
