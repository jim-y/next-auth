import Link from 'next/link'
import styled from 'styled-components'
import { useUser } from '../UserProvider'
import axios from 'axios'
import { useRouter } from 'next/router'

const Nav = styled.nav`
  height: 40px;
  width: 100vw;
  display: flex;
  align-items: center;
  background-color: salmon;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0 24px;

  & > * {
    margin-right: 16px;
  }
`

const Spacer = styled.span`
  flex: 1;
`

const Logout = styled.a`
  cursor: pointer;
`

export default function Navigation() {
  const { user, setUser } = useUser()
  const router = useRouter()

  const logout = (e) => {
    e.preventDefault()
    axios
      .post(
        '/api/logout',
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setUser(null)
        router.push('/')
      })
  }

  return (
    <Nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      {!user && (
        <Link href="/login">
          <a>Login</a>
        </Link>
      )}
      {user && (
        <Link href="/admin">
          <a>Admin</a>
        </Link>
      )}
      {user && (
        <>
          <Spacer />
          <Logout onClick={logout}>Logout</Logout>
        </>
      )}
    </Nav>
  )
}
