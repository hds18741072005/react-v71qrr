import React from 'react';
import React, { useState, useEffect } from 'react';
import { Card, Breadcrumb, Layout } from 'antd';
import {EditableTable} from "../../components/EditableTable/index"
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
} from 'antd';

import {
  getComponentList,
  deleteComponent,
  getComponentType,
  addComponent,
  editComponent,
} from '../../api/component/index';

const { Content } = Layout;

function Home() {
  const [componentList, setComponentList] = useState([]);
  const [searchComponentList, setSearchComponentList] = useState([]);
  const [form] = Form.useForm();
  const [drawerStatus, setDrawerStatus] = useState(false);
  const [drawerDate, setDrawerDate] = useState({});
  const [cardList, setCardList] = useState([]);
  const [defaultcardList, setDefaultcardList] = useState([]);

  useEffect(() => {
    getComponentList().then((e) => {
      setCardList(e.data);
      setDefaultcardList(e.data);
    });
    getComponentType().then((e) => {
      setComponentList(e.data);
    });
  }, []);

  function initComponentType() {
    getComponentType().then((e) => {
      setComponentList(e.data);
    });
  }

  const getSearchComponentList = () => {
    const children = [];
    children.push(
      <Col span={6}>
        <Button
          type="dashed "
          onClick={() => {
            getComponentList().then((e) => {
              setCardList(e.data);
            });
            setSearchComponentList([]);
          }}
        >
          全部
        </Button>
      </Col>
    );
    for (let i = 0; i < componentList.length; i++) {
      children.push(
        <Col span={6}>
          <Button
            type="dashed"
            onClick={() => {
              if (searchComponentList.length == 0) {
                searchComponentList.push(componentList[i].id);
                let newArr = JSON.parse(JSON.stringify(cardList));
                newArr = newArr.filter((x) => {
                  return x.type === componentList[i].id;
                });
                setCardList(newArr);
              } else {
                let newArr = JSON.parse(JSON.stringify(cardList));
                let falg = newArr.find((c) => c === componentList[i].id);
                if (falg) {
                } else {
                  console.log(newArr);
                  initComponentType();
                  let newArr2 = JSON.parse(JSON.stringify(defaultcardList));
                  console.log(newArr2);
                  newArr2 = newArr2.filter((x) => {
                    return x.type === componentList[i].id;
                  });
                  newArr2 = newArr.concat(newArr2);
                  console.log(newArr2);
                  setCardList(newArr2);
                  searchComponentList.push(componentList[i].id);
                }
              }
            }}
          >
            {componentList[i].name}
          </Button>
        </Col>
      );
    }
    return children;
  };

  function updatedrawerDate(data) {
    setDrawerDate(data);
  }

  function updrawerStatus(data) {
    setDrawerStatus(data);
  }

  const getType = () => {
    const children = [];

    for (let i = 0; i < componentList.length; i++) {
      children.push(
        <Option value={componentList[i].id}>{componentList[i].name}</Option>
      );
    }
    return children;
  };

  const getCardList = () => {
    const children = [];
    children.push(
      <Col span={8}>
        <Card
          bordered={false}
          style={{
            width: 300,
            height: 250,
            marginTop: 20,
          }}
        >
          <Button
            type="text"
            onClick={() => {
              updatedrawerDate({});
              updrawerStatus(true);
            }}
          >
            新增主键
          </Button>
        </Card>
      </Col>
    );

    for (let i = 0; i < cardList.length; i++) {
      children.push(
        <Col span={8}>
          <Card
            bordered={false}
            style={{
              width: 300,
              height: 250,
              marginTop: 20,
            }}
          >
            <div>
              <b>{cardList[i].name}</b>
            </div>
            <Row gutter={24}>
                            
              <Col span={12}>
                                <p>组件类型</p>
                                <p>{cardList[i].type}</p>
                              
              </Col>
                            
              <Col span={12}>
                                <p>启动状态</p>
                                {' '}
                <Switch
                  defaultChecked={
                    cardList[i].state.value === 'enabled' ? true : false
                  }
                  onChange={(e) => {}}
                />
                              
              </Col>
                          
            </Row>
                        
            <Divider />
                        
            <Row gutter={24}>
                            
              <Col span={12}>
                                
                <Button
                  type="text"
                  onClick={() => {
                    updatedrawerDate(cardList[i]);
                    updrawerStatus(true);
                  }}
                >
                  编辑
                </Button>
                              
              </Col>
                            
              <Col span={12}>
                                {' '}
                <Popconfirm
                  onConfirm={() => {
                    deleteComponent(cardList[i].id).then((v) => {
                      console.log(v);
                      getCardList();
                    });
                  }}
                  title="确认删除组件吗"
                  okText="确认"
                  cancelText="取消"
                >
                  <Button>删除</Button>
                </Popconfirm>
                              
              </Col>
                          
            </Row>
            <div></div>
          </Card>
        </Col>
      );
    }
    return children;
  };

  return (
    <>
      <Drawer
        title={drawerDate.id !== undefined ? '编辑组件' : '新建主键'}
        placement="right"
        onClose={() => {
          setDrawerStatus(false);
        }}
        visible={drawerStatus}
        destroyOnClose
      >
        <div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{
              name: drawerDate.name,
              type: drawerDate.type,
              shareCluster: drawerDate.shareCluster,
            }}
          >
            <Form.Item label="组件名称:" name="name">
              <input
                onChange={(e) => {
                  let newArr = JSON.parse(JSON.stringify(drawerDate));
                  newArr.name = e.target.value;
                  setDrawerDate(newArr);
                }}
              ></input>
            </Form.Item>

            <Form.Item label="组件类型:" name="type">
              <Select
                onChange={(v) => {
                  let newArr = JSON.parse(JSON.stringify(drawerDate));
                  newArr.type = v;
                  setDrawerDate(newArr);
                }}
              >
                {getType()}
              </Select>
            </Form.Item>

            <Form.Item
              label="集群"
              name="shareCluster"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Radio.Group
                onChange={(v) => {
                  let newArr = JSON.parse(JSON.stringify(drawerDate));
                  newArr.shareCluster = v;
                  setDrawerDate(newArr);
                }}
                value={drawerDate.shareCluster}
              >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </Radio.Group>
            </Form.Item>

            <Button
              type="primary"
              onClick={() => {
                console.log(drawerDate);
                if (drawerDate.id !== undefined) {
                  editComponent(drawerDate.id, drawerDate).then((e) => {
                    console.log(drawerDate);
                    console.log(e);
                    getCardList();
                    setDrawerStatus(false);
                  });
                } else {
                  drawerDate.id = Date.now();
                  console.log(drawerDate);
                  addComponent(drawerDate).then((e) => {
                    console.log(e);
                    getCardList();
                    setDrawerStatus(false);
                  });
                }
              }}
            >
              确认
            </Button>
            <Button
              onClick={() => {
                setDrawerStatus(false);
              }}
            >
              取消
            </Button>
          </Form>
         
        </div>
      </Drawer>
      <Card>
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="/home">角色管理</Breadcrumb.Item>
          <Breadcrumb.Item href="/home/1">组件管理</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ margin: '15px 0' }}>
          <Form name="advanced_search" className="ant-advanced-search-form">
            <Row>{getSearchComponentList()}</Row>
            <Divider dashed />
            <Form.Item label="其他选项：  配置名称：" name="username">
              <Input
                onPressEnter={(e) => {
                  let newArr = JSON.parse(JSON.stringify(cardList));
                  newArr = newArr.filter((x) => {
                    return x.name === e.target.value;
                  });
                  setCardList(newArr);
                }}
              />
            </Form.Item>
          </Form>
        </Content>
      </Card>

      <Row>{getCardList()}</Row>
    </>
  );
}

export default Home;
