import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import React, { useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState("");

    useEffect(()=> {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("token");

                if(!token) {
                    navigate('/login');
                    return;
                }
                
                const response = await axios.get("http://127.0.0.1:8000/api/userdetail", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUserDetails(response.data);

            }
            catch(error) {
                if(error.response && error.response.status === 401) {
                    Swal.fire({
                        icon: "error",
                        title: "Authentication Failed",
                        text: "Please log in again."
                    }).then(() => {
                        navigate("/")
                    })
                } else {
                    console.error("Error fetching user details:", error);
                }
            }
        };
        fetchUserDetails();
    },[])
    return(
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h3>Welcome to Dashboard</h3>
                    {userDetails && (
                        <div>
                            <p>Name: {userDetails.name}</p>
                            <p>Email: {userDetails.email}</p>
                            <p>Gender: {userDetails.gender}</p>
                            <p>Role: {userDetails.role}</p>
                        </div>
                    )}
                    <button className="btn btn-primary mt-4" onClick={()=>{
                        localStorage.removeItem("token");
                        navigate("/");
                    }}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;