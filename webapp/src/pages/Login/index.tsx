import {Button, Checkbox, Form, Input, Row} from "antd";
import {useNavigate} from "react-router-dom";

export const LoginView = () => {

    const navigate = useNavigate();

    const onFinish = () => {
        navigate("/app/dashboard");
    }

    return (
        <>
            <div style={{ padding: 200 }}>
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
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