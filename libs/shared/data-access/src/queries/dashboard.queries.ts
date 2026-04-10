import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useApiClient } from '../api-provider';
import { z } from 'zod';
import {
  attendanceSchema,
  companyProfileSchema,
  eventSchema,
  myRequestSchema,
  noticeSchema,
  personalInfoSchema,
  teamRequestSchema,
  type Attendance,
  type CompanyProfile,
  type Event,
  type MyRequest,
  type Notice,
  type PersonalInfo,
  type TeamRequest,
} from '../schemas/dashboard.schema';

// ---------------------------------------------------------------------------
// Query key factory — consistent keys for caching & invalidation
// ---------------------------------------------------------------------------

export const dashboardKeys = {
  all: ['dashboard'] as const,
  attendance: () => [...dashboardKeys.all, 'attendance'] as const,
  myRequests: () => [...dashboardKeys.all, 'my-requests'] as const,
  notices: () => [...dashboardKeys.all, 'notices'] as const,
  events: () => [...dashboardKeys.all, 'events'] as const,
  teamRequests: () => [...dashboardKeys.all, 'team-requests'] as const,
  personalInfo: () => [...dashboardKeys.all, 'personal-info'] as const,
};

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

export function useMyAttendance() {
  const client = useApiClient();
  return useQuery<Attendance[]>({
    queryKey: dashboardKeys.attendance(),
    queryFn: async () => {
      const response = await client.get('/dashboard/attendance');
      return z.array(attendanceSchema).parse(response.data);
    },
  });
}

export function useMyRequests() {
  const client = useApiClient();
  return useQuery<MyRequest[]>({
    queryKey: dashboardKeys.myRequests(),
    queryFn: async () => {
      const response = await client.get('/dashboard/my-requests');
      return z.array(myRequestSchema).parse(response.data);
    },
  });
}

export function useNotices() {
  const client = useApiClient();
  return useQuery<Notice[]>({
    queryKey: dashboardKeys.notices(),
    queryFn: async () => {
      const response = await client.get('/dashboard/notices');
      return z.array(noticeSchema).parse(response.data);
    },
  });
}

export function useEvents() {
  const client = useApiClient();
  return useQuery<Event[]>({
    queryKey: dashboardKeys.events(),
    queryFn: async () => {
      const response = await client.get('/dashboard/events');
      return z.array(eventSchema).parse(response.data);
    },
  });
}

export function useTeamRequests() {
  const client = useApiClient();
  return useQuery<TeamRequest[]>({
    queryKey: dashboardKeys.teamRequests(),
    queryFn: async () => {
      const response = await client.get('/dashboard/team-requests');
      return z.array(teamRequestSchema).parse(response.data);
    },
  });
}

export function usePersonalInfo() {
  const client = useApiClient();
  return useQuery<PersonalInfo[]>({
    queryKey: dashboardKeys.personalInfo(),
    queryFn: async () => {
      const response = await client.get('/dashboard/personal-info');
      return z.array(personalInfoSchema).parse(response.data);
    },
  });
}

// ---------------------------------------------------------------------------
// Company Profile
// ---------------------------------------------------------------------------

export const companyProfileKeys = {
  all: ['company-profile'] as const,
};

export function useCompanyProfile() {
  const client = useApiClient();
  return useQuery<CompanyProfile>({
    queryKey: companyProfileKeys.all,
    queryFn: async () => {
      const response = await client.get('/company-profile');
      return companyProfileSchema.parse(response.data);
    },
  });
}

export function useUpdateCompanyProfile() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<CompanyProfile, Error, Partial<CompanyProfile>>({
    mutationFn: async (input) => {
      const response = await client.patch('/company-profile', input);
      return companyProfileSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: companyProfileKeys.all });
    },
  });
}

// ---------------------------------------------------------------------------
// Create Notice
// ---------------------------------------------------------------------------

export function useCreateNotice() {
  const client = useApiClient();
  const queryClient = useQueryClient();
  return useMutation<Notice, Error, Omit<Notice, 'id' | 'createdAt'>>({
    mutationFn: async (input) => {
      const response = await client.post('/dashboard/notices', input);
      return noticeSchema.parse(response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dashboardKeys.notices() });
    },
  });
}
