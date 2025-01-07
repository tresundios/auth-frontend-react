import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState("");
    const { user, logout } = useAuth();

    // useEffect(()=> {
    //     const fetchUserDetails = async () => {
    //         try {
    //             const token = localStorage.getItem("token");

    //             if(!token) {
    //                 navigate('/login');
    //                 return;
    //             }
                
    //             const response = await axios.get(`${import.meta.env.VITE_API_URL}/userdetail`, {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });

    //             setUserDetails(response.data);

    //         }
    //         catch(error) {
    //             if(error.response && error.response.status === 401) {
    //                 Swal.fire({
    //                     icon: "error",
    //                     title: "Authentication Failed",
    //                     text: "Please log in again."
    //                 }).then(() => {
    //                     navigate("/")
    //                 })
    //             } else {
    //                 console.error("Error fetching user details:", error);
    //             }
    //         }
    //     };
    //     fetchUserDetails();
    // },[])
    return(
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h3>Welcome to Dashboard</h3>
                    {userDetails && (
                        <div>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                            <p>Gender: {user.gender}</p>
                            <p>Role: {user.role}</p>
                        </div>
                    )}
                    {/* <button className="btn btn-primary mt-4" onClick={()=>{
                        localStorage.removeItem("token");
                        navigate("/");
                    }}>Logout</button> */}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;