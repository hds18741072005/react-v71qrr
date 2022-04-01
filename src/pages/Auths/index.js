import React from 'react';
import { Card, Breadcrumb, Layout } from 'antd';
/**
 * 权限管理接口
 *
 * 接口统一返回格式
 *  { data: Object, code: number, msg: string },
 *  code: 接口返回状态
 *  data: 返回数据
 *  msg:  返回信息
 */
import React from 'react';
import React, { useState, useEffect } from 'react';
import { Card, Breadcrumb, Layout } from 'antd';
import { EditableTable } from '../../components/EditableTable/index';
import { EditableProTable } from '@ant-design/pro-table';
import { ProFormRadio, ProFormField } from '@ant-design/pro-form';
import ProCard from '@ant-design/pro-card';
/**
 * 组件管理接口
 *
 * 接口统一返回格式
 *  { data: Object, code: number, msg: string },
 *  code: 接口返回状态
 *  data: 返回数据
 *  msg:  返回信息
 */
import {
  Select,
  Radio,
  Form,
  Row,
  Col,
  Input,
  Button,
  Table,
  Switch,
  Column,
  Divider,
  TextArea,
  Drawer,
  Modal,
  Popconfirm,
  InputNumber,
  Typography,
} from 'antd';
import { getAuthList, editAuth, addAuth } from '../../api/auth/index';
const { Content } = Layout;

function NewService1() {
  const [authList, setAuthList] = useState([]);
  const [name, setName] = useState('');
  const [id, setId] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [dataSource, setDataSource] = useState([
    {
      key: 0,
      action: 'query',
      name: '查询列表',
      describe: '查询列表',
    },
    {
      key: 1,
      action: 'get',
      name: '查询明细',
      describe: '查询明细',
    },
    {
      action: 'add',
      name: '新增',
      describe: '新增',
    },
    {
      action: 'update',
      name: '修改',
      describe: '修改',
    },
    {
      action: 'delete',
      name: '删除',
      describe: '删除',
    },
    {
      action: 'improt',
      name: '导入',
      describe: '导入',
    },
    {
      action: 'export',
      name: '导出',
      describe: '导出',
    },
  ]);

  const [form] = Form.useForm();

  useEffect(() => {
    getAuthList().then((e) => {
      setAuthList(e.data);
    });
  }, []);
  return (
    <>
      <Card>
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/services">角色管理</Breadcrumb.Item>
          <Breadcrumb.Item href="/services/1">权限管理</Breadcrumb.Item>
        </Breadcrumb>

        <Content style={{ margin: '15px 0' }}>
          <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
            <Row>
              <Col span={8}>
                <Form.Item label="id" name="id">
                  <Input
                    onChange={(e) => {
                      setId(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="名称" name="name">
                  <Input
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      let newArr = JSON.parse(JSON.stringify(authList));
                      if (id != 0 && name == '') {
                        newArr = newArr.filter((v) => {
                          console.log(v.id === id);
                          return v.id === id;
                        });
                      }
                      if (id == 0 && name != '')
                        newArr = newArr.filter((v) => {
                          console.log(v.id === id);
                          return v.name === name;
                        });
                      if (id != 0 && name != '') {
                        newArr = newArr.filter((v) => {
                          console.log(v.id === id);
                          return v.name === name && v.id === id;
                        });
                      }
                      setAuthList(newArr);
                    }}
                  >
                    查询
                  </Button>
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      setName('');
                      setId(0);
                      form.resetFields();
                      getAuthList().then((e) => {
                        setAuthList(e.data);
                      });
                    }}
                  >
                    重置
                  </Button>
                </Form.Item>
              </Col>
            </Row>

            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                originData = dataSource;
                setIsModalVisible(true);
              }}
            >
              新增
            </Button>

            <Modal
              title={modalData[0] != null ? '编辑权限' : ' 新增权限'}
              visible={isModalVisible}
              width={800}
              onOk={() => {
                setIsModalVisible(false);
              }}
              onCancel={() => {
                setIsModalVisible(false);
              }}
            >
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{
                  id: modalData.id,
                  name: modalData.name,
                  status: modalData.status,
                }}
              >
                <Form.Item label="权限标识Id" name="id">
                  <Input />
                </Form.Item>

                <Form.Item label="权限名称" name="name">
                  <Input />
                </Form.Item>
                <Form.Item label="是否启用" name="status">
                  <Switch defaultChecked onChange={() => {}} />
                </Form.Item>
              </Form>
              <EditableTable></EditableTable>
            </Modal>
          </Form>
        </Content>
      </Card>

      <Card style={{ margin: '15px 0' }}>
        <Table dataSource={authList}>
          <Column title="id" dataIndex="id" key="id" />
          <Column title="名称" dataIndex="name" key="name" />
          <Column title="状态" dataIndex="status" key="status" />
        </Table>
      </Card>
    </>
  );
}

export default NewService1;

let originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: '动作',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: '名称',
      dataIndex: 'age',
      width: '15%',
      editable: true,
    },
    {
      title: '描述',
      dataIndex: 'address',
      width: '40%',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              编辑
            </Typography.Link>
            <Typography.Link
              onClick={() => {
                const newData = [...data];
                let arr = newData.indexOf(record);
                newData.splice(arr, 1);

                setData(newData);
              }}
            >
              删除
            </Typography.Link>
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};
