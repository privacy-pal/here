
export const enum CoursePermission {
  CourseAdmin = "admin",
  CourseStaff = "staff",
  CourseStudent = "student",
}

export interface User {
  ID: string;
  displayName: string;
  email: string;
  pronouns: string;
  photoUrl: string;
  courses: string[];
  defaultSections: Record<string, string>;
  actualSections: Record<string, Record<string, string>>;
  isAdmin: boolean;
  permissions: Record<string, CoursePermission>;
}