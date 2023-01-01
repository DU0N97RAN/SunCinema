import { Button, Form, Input, message, notification, Space } from 'antd';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { AuthApi } from "../../../service/authApi";
import { useState, useEffect } from 'react'
import configRoute from '../../../config';
import { UserApi } from '../../../service/userApi';
import { updatePass } from '../../../redux/slice/userSlice';
type Props = {}

const ForgotPass = (props: Props) => {
  const [form] = Form.useForm()
  const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer);
  const { users } = useAppSelector((state: any) => state.userReducer);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isReset, setIsReset] = useState(false)
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (token) {
      setIsReset(true)
    }
  }, [])


  const onFinish = ({ email }: any) => {
    let checkExits = users.find((item: any) => item?.email === email)
    if (checkExits === undefined) {
      notification.error({ message: "Lỗi", description: "Không tìm thấy tài khoản, vui lòng thử lại" });
      form.resetFields()
    } else {
      if (checkExits.status !== 1) {
        notification.error({ message: "Quan trọng", description: "Tài khoản của bạn đang bị khóa hoặc chưa được xác thực, vui lòng liên hệ quản trị viên" });
        form.resetFields()
      } else {
        AuthApi.forgotPassword({ email: email })
          .then(() => {
            notification.success({ message: "Thành công", description: "Vui lòng kiểm tra email và đặt lại mật khẩu" });
            form.resetFields();
          })
          .catch(() => {
            notification.error({ message: "Lỗi", description: "Vui lòng thử lại" });
          })
      }

    }
  }
  const onFinishResetPass = ({ password }: any) => {
    console.log(password);
    const payload = { newPassword: password };
    console.log(payload);
    dispatch(updatePass({ token, newPassword: password }))
      .then(() => {
        notification.success({
          message: "Đặt lại mật khẩu thành công",
          description: ` vui lòng đăng nhập để tiếp tục`,
        });
        setTimeout(() => {
          navigate(configRoute.routes.signin);
        }, 2000);
      })
      .catch((res: any) => {
        notification.error({
          message: "Đặt lại mật khẩu thất bại",
          description: ` ${res.response.data}`,
        });
      });

  }
  return (
    <section className="container max-w-6xl px-3 mx-auto mt-8 justify-center h-[550px] ">
      {isReset ? (
        <div className="mx-auto my-0 flex justify-center h-full items-center bg-[#182b47] rounded-md flex-col" >
          <h1 className="font-bold text-gray-600 text-4xl uppercase">{webConfigs[0]?.storeName}</h1>
          <img src={webConfigs[0]?.logo[0]?.url} alt="" className="w-[250px] max-w-[250px] h-[150px] max-h-[150px]" />
          <h1 className="font-bold text-sky-500 text-xl">Reset Account Password </h1>
          <p className="w-[450px] text-center text-lg mb-3 text-gray-600 ">Enter your new password</p>
          <div className="block w-[80%]">
            <Form form={form} layout="vertical" onFinish={onFinishResetPass} autoComplete="off">
              <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please input your password!' },]} hasFeedback >
                <Input.Password placeholder='New password' />
              </Form.Item>

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
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: '#D9A953', outline: 'none', marginTop: '10px' }}>
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </div>

        </div>
      ) : (
        <div className="mx-auto my-0 flex justify-center h-full items-center bg-[#182b47] rounded-md flex-col" >
          <h1 className="font-bold text-gray-600 text-4xl uppercase">{webConfigs[0]?.storeName}</h1>
          <img src={webConfigs[0]?.logo[0]?.url} alt="" className="w-[250px] max-w-[250px] h-[150px] max-h-[150px]" />
          <h1 className="font-bold text-sky-500 text-xl">Reset Account Password </h1>
          <p className="w-[450px] text-center text-lg mb-3 text-gray-600 ">Lost your password? Please enter your email address. You will receive a link to create a new password via email</p>
          <div className="block w-[80%]">
            <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
              <Form.Item name="email" label="EMAIL" rules={[{ required: true }, { type: 'email', warningOnly: true }]} >
                <Input placeholder="Enter your email" style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ backgroundColor: '#D9A953', outline: 'none', marginTop: '10px' }}>
                  Reset Password
                </Button>
              </Form.Item>
            </Form>
          </div>

        </div>
      )}
    </section>
  )
}

export default ForgotPass;


