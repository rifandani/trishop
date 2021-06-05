import { GetServerSideProps } from 'next'
import { verify } from 'jsonwebtoken'
import { parse } from 'cookie'
// files
import Navbar from 'components/admin/Navbar'
import AdminDashboard from 'components/admin/AdminDashboard'

export default function Dashboard() {
  return (
    <Navbar>
      <AdminDashboard />
    </Navbar>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parse(ctx.req.headers?.cookie ?? '')
  const authCookie = cookies.auth

  // kalau auth cookie tidak ada
  if (!authCookie) {
    return {
      redirect: { destination: '/login', permanent: false },
    }
  }

  try {
    // verify auth cookie
    // decoded === payload { sub: user._id }
    const decoded = verify(authCookie!, process.env.MY_SECRET_KEY)

    // TODO: get user.role, if admin pass it thru
    const userId = (decoded as { sub: string }).sub

    return {
      props: {},
    }
  } catch (err) {
    // kalau jwt malformed  || auth cookie tidak valid
    return {
      redirect: { destination: '/login', permanent: false },
    }
  }
}
