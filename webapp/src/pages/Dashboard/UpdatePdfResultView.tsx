import {Button, Form, Input, Select} from "antd";

const { Option } = Select;

export const UpdatePdfResultView = () => {
    return (
        <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
        >
            <Form.Item label="Type">
                <Select onChange={() => {}}>
                    <Option value="CASH_STATEMENT">CASH STATEMENT</Option>
                    <Option value="BALANCE_SHEET">BALANCE SHEET</Option>
                    <Option value="INCOME_STATEMENT">INCOME STATEMENT</Option>
                </Select>
            </Form.Item>
            <Form.Item label="Page Number">
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={() => {}}
                >
                    {
                        [...Array(100)].map((item, index) => {
                            return (
                                <Option value={index + 1}>{ index + 1 }</Option>
                            )
                        })
                    }
                </Select>
            </Form.Item>
            <div style={{ textAlign: 'center' }}>
                <Button type="primary">Update</Button>
            </div>
        </Form>
    )
}
