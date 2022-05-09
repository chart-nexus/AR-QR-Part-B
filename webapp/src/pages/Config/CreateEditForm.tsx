import {useEffect} from "react";
import {Button, Checkbox, Form, Input} from "antd";

export const CreateEditForm = ({ selectedRecord }: { selectedRecord: any }) => {

    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields().then(values => {
            if (selectedRecord) {
                // TODO: Update keyword and score

            } else {
                // TODO: Add keyword and score

            }
            form.resetFields()
        })
    }

    useEffect(() => {
        if (selectedRecord) {
            form.setFieldsValue({
                keyword: selectedRecord.keyword,
                score: selectedRecord.score,
            })
        }
    }, [selectedRecord])

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
                    name="keyword"
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