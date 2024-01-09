import { message, Modal, Table } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { useSelector } from "react-redux";


function Profile() {
  const { user } = useSelector((state) => state.users);
  const [userState, setUser] =useState({
    "name":user.name,
    "email":user.email,
    'password':user.password
   })
  

  const changeName=()=>{
    let newName=prompt("New Name: ")
    setUser({"name":newName,"email":userState.email,"password":userState.password})
  }
  
  const changeEmail=()=>{
    let newName=prompt("New Email: ")
    setUser({"name":userState.name,"email":newName,"password":userState.password})

  }
  
  const changePassword=()=>{
    let newName=prompt("New Password: ")
    setUser({"name":userState.name,"email":userState.email,"password":newName})

  }

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '10px',
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '10px',
  };

  const buttonStyle = {
    padding: '5px 10px',
    borderRadius: '3px',
    border: '1px solid #aaa',
    backgroundColor: 'yellow',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '20px' }}>Profile</h2>
      <div style={rowStyle}>
        <div style={{ flex: '1' }}>
          <span>Name: {userState.name}</span>
        </div>
        <div>
          <button style={buttonStyle} onClick={changeName}>Edit</button>
        </div>
      </div>
      <div style={rowStyle}>
        <div style={{ flex: '1' }}>
          <span>Email: {userState.email}</span>
        </div>
        <div>
          <button style={buttonStyle} onClick={changeEmail}>Edit</button>
        </div>
      </div>
      <div style={rowStyle}>
        <div style={{ flex: '1' }}>
          <span>Password: {userState.password}</span>
        </div>
        <div>
          <button style={buttonStyle} onClick={changePassword}>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
