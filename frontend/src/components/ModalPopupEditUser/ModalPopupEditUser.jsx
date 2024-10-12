import React from 'react'
import './ModalPopupEditUser.css'
import { Button, Form, Input, Select } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { regexLogin, regexPassword, regexEmail, loginText, loginPassword, loginEmail } from '../Validations/Validations'
import { useAppDispatch } from '../App/hooks';
import { userEditLogin, userEditName, userEditEmail, userEditPassword, userEditStaff } from '../App/Slices/authSlice';

export const ModalPopupEditUser = ({ active, setModalActive, user }) => {
  const dispatch = useAppDispatch();
  const [userlogin, setUserLogin] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeName, setActiveName] = useState(false);
  const [activeIconOkName, setActiveIconOkName] = useState(false);
  const [activeLogin, setActiveLogin] = useState(false);
  const [activeIconOkLogin, setActiveIconOkLogin] = useState(false);
  const [activeEmail, setActiveEmail] = useState(false);
  const [activeIconOkEmail, setActiveIconOkEmail] = useState(false);
  const [activePassword, setActivePassword] = useState(false);
  const [activeIconOkPassword, setActiveIconOkPassword] = useState(false);
  const [activeStaff, setActiveStaff] = useState(false);
  const [activeIconOkStaff, setActiveIconOkStaff] = useState(false);
  const [btnOkActive, setBtnOkActive] = useState(false);
  const [errInput, setErrorInput] = useState('');
  const [is_staff, setStaff] = useState(false);

  const regLogin = regexLogin.test(userlogin);
  const regEmail = regexEmail.test(email);
  const regPassword = regexPassword.test(password);
  const options = [
    { label: 'Пользователь', value: false },
    { label: 'Администратор', value: true },
  ];

  function changeSet() {
    setModalActive(false);
    setModalActive(true);
    setBtnOkActive(true);
  }

  const submitUserEditName = async (id) => {
    if (!username) return
    const response = await dispatch(userEditName({ id, username }))
    if (userEditName.fulfilled.match(response)) {
      changeSet();
      setActiveName(false);
      setActiveIconOkName(true);
    }
  }

  const submitUserEditLogin = async (id) => {
    if (!userlogin) return
    if (regLogin) {
      const response = await dispatch(userEditLogin({ id, userlogin }))
      if (userEditLogin.fulfilled.match(response)) {
        changeSet();
        setActiveLogin(false);
        setActiveIconOkLogin(true);
      }
    } else {
      setErrorInput(loginText)
    }
  }

  const submitUserEditEmail = async (id) => {
    if (!email) return
    if (regEmail) {
      const response = await dispatch(userEditEmail({ id, email }))
      if (userEditEmail.fulfilled.match(response)) {
        changeSet();
        setActiveEmail(false);
        setActiveIconOkEmail(true);
      }
    } else {
      setErrorInput(loginEmail)
    }
  }

  const submitUserEditPassword = async (id) => {
    if (!password) return
    if (regPassword) {
      const response = await dispatch(userEditPassword({ id, password }))
      if (userEditPassword.fulfilled.match(response)) {
        changeSet();
        setActivePassword(false);
        setActiveIconOkPassword(true);
      }
    } else {
      setErrorInput(loginPassword)
    }
  }

  const submitUserEditStaff = async (id) => {
    const response = await dispatch(userEditStaff({ id, is_staff }))
    if (userEditStaff.fulfilled.match(response)) {
      changeSet();
      setActiveStaff(false);
      setActiveIconOkStaff(true);
    }
  }

  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setModalActive(false)}>
      <div className={active ? 'modal_content active' : 'modal_content'} onClick={e => e.stopPropagation()}>
        <img className='modal_cloud_image' src={require('../../assets/cloud.png')} />
        <h3>Изменить данные пользователя {user.username}</h3>
        <Form className='input_form'>
          
          <Form.Item className='form_item'>
            <Input
              allowClear
              placeholder={user.username}
              required
              onClick={() => { setActiveName(true); setActiveLogin(false); setActiveEmail(false); setActivePassword(false); setActiveStaff(false) }}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Button className={activeName ? 'btn_ok_edit active' : 'btn_ok_edit'}
              onClick={() => submitUserEditName(user.id)}
            >Ок
            </Button>
            {activeIconOkName && <CheckOutlined className='icon_change_ok' />}
          </Form.Item>
          
          <Form.Item className='form_item'>
            <Input
              title={loginText}
              placeholder={user.userlogin}
              allowClear
              required
              onClick={() => { setActiveName(false); setActiveLogin(true); setActiveEmail(false); setActivePassword(false); setActiveStaff(false) }}
              onChange={(e) => setUserLogin(e.target.value)}
            />
            <Button className={activeLogin ? 'btn_ok_edit active' : 'btn_ok_edit'}
              onClick={() => submitUserEditLogin(user.id)}
            >Ок
            </Button>
            {activeIconOkLogin && <CheckOutlined className='icon_change_ok' />}
          </Form.Item>
         
          <Form.Item className='form_item'>
            <Input
              allowClear
              type="email"
              required
              placeholder={user.email}
              onClick={() => { setActiveName(false); setActiveLogin(false); setActiveEmail(true); setActivePassword(false); setActiveStaff(false) }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className={activeEmail ? 'btn_ok_edit active' : 'btn_ok_edit'}
              onClick={() => submitUserEditEmail(user.id)}
            >Ок
            </Button>
            {activeIconOkEmail && <CheckOutlined className='icon_change_ok' />}
          </Form.Item>
          
          <Form.Item
            className='form_item'
            name="Select"
            rules={[{ required: true, message: 'Выбрать пользователя!' }]}>
            <Select
              options={options}
              placeholder="Выбрать пользователя"
              onChange={(event) => setStaff(event)}
              onClick={() => { setActiveName(false); setActiveLogin(false); setActiveEmail(false); setActivePassword(false); setActiveStaff(true) }}>
            </Select>
            <Button className={activeStaff ? 'btn_ok_edit active' : 'btn_ok_edit'}
              onClick={() => submitUserEditStaff(user.id)}
            >Ок
            </Button>
            {activeIconOkStaff && <CheckOutlined className='icon_change_ok' />}
          </Form.Item>
          
          <Form.Item className='form_item'>
            <Input
              title={loginPassword}
              allowClear
              required
              placeholder="Пароль"
              onClick={() => { setActiveName(false); setActiveLogin(false); setActiveEmail(false); setActivePassword(true); setActiveStaff(false) }}
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <Button className={activePassword ? 'btn_ok_edit active' : 'btn_ok_edit'}
              onClick={() => submitUserEditPassword(user.id)}
            >Ок
            </Button>
            {activeIconOkPassword && <CheckOutlined className='icon_change_ok' />}
          </Form.Item>
          
          {errInput}
          <div className='btn_edit_user'>
            {btnOkActive && <Button className='btn_modal'
              onClick={() => location.reload()}
            >Принять
            </Button>}
            <Button className='btn_modal'
              onClick={() => setModalActive(false)}
            >Отмена
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
