export const productValidator = (req, res, next) => {
    const { title, description, code, price, stock, category } = req.body;

    if (
        title === undefined ||
        description === undefined ||
        code === undefined ||
        price === undefined ||
        stock === undefined ||
        category === undefined ||
        title === null ||
        description === null ||
        code === null ||
        price === null ||
        stock === null ||
        category === null
    ) {
        return res.status(400).json({ msg: 'Invalid body' });
    }

    next();
};
