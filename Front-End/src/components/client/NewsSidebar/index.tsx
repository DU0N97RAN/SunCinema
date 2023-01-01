import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, NavLink } from "react-router-dom";
import config from "../../../config";
import { useAppSelector, useAppDispatch } from "../../../redux/hook";
import { getTop10 } from "../../../redux/slice/PostSlice";
type Props = {}

const NewsSidebar = (props: Props) => {
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(getTop10())
   }, [dispatch]);

   const { categories, isFetching } = useAppSelector((state: any) => state.categoriesReducer)
   const { loading, top10 } = useAppSelector((state: any) => state.PostReducer);
   return (
      <div className="">
         <aside className="hidden lg:block lg:col-span-3 pl-6 border-l bg-[#182b47] w-full p-3">
            <section>
               <h2 className="uppercase text-sky-500 font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">
                  CHUYÊN MỤC
               </h2>
               <ul className="mt-4 grid grid-cols-1 divide-y">
                  {!isFetching &&
                     categories?.map((item: any, index: any) => (
                        <li key={index}>
                           <Link to={`${config.routes.newsCate1}/${item.slug}`}>
                              <span className={`text-white hover:text-red-600 block py-1 leading-7 transition duration-200`}>
                                 {item.title}
                              </span>
                           </Link>
                        </li>
                     ))}

                  {isFetching &&
                     Array.apply(null, new Array(5)).map((_, index) => <Skeleton className="my-2" height={22} key={index} />)}
               </ul>
            </section>
            <section className="mt-5">
               <h2 className="uppercase text-sky-500 font-bold pb-2 relative after:content-[''] after:absolute after:top-[100%] after:left-0 after:w-8 after:h-1 after:bg-gray-300">
                  Bài viết mới
               </h2>
               <ul className="mt-4 grid grid-cols-1 divide-y">
                  {!loading &&
                     top10?.map((item: any, index: any) => (
                        <li key={index}>
                           <NavLink to={`/post/${item.slug}`} className="sidebar-news-link">
                              <span
                                 className={`limit-line-2 block py-1 leading-7 text-white hover:text-gray-600  transition duration-200`}
                              >
                                 {item.title}
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
   )
}

export default NewsSidebar