import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { Link, NavLink, useParams } from "react-router-dom";
import NewsSidebar from "../../../components/client/NewsSidebar";
import { useEffect, useState } from 'react'
import { useAppSelector } from "../../../redux/hook";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { formatCurrency, formatDate, formatDateString } from '../../../ultils';
type Props = {
  data: any;
  dataName: any,
  loading: any,
  dataArr: any
};


const NewsDetailComponent = ({ data, dataName, loading, dataArr }: Props) => {
  const [dataOther, setDataOther] = useState<any>([])
  useEffect(() => {
    if (data && dataArr) {
      let newArr = dataArr?.filter((item: any) => item?._id !== data?._id)
      setDataOther(newArr)
    }
  }, [data])
  return (
    <>
      {!dataName ? (
        <>
          {!loading && (
            <section className="container max-w-6xl mx-auto px-3 text-center pt-7  text-gray-300">
              <div className="border-b border-dashed pb-7 ">
                <Link to={`/categories/${data?.categoryId?.slug}`}>
                  <span className="uppercase text-sm ">
                    {data?.categoryId?.title}
                  </span>
                </Link>
                <h1 className="uppercase font-bold text-xl py-1 text-[#D9A953] ">
                  {data?.title}
                </h1>
                <p className="text-sm">
                  POSTED ON {moment(data?.createdAt).format("DD/MM/YYYY")}{" "}
                  BY {data?.userId?.username}
                </p>
              </div>
            </section>
          )}

          {/* loading */}
          {loading && (
            <div className="container max-w-6xl mx-auto px-3 text-center pt-7 border-b border-dashed pb-7">
              <Skeleton className="w-[20%]" />
              <Skeleton height={25} className="my-1" />
              <Skeleton className="w-[40%]" />
            </div>
          )}

          <section className="container max-w-6xl mx-auto px-3 grid grid-cols-12 pb-8 pt-4 text-white max-h-[500px] h-[500px]">
            <div className="col-span-12 lg:col-span-9 lg:pr-6">
              {!loading && (
                <div className="leading-relaxed text-justify">
                  <div className="">
                    {data?.imagesFile && (
                      <img
                        src={
                          data?.imagesFile[0]?.url ??
                          `${import.meta.env.VITE_DEFAULT_IMG}`
                        }
                        alt=""
                        className="w-full bg-center bg-cover bg-no-repeat mb-4 max-h-[350px]"
                      />
                    )}
                  </div>
                  <div className="">
                    <div
                      dangerouslySetInnerHTML={{ __html: data?.desc }}
                      className="news__desc text-gray-400"
                    ></div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: data?.content }}
                    className="news__content"
                  ></div>
                </div>
              )}

              {loading && (
                <div>
                  <Skeleton className="pt-[50%]" />
                  <Skeleton count={10} />
                </div>
              )}

              {!loading && (
                <ul className="flex justify-center py-7">
                  <li className="mx-0.5">

                    <a
                      onClick={() => {
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}/`,
                          "",
                          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
                        );
                      }}
                      className="hover-text-white w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                    >
                      <FaFacebook />
                    </a>
                  </li>
                  <li className="mx-0.5">
                    <a
                      onClick={() => {
                        window.open(
                          `https://twitter.com/share?url=${window.location.href}`,
                          "",
                          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
                        );
                      }}
                      className="hover-text-white w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                    >
                      <FaTwitter />
                    </a>
                  </li>
                  <li className="mx-0.5">
                    <a
                      onClick={() => {
                        window.open(
                          `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}/`,
                          "",
                          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
                        );
                      }}
                      className="hover-text-white w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                    >
                      <FaLinkedin />
                    </a>
                  </li>
                </ul>
              )}

              {loading && (
                <div className="flex justify-center py-7">
                  <div className="mt-2 flex">
                    <Skeleton circle width={32} height={32} className="mr-2" />
                    <Skeleton circle width={32} height={32} className="mr-2" />
                    <Skeleton circle width={32} height={32} className="mr-2" />
                  </div>
                </div>
              )}
            </div>

            <div className=" col-span-24 lg:col-span-3 lg:pr-4">
              <NewsSidebar />
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="container max-w-6xl mx-auto px-3 grid grid-cols-12 pb-8 pt-4 text-white max-h-[950px] h-[950px]">
            <div className="col-span-12 lg:col-span-9 lg:pr-6">
              {!loading && (
                <div className="leading-relaxed text-justify">
                  <div className="">
                    {data?.imagesFile && (
                      <img
                        src={
                          data?.imagesFile[0]?.url ??
                          `${import.meta.env.VITE_DEFAULT_IMG}`
                        }
                        alt=""
                        className="w-full bg-center bg-cover bg-no-repeat mb-4 max-h-[350px]"
                      />
                    )}
                  </div>
                  <div className="">
                    <div
                      dangerouslySetInnerHTML={{ __html: data?.shortDesc }}
                      className="news__desc text-gray-400 mb-3"
                    ></div>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: data?.content }}
                    className="news__content"
                  ></div>
                  <hr className='m-3' />
                  <div className="box border border-solid border-gray-300 rounded ">
                    <div className="p-2 font-bold text-[#e49e41]">
                      <div className=""><b className='text-white'>Mã voucher: </b> {data?.code}</div>
                      <div className=""><b className='text-white'>Thời gian áp dụng: </b>từ ngày {formatDate(data?.timeStart)} - đến ngày {formatDate(data?.timeEnd)}</div>
                      <div className=""><b className='text-white'>Điều kiện áp dụng: </b>cho {data?.voucherKey} từ  {data?.voucherKey === "hóa đơn" ? formatCurrency(data?.voucherVal) : data?.voucherVal} trở lên</div>
                    </div>
                  </div>
                </div>
              )}

              {loading && (
                <div>
                  <Skeleton className="pt-[50%]" />
                  <Skeleton count={10} />
                </div>
              )}

              {!loading && (
                <ul className="flex justify-center py-7">
                  <li className="mx-0.5">
                    <a
                      onClick={() => {
                        window.open(
                          `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}/`,
                          "",
                          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
                        );
                      }}
                      className="hover-text-white w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                    >
                      <FaFacebook />
                    </a>
                  </li>
                  <li className="mx-0.5">
                    <a
                      onClick={() => {
                        window.open(
                          `https://twitter.com/share?url=${window.location.href}`,
                          "",
                          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
                        );
                      }}
                      className="hover-text-white w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                    >
                      <FaTwitter />
                    </a>
                  </li>
                  <li className="mx-0.5">
                    <a
                      onClick={() => {
                        window.open(
                          `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}/`,
                          "",
                          "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600"
                        );
                      }}
                      className="hover-text-white w-8 h-8 border-2 border-gray-400 rounded-full flex items-center justify-center text-gray-400 transition duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                    >
                      <FaLinkedin />
                    </a>
                  </li>
                </ul>
              )}
            </div>

            <div className=" col-span-24 lg:col-span-3 lg:pr-4">
              <aside className="hidden lg:block lg:col-span-3 pl-6 border-l bg-[#182b47] w-full p-3">
                <section>
                  <h2 className="uppercase text-sky-500 font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">
                    Bạn đang xem
                  </h2>
                  <ul className="mt-4 grid grid-cols-1 divide-y">
                    {data?.name}
                    <small className='text-slate-400'>Update at: {formatDateString(data?.updatedAt)}</small>
                  </ul>
                </section>
                <section className="mt-5">
                  <h2 className="uppercase text-sky-500 font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">
                    Bài viết liên quan
                  </h2>
                  <ul className="mt-4 grid grid-cols-1 divide-y">
                    {dataOther?.map((item: any, index: any) => (
                      <li key={index}>
                        <NavLink to={`/voucher/${item._id}`} className="sidebar-news-link">
                          <span
                            className={`limit-line-2 block py-1 leading-7 text-white hover:text-gray-600  transition duration-200`}
                          >
                            {item?.name} <br />
                            <small className='text-slate-400'>Update at: {formatDateString(data?.updatedAt)}</small>
                          </span>
                        </NavLink>
                      </li>
                    ))}

                    {loading &&
                      Array.apply(null, new Array(10)).map((_: any, index: any) => <Skeleton className="my-2" height={22} key={index} />)}
                  </ul>
                </section>
              </aside>

            </div>
          </section>

        </>
      )}
    </>
  )
}

export default NewsDetailComponent