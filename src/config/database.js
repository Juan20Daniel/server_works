const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_DB_URI);
		console.log(`MongoDB conectado`);
	} catch (error) {
		console.error('Error conectando a MongoDB:', error);
		//para terminar el servidor si la conexión falla
    	process.exit(1);	
	}
}

module.exports = connectDB;