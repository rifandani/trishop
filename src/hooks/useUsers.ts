import useSWR from 'swr';

export default function useUsers() {
  const { data, error } = useSWR('/admin/users');

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
