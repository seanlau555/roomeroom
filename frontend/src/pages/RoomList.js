import React from 'react'
import { Space, Row, Col } from 'antd'
import { useAuth } from '../context/auth'
import { useRoomList } from '../services'
import Loading from '../components/Loading'
import RoomCard from '../components/RoomCard'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

function RoomList() {
  const history = useHistory()

  const { token } = useAuth()
  const { data, isFetching } = useRoomList(token)

  const onClickRoom = (id) => {
    history.push(`/room/${id}`)
  }

  if (isFetching) return <Loading />
  return (
    <Wrapper>
      <Flex>
        Room list
        <Space direction="horizontal">
          <Status>Using</Status>
          <AvailableStatus>Available</AvailableStatus>
        </Space>
      </Flex>
      <Row>
        {data.map((x) => (
          <Col key={x.id} span={6}>
            <RoomCard
              status={'available'}
              roomName={x.room_name}
              onClick={(evt) => {
                evt.preventDefault()
                onClickRoom(x.id)
              }}
            />
          </Col>
        ))}
      </Row>
    </Wrapper>
  )
}

export default RoomList

const Wrapper = styled.div`
  width: 100%;
`
const AvailableStatus = styled.div`
  margin-right: 16px;
  position: relative;
  padding-left: 14px;
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: green;
    position: absolute;
    top: 7px;
    left: 0px;
  }
`
const Flex = styled.div`
  margin: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Status = styled.div`
  margin-right: 16px;
  position: relative;
  padding-left: 14px;
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: red;
    position: absolute;
    top: 7px;
    left: 0px;
  }
`
