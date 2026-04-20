const register = (req, res, next) => {
    try {
        res.status(201).json({message:'Usiario registrado'});
    } catch (error) {
        console.log(error);
    }
}

const login = (req, res, next) => {
    try {
        res.status(201).json({message:'Sesión iniciada'});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    register,
    login   
}