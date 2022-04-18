import React from 'react'
import styled from 'styled-components'
import { Space, Button, Modal } from 'antd'
import { useAuth } from '../context/auth'
import { useBookingRemove } from '../services'

const { confirm } = Modal

function RoomCard({
  id,
  room_name,
  scheduled_at,
  time_slot,
  user,
  refetch,
  withRoomName,
}) {
  const { user: clientUser, token } = useAuth()
  const { mutate } = useBookingRemove(token, {
    onSuccess: () => {
      refetch()
    },
  })

  const onClickRemove = () => {
    confirm({
      content: `Want to remove booking: Date(${scheduled_at}), timeslot(${time_slot})`,
      onOk() {
        mutate({
          id,
        })
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  return (
    <StyledCardWrapper>
      <Space>
        {withRoomName && <div>Room: {room_name},</div>}
        <div>Date: {scheduled_at},</div>
        <div>Timeslot: {time_slot},</div>
        <div>User email: {user.email}</div>
      </Space>

      {clientUser.pk === user.id && (
        <Button onClick={onClickRemove}>Remove</Button>
      )}
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
`
