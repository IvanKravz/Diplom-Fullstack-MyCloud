import './AdminMenu.css'
import { Space, Table, Tag } from 'antd';
import { HomeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import { Button } from 'antd';

import { useAppDispatch, useAppSelector } from '../App/hooks';
import { loadUsers, deleteUser } from '../App/Slices/AdminSlice';
import { useEffect, useState } from 'react';

export const AdminMenu = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const users = useAppSelector(state => state.admin.users);
    const loading = useAppSelector(state => state.admin.loading);
    const { Column, ColumnGroup } = Table;

    useEffect(() => {
        dispatch(loadUsers())
    }, [])


    const handleGoBack = () => {
        navigate('/mycloud')
    };

    const handleDelete = (user) => {
        dispatch(deleteUser(user.id))
            .then(() => {
                dispatch(loadUsers());
            })
    }

    const handleEdit = (user) => {
        console.log('handleEdit', user.id)
    }


    return (
        <div className='form'>
            <Button onClick={() => getUser()} variant="primary">Добавить в избранное</Button>

            <HomeOutlined className="header_form" onClick={handleGoBack} />
            <h2 className="header_title">Кабинет администратора</h2>
            {loading && <div className="card_loading">...Загружается</div>}
            <Table dataSource={users} >
                {!loading && <ColumnGroup title="Пользователи">
                    <Column title="Логин" dataIndex="userlogin" key="userlogin" />
                    <Column title="Имя" dataIndex="username" key="username" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column
                        title="Права пользователя"
                        dataIndex="is_staff"
                        key="is_staff"
                        render={(is_staff) => {
                            let color = 'volcano';
                            let name = 'Администратор';
                            if (is_staff === false) {
                                color = 'green';
                                name = 'Пользователь'
                            }
                            return (
                                <Tag color={color}>
                                    {name}
                                </Tag>
                            )
                        }}
                    />
                    <Column
                        title="Количество файлов"
                        // dataIndex="fileLength" 
                        key="fileLength"
                        render={(record) => (
                            <Space size="middle">
                                {record.fileLength}
                                <a>Просмотр файлов</a>
                            </Space>
                        )}
                    />
                    <Column title="Размер файлов" dataIndex="fileSize" key="fileSize" />
                    <Column
                        title="Действия"
                        key="action"
                        render={(user) => (
                            <Space size="middle">
                                <EditOutlined
                                    onClick={() => handleEdit(user)}
                                    style={{ cursor: 'pointer', fontSize: '18px', color: 'SeaGreen' }}

                                />
                                <DeleteOutlined
                                    onClick={() => handleDelete(user)}
                                    style={{ cursor: 'pointer', fontSize: '18px', color: 'FireBrick' }}
                                />
                            </Space>
                        )}
                    />
                </ColumnGroup>}
            </Table>
        </div>
    );
}
