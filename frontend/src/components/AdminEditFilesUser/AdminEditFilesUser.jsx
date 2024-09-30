import React from 'react'

export const AdminEditFilesUser = () => {
    return (
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
                        dataIndex="files"
                        key="files"
                        render={(files) => {
                            let len = files.length;
                            return (

                                <Space size='large'>
                                    {len}
                                    <FolderOpenFilled className='folder_open_filed' />
                                </Space>
                            )
                        }}
                    />
                    <Column
                        title="Действия"
                        key="action"
                        render={(user) => (
                            <Space size="middle" >
                                <EditOutlined
                                    className='edit_outlined'
                                    onClick={() => { setModalEditActive(true); setUser(user) }}
                                />
                                <UserDeleteOutlined
                                    className='user_delete_outlined'
                                    onClick={() => { setModalActive(true); setUser(user) }}
                                />
                            </Space>
                        )}
                    />
                </ColumnGroup>}
            </Table>
        </div>
    )
}
