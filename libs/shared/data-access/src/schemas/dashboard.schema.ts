import { z } from 'zod';

// ---------------------------------------------------------------------------
// Attendance schema
// ---------------------------------------------------------------------------

export const attendanceSchema = z.object({
  id: z.string(),
  event: z.enum(['Present', 'Late', 'Leave', 'Weekend']),
  clockIn: z.string(),
  clockOut: z.string(),
  workingHours: z.string(),
  day: z.string(),
  date: z.string(),
});

export type Attendance = z.infer<typeof attendanceSchema>;

// ---------------------------------------------------------------------------
// MyRequest schema
// ---------------------------------------------------------------------------

export const myRequestSchema = z.object({
  id: z.string(),
  type: z.string(),
  subType: z.string(),
  day: z.string().optional(),
  hours: z.string().optional(),
  date: z.string(),
  status: z.enum(['Approved', 'Rejected', 'Pending']),
});

export type MyRequest = z.infer<typeof myRequestSchema>;

// ---------------------------------------------------------------------------
// Notice schema
// ---------------------------------------------------------------------------

export const noticeSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  createdAt: z.string(),
  image: z.string(),
  noticeType: z.enum(['Important', 'Info', 'Notice']),
});

export type Notice = z.infer<typeof noticeSchema>;

// ---------------------------------------------------------------------------
// Event schema
// ---------------------------------------------------------------------------

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  eventType: z.enum(['Birthday', 'Event', 'Holiday', 'Anniversary']),
});

export type Event = z.infer<typeof eventSchema>;

// ---------------------------------------------------------------------------
// TeamRequest schema
// ---------------------------------------------------------------------------

export const teamRequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  subType: z.string(),
  day: z.string().optional(),
  hours: z.string().optional(),
  detail: z.string().optional(),
  date: z.string(),
  status: z.enum(['Approved', 'Rejected', 'Pending']),
  image: z.string().optional(),
});

export type TeamRequest = z.infer<typeof teamRequestSchema>;

// ---------------------------------------------------------------------------
// PersonalInfo schema — currently logged-in user's dashboard card
// ---------------------------------------------------------------------------

export const personalInfoSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: z.string(),
  image: z.string(),
  status: z.enum(['Active', 'Inactive']),
  employeeId: z.string(),
  department: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;

// ---------------------------------------------------------------------------
// CompanyProfile schema
// ---------------------------------------------------------------------------

export const companyProfileSchema = z.object({
  id: z.string(),
  organizationLegalName: z.string(),
  organizationShortName: z.string(),
  natureOfOrganization: z.string(),
  currency: z.string(),
  panNumber: z.string(),
  registrationNumber: z.string(),
  taxOffice: z.string(),
});

export type CompanyProfile = z.infer<typeof companyProfileSchema>;
