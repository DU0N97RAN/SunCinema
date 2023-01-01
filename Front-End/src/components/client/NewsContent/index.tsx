import { Link } from "react-router-dom";
import { formatDate, formatDateString } from "../../../ultils";
import { useAppSelector } from "../../../redux/hook";
import { ImNewspaper } from "react-icons/im";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Empty } from "antd";
type NewsContentProps = {
  data?: any[];
  path: string;
  dataName: string
};

const NewsContent = ({ data, path, dataName }: NewsContentProps) => {
  const { loading } = useAppSelector((state: any) => state.PostReducer);
  const { isFetching } = useAppSelector( (state: any) => state.categoriesReducer );
  
  return (
    <>
      {!dataName ? (
        <>
          <section className="pb-16 min-h-[500px]">
            <div className="container max-w-6xl mx-auto px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {!isFetching && !loading && data?.length !== 0 ? (
                data?.map((item: any, index: any) => (
                  <div key={index}>
                    <Link to={`/post/${item.slug ?? item?._id}`}>
                      <div
                        style={{
                          backgroundImage: `url(${item?.imagesFile[0]?.url})`,
                        }}
                        className="block bg-cover bg-center pt-[70%] rounded-t-xl relative"
                      >
                        <button className="absolute top-2 left-2 bg-[#D9A953] rounded-full w-10 h-10 text-white text-lg">
                          <ImNewspaper
                            style={{ textAlign: "center", margin: "0 auto" }}
                          />
                        </button>
                      </div>
                    </Link>
                    <div className="bg-white rounded-b-xl shadow px-3 py-1">
                      <p className="text-sm text-gray-500">
                        {formatDateString(item?.createdAt)}
                      </p>
                      <h1>
                        <Link to={`/post/${item?.slug}`}>
                          <span className="limit-line-2 block my-1 font-semibold text-justify leading-tight transition duration-300 text-gray-600 hover:text-black uppercase">
                            {item?.title}
                          </span>
                        </Link>
                      </h1>
                      <div
                        className="limit-line-3 text-gray-500 text-sm text-justify"
                        dangerouslySetInnerHTML={{ __html: `${item?.desc}` }}
                      ></div>
                      <Link to={`/post/${item?.slug}`}>
                        <button className="block mx-auto w-9 h-9 rounded-full border-2 border-[#D9A953] text-[#D9A953] transition duration-300 hover:bg-[#D9A953] hover:text-white mt-2 mb-2 text-center">
                          <AiOutlineArrowRight
                            style={{ textAlign: "center", margin: "0 auto" }}
                          />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className=" text-[#D9A953] ml-[450px] w-full">
                  <Empty description="Không tìm thấy dữ liệu" />
                </div>
              )}{" "}
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="pb-16 min-h-[500px]">
            <div className="container max-w-6xl mx-auto px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {!isFetching && !loading && data?.length !== 0 ? (
                data?.map((item: any, index: any) => (
                  <div key={index}>
                    <Link to={`/voucher/${item?._id}`}>
                      <div
                        style={{
                          backgroundImage: `url(${item?.imagesFile[0]?.url})`,
                        }}
                        className="block bg-cover bg-center pt-[70%] rounded-t-xl relative border border-solid border-slate-700"
                      >
                        <button className="absolute top-2 left-2 bg-[#D9A953] rounded-full w-10 h-10 text-white text-lg">
                          <ImNewspaper
                            style={{ textAlign: "center", margin: "0 auto" }}
                          />
                        </button>
                      </div>
                    </Link>
                    <div className="bg-white rounded-b-xl shadow px-3 py-1">
                      <p className="text-sm text-gray-500" >
                        {formatDate(item?.timeStart)} - {formatDate(item?.timeEnd)}
                      </p>
                      <h1>
                        <Link to={`/voucher/${item?._id}`}>
                          <span className="limit-line-2 block my-1 font-semibold text-justify leading-tight transition duration-300 text-gray-600 hover:text-black uppercase">
                          {item?.name?.length >= 30 ? `${item?.name.substring(0, 25)}...` : item?.name}
                          </span>
                        </Link>
                      </h1>
                      <div
                        className="limit-line-3 text-gray-500 text-sm text-justify"
                        dangerouslySetInnerHTML={{ __html: `${item?.shortDesc?.length >= 30 ? `${item?.shortDesc.substring(0, 30)}...` : item?.shortDesc}` }}
                      ></div>
                      <Link to={`/voucher/${item?.slug}`}>
                        <button className="block mx-auto w-9 h-9 rounded-full border-2 border-[#D9A953] text-[#D9A953] transition duration-300 hover:bg-[#D9A953] hover:text-white mt-2 mb-2 text-center">
                          <AiOutlineArrowRight
                            style={{ textAlign: "center", margin: "0 auto" }}
                          />
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className=" text-[#D9A953] ml-[450px] w-full">
                  <Empty description="Không tìm thấy dữ liệu" />
                </div>
              )}
            </div>
          </section>
        </>
      )}


    </>
  );
};

export default NewsContent;
