# Security Notes

This document explains the security decisions in the Secure Login System in beginner-friendly terms.

## Password hashing

Passwords are never stored directly. Registration uses `bcryptjs.hash(password, 12)` and stores only the resulting one-way hash in `users.password_hash`. During login, bcrypt compares the submitted password with that hash. Passwords and hashes are never sent to the React client.

## Server-side sessions

After a successful login, Express creates a session and stores only the user ID in it. The browser receives an HttpOnly cookie, so frontend JavaScript cannot read the session identifier. In production the cookie is also marked Secure and is sent only over HTTPS. Sessions expire after four hours and are stored in SQLite for this learning project.

## Parameterized queries

Database access uses prepared statements with `?` parameters. User input is never concatenated into SQL, which mitigates SQL injection.

## Rate limiting

The login route permits 10 attempts per 15-minute window per client IP. This slows repeated password guessing. A production deployment could add account-level controls and monitoring.

## Helmet and CORS

Helmet adds useful HTTP security headers. CORS only allows the configured frontend origin and credentials are explicitly enabled for the session cookie.

## Environment variables

The session secret is loaded from `server/.env`, which is ignored by Git. A production secret must be long and randomly generated; the development fallback exists only to make a fresh local clone easy to run.

## Input validation and errors

Zod validates names, email addresses and password length before database work. Login failures use the same generic message for an unknown email and a wrong password so the API does not reveal which accounts exist. Normal error responses do not expose stack traces or database details.

## Threats mitigated

- Plaintext password theft from the database
- SQL injection
- Basic credential stuffing and brute-force attempts
- Session theft through JavaScript access to the cookie
- Email/account enumeration through login errors
- Some browser-side security misconfiguration through Helmet and restricted CORS
- Unauthorized access to the dashboard and `/api/auth/me`

## Limitations

This is an educational project. The default session store is SQLite and should be replaced with a managed, highly available store for a multi-instance production deployment. A production application should also add CSRF protection for its deployment model, email verification, password reset, MFA, audit logging, account lockout/alerting, secure HTTPS deployment, dependency scanning and centralized monitoring.
