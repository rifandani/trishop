import { GetServerSideProps } from 'next';
import { verify } from 'jsonwebtoken';
// files
import Navbar from '../../../components/admin/Navbar';
import AddProduct from '../../../components/admin/AddProduct';
import { mySecretKey } from '../../../utils/config';

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

// menggunakan teknik passing user _id dari /admin/dashboard
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   try {
//     const res = await Axios.get(
//       '/admin/verification',
//       {
//         headers: {
//           Cookie: ctx.req.headers?.cookie, // send along cookies from req headers client
//         },
//       },
//     );

//     // ketika error bukan GET req / isAdmin === false
//     if (res?.data?.error || res?.data?.isAdmin === false) {
//       return {
//         redirect: {
//           destination: '/login',
//           permanent: false,
//         },
//       };
//     }

//     return {
//       props: { userId: res?.data?.decoded?.sub }, // send back user _id
//     };
//   } catch (err) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
// };
