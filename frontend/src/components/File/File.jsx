import React from 'react'
import Card from 'react-bootstrap/Card';
import { Button } from 'antd';
import { useEffect } from 'react';
import { addFile, deleteFile, loadFiles } from '../App/Slices/FileSlice';
import { useAppDispatch } from '../App/hooks'

export const File = ({ fileItem }) => {
    const dispatch = useAppDispatch();
    const { id, file, filename, size, upload_time, description } = fileItem

    useEffect(() => {
        dispatch(addFile(fileItem))
    }, []);

    const submitDelete = (id) => {
        dispatch(deleteFile(id))
            .then(() => {
                dispatch(loadFiles())
            })
            .catch((error) => {
                console.error('Ошибка:', error);
              });
    }

    return (
        <Card className='card_file'>
            <div className='card_img'>
                {filename}
                <a href={file}>
                    <Card.Img className='card_file_img'
                        variant="top"
                        src={file}
                    />
                </a>
            </div>
            <Card.Body className='card_text_file'>
                <Card.Text>Размер файла: {size}</Card.Text>
                <Card.Text>Дата загрузки файла: {upload_time}</Card.Text>
                <Card.Text>Дата последнего скачивания: FFFFFFFFFFF</Card.Text>
                <Card.Text
                    className='card_text_comment'>
                    Комментарий: {description}
                </Card.Text>
            </Card.Body>
            <div className='btn_card_file'>
                <Button variant="primary">Скачать</Button>
                <Button 
                    variant="primary"
                    onClick={() => submitDelete(id)}
                >Удалить
                </Button>
                <Button variant="primary">Переименовать</Button>
            </div>
        </Card>
    )
}
