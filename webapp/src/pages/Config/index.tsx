import {Button, Col, Form, Input, Modal, Row, Select, Space, Table, Typography} from "antd";
import {useState} from "react";
import {CreateEditForm} from "./CreateEditForm";

export const ConfigView = () => {

    const [selectedRecord, setSelectedRecord] = useState({});
    const [modalVisible, setModalVisible] = useState({
        create: false,
        edit: false
    });

    const dataSource = [
        {
            key: '1',
            keyword: 'Mike',
            score: 32
        }
    ];

    const columns = [
        {
            title: 'Keyword',
            dataIndex: 'keyword',
            key: 'keyword',
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (index: any, record: any) => {
                return (
                    <Space direction={"horizontal"}>
                        <Button type={"link"} onClick={() => {
                            setSelectedRecord(record);
                            setModalVisible({...modalVisible, edit: true});
                        }}>Edit</Button>
                        <Button type={"link"}>Delete</Button>
                    </Space>
                )
            }
        }
    ];

    return (
        <>
            <Space direction={"vertical"} style={{ width: '100%' }}>
                <Form
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 22 }}
                >
                    <Form.Item label={"Select Sheet"} name={"sheetType"}>
                        <Select defaultValue="lucy" style={{ width: 120 }} onChange={(value) => console.log(value)}>
                            <Select.Option value="CASH_STATEMENT">Cash Statement</Select.Option>
                            <Select.Option value="BALANCE_SHEET">Balance Sheet</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={"Sheet"} name={"sheet"}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={"Pass Threshold"} name={"passThreshold"}>
                        <Input />
                    </Form.Item>
                </Form>

                <Table dataSource={dataSource} columns={columns} />
            </Space>

            <Modal
                title="Create Modal"
                visible={modalVisible.create}
                onOk={() => setModalVisible({ ...modalVisible, create: false})}
                onCancel={() => setModalVisible({ ...modalVisible, create: false})}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

            <Modal
                title="Edit Modal"
                visible={modalVisible.edit}
                onOk={() => setModalVisible({ ...modalVisible, edit: false})}
                onCancel={() => setModalVisible({ ...modalVisible, edit: false})}
                footer={null}
            >
                <CreateEditForm selectedRecord={selectedRecord} />
            </Modal>
        </>
    )
}