import React, { useState } from 'react'
import { Divider, Radio, Typography, DatePicker, Space, Button } from 'antd'
import { useAuth } from '../context/auth'
import { useRoomDetail, useBookingSubmit } from '../services'
import Loading from '../components/Loading'
import BookingCard from '../components/BookingCard'
import styled from 'styled-components'
import { useParams, useNavigate } from 'react-router-dom'
import moment from 'moment'

const { Title } = Typography
const timeSlots = [9, 10, 11, 12, 13, 14, 15, 16, 17]

function RoomDetail() {
  const [startValue, setStartValue] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const navigate = useNavigate()

  let { id } = useParams()
  const { token } = useAuth()
  const { data, isFetching, refetch } = useRoomDetail(id, token)
  const { mutate, isLoading } = useBookingSubmit(token, {
    onSuccess: () => {
      refetch()
    },
  })

  if (isFetching) return <Loading />

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day')
  }
  let slots = []
  if (selectedDate) {
    slots = timeSlots.map((t) => {
      const startTime = selectedDate.set({ h: t, m: 0, s: 0 })
      return {
        disabled: false,
        id: t,
        start: startTime.format('HH:mm'),
        end: startTime.add(1, 'hours').format('HH:mm'),
      }
    })
  }
  const onChangeSlot = (evt) => {
    const v = evt.target.value
    setStartValue(v)
  }
  const onChangeDate = (date) => {
    setSelectedDate(date)
    setStartValue('')
  }
  const onClickSubmit = (evt) => {
    evt.preventDefault()
    mutate({
      room_id: id,
      scheduled_at: selectedDate.format('yyyy-MM-DD'),
      time_slot: startValue,
    })
  }
  const onClickBack = () => {
    navigate('/')
  }

  return (
    <Container>
      <Space>
        <Button onClick={onClickBack}>{'<- Back'}</Button>
      </Space>
      <Title level={2}>Room {data.room_name}</Title>
      <Title level={3}>
        <Space>
          Status: {data.status ? <Available /> : <Busy />}
          {data.status ? 'Available' : 'Busy'}
          {data.status}
        </Space>
      </Title>
      <Title level={3}>Bookings:</Title>
      {data.bookings.map((x) => (
        <BookingCard key={x.id} {...x} refetch={refetch} />
      ))}
      <Divider />
      <Title level={4}>Submit new booking</Title>
      <div>
        Date:{' '}
        <DatePicker
          value={selectedDate}
          disabledDate={disabledDate}
          onChange={onChangeDate}
        />
      </div>
      {selectedDate && (
        <div>
          Time slot:
          <Radio.Group onChange={onChangeSlot} value={startValue}>
            {slots.map((x) => (
              <Radio key={x.id} value={x.start}>
                {x.start}-{x.end}
              </Radio>
            ))}
          </Radio.Group>
        </div>
      )}
      <Button
        loading={isLoading}
        disabled={!startValue}
        onClick={onClickSubmit}
      >
        Submit
      </Button>
    </Container>
  )
}

export default RoomDetail

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
const Container = styled.div`
  width: 100%;
  padding: 32px;
`
const Slot = styled.div`
  margin-right: 8px;
  input {
    margin-left: 8px;
  }
  label {
    margin-left: 8px;
  }
`
