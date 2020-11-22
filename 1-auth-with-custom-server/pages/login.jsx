import styled from 'styled-components'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useUser } from '../src/UserProvider'

const LoginContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 40px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  padding: 24px;
  background-color: white;
  border-radius: 20px;

  & > label {
    font-size: 1.2rem;
    font-weight: 600;
  }

  & > input {
    margin-bottom: 20px;
    line-height: 40px;
    font-size: 24px;
  }

  & > input,
  & > div > button {
    height: 40px;
  }

  & > div {
    display: flex;
    flex-direction: row-reverse;

    & > button {
      padding: 10px 16px;
    }
  }
`

const Error = styled.p`
  font-family: monospace;
  font-size: 16px;
  color: red;
`

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const router = useRouter()
  const { setUser } = useUser()
  const [error, setError] = useState()

  const submit = (e) => {
    e.preventDefault()

    axios
      .post(
        '/api/login',
        {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setUser({
          email: emailRef.current.value,
        })
        router.push('/')
      })
      .catch((err) => {
        setError(`${err.response.status} - ${err.response.data}`)
      })
  }

  return (
    <LoginContainer>
      <LoginForm onSubmit={submit}>
        {error && <Error>{error}</Error>}
        <label htmlFor="email">Email</label>
        <input type="email" name="email" ref={emailRef} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" ref={passwordRef} />

        <div>
          <button type="submit">Login</button>
        </div>
      </LoginForm>
    </LoginContainer>
  )
}
