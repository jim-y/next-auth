import cookies from 'next-cookies'
import axios from 'axios'

export default function Admin() {
  return <h1>Admin</h1>
}

export async function getServerSideProps(context) {
  const _cookies = cookies(context)
  const { auth } = _cookies

  if (!auth) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  try {
    await axios.post('http://localhost:3000/api/session', {
      authCookie: auth,
    })
    return {
      props: {
        message: 'hello',
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}
