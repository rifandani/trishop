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
      .post('/api/register', user)
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
    <main className="bg-white h-screen my-custom-font-family">
      <div className="w-full flex flex-wrap">
        {/* <!-- Register Section --> */}
        <article className="w-full md:w-1/2 flex flex-col">
          <section className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-12">
            <Link href="/">
              <span className="bg-orange-800 text-white font-bold text-xl p-4 cursor-pointer hover:underline">
                Logo
              </span>
            </Link>
          </section>

          <section className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Join Us</p>
            <form className="flex flex-col pt-3 md:pt-8" onSubmit={onSubmit}>
              <div className="flex flex-col pt-4">
                <label htmlFor="name" className="text-lg">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
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
                type="submit"
                value="Register"
                className="bg-orange-800 text-white font-bold text-lg hover:underline p-2 mt-8 cursor-pointer rounded"
              />
            </form>

            <div className="text-center pt-8 pb-8">
              <p>
                Already have an account?{' '}
                <Link href="/login">
                  <a className="underline font-semibold cursor-pointer hover:text-orange-800">
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
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
            alt="register page cover"
          />
        </article>
      </div>
    </main>
  );
}
