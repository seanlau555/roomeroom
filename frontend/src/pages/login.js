import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Card, Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'

function Login() {
  const { isAuthenticated, login, loading, initializing } = useAuth()

  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const onFinish = (values) => {
    login(values)
  }

  if (initializing || isAuthenticated) return null

  return (
    <StyledWrapper>
      <StyledCard>
        <StyledForm
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <StyledItem
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </StyledItem>

          <StyledItem
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </StyledItem>

          <StyledItem>
            <StyledButton
              size="large"
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Login
            </StyledButton>
          </StyledItem>
        </StyledForm>
      </StyledCard>
    </StyledWrapper>
  )
}

export default Login

const StyledForm = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
`

const StyledItem = styled(Form.Item)`
  width: 100%;
`

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`
const StyledCard = styled(Card)`
  max-width: 488px;
  min-width: 400px;
  width: 30%;
`
const StyledButton = styled(Button)`
  width: 100%;
`
