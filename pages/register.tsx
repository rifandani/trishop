import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
// files
import { options } from '../utils/config';

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    // POST req /register
    axios
      .post('/register', user)
      .then(async (res) => {
        console.log('👤 => ', res.data);

        await router.push('/products'); // push back to home

        toast.success('Register success', {
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
        {/* <!-- Register Section --> */}
        <article className="flex flex-col w-full md:w-1/2">
          <section className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-12">
            <Link href="/">
              <span className="p-4 text-xl font-bold text-white bg-orange-800 cursor-pointer hover:underline">
                Logo
              </span>
            </Link>
          </section>

          <section className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center">Join Us</p>
            <form className="flex flex-col pt-3 md:pt-8" onSubmit={onSubmit}>
              <div className="flex flex-col pt-4">
                <label htmlFor="name" className="text-lg">
                  Name
                </label>
                <input
                  className="w-full px-3 py-2 mt-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  placeholder="John Smith"
                  minLength={3}
                  required
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  value={name}
                />
              </div>

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
                type="submit"
                value="Register"
                className="p-2 mt-8 text-lg font-bold text-white bg-orange-800 rounded cursor-pointer hover:underline"
              />
            </form>

            <div className="pt-8 pb-8 text-center">
              <p>
                Already have an account?{' '}
                <Link href="/login">
                  <a className="font-semibold underline cursor-pointer hover:text-orange-800">
                    Log in here.
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
            alt="register page cover"
          />
        </article>
      </div>
    </main>
  );
}
