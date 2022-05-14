import {Button, Form, Input, notification} from "antd";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export const LoginView = () => {

    const [form] = Form.useForm()
    const navigate = useNavigate();

    const onFinish = () => {
        form.validateFields().then((values) => {
            axios.post(`${process.env.REACT_APP_API_URL}/login`, {
                username: values.username,
                password: values.password
            })
                .then((res) => {
                    localStorage.setItem("token", res.data.access_token)
                    navigate("/app/dashboard");
                })
                .catch((error) => {
                    notification["error"]({
                        message: 'Error',
                        description: error?.response?.data?.detail ?? "Something went wrong",
                    });
                })
        })
    }

    return (
        <>
            <div style={{ padding: 200 }}>
                <Form
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}
