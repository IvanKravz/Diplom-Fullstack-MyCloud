import React from 'react';
import './ModalPopupEditFilesAdmin.css';
import { Button, Form, Input } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useAppDispatch } from '../App/hooks';
import { updateFile } from '../App/Slices/FileSlice';

export const ModalPopupEditFilesAdmin = ({ active, setModalEditActive, file }) => {
    const dispatch = useAppDispatch();
    const [fileName, setFileName] = useState('');
    const [activeFileName, setActiveFileName] = useState(false);
    const [fileDescription, setFileDescription] = useState('');
    const [activeFileDescription, setActiveFileDescription] = useState(false);
    const [activeIconOkName, setActiveIconOkName] = useState(false);
    const [activeIconOkFile, setActiveIconOkFile] = useState(false);

    const [btnOkActive, setBtnOkActive] = useState(false);

    function changeSet() {
        setModalEditActive(false);
        setModalEditActive(true);
        setBtnOkActive(true);
    }

    const handleUpdateFileName = (id) => {
        console.log(id)
        if (fileName === null) {
            return
        }
        if (fileName.length <= 10) {
            dispatch(updateFile({ id: id, newFileName: fileName }))
                .then(() => {
                    changeSet()
                    setActiveIconOkName(true);
                    setActiveFileName(false)
                })
        }
    }

    const handleUpdateFileDescription = (id) => {
        if (fileDescription === null || fileDescription === '') {
            fileDescription = 'комментарий нет'
        }
        dispatch(updateFile({ id: id, newDescription: fileDescription }))
            .then(() => {
                changeSet()
                setActiveIconOkFile(true);
                setActiveFileDescription(false)
            })
    }

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setModalEditActive(false)}>
            <div className={active ? 'modal_content active' : 'modal_content'} onClick={e => e.stopPropagation()}>
                <img className='modal_cloud_image' src={require('../../assets/cloud.png')} />
                <h3>Изменить данные файла {file.filename}</h3>
                <Form className='input_form'>

                    <Form.Item className='form_item'>
                        <Input
                            allowClear
                            placeholder={file.filename}
                            required
                            onClick={() => { setActiveFileName(true), setActiveFileDescription(false) }}
                            onChange={(e) => setFileName(e.target.value)}
                        />
                        <Button className={activeFileName ? 'btn_ok_edit active' : 'btn_ok_edit'}
                            onClick={() => handleUpdateFileName(file.id)}
                        >Ок
                        </Button>
                        {activeIconOkName && <CheckOutlined className='icon_change_ok' />}
                    </Form.Item>

                    <Form.Item className='form_item'>
                        <Input
                            placeholder={file.description}
                            allowClear
                            required
                            onClick={() => { setActiveFileName(false), setActiveFileDescription(true) }}
                            onChange={(e) => setFileDescription(e.target.value)}
                        />
                        <Button className={activeFileDescription ? 'btn_ok_edit active' : 'btn_ok_edit'}
                            onClick={() => handleUpdateFileDescription(file.id)}
                        >Ок
                        </Button>
                        {activeIconOkFile && <CheckOutlined className='icon_change_ok' />}
                    </Form.Item>

                    <div className='btn_edit_user'>
                        {btnOkActive && <Button className='btn_modal'
                            onClick={() => location.reload()}
                        >Принять
                        </Button>}
                        <Button className='btn_modal'
                            onClick={() => setModalEditActive(false)}
                        >Отмена
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
