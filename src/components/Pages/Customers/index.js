import { Avatar, Button, Rate, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers, getInventory } from "../../API";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";


function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((res) => {
      setDataSource(res.users);
      setLoading(false);
    });
  }, []);

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Customers</Typography.Title>
      <Button type='primary' icon={<PlusOutlined style={{ fontSize: '15px' }} />}>Add Customer </Button>
      <Table
        loading={loading}
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (link) => {
              return <Avatar src={link} />;
            },
          },
          {
            title: "First Name",
            dataIndex: "firstName",
          },
          {
            title: "LastName",
            dataIndex: "lastName",
          },
          {
            title: "Email",
            dataIndex: "email",
          },

          {
            title: "Update",
            dataIndex: "update",
            render: () => {
              return <EditFilled style={{ fontSize: '24px', color: 'black' }} />;
            }
          }, {
            title: "Delete",
            dataIndex: "Delete",
            render: () => {
              return <DeleteFilled style={{ fontSize: '24px', color: 'red' }} />;
            },
          }
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Customers;
