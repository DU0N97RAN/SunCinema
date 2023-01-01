import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { SearchOutlined } from '@ant-design/icons';
import configRoute from '../../../config';
import { useAppSelector } from '../../../redux/hook';
type Props = {}

const NavTop = (props: Props) => {

  
  return (
    <div className='bg-[#48647f] flex justify-end items-center pr-3' >
      <Button type='link' >
        <Link to={configRoute.routes.findOrder} className="uppercase "> <SearchOutlined />
            <span className='text-white'>Tra cứu đơn hàng</span>
        </Link>
      </Button>

    </div>
  )
}

export default NavTop