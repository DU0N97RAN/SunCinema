import { Button, Rate, Space, Switch, Table, Tag, message, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DataTable from "../../../components/admin/Form&Table/Table";
import { useAppSelector } from "../../../redux/hook";
import { useAppDispatch } from "../../../redux/hook";
import { Comenter } from "../../../service/commenApi";
import { formatDate, formatTime } from "../../../ultils";
type Props = {};

function ListCommentMovie({ }: Props) {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: any) => state);
  const [comments, setComments] = useState<any>([]);
  const { id } = useParams();
  useEffect(() => {
    getComments(String(id));
  }, [id]);

  const getComments = async (id: string) => {
    const { data } = await Comenter.listByMovies(id);
    setComments(data);
  };

  const changeStatus = async (comment: any, _: number) => {
    const status = _ === 0 ? 1 : 0;
    const { data } = await Comenter.updateStatus(comment._id, {
      ...comment,
      status,
    });
    if (data) {
      message.success("Cập nhật trạng thái thành công!");
    } else {
      message.error(`Lỗi!`);
    }
  };

  const columns = [
    {
      title: "Nội dung",
      dataIndex: "noidung",
      key: "noidung",
      width: 420,
    },
    {
      title: "Đánh giá",
      dataIndex: "danhgia",
      key: "danhgia",
      width: 120
    },
    {
      title: "Người dùng",
      dataIndex: "user",
      key: "user",
      width: 120,
      render: (_: any, { user }: any) => (
        <Tooltip title={user?.email}>
          {user?.username}
        </Tooltip>
      )
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_: any, { createdAt }: any) => <p>{formatTime(createdAt)} - {formatDate(createdAt)}</p>,
      width: 120,
    },
    {
      title: "Hành Động",
      dataIndex: "hanhdong",
      key: "hanhdong",
      width: 50,
    },
  ];

  const dataComment = comments?.map((item: any, key: any) => ({
    key,
    stt: key + 1,
    noidung: item.content,
    danhgia: <Rate allowHalf defaultValue={item.rating} disabled style={{ fontSize: '12px' }} />,
    hanhdong: (
      <Switch
        defaultChecked={!Boolean(item.status)}
        checkedChildren="Hiện"
        unCheckedChildren="Ẩn"
        onChange={() => changeStatus(item, item.status)}

      />
    ),
    user: item?.userId,
    createdAt: item?.createdAt
  }));

  return (
    <div>
      <div className="flex gap-5">
        <Button type="primary" style={{ marginBottom: "20px" }}>
          <Link to="/admin/movies">Danh sách phim</Link>
        </Button>
      </div>
      <DataTable column={columns} data={dataComment} />
    </div>
  );
}

export default ListCommentMovie;
