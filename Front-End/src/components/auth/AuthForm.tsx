import { Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import configRoute from '../../config'

type Props = {
   onFinish: any, form: any, name: any, isSignUp: any, sign: any
}

const AuthForm = ({ onFinish, form, name, isSignUp, sign }: Props) => {

   return (
      <div className="auth_container ">
         <div className="auth_container--title">
            <h1 className="text-[32px] font-bold">{name}</h1>
         </div>
         <div className="auth_container--content">
            <Form
               autoComplete="off"
               layout="vertical"
               name="signin"
               onFinish={onFinish}
               form={form}
            >
               <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Please input your email!" }]}
               >
                  <Input />
               </Form.Item>

             {!isSignUp &&   <Form.Item
                  label="Username"
                  name="username"
                  rules={[{ required: true, message: "Please input your username!" }]}
               >
                  <Input />
               </Form.Item>}

               <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
               >
                  <Input.Password />
               </Form.Item>
               {!isSignUp && (
                  <Form.Item name="confirm" label="Confirm Password" dependencies={['password']} hasFeedback
                     rules={[{ required: true, message: 'Please confirm your password!' },
                     ({ getFieldValue }) => ({
                        validator(_, value) {
                           if (!value || getFieldValue('password') === value) { return Promise.resolve(); }
                           return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                     }),
                     ]}
                  >
                     <Input.Password placeholder='Confirm password' />
                  </Form.Item>
               )}
               <Form.Item>
                  <button className="bg-[#D9A953] w-full p-1 rounded-md text-[#6f511d] font-bold uppercase ">Save</button>
               </Form.Item>
            </Form>
         </div>
         <div className="flex justify-between">
            <div className="">
               <Link to={configRoute.routes.forgotPass}>Quên mật khẩu ?</Link>
            </div>
            {isSignUp ? (
               <div className="">
                  <span>Chưa có tài khoản</span>
                  <Link
                     to={configRoute.routes.signup}
                     className="text-bold pl-1 hover:text-red-600"
                  >
                     {sign}
                  </Link>
               </div>
            ) : (
               <div className="">
                  <span>Đã có tài khoản,</span>
                  <Link
                     to={configRoute.routes.signin}
                     className="text-bold pl-1 hover:text-red-600"
                  >
                     {sign}
                  </Link>
               </div>
            )}
         </div>
      </div>
   )
}

export default AuthForm