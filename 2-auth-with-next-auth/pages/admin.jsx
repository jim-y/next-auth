import { getSession, useSession } from 'next-auth/client'

export default function Admin() {
  const [session] = useSession()

  return (
    <>
      <h1>Admin</h1>
      <p>{JSON.stringify(session, null, 2)}</p>
    </>
  )
}

export async function getServerSideProps({ req }) {
  try {
    await getSession({ req })
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
