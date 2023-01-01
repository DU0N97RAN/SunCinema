import React, { useEffect, useState } from "react";
import { Avatar, Button, Divider, Form, Input, List, Modal, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
   voucherId?: any,
   userId?: any
};

interface CollectionCreateFormProps {
   open: boolean;
   onCancel: () => void;
}
const VoucherUserUsed = ({ voucherId, userId }: Props) => {
   const [data, setData] = useState<any[]>([]);
   const [open, setOpen] = useState(false);

   const loadMoreData = () => {
      if (userId) { setData(userId) }
   };
   useEffect(() => {
      loadMoreData();
   }, [userId]);

   const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({ open, onCancel, }) => {
      return (
         <Modal open={open} title={`voucherId : ${voucherId}`} cancelText="Cancel" onCancel={onCancel} >
            <div id="scrollableDiv" style={{ height: 400, overflow: 'auto', padding: '0 16px', border: '1px solid rgba(140, 140, 140, 0.35)' }}>
               <InfiniteScroll
                  dataLength={data?.length}
                  next={loadMoreData}
                  hasMore={data?.length < 10}
                  loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                  endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                  scrollableTarget="scrollableDiv"
               >
                  <List
                     dataSource={data}
                     renderItem={(item: any) => (
                        <List.Item key={item.email}>
                           <List.Item.Meta
                              avatar={<Avatar src={item.avatar[0] ? item.avatar[0]?.url : ""} />}
                              title={<a href={`/admin/users/${item?._id}`}>{item.username}</a>}
                              description={item.email}
                           />
                           <div>Used</div>
                        </List.Item>
                     )}
                  />
               </InfiniteScroll>
            </div>
         </Modal>
      );
   };

   return (
      <div>
         <Button onClick={() => { setOpen(true) }} >
            Check userId
         </Button>
         <CollectionCreateForm
            open={open}
            onCancel={() => { setOpen(false) }}
         />
      </div>
   );
};

export default VoucherUserUsed;
