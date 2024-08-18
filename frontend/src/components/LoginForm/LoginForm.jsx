import './LoginForm.css'
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from '../App/hooks';
import { login } from '../App/Slices/authSlice';
import { useState } from 'react';

export const LoginForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [userlogin, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const dispatch = useAppDispatch();

    const onReset = () => {
        form.resetFields();
    };

    const handleGoBack = () => {
        navigate('/mycloud')
    };

    const submitLogin = async () => {
        const response = await dispatch(login({ userlogin, password }));
        
        if (login.fulfilled.match(response)) {
            navigate('/mycloud/user');
        } else {
            setError('Вход в систему не удался. Неверные данные!');        
        }
    };

    return (
        <div className='form'>
            <div>
                <HomeOutlined className="header_form" onClick={handleGoBack} />
            </div>
            <h2 className="header_title">Вход в аккаунт</h2>
            <Form
                className='form_input'
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                autoComplete="off"
                required
            >
                <Form.Item
                    name="userlogin"
                    rules={[{ required: true, message: 'Введите логин!' }]}
                >
                    <Input
                        allowClear
                        placeholder="Логин"
                        value={userlogin}
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
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={submitLogin}
                    >Войти
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Сбросить
                    </Button>
                </Space>
            </Form>
            {error}
        </div>
    );
}
