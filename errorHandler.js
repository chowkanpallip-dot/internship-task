export function notFoundHandler(req, res) { res.status(404).json({ error: 'Resource not found.' }); }
export function errorHandler(err, req, res, next) { console.error(err); if (res.headersSent) return next(err); res.status(500).json({ error: 'An unexpected server error occurred.' }); }
