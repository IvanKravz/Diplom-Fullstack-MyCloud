import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import Spinner from 'react-bootstrap/Spinner';

export const Loading = () => {
    return (
        <Flex align="center" gap="middle">
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Flex>
    )
}
