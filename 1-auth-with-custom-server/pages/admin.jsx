import axios from 'axios'

export default function Admin() {
  return <h1>Admin</h1>
}

export async function getServerSideProps({ req }) {
  try {
    await axios.post(
      'http://localhost:3000/api/session',
      {},
      {
        headers: {
          Cookie: req.headers.cookie,
        },
      }
    )
    return {
      props: {},
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
