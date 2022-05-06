import {Button, Space, Table} from "antd";

export const DashboardView = () => {

    const dataSource = [
        {
            no: '1',
            pdfPath: 'xx/xx/xx',
            ocrResultPath: 'xx/xx/xx',
            needVerify: true,
        },
        {
            no: '2',
            pdfPath: 'xx/xx/xx',
            ocrResultPath: 'xx/xx/xx',
            needVerify: false,
        },
    ];

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
        },
        {
            title: 'PDF Path',
            dataIndex: 'pdfPath',
            key: 'pdfPath',
        },
        {
            title: 'OCR Result Path',
            dataIndex: 'ocrResultPath',
            key: 'ocrResultPath',
        },
        {
            title: 'Need Verify',
            dataIndex: 'needVerify',
            key: 'needVerify',
            render: (text: any, record: any) => {
                return record.needVerify ? 'Yes' : 'No';
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text: any, record: any) => {
                return (
                    <>
                        <Space>
                            <Button type="link">View PDF</Button>
                            <Button type="link">Update</Button>
                        </Space>
                    </>
                )
            }
        }
    ];

    return (
        <>
            <Space style={{ width: '100%' }} direction={"vertical"}>
                <Button type={"primary"}>Primary</Button>
                <Table dataSource={dataSource} columns={columns} />
            </Space>
        </>
    );
};