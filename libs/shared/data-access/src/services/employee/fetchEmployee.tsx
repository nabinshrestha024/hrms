import { useApiClient } from '../../api-provider';

export const fetchEmployee = async () => {
  const client = useApiClient();
  const res = await client.get(`/employees/`);
  return res.data;
};
