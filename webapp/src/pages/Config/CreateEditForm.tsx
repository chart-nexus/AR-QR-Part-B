import {useEffect} from "react";
import {Button, Checkbox, Form, Input, notification} from "antd";
import {Configs, Keywords} from "../../dto/configs.dto";
import axios from "axios";

type PropsType = {
    selectedSheet: Configs | undefined;
    onCloseModal: () => void;
    selectedKeywordSet: Keywords | null | undefined;
}

export const CreateEditForm = ({ selectedSheet, onCloseModal, selectedKeywordSet } : PropsType) => {

    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields().then(values => {
            if (selectedSheet) {
                axios.post(`${process.env.REACT_APP_API_URL}/keywords`, {
                    sheet_config_id: selectedSheet.id,
                    word: values.word,
                    score: values.score
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
            } else {
                notification["error"]({
                    message: 'Error',
                    description: "Form Submit Error",
                });
            }
        })
    }

    useEffect(() => {
        if (selectedKeywordSet) {
            form.setFieldsValue({
                word: selectedKeywordSet.word,
                score: selectedKeywordSet.score
            })
        }
    }, [selectedKeywordSet]);


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
                    label="Keyword"
                    name="word"
                    rules={[{ required: true, message: 'Please input keyword!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Score"
                    name="score"
                    rules={[{ required: true, message: 'Please input score!' }]}
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
