import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
type Props = {
  slider: Array<any>
};

const SlideShow = (props: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="banner">
      <Slide easing="ease">
        {props.slider.map((item: any) =>
          <div className="each-slide" key={item?._id}>
            <div >
              <Link to={item.url} title={item.title}>
                <img src={item.images[0].url} alt="" /></Link>
            </div>;
          </div>
        )}
      </Slide>
    </div>
  );
};

export default SlideShow;
