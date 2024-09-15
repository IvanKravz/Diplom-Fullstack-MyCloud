import React from 'react'
import { Button, Form, Input } from 'antd';
import { loginValidate, passwordValidate } from '../Validations/Validations'
import { userEdit, getUser } from '../App/Slices/authSlice';
import { loadFiles } from '../App/Slices/FileSlice';
import { useAppDispatch } from '../App/hooks';
import { useState } from 'react';

export const UserEdit = ({ clickOff }) => {
    const dispatch = useAppDispatch();
    const [userlogin, setUserLogin] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitUserEdit = async () => {
        const response = await dispatch(userEdit({ userlogin, username, email, password }))
        // console.log('response', response)
        if (userEdit.fulfilled.match(response)) {
            dispatch(getUser());
            // dispatch(login({ username, password }))
            dispatch(loadFiles());  
    }
}

return (
    <Form className='input_form'>
        <Form.Item
            className='form_item'
            name="InputLogin"
            rules={[{ required: true, message: 'Введите логин!' }]}>
            <Input
                title="Разрешены латинские буквы и цифры, первый символ — буква, длина от 4 до 20 символов"
                pattern={loginValidate}
                allowClear
                onChange={(e) => setUserLogin(e.target.value)}
                placeholder="Логин латинскими буквами и цифрами"
            />
        </Form.Item>
        <Form.Item
            className='form_item'
            name="InputName"
            rules={[{ required: true, message: 'Введите имя!' }]}>
            <Input
                allowClear
                placeholder="Имя"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
            />
        </Form.Item>
        <Form.Item className='form_item'
            rules={[{ required: true, message: 'Введите email!' }]}
        >
            <Input
                allowClear
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </Form.Item>
        <Form.Item
            className='form_item'
            name="Cascader"
            rules={[{ required: true, message: 'Введите пароль!' }]}
        >
            <Input
                title="Разрешено не менее 6 символов: как минимум одна заглавная буква, одна цифра и один специальный символ"
                pattern={passwordValidate}
                allowClear
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </Form.Item>
        <div className='btn_edit_user'>
            <Button
                onClick={submitUserEdit}
            >Изменить данные
            </Button>
            <Button
                onClick={clickOff}
            >Отмена
            </Button>
        </div>
    </Form>
)
}
