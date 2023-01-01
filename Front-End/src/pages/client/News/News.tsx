import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import NavNews from "../../../components/client/NavNews";
import NewsContent from "../../../components/client/NewsContent";
import config from "../../../config";
import "./News.module.scss";
import { useAppSelector } from "../../../redux/hook";
import { getAlPost, getListPostByCate } from "../../../redux/slice/PostSlice";

type Props = {
  activeNav: boolean;
  isShow:boolean
};

const News = ({ activeNav }: Props) => {
  const { posts } = useAppSelector((state: any) => state.PostReducer);
  const dispatch = useDispatch<any>();
  const { slug } = useParams();
  const [path, setPath] = useState<string>("");
  const [data, setData] = useState<any>([]);
  const [activePost, setActivePost]= useState<any>([]);
  useEffect(() => {
    if (!slug) {
      setPath(config.routes.news);
      document.title = "News";
      (async () => {
        try {
          await dispatch(getAlPost()).unwrap();
        } catch (error) {
          console.log(error);
        }
      })();
    } else {
      setPath(`${config.routes.news}/${slug}`);
      (async () => {
        try {
          const res = await dispatch(getListPostByCate(slug)).unwrap();
          setData(res?.post);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [slug]);

  useEffect(() => {
    let a = posts?.filter((item:any) => item?.status == 0);
    setActivePost(a)
  }, [posts])
  return (
    <>
      {!activeNav && <NavNews />}
      {!slug && <NewsContent data={activePost} path={path}  dataName=""/>}
      {slug && <NewsContent data={data} path={path} dataName="" />}
    </>
  );
};

export default News;
