import { Link } from "react-router-dom"

export const NotFound = () => {
  return (
      <div className='notFound'>
        <h1>404</h1>
        <p>Страница не найдена</p>
        <Link className='notFound__btn' to='/mycloud'> 
          Вернуться домой
        </Link>
      </div>
  )
}
