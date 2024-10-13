import './LoginForm.css'
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import { useAppDispatch } from '../App/hooks';
import { login } from '../App/Slices/authSlice';
import { useState } from 'react';

export const LoginForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const dispatch = useAppDispatch();

    const onReset = () => {
        form.resetFields();
    };

    const submitLogin = async () => {
        const response = await dispatch(login({ username, password }));

        if (login.fulfilled.match(response)) {
            navigate('/user');
        } else {
            setError('Вход в систему не удался. Неверные данные!');
        }
    };

    return (
        <div className='form'>
            <HomeOutlined className="header_form" onClick={() => navigate('/')} />
            <Form
                className='form_input'
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                required
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Введите имя!' }]}
                >
                    <Input
                        allowClear
                        placeholder="Имя"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input.Password
                        className='input_password'
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Space>
                    <Button onClick={submitLogin}>Войти</Button>
                    <Button onClick={onReset}>Сбросить</Button>
                </Space>
            </Form>
            {error}
        </div>
    );
}
