import React from 'react'
import { Typography, Button, Divider, Space, Row, Col } from 'antd'
import { useRoomList, useBookingList } from '../services'
import Loading from '../components/Loading'
import RoomCard from '../components/RoomCard'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import BookingCard from '../components/BookingCard'
import { useAuth } from '../context/auth'

const { Title, Text } = Typography

function RoomList() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const { user, token } = useAuth()
  const { data, isFetching } = useRoomList(token)
  const {
    data: bookingList,
    isFetching: isLoadingList,
    refetch,
  } = useBookingList(token)

  const onClickRoom = (id) => {
    navigate(`/room/${id}`)
  }
  const onClickLogout = () => {
    logout()
  }

  if (isFetching || isLoadingList) return <Loading />
  return (
    <Wrapper>
      <Flex>
        <Button onClick={onClickLogout}>Logout</Button>
        <Text>{user.email}</Text>
      </Flex>
      <Flex>
        <Title level={2}>Room list</Title>
        <Space direction="horizontal">
          <Status>Busy</Status>
          <AvailableStatus>Available</AvailableStatus>
        </Space>
      </Flex>
      <Row>
        {data.map((x) => (
          <Col key={x.id} span={6}>
            <RoomCard
              status={x.status}
              roomName={x.room_name}
              onClick={(evt) => {
                evt.preventDefault()
                onClickRoom(x.id)
              }}
            />
          </Col>
        ))}
      </Row>
      <Divider />
      <Title level={2}>Your booking history</Title>
      {bookingList.map((x) => (
        <BookingCard withRoomName key={x.id} {...x} refetch={refetch} />
      ))}
    </Wrapper>
  )
}

export default RoomList

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
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
