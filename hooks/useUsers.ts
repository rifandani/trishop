import useSWR from 'swr';
import Axios from 'axios';

export default function useUsers() {
  const { data, error } = useSWR(
    'http://localhost:3000/api/admin/users',
    (url) => Axios.get(url).then((res) => res.data),
  );

  const users = data?.map((user: any) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    updatedAt: new Date(user.updatedAt).toDateString(),
  }));

  return {
    users,
    usersIsLoading: !error && !data,
    usersIsError: error,
  };
}
