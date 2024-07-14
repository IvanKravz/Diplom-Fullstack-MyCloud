import { Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <div className='container'>
        <main>
          <Outlet />
        </main>
    </div>
  )
}
