import { useQuery } from '@tanstack/react-query';
import { fetchEmployee } from '../../services/employee/fetchEmployee';

export interface EmployeeType {
  employeeId: number;
  name: string;
  status: string;
  department: string;
  email: string;
  phoneNumber: string;
  image: string;
  position: string;
}

export const useGetEmployee = () => {
  const data = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployee,
  });
  return data;
};
