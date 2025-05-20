const adminMiddleware = (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    next();
};
export default adminMiddleware;
