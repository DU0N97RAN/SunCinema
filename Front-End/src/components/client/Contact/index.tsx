import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { FaEnvelope, FaLocationArrow, FaPhoneVolume } from 'react-icons/fa'
import { BsFillArrowRightCircleFill } from "react-icons/bs"
type Props = {};

const Contact = (props: Props) => {
  const navigate = useNavigate();
  const { webConfigs: inforWeb } = useAppSelector(
    (state: any) => state.WebConfigReducer
  );
  const [webConfig] = inforWeb;
  let logo = webConfig?.logo[0]?.url;
  const requiredField = "*";

  return (
    <section className="container max-w-6xl px-3 mx-auto mt-8 justify-center">
      <div className="flex items-top justify-center h-full dark:bg-gray-900 sm:items-center sm:pt-0">
        <div className="max-w-6xl mx-auto p-10">
          <div className="my-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                <h1 className="text-4xl sm:text-3xl text-gray-800 dark:text-white font-extrabold tracking-tight">
                  Liên hệ với chúng tôi
                </h1>
                <p className="text-normal text-lg sm:text-xl font-medium text-gray-600 dark:text-gray-400 mt-2">
                  Điền vào form để gửi phản hồi cho chúng tôi
                </p>
                <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                  <FaLocationArrow />
                  <Link
                    to="#"
                    className="ml-4 text-md text-gray-600 dark:text-gray-400 tracking-wide font-semibold"
                  >
                    {webConfig?.address[0]?.text}
                  </Link>
                </div>
                <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                  <FaPhoneVolume />

                  <Link
                    className="ml-4 text-md text-gray-600 dark:text-gray-400 tracking-wide font-semibold"
                    to="tel:0348090652"
                  >
                    {webConfig?.phone[0]}
                  </Link>
                </div>
                <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                  <FaEnvelope />
                  <Link
                    to="mailto:minhtuan0330@gmail.com"
                    className="ml-4 text-md text-gray-600 dark:text-gray-400 tracking-wide font-semibold"
                  >
                    {webConfig?.webUrl}
                  </Link>
                </div>
                <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                  <BsFillArrowRightCircleFill />
                  <Link
                    to="mailto:minhtuan0330@gmail.com"
                    className="ml-4 text-md text-gray-600 dark:text-gray-400 tracking-wide font-semibold"
                  >
                    Trung tâm chiếu phim {webConfig?.storeName}
                  </Link>
                </div>
              </div>
              <form className="p-6 flex flex-col justify-center">
                <div className="flex flex-col">
                  <label htmlFor="name" className="hidden">
                    Tên của bạn
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    placeholder={`Tên của bạn ${requiredField}`}
                    className="w-100 mt-2 py-2 px-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="email" className="hidden">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={`Email ${requiredField}`}
                    className="w-100 mt-2 py-2 px-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <label htmlFor="tel" className="hidden">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="tel"
                    id="tel"
                    placeholder={`Số điện thoại ${requiredField}`}
                    className="w-100 mt-2 py-2 px-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="flex flex-col mt-2">
                  <textarea
                    id="message"
                    rows={4}
                    className="w-100 mt-2 py-2 px-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                    placeholder={`Nội dung bạn muốn phản hồi ${requiredField}`}
                  />
                </div>
                <button
                  type="submit"
                  className="md:w-32 bg-indigo-600 hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
                >
                  Gửi
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
