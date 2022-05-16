import {Button, Form, Input, notification, Select} from "antd";
import {File} from "../../dto/files.dto";
import axios from "axios";
import {useEffect, useState} from "react";
import {ConfigsResponseDto} from "../../dto/configs.dto";

const { Option } = Select;

type PropsType = {
    selectedRecord: File | undefined
    onCloseModal: () => void
}

export const UpdatePdfResultView = ({ selectedRecord }: PropsType) => {

    const [form] = Form.useForm();
    const [configList, setConfigList] = useState<ConfigsResponseDto>()

    const getConfigList = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/configs/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                setConfigList(res.data)
            })
            .catch((error) => {
                notification["error"]({
                    message: 'Error',
                    description: error?.response?.data?.detail ?? "Something went wrong",
                });
            })
    }

    const onSubmit = () => {
        form.validateFields().then(values => {
            axios.patch(`${process.env.REACT_APP_API_URL}/files/${selectedRecord?.id}/pages/update`, {
                page_list: values.page_list.sort((a: number, b: number) => a - b),
                sheet_name: values.sheet_name,
            }, {
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
        })
    }

    useEffect(() => {
        getConfigList()
    }, []);


    return (
        <Form
            form={form}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onSubmit}
        >
            <Form.Item label="Type" name={"sheet_name"}>
                <Select onChange={() => {}}>
                    {
                        configList?.map((config) => {
                            return <Option value={config.sheet_name}>{config.sheet_name}</Option>
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item label="Page Number" name={"page_list"}>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={() => {}}
                >
                    {
                        [...Array(selectedRecord?.page || 1)].map((item, index) => {
                            return (
                                <Option value={index + 1}>{ index + 1 }</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
            <div style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType={"submit"} >Update</Button>
            </div>
        </Form>
    )
}
