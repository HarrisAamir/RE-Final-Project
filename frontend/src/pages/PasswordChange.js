import React from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertsSlice";
import "../resourses/auth.css";
let email=""
async function sendOtp()
  {
    // const response = await axios.post("localhost:5000/api/users/forgetpassword", email);
    let userotp=prompt("Enter otp")
    let reponseopt="1142"
    
    if(email=="harryaamir073@gmail.com"){
       if (userotp==reponseopt)  
       {
          let newPassword=prompt("Enter the new password: ")
          alert("Password changed!")
        }
      else alert("incorrect OTP")
    }
    else alert("Email does not exist")

}
function ChangePassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
      email=values.email
  };
  

  return (
    <div className="h-screen d-flex justify-content-center align-items-center auth">
      <div className="w-400 card p-3">
        <h1 className="text-lg">BookBus - Change Password</h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <input type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email" >
            <input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/login">Click Here To Login</Link>
            <button className="secondary-btn" onClick={sendOtp}>
              Send OTP
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassword;
