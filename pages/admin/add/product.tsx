import { GetServerSideProps } from 'next';
import Axios from 'axios';
// files
import Navbar from '../../../components/admin/Navbar';
import AddProduct from '../../../components/admin/AddProduct';

export default function NewProduct({ userId }: any) {
  return (
    <Navbar userId={userId}>
      <AddProduct userId={userId} />
    </Navbar>
  );
}

// only ADMIN user can access this route
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const res = await Axios.get(
      'http://localhost:3000/api/admin/verification',
      {
        headers: {
          Cookie: ctx.req.headers?.cookie, // send along cookies from headers client
        },
      },
    );

    // ketika error bukan GET req / isAdmin === false
    if (res?.data?.error || res?.data?.isAdmin === false) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      props: { userId: res?.data?.decoded?.sub },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
