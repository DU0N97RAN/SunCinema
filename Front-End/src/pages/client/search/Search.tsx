import React, { useState } from "react";
import styles from "./Search.module.css";
import { Button, Form, Input } from "antd";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { searchMovie } from "../../../redux/slice/Movie";
import { formatDate } from "../../../ultils";
type Props = {};

const Search = (props: Props) => {
  const [form] = Form.useForm();
  const [key, setKey] = useState("");
  const { movieSearch } = useAppSelector((state) => state.movie);
  const dispath = useAppDispatch();
  const onFinish = ({ value }: any) => {
    setKey(value);
    dispath(searchMovie(value));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className={styles.container}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="value">
            <Input placeholder="Tìm phim theo tên...." bordered={false} />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit">
              <div className={styles.btn}>
                <BiSearch />
              </div>
            </Button>
          </Form.Item>
        </Form>
        {key == "" ? (
          ""
        ) : movieSearch == "" ? (
          <h2>Không có phim phù hợp với từ khóa "{key}" </h2>
        ) : (
          <div className={styles.product}>
            <h2>Phim được tìm kiếm với từ khóa "{key}"</h2>
            <div className={styles.content_list}>
              {movieSearch?.map((item: any) => (
                <div className={styles.content_list_item} key={item._id}>
                  <Link to={`/${item.slug}`}>
                    <div className={styles.content_list_item_img}>
                      <img
                        src={
                          item?.image[0]?.url ??
                          `${import.meta.env.VITE_HIDDEN_SRC}`
                        }
                        alt=""
                      />
                    </div>
                    <div className={styles.content_list_item_info}>
                      <h3>{item.name}</h3>
                      <p>Thể loại: Kinh dị</p>
                      <p>Khởi chiếu: {formatDate(item.releaseDate)}</p>
                      <button>Đặt vé</button>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
