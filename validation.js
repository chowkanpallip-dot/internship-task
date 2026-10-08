import { z } from 'zod';
const email = z.string().trim().email('Enter a valid email address.').max(254);
const password = z.string().min(8, 'Password must be at least 8 characters.').max(128, 'Password must be 128 characters or fewer.');
export const registrationSchema = z.object({ name: z.string().trim().min(2, 'Name must be at least 2 characters.').max(80), email, password, confirmPassword: z.string() }).refine((data) => data.password === data.confirmPassword, { message: 'Passwords do not match.', path: ['confirmPassword'] });
export const loginSchema = z.object({ email, password: z.string().min(1, 'Password is required.').max(128) });
export const publicUser = ({ id, name, email, created_at: createdAt }) => ({ id, name, email, createdAt });
