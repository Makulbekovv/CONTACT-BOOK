import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { MainContext } from "../context/MainProvider";
import DeleteIcon from '../images/delete.png'
const HomePage = () => {
  const value = React.useContext(MainContext);
  useEffect(() => {
    value.getContacts();
  }, []);
  if (!value.contacts) {
    return <h2>loading...</h2>;
  }
  return (
    <div>
      <h2>Home page</h2>
      <table className="table">
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Phone number</th>
            <th>Image</th>
            <th>#</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {value.contacts.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.surname}</td>
              <td>{item.phoneNumber}</td>
              <td>
                <img className="img" src={item.image} alt="" />
                </td>
              
              <td>
                <Button variant="inherit" onClick={()=> value.deleteContact(item.id)}>
                  <img width="25" src={DeleteIcon} alt="deleteIcon" />
                </Button>
              </td>
              <td>
                <Link to={`/edit/${item.id}`}>
                  <Button variant="warning">Edit</Button>
              </Link>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer/>
    </div>
  );
};

export default HomePage;
