import { GetServerSideProps } from 'next';
import Axios from 'axios';
// files
import AdminDashboard from '../../components/admin/AdminDashboard';
import Navbar from '../../components/admin/Navbar';

export default function Dashboard({ user }: any) {
  return (
    <Navbar userId={user._id}>
      <AdminDashboard />
    </Navbar>
  );
}

// page hanya bisa diakses jika ada valid query _id
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const _id = ctx.query._id;

  // ketika tidak ada query params
  if (!_id) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const res = await Axios.get(
      `http://localhost:3000/api/admin/user?_id=${_id}`,
    );

    // jika user.role === 'ADMIN'
    return {
      props: {
        user: res?.data,
      },
    };
  } catch (err) {
    // jika user._id tidak match dengan yg di MONGODB
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
