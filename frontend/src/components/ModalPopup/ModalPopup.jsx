import React from 'react'
import './ModalPopup.css'
import { Button } from 'antd';

export const ModalPopup = ({ active, setModalActive, user, handleDelete }) => {
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setModalActive(false)}>
      <div className={active ? 'modal_content active' : 'modal_content'} onClick={e => e.stopPropagation()}>
        <h3>Действительно вы хотите удалить пользователя {user.username}? </h3>
        <div className='btn_edit_user'>
          <Button
            onClick={() => handleDelete(user)}
          >Да
          </Button>
          <Button
            onClick={() => setModalActive(false)}
          >Нет
          </Button>
        </div>
      </div>
    </div>
  )
}
