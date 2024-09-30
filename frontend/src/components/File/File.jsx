import React from 'react'
import Card from 'react-bootstrap/Card';
import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { addFile, deleteFile, loadFiles, updateFile } from '../App/Slices/FileSlice';
import { useAppDispatch } from '../App/hooks'
import './File.css'
import TextArea from 'antd/es/input/TextArea';
import { ModalPopup } from '../ModalPopup/ModalPopup';
import { saveAs } from 'file-saver'

export const File = ({ fileItem, fileSize }) => {
    const { id, file, filename, size, upload_time, downloadTime, description, link } = fileItem
    const dispatch = useAppDispatch();
    const [newFileName, setNewFilename] = useState(null)
    const [newDescription, setNewDescription] = useState(null);
    const [click, setClick] = useState(false);
    const [clickComments, setClickComments] = useState(false);
    const isValid = /\.(png|svg|jpg|jpeg|gif)$/i.test(link);
    const [modalActive, setModalActive] = useState(false)
    const [fileDelete, setFileDelete] = useState('')

    useEffect(() => {
        dispatch(addFile(fileItem))
    }, []);

    const downloadDate = ({ id, file }) => {
        saveAs(file)
        const dateDownload = new Date().toLocaleString("ru", { timeZone: "Europe/Moscow" })
        dispatch(updateFile({ id: id, dateDownload: dateDownload }))
            .then(() => {
                dispatch(loadFiles());
            })
            .catch((error) => {
                console.error('Ошибка изменения файла:', error);
            });
    }

    const handleDeleteFile = (file) => {
        dispatch(deleteFile(file.id))
            .then(() => {
                location.reload();
            })
            .catch((error) => {
                console.error('Ошибка:', error);
            });
    }

    const handleUpdateFileName = ({ id, newFileName }) => {

        if (newFileName === null) {
            return
        }

        if (newFileName.length <= 10) {
            dispatch(updateFile({ id: id, newFileName: newFileName }))
                .then(() => {
                    dispatch(loadFiles());
                })
        }
        setClick(false);
    }

    const handleUpdateFileDescription = ({ id, newDescription }) => {
        if (newDescription === null || newDescription === '') {
            newDescription = 'комментарий нет'
        }
        dispatch(updateFile({ id: id, newDescription: newDescription }))
            .then(() => {
                dispatch(loadFiles());
            })
        setClick(false);
    }

    return (
        <>
            <Card className='card_file'>
                <div className='card_img'>
                    {!click && filename}
                    {click &&
                        <Input
                            className='input_update_file'
                            label='Имя файла'
                            allowClear
                            required
                            // value={filename}
                            onChange={(e) => setNewFilename(e.target.value)} >
                        </Input>
                    }
                    <a href={file}>
                        {isValid &&
                            <Card.Img
                                className='card_file_img'
                                variant="top"
                                src={link} />}
                        {!isValid &&
                            <Card.Img
                                className='card_file_img'
                                variant="top"
                                src={require('../../assets/notFoto.jpg')} />}
                    </a>
                </div>
                <Card.Body className='card_text_file'>
                    <Card.Text>Размер файла: {fileSize({ size })}</Card.Text>
                    <Card.Text>Дата загрузки файла: {upload_time}</Card.Text>
                    <Card.Text>Дата последнего скачивания: {downloadTime} (МСК)</Card.Text>
                    {!clickComments &&
                        <Card.Text
                            className='card_text_comment'
                            onClick={() => { setClickComments(true); setNewDescription(description) }
                            }>
                            Комментарий: {description}
                        </Card.Text>
                    }
                    {clickComments &&
                        <>
                            <Card.Text
                                className='card_text_comment'
                            > Комментарий: {
                                    <TextArea
                                        className='input_text_file'
                                        label='Комментарий'
                                        allowClear
                                        defaultValue={description}
                                        onChange={(e) => setNewDescription(e.target.value)}
                                    >
                                    </TextArea>}

                            </Card.Text>
                            <div className='btn_comments'>
                                <Button onClick={() => handleUpdateFileDescription({ id, newDescription })}>&#x2713;</Button>
                                <Button onClick={() => setClickComments(false)}>&#x2715;</Button>
                            </div>
                        </>
                    }
                </Card.Body>
                <div className='btn_card_file'>
                    <Button
                        className='btn_upload'
                        variant="primary"
                        onClick={() => downloadDate({ id, file })}
                    >Скачать &#128190;
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => { setModalActive(true); setFileDelete(fileItem) }}
                    >Удалить &#128465;
                    </Button>
                    {!click && <Button variant="primary" onClick={() => setClick(true)}>Переименовать &#128396;</Button>}
                    {click &&
                        <>
                            <Button variant="primary" onClick={() => handleUpdateFileName({ id, newFileName })}>ОК </Button>
                            <Button variant="primary" onClick={() => setClick(false)}>Отмена </Button>
                        </>
                    }
                </div>
            </Card>
            <ModalPopup active={modalActive} setModalActive={setModalActive} fileDelete={fileDelete} handleDeleteFile={handleDeleteFile} />
        </>
    )
}
