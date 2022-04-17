import React from 'react'
import styled from 'styled-components'
import { Space } from 'antd'
import { HomeOutlined } from '@ant-design/icons'

function RoomCard({ roomName, onClick, status }) {
  return (
    <StyledCardWrapper onClick={onClick}>
      <Space>
        <HomeOutlined />
        Room: {roomName}
      </Space>
      {status === 'available' && <Available />}
      {status === 'busy' && <Busy />}
    </StyledCardWrapper>
  )
}

export default RoomCard

const StyledCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #eee;
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`
const Available = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: green;
`
const Busy = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: red;
`
