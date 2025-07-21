import mongoose from 'mongoose'

async function initDatabase() {
    
const dbUrl = `mongodb://localhost:27017`;
const dbName = 'myfitfeed';

try {
    await mongoose.connect(dbUrl, { dbName });

    console.log('DB connected Successfully');
    
} catch (err) {
    console.log('DB connection failed!');
    console.log(err.message);
    
}
}

export default initDatabase;