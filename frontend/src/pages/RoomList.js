import React from 'react'
import { Typography, Divider, Space, Row, Col } from 'antd'
import { useAuth } from '../context/auth'
import { useRoomList, useBookingList } from '../services'
import Loading from '../components/Loading'
import RoomCard from '../components/RoomCard'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import BookingCard from '../components/BookingCard'

const { Title } = Typography

function RoomList() {
  const navigate = useNavigate()
  // const history = useHistory()

  const { token } = useAuth()
  const { data, isFetching } = useRoomList(token)
  const {
    data: bookingList,
    isFetching: isLoadingList,
    refetch,
  } = useBookingList(token)

  const onClickRoom = (id) => {
    navigate(`/room/${id}`)
  }

  if (isFetching || isLoadingList) return <Loading />
  return (
    <Wrapper>
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
      <Divider />
      <Title level={2}>Your booking history</Title>
      {bookingList.map((x) => (
        <BookingCard key={x.id} {...x} refetch={refetch} />
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
