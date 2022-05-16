import {Button, Form, Input, notification} from "antd";
import {Configs} from "../../dto/configs.dto";
import axios from "axios";
import {useEffect} from "react";

type PropsType = {
    selectedSheet: Configs | undefined;
    onCloseModal: () => void;
}

export const EditConfigForm = ({ selectedSheet, onCloseModal }: PropsType) => {

    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields().then(values => {
            console.log(values)
            axios.put(`${process.env.REACT_APP_API_URL}/configs/${selectedSheet?.id}`, {
                sheet_name: values.sheet_name,
                threshold: values.threshold,
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
                .finally(() => {
                    form.resetFields()
                    onCloseModal()
                })
        })
    }

    useEffect(() => {
        if (selectedSheet) {
            form.setFieldsValue({
                sheet_name: selectedSheet.sheet_name,
                threshold: selectedSheet.threshold,
            })
        }
    }, [selectedSheet]);


    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 19 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Sheet Name"
                    name="sheet_name"
                    rules={[{ required: true, message: 'Please input sheet name!' }]}
                >
                    <Input disabled={true} />
                </Form.Item>

                <Form.Item
                    label="Pass threshold"
                    name="threshold"
                    rules={[{ required: true, message: 'Please input threshold!' }]}
                >
                    <Input type={"number"} />
                </Form.Item>

                <div style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </>
    )
}
