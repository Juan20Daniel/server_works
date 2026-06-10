const asyncHandler = (fn) => {
    return (req, res, next) => {
        try {
            const result = fn(req, res, next);
            Promise.resolve(result).catch(next);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = asyncHandler;