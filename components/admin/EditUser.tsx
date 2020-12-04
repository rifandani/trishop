import { useRouter } from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Axios from 'axios';
// files
import { options } from '../../utils/config';

const url = 'http://localhost:3000/api/admin/user';

export default function EditUser() {
  const router = useRouter();

  const [error, setError] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>('USER');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>('');
  const [updatedAt, setUpdatedAt] = useState<string>('');

  useEffect(() => {
    Axios.get(`${url}?_id=${router.query?.id}`)
      .then((res) => {
        setName(res.data.name);
        setRole(res.data.role);
        setEmail(res.data.email);
        setCreatedAt(new Date(res.data.createdAt).toDateString());
        setUpdatedAt(new Date(res.data.updatedAt).toDateString());
      })
      .catch((err) => setError(true));
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    Axios.put(`${url}s`, {
      _id: router.query?.id,
      name,
      role,
      email,
      password,
    })
      .then((res) => {
        toast.success('User updated 👍', {
          ...options,
          position: 'bottom-left',
        });

        router.push('/admin/dashboard', '/admin/dashboard');
      })
      .catch((err) =>
        toast.error(err.message, { ...options, position: 'bottom-left' }),
      );
  }

  if (error) return <h1>Please, input valid user _id</h1>;

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      {/* Edit User */}
      <section className="p-6 mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Edit User
              </h3>
              <p className="mt-1 text-sm leading-5 text-gray-600">
                Choose the role between USER or ADMIN.
              </p>
              <p className="mt-3 text-sm leading-5 text-indigo-600">
                Created At: {createdAt}
                <br />
                Updated At: {updatedAt}
              </p>
            </div>
          </div>

          {/* form */}
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={onSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {/* name */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        id="name"
                        minLength={3}
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                      />
                    </div>

                    {/* role */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Role
                      </label>
                      <select
                        className="mt-1 block form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        id="role"
                        required
                        onChange={(e) => setRole(e.target.value)}
                        value={role}
                      >
                        <option>USER</option>
                        <option>ADMIN</option>
                      </select>
                    </div>

                    {/* email */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email_address"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        id="email_address"
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>

                    {/* password */}
                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-5 text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        className="mt-1 form-input block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        id="password"
                        type="password"
                        minLength={6}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>
                </div>

                {/* button */}
                <div className="px-4 py-3 bg-green-100 text-right sm:px-6">
                  <button
                    type="submit"
                    className="py-2 px-6 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-500 shadow-sm hover:bg-green-600 focus:outline-none focus:shadow-outline-blue active:bg-green-600 transition duration-150 ease-in-out"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
