import { findUserById } from '../database/database.js';
export function requireAuth(req, res, next) {
  if (!req.session.userId) return res.status(401).json({ error: 'Authentication required.' });
  const user = findUserById(req.session.userId);
  if (!user) { req.session.destroy(() => {}); return res.status(401).json({ error: 'Authentication required.' }); }
  req.user = user;
  next();
}
