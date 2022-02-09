import axios from "axios";
import React, { useReducer } from "react";
import { toast } from "react-toastify";
import { API } from "../helpers/const";

export const MainContext = React.createContext();
const INIT_STATE = {
  contacts: null,
  contactToEdit: null,
};
// ! в dispatch  передаем action, он за собой вызывает функцию reducer  и передаем первым аргументом state, вторым action

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "GET_PRODUCT_TO_EDIT":
      return { ...state, contactToEdit: action.payload };
 
    default:
      return state;
  }
};

const MainProvider = (props) => {
  // ! Создаем общее состояние
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  // ! отправка данных на сервер
  const addContact = async (newContact) => {
    try {
      await axios.post(API, newContact);
      getContacts()
      toast.success("Успешно добвылено")
    } catch (error) {
      console.log(error);
    }
  };

  //   ! получить данные  с сервера
  const getContacts = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_CONTACTS",
        payload: response.data,
      };
      dispatch(action);
      
    } catch (error) {
      console.log(error);
    }
  };

  // !Удалить даннве с сервера
  const deleteContact = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      // !чтобы получить обновленные данные
      getContacts();
      toast.success("Успешно удалено")
    } catch (error) {
      toast.error("ошибка с сервере")
      console.log(error);

    }
  };

  // ! Edit
  // ! 1Часть чтобы стянуть данные и подставить в инпуты
  const getProductToEdit = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_PRODUCT_TO_EDIT",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  // ! 2часть сохраняем изменения
  const saveEditedContact = async (editedContact) => {
    try {
      await axios.patch(`${API}/${editedContact.id}`, editedContact);
      getContacts()
      toast.success("Успешно изменено")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MainContext.Provider
      value={{
        addContact,
        getContacts,
        deleteContact,
        getProductToEdit,
        saveEditedContact,
        contacts: state.contacts,
        contactToEdit: state.contactToEdit,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export default MainProvider;
