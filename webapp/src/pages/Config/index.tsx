import {Button, Form, Input, Modal, notification, Select, Space, Table} from "antd";
import {useEffect, useState} from "react";
import {CreateEditForm} from "./CreateEditForm";
import axios from "axios";
import {Configs, ConfigsResponseDto, Keywords} from "../../dto/configs.dto";

export const ConfigView = () => {

    const [form] = Form.useForm();
    const [keywordSet, setKeywordSet] = useState<Keywords>();
    const [selectedSheet, setSelectedSheet] = useState<Configs>();
    const [configList, setConfigList] = useState<ConfigsResponseDto>()
    const [modalVisible, setModalVisible] = useState({
        create: false,
        edit: false,
        delete: false,
        editConfig: false,
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
            dataIndex: 'word',
            key: 'word',
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (index: any, record: Keywords) => {
                return (
                    <Space direction={"horizontal"}>
                        <Button type={"link"} onClick={() => {
                            // setSelectedSheet(record);
                            setKeywordSet(record);
                            setModalVisible({...modalVisible, edit: true});
                        }}>Edit</Button>
                        <Button type={"link"} onClick={() => {
                            // setSelectedSheet(record);
                            setKeywordSet(record);
                            setModalVisible({...modalVisible, delete: true});
                        }}>Delete</Button>
                    </Space>
                )
            }
        }
    ];

    const getConfigList = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/configs/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                setConfigList(res.data)
                setSelectedSheet(res.data[0])
                form.setFieldsValue({
                    sheetType: res.data[0].sheet_name,
                })
            })
            .catch((error) => {
                notification["error"]({
                    message: 'Error',
                    description: error?.response?.data?.detail ?? "Something went wrong",
                });
            })
    }

    const onSheetTypeChange = (value: string) => {
        setSelectedSheet(configList?.find((item: Configs) => item.sheet_name === value))
    }

    const onDeleteKeyword = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/keywords/${keywordSet?.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                notification["success"]({
                    message: 'Success',
                    description: "Operation Success",
                });
            })
            .catch((error) => {
                notification["error"]({
                    message: 'Error',
                    description: error?.response?.data?.detail ?? "Something went wrong",
                });
            })
            .finally(() => {
                setModalVisible({...modalVisible, delete: false})
                getConfigList()
            })
    }

    const onCloseModal = () => {
        setModalVisible({...modalVisible, create: false, edit: false, delete: false})
        getConfigList()
    }

    useEffect(() => {
        getConfigList()
    }, []);

    useEffect(() => {
        if (selectedSheet) {
            form.setFieldsValue({
                sheet: selectedSheet.sheet_name,
                passThreshold: selectedSheet.threshold,
            })
        }
    }, [selectedSheet]);


    // @ts-ignore
    return (
        <>
            <Space direction={"vertical"} style={{ width: '100%' }}>
                <Form
                    form={form}
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 22 }}
                >
                    <Form.Item label={"Select Sheet"} name={"sheetType"}>
                        <Select style={{ width: '100%' }} onChange={(value) => onSheetTypeChange(value)}>
                            {
                                configList?.map((config) => {
                                    return (
                                        <Select.Option value={ config.sheet_name }>{ config.sheet_name }</Select.Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label={"Sheet"} name={"sheet"}>
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label={"Pass Threshold"} name={"passThreshold"}>
                        <Input disabled />
                    </Form.Item>
                </Form>

                <Space direction={"horizontal"}>
                    <Button type={"primary"} onClick={() => setModalVisible({ ...modalVisible, create: true })} >Add keyword</Button>
                    <Button type={"primary"} onClick={() => setModalVisible({ ...modalVisible, editConfig: true })} >Edit Sheet</Button>
                </Space>

                {
                    selectedSheet && (
                        <Table dataSource={selectedSheet?.keywords} columns={columns} />
                    )
                }
            </Space>

            <Modal
                title="Create Modal"
                visible={modalVisible.create}
                onOk={() => setModalVisible({ ...modalVisible, create: false})}
                onCancel={() => setModalVisible({ ...modalVisible, create: false})}
                footer={null}
            >
                <CreateEditForm selectedSheet={selectedSheet} onCloseModal={onCloseModal} selectedKeywordSet={null} />
            </Modal>

            <Modal
                title="Edit Modal"
                visible={modalVisible.edit}
                onOk={() => setModalVisible({ ...modalVisible, edit: false})}
                onCancel={() => setModalVisible({ ...modalVisible, edit: false})}
                footer={null}
            >
                <CreateEditForm selectedSheet={selectedSheet} onCloseModal={onCloseModal} selectedKeywordSet={keywordSet} />
            </Modal>

            <Modal
                title="Delete Modal"
                visible={modalVisible.delete}
                onOk={() => setModalVisible({ ...modalVisible, delete: false})}
                onCancel={() => setModalVisible({ ...modalVisible, delete: false})}
                footer={null}
            >
                <Space direction={"vertical"}>
                    <p>Are you sure want to delete <b>{keywordSet?.word}</b> in <b>{selectedSheet?.sheet_name}</b>?</p>
                    <Button type={"default"} onClick={onDeleteKeyword}>Yes</Button>
                </Space>
            </Modal>

            <Modal
                title="Edit Sheet"
                visible={modalVisible.editConfig}
                onOk={() => setModalVisible({ ...modalVisible, editConfig: false})}
                onCancel={() => setModalVisible({ ...modalVisible, editConfig: false})}
                footer={null}
            >
                {/*<Space direction={"vertical"}>*/}
                {/*    <p>Are you sure want to delete <b>{keywordSet?.word}</b> in <b>{selectedSheet?.sheet_name}</b>?</p>*/}
                {/*    <Button type={"default"} onClick={onDeleteKeyword}>Yes</Button>*/}
                {/*</Space>*/}
            </Modal>
        </>
    )
}
