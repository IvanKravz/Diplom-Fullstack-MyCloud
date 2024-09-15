import './AdminMenu.css'
import '../ModalPopup/ModalPopup.css'
import { Space, Table, Tag } from 'antd';
import { LeftCircleOutlined, UserDeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { loadUsers, deleteUser } from '../App/Slices/AdminSlice';
import { loadFiles } from '../App/Slices/FileSlice';
import { useEffect, useState } from 'react';
import { AdminCreateUser } from '../AdminCreateUser/AdminCreateUser';
import { ModalPopup } from '../ModalPopup/ModalPopup';

export const AdminMenu = () => {
    const userParse = JSON.parse(sessionStorage.getItem('user'))?.is_staff;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { Column, ColumnGroup } = Table;
    const users = useAppSelector(state => state.admin.users);
    const loading = useAppSelector(state => state.admin.loading);
    const files = useAppSelector(state => state.file.files)
    const [modalActive, setModalActive] = useState(false)
    const [user, setUser] = useState('')

    useEffect(() => {
        dispatch(loadUsers());
        dispatch(loadFiles());
    }, [])

    const checkUser = (user) => {
        setUser(user)
    }

    const handleDelete = (user) => {
        dispatch(deleteUser(user.id))
            .then(() => {
                dispatch(loadUsers());
            })
        setModalActive(false)
    }

    // const handleEdit = (user) => {
    //     console.log('handleEdit', user.id)
    // }

    return (
        <>
            {userParse &&
                <div className='form'>
                    <LeftCircleOutlined className="header_form" onClick={() => navigate('/mycloud/user')} />
                    <h2 className="header_title">Кабинет администратора</h2>
                    {loading && <div className="card_loading">...Загружается</div>}
                    <AdminCreateUser />
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
                                            // onClick={() => handleEdit(user)}
                                            style={{ cursor: 'pointer', fontSize: '18px', color: 'SeaGreen' }}

                                        />
                                        <UserDeleteOutlined
                                            onClick={() => { setModalActive(true); checkUser(user) }}
                                            style={{ cursor: 'pointer', fontSize: '18px', color: 'FireBrick' }}
                                        />
                                    </Space>
                                )}
                            />
                        </ColumnGroup>}
                    </Table>
                </div>
            }
            {!userParse &&
                <>
                    <h2>Необходимо войти в профиль с правами администратора!</h2>
                    <Button
                        size="md" onClick={() => navigate('/mycloud/login')}>Войти
                    </Button>
                </>
            }

            <ModalPopup active={modalActive} setModalActive={setModalActive} user={user} handleDelete={handleDelete} />
        </>
    );
}
