import {Button, Form, Input, notification} from "antd";
import axios from "axios";
import {ResultResponseDto} from "../../dto/result.dto";
import {useEffect, useState} from "react";

type PropsType = {
    file_id: number | undefined;
    form: any;
    onCloseModal: () => void;
}

export const ResultView = ({file_id, form, onCloseModal}: PropsType) => {

    const [resultToShow, setResultToShow] = useState<ResultResponseDto>();

    const getResult = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/files/${file_id}/pages`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                setResultToShow(res.data)
            })
            .catch((error) => {
                notification["error"]({
                    message: 'Error',
                    description: error?.response?.data?.detail ?? "Something went wrong",
                });
            })
    }

    useEffect(() => {
        getResult()
    }, []);

    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 19 }}
                autoComplete="off"
            >
                {
                    resultToShow?.map((result, index) => {
                        return (
                            <>
                                <Form.Item
                                    label="Sheet Name"
                                >
                                    <Input value={result.sheet_name} />
                                </Form.Item>

                                <Form.Item
                                    label="Pages List"
                                >
                                    <Input value={result.page_list.sort((a: number, b: number) => a - b).join(", ")} />
                                </Form.Item>
                            </>
                        )
                    } )
                }
            </Form>
        </>
    )
}
