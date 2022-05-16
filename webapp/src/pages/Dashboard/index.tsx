import {Button, Form, Modal, notification, Space, Table} from "antd";
import {useEffect, useState} from "react";
import {UpdatePdfResultView} from "./UpdatePdfResultView";
import axios from "axios";
import {File, FilesResponseDto} from "../../dto/files.dto";
import {ResultView} from "./ResultView";

export const DashboardView = () => {

    const [resultForm] = Form.useForm();
    const [fileDataSource, setFileDataSource] = useState<FilesResponseDto>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalResultVisible, setIsModalResultVisible] = useState(false);
    const [selectedFileRecord, setSelectedFileRecord] = useState<File>();

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'od',
        },
        {
            title: 'PDF Path',
            dataIndex: 'file_path',
            key: 'file_path',
        },
        {
            title: 'OCR Result Path',
            dataIndex: 'folder_location',
            key: 'folder_location',
        },
        {
            title: 'Need Verify',
            dataIndex: 'need_verify',
            key: 'need_verify',
            render: (text: File, record: File) => {
                return record.need_verify ? 'Yes' : 'No';
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text: File, record: File) => {
                return (
                    <>
                        <Space>
                            <Button type="link" onClick={() => window.open(`${process.env.REACT_APP_API_URL}/files/${record.id}/pdf`, "_blank")}>View PDF</Button>
                            <Button type="link" onClick={() => {
                                setSelectedFileRecord(record);
                                setIsModalVisible(true)
                            }}>Update</Button>
                            <Button type="link" onClick={() => {
                                setSelectedFileRecord(record);
                                setIsModalResultVisible(true)
                            }}>Result</Button>
                        </Space>
                    </>
                )
            }
        }
    ];

    const onCloseModal = () => {
        setIsModalVisible(false);
        getFileList();
    }

    const getFileList = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/files`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                setFileDataSource(res.data);
            })
            .catch((error) => {
                notification["error"]({
                    message: 'Error',
                    description: error?.response?.data?.detail ?? "Something went wrong",
                });
            })
    }

    const onCloseResultModal = () => {
        setIsModalResultVisible(false);
        resultForm.resetFields();
    }

    useEffect(() => {
        getFileList();
    }, []);


    return (
        <>
            <Space style={{width: '100%'}} direction={"vertical"}>
                <Button type={"primary"}>Primary</Button>
                <Table dataSource={fileDataSource} columns={columns}/>
            </Space>

            {
                isModalVisible && (
                    <>
                        <Modal title="Update" visible={isModalVisible} onOk={() => setIsModalVisible(false)}
                               onCancel={() => setIsModalVisible(false)} footer={null}>
                            <UpdatePdfResultView selectedRecord={selectedFileRecord} onCloseModal={onCloseModal} />
                        </Modal>
                    </>
                )
            }

            {
                isModalResultVisible && (
                    <>
                        <Modal title="Result" visible={isModalResultVisible} onOk={() => setIsModalResultVisible(false)}
                               onCancel={() => setIsModalResultVisible(false)} footer={null}>
                            <ResultView file_id={selectedFileRecord?.id} form={resultForm} onCloseModal={onCloseResultModal} />
                        </Modal>
                    </>
                )
            }
        </>
    );
};
