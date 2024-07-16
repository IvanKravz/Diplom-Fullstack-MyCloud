import './LoginForm.css'
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom"

export const LoginForm = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };

    const handleGoBack = () => {
        navigate(-1)
    };

    return (
        //  <form className='form' /* action={handleFormAction} */> 
        //     <h2>Вход в аккаунт</h2>
        //     <input type="text" name="username" placeholder="Имя"/>
        //     <input type="password" name="password" placeholder="Пароль"/>
        //     <button>Вход</button>
        // </form>
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
                    name="username"
                    allowClear
                    rules={[{ required: true, message: 'Введите имя!' }]}
                >
                    <Input allowClear placeholder="Имя" />
                </Form.Item>

                <Form.Item

                    name="password"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input.Password className='input_password' placeholder="Пароль" />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                >
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Space>
                    <Button type="primary" htmlType="submit">
                        Войти
                    </Button>
                    <Button htmlType="button" onClick={onReset}>
                        Сбросить
                    </Button>
                </Space>
            </Form>
        </div>
    );
}
