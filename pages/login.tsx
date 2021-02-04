import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// files
import { options } from '../utils/config';

export default function Login() {
  const { push, prefetch } = useRouter();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    // Prefetch the products page for USER
    prefetch('/products');
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    // POST req /login
    axios
      .post('/login', user)
      .then(async (res) => {
        const userId = res?.data?._id;

        // if role == 'ADMIN'
        if (userId) {
          await push('/admin/dashboard');
          return toast.success('Welcome to admin dashboard', {
            ...options,
            position: 'bottom-left',
          });
        }

        // if role == 'USER'
        await push('/products');
        toast.success(res.data.message, {
          ...options,
          position: 'bottom-left',
        });
      })
      .catch((err) => {
        console.error('⛔ =>', err.response.data);

        toast.error(`${err.response.data.message}`, {
          ...options,
          position: 'bottom-left',
        });
      });
  };

  return (
    <main className="h-screen bg-white my-custom-font-family">
      <div className="flex flex-wrap w-full">
        {/* <!-- Login Section --> */}
        <article className="flex flex-col w-full md:w-1/2">
          <section className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
            <Link href="/">
              <span className="p-4 text-xl font-bold text-white bg-orange-800 cursor-pointer hover:underline">
                Logo
              </span>
            </Link>
          </section>

          <section className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center">Welcome</p>

            <form className="flex flex-col pt-3 md:pt-8" onSubmit={onSubmit}>
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="your@email.com"
                  type="email"
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  value={email}
                />
              </div>

              <div className="flex flex-col pt-4">
                <label htmlFor="password" className="text-lg">
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="Password"
                  type="password"
                  minLength={6}
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                  value={password}
                />
              </div>

              <input
                className="p-2 mt-8 text-lg font-bold text-white bg-orange-800 rounded cursor-pointer hover:underline"
                type="submit"
                value="Log In"
              />
            </form>

            <div className="pt-12 pb-12 text-center">
              <p>
                Don't have an account?{' '}
                <Link href="/register">
                  <a className="font-semibold underline cursor-pointer hover:text-orange-800">
                    Register here.
                  </a>
                </Link>
              </p>
            </div>
          </section>
        </article>

        {/* <!-- Image Section --> */}
        <article className="w-1/2 shadow-2xl">
          <img
            className="hidden object-cover w-full h-screen md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
            alt="login page cover"
          />
        </article>
      </div>
    </main>
  );
}
