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
      .post('/api/login', user)
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
    <main className="bg-white h-screen my-custom-font-family">
      <div className="w-full flex flex-wrap">
        {/* <!-- Login Section --> */}
        <article className="w-full md:w-1/2 flex flex-col">
          <section className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            <Link href="/">
              <span className="bg-orange-800 text-white font-bold text-xl p-4 cursor-pointer hover:underline">
                Logo
              </span>
            </Link>
          </section>

          <section className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Welcome</p>

            <form className="flex flex-col pt-3 md:pt-8" onSubmit={onSubmit}>
              <div className="flex flex-col pt-4">
                <label htmlFor="email" className="text-lg">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
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
                className="bg-orange-800 text-white font-bold text-lg p-2 mt-8 cursor-pointer rounded hover:underline"
                type="submit"
                value="Log In"
              />
            </form>

            <div className="text-center pt-12 pb-12">
              <p>
                Don't have an account?{' '}
                <Link href="/register">
                  <a className="underline font-semibold cursor-pointer hover:text-orange-800">
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
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
            alt="login page cover"
          />
        </article>
      </div>
    </main>
  );
}
