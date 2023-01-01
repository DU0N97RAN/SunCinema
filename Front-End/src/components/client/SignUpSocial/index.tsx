import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import styles from "./auth.module.scss";
import { auth, provider } from "../../../firebase";
import { signInWithPopup } from 'firebase/auth'
import { Link } from "react-router-dom";

type Props = {};

const SignUpSocial = (props: Props) => {
   const dispatch = useAppDispatch();
   // const handleClick = () => {
   //    // signInWithPopup(auth, provider).then(({ user }: any) => {
   //    //    console.log('data', user);
   //    //    const output = {
   //    //       token: user?.accessToken,
   //    //       username: user?.providerData[0].displayName,
   //    //       email: user?.providerData[0].email,
   //    //       phone: user?.providerData[0].phoneNumber,
   //    //       avatar: user?.providerData[0].photoURL,
   //    //       providerId: user?.providerData[0].providerId,
   //    //       _id: user?.uid,
   //    //       status: user?.emailVerified === true ? 1 : 0
   //    //    }
   //    //    localStorage.setItem('login with google', JSON.stringify(output))
   //    // })
   //    dispatch()
      
   // };

   const loginFb = () => {
      notification.info({message: 'Chức năng này chưa được hoàn thiện'})
   }

   return (
      <div className="flex justify-between">
         <button type="button" className={styles.loginGG} >
         <a href={`${import.meta.env.VITE_API_URL}/auth/google`}>Đăng nhập google</a>
         </button>
         <button type="button" className={styles.loginFb} onClick={loginFb} >
            Sign in with Facebook
         </button>
      </div>
   );
};

export default SignUpSocial;
