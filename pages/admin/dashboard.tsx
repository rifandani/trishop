import { GetServerSideProps } from 'next';
import { verify } from 'jsonwebtoken';
// files
import AdminDashboard from '../../components/admin/AdminDashboard';
import Navbar from '../../components/admin/Navbar';
import { mySecretKey } from '../../utils/config';

export default function Dashboard() {
  return (
    <Navbar>
      <AdminDashboard />
    </Navbar>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookie = ctx.req.headers?.cookie;
  const authCookie = cookie?.replace('auth=', '');

  // kalau auth cookie tidak ada
  if (!cookie) {
    return {
      redirect: { destination: '/login', permanent: false },
    };
  }

  try {
    // verify auth cookie
    const decoded = verify(authCookie!, mySecretKey);

    return {
      props: { decoded },
    };
  } catch (err) {
    // kalau jwt malformed  || auth cookie tidak valid
    return {
      redirect: { destination: '/login', permanent: false },
    };
  }
};

// page hanya bisa diakses jika ada valid query _id
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const _id = ctx.query._id;

//   // ketika tidak ada query params
//   if (!_id) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   try {
//     const res = await Axios.get(
//       `/admin/user?_id=${_id}`,
//     );

//     // jika user.role === 'ADMIN'
//     return {
//       props: {
//         user: res?.data,
//       },
//     };
//   } catch (err) {
//     // jika user._id tidak match dengan yg di MONGODB
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
// };
