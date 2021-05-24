import { GetServerSideProps } from 'next';
import { verify } from 'jsonwebtoken';
// files
import Navbar from '../../../components/admin/Navbar';
import AddProduct from '../../../components/admin/AddProduct';

export default function NewProduct() {
  return (
    <Navbar>
      <AddProduct />
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
    const decoded = verify(authCookie!, process.env.MY_SECRET_KEY);

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
