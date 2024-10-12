import React from 'react'
import { Table, Space } from 'antd';
import { getReadableFileSizeString } from '../Validations/Validations';
import { FileExcelFilled, EditFilled } from '@ant-design/icons';
import { deleteFile } from '../App/Slices/FileSlice';
import { useAppDispatch } from '../App/hooks'
import { useState } from 'react';
import { ModalPopup } from '../ModalPopup/ModalPopup';
import { ModalPopupEditFilesAdmin } from '../ModalPopupEditFilesAdmin/ModalPopupEditFilesAdmin';

export const AdminEditFilesUser = ({ files, user }) => {
    const { Column } = Table;
    const dispatch = useAppDispatch();
    const [modalActive, setModalActive] = useState(false);
    const [file, setFile] = useState('');
    const [modalEditActive, setModalEditActive] = useState(false);

    const handleDeleteFile = (file) => {
        dispatch(deleteFile(file.id))
            .then(() => {
                location.reload();
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
    }

    return (
        <div className='form_file'>
            {user && <h4>Файлы пользователя {user.username}</h4>}
            <Table dataSource={files}>
                <Column title="Имя файла" dataIndex="filename" key="filename" />
                <Column title="Комментарий" dataIndex="description" key="description" />
                <Column
                    title="Размер"
                    render={(file) => (
                        <Space size="middle" >
                            {getReadableFileSizeString(file.size)}
                        </Space>
                    )}
                />
                <Column title="Время загрузки в облако" dataIndex="upload_time" key="upload_time" />
                <Column title="Время скачивания" dataIndex="downloadTime" key="downloadTime" />
                <Column
                    title="Ссылка"
                    dataIndex="link"
                    key="link"
                    render={(link) => (
                        <Space size="middle" >
                            <a href={link}>{link}</a>
                        </Space>
                    )}
                />
                <Column
                    title="Действия"
                    render={(file) => (
                        <Space size="middle" >
                            <EditFilled
                                className='edit_outlined'
                                onClick={() => { setModalEditActive(true); setFile(file) }}
                            />
                            <FileExcelFilled
                                className='user_delete_outlined'
                                onClick={() => { setModalActive(true); setFile(file) }}
                            />
                        </Space>
                    )}
                />
            </Table>
            <ModalPopup active={modalActive} setModalActive={setModalActive} fileDelete={file} handleDeleteFile={handleDeleteFile} />
            <ModalPopupEditFilesAdmin active={modalEditActive} setModalEditActive={setModalEditActive} file={file} />
        </div>
    )
}
