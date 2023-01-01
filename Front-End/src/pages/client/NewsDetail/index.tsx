import moment from "moment";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import NewsSidebar from "../../../components/client/NewsSidebar";
import config from "../../../config";
import { useAppSelector } from "../../../redux/hook";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import NewsDetailComponent from "../../../components/client/NewsDetailComponent";

const NewsDetail = () => {
  const { slug } = useParams();
  const { posts } = useAppSelector((state: any) => state.PostReducer);
  const dataSelected = posts?.find((item: any) => item?.slug === slug);
  const { loading } = useAppSelector((state: any) => state.PostReducer);
  return (
    <>
      <NewsDetailComponent data={dataSelected} dataArr={posts} loading={loading} dataName="" />
    </>
  );
};

export default NewsDetail;
