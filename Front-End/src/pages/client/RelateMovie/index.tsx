import React from "react";
import { Link } from "react-router-dom";
import styles from "../movieDetail/MovieDetail.module.css";
type Props = {
  data: any;
};

const RelateMovie = ({ data }: Props) => {
  return (
    <>
      {data &&
        data?.map((item: any) => (
          <div className={styles.showFilmListItem} key={item?._id}>
            <Link to={`/${item?.slug}`}>
              <div className={styles.showFilmListItemImg}>
                <img src={item?.image[0]?.url} alt="" />
              </div>
              <div className={styles.showFilmListItemInfo}>
                <h3>{item?.name}</h3>
              </div>
            </Link>
          </div>
        ))}
    </>
  );
};

export default RelateMovie;
