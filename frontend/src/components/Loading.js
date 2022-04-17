import React from 'react'
import { Spin } from 'antd'
import styled from 'styled-components'

function Loading() {
  return (
    <Wrapper>
      <Spin />
    </Wrapper>
  )
}

export default Loading

const Wrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`
