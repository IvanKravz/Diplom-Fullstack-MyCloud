import React from 'react';
import './UserMenu.css'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import Card from 'react-bootstrap/Card';

const getCardFilm = () => {
    console.log(111)
}

export const UserMenu = () => {
    return (
        <>
            <div className='user_header'>
                <div className='user_header_text'>Личный кабинет</div>
                <img className='user_cloud_image' src='src\assets\cloud.png' />
                <div className='card_user_btn'>
                    <Button variant="primary">Выход</Button>
                </div>
            </div>
            <Upload >
                <Button className='upload_btn' icon={<UploadOutlined />}>Загрузить файл</Button>
            </Upload>

            <section className='user_menu'>
                <Card className='card_user'>
                    <Card.Img className='card_user'
                        // onClick={() => getCardFilm(item.imdbID)} 
                        variant="top"
                        src={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
                    />
                    <Card.Body className='card_user_text'>
                        <Card.Title>Имя: Иван</Card.Title>
                        <Card.Text>Количество файлов: 'FFFF'</Card.Text>
                        <Card.Text>Общий размер файлов: 'FFFF'</Card.Text>
                    </Card.Body>
                </Card>

                <div className='list_content'>
                    <Card className='card_file'>
                        <Card.Img className='card_file_img'
                            // onClick={() => getCardFilm(item.imdbID)} 
                            variant="top"
                            src={'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png'}
                        />
                        <Card.Body className='card_text_file'>
                            <Card.Title>Имя файла: FFFFF</Card.Title>
                            <Card.Text>Размер файла: FFFFFFFFFFF</Card.Text>
                            <Card.Text>Дата загрузки файла: FFFFFFFFFFF</Card.Text>
                            <Card.Text>Дата последнего скачивания: FFFFFFFFFFF</Card.Text>
                            <Card.Text
                                className='card_text_comment'
                                onClick={getCardFilm} >Комментарий: FFFFFFFFFFF
                            </Card.Text>
                        </Card.Body>
                        <div className='btn_card_file'>
                            <Button variant="primary">Скачать</Button>
                            <Button variant="primary">Удалить</Button>
                            <Button variant="primary">Переименовать</Button>
                        </div>
                    </Card>
                </div>
            </section>
        </>
    )
}

