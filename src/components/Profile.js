import React from 'react'
import { Space } from "antd";
import "../App.css";
import AppFooter from "./admin/AppFooter";
import AppHeader from "./admin/AppHeader";
import PageContent from "./admin/PageContent";
import SideMenu from "./admin/SideMenu";

import { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';


const Profile = () => {

    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [passw, setPassw] = useState('');

    const token = (sessionStorage.getItem('token'))

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get(`http://localhost:5000/user/onestudent/${token}`);
            {

                if (data.data === undefined) {
                    return setName("n'existe pas")
                }
                console.log(data.data)
                setName(data.data.name)
                setLastName(data.data.lastname)
                setEmail(data.data.email)
            }
        }
        getData()

    }, [])

    return (
        // <div>Profile<br></br>
        //     <span> Nom : " {lastname} "</span><br></br>
        //     <span > Prénom : " {name} "</span><br></br>
        //     <span> Email : " {email} "</span><br></br>
        <div className="App1">
            <AppHeader />
            <div className="SideMenuAndPageContent">
                <SideMenu></SideMenu>
                <PageContent></PageContent>
            </div>
            <AppFooter />
        </div>
        // </div>
    )
}
export default Profile

