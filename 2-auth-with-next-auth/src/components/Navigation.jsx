import Link from 'next/link'
import styled from 'styled-components'
import { signIn, signOut, useSession } from 'next-auth/client'

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

const Login = Logout

export default function Navigation({ theme, setTheme }) {
  const [session] = useSession()

  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      {!session && <Login onClick={() => signIn('okta')}>Login</Login>}
      {session && (
        <Link href="/admin">
          <a>Admin</a>
        </Link>
      )}
      {session && (
        <>
          <Spacer />
          <Logout onClick={() => signOut({ callbackUrl: '/' })}>Logout</Logout>
        </>
      )}
      <button onClick={switchTheme}>Switch theme</button>
    </Nav>
  )
}
