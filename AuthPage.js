import React, {useState} from 'react';
import {Checkbox, Paper} from "@mui/material";
import {Typography} from "@mui/material";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "./style.css";
import {toast} from "react-toastify";
import { loginApi,registerApi} from '../../api/auth_api';
import { redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const AuthPage = () => {

    const[tab,setTab]=useState(0);
    const[userNameLogin,setUsernameLogin]=useState();
    const[passWordLogin,setPasswordLogin]=useState();
    const[userNameRegister,setUsernameRegister]=useState();
    const[passWordRegister,setPasswordRegister]=useState();
    const [passwordShown, setPasswordShown] = useState(false);

    const[fullName,setFullname]=useState();
    const[confpassword,setconfPassword]=useState();
    const[IdRegister,setIdregister]=useState();
    const {t}=useTranslation();
    
    const validateLogin=(user)=>{
        if(!user.username)
            return t("validate.userName");
        if(!user.password)
            return t("validate.password")
    }
    const validateRegister = (user) => {
        if (!user.username)
            return t("validate.userName");
        if (!user.name)
            return t("validate.name");
        if (!user.password)
            return t("validate.password");
        if (user.password !== user.confpassword)
            return t("validate.confPassword")
    };
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
      };
    const handleLogine=()=>{
        const user={
            id: Math.floor(Math.random()*1000),
            username:userNameLogin,
            password:passWordLogin,
            name:localStorage.getItem("name"),
            Id:localStorage.getItem("Id"),

        };
        console.log(user.username);
        const error=validateLogin(user);
       if(error)
           toast.warn(error);
        loginApi(user,(isOk,data)=>{
            if (!isOk)
                return toast.error(data);
            toast.success(t("success.login"));
            localStorage.setItem("name",data.name);
            localStorage.setItem("username",data.username);
            localStorage.setItem("x-auth-token",data["x-auth-token"]);
            localStorage.setItem("Id",data.Id);
            window.location.reload();
           
           
        })
    }
    const handeRegister=()=>{
        const user = {
            id: Math.floor(Math.random()*1000),
            name: fullName,
            username: userNameRegister,
            password: passWordRegister,
            confpassword: confpassword,
            Id:IdRegister,
        };
        const error = validateRegister(user);
        if (error)
            return toast.error(error);
        
        registerApi(user, (isOk, data) => {
            if (!isOk)
                return toast.error(data);
            toast.success(t("success.register"));
            localStorage.setItem("name", data.name);
            localStorage.setItem("image", data.image);
            localStorage.setItem("username", data.username);
            localStorage.setItem("x-auth-token", data["x-auth-token"]);
            localStorage.setItem("Id",data.Id);
            window.location.reload();
        })
    }

    return (
          <Paper className={"container_Auth"}>
              <Typography className={"headerText"}> {t("welcome")}</Typography>
              <Tabs selectedIndex={tab} onSelect={(index) => setTab(index)}>
                  <TabList className={"tab_container"}>
                      <Tab className={"Tab"}>{t("tab.login")} </Tab>
                      <Tab className={"Tab"}>{t("tab.register")}</Tab>
                  </TabList>

              {tab===0 && <div className={"container_Input"}>
                  <Typography>{t("label.username")}</Typography>
                  <input className={"uni_m_b_small"} value={userNameLogin} onChange={e=>setUsernameLogin(e.target.value)}/>
                  <Typography>{t("label.password")}</Typography>
                 <div className={"form-group"}>
                 <Checkbox  onClick={togglePassword}>Show Password</Checkbox>
                 <input className={"uni_m_b_small"} value={passWordLogin} type={passwordShown ? "text" : "password"} onChange={e=>setPasswordLogin(e.target.value)}/>

                 </div>
                    
                 
                  
                  
                  <button variant={"contained"} color="primary" className={"loginBtn"} onClick={handleLogine}>{t("btn.login")}</button>
              </div>}
              {tab===1 && <div className={"container_Input"}>
                  <Typography>{t("label.fullName")}</Typography>
                  <input className={"uni_m_b_small"} value={fullName} onChange={e=>setFullname(e.target.value)}/>
                  <Typography>{t("label.Id")}</Typography>
        <input className={"uni_m_b_small"}
               value={IdRegister} onChange={e => setIdregister(e.target.value)}/>
        
                  <Typography>{t("label.username")}</Typography>
                  <input className={"uni_m_b_small"} value={userNameRegister} onChange={e=>setUsernameRegister(e.target.value)}/>
                  <Typography>{t("label.password")}</Typography>
                  <div className={"form-group"}>
                  <Checkbox  onClick={togglePassword}>Show Password</Checkbox>
                  <input className={"uni_m_b_small"} value={passWordRegister} type={passwordShown ? "text" : "password"} onChange={e=>setPasswordRegister(e.target.value)}/>
                  </div>
                 
                  <Typography>{t("label.confPassword")}</Typography>
                  <input className={"uni_m_b_small"} value={confpassword} onChange={e=>setconfPassword(e.target.value)} />
                  <button variant={"contained"} color="primary" className={"loginBtn"} onClick={handeRegister}>{t("btn.register")}</button>
              </div>}
              </Tabs>
          </Paper>
    );
}

export default AuthPage;


