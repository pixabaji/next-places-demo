import { MongoClient } from 'mongodb';

const PW = 'LM10forever';
const MONGO_CREDENTIALS = `mongodb+srv://ivorbze:${PW}@cluster0.ynjjq.mongodb.net/meetups?retryWrites=true&w=majority`;

async function handler(req, res) {
    if(req.method == 'POST') {
        const data = req.body;

        //const {image, title, address, description} = data;
        try {
            const mongoConn = await MongoClient.connect(MONGO_CREDENTIALS);

            const db = mongoConn.db();
    
            const meetupCollection = db.collection('meetups');
    
            const result = await meetupCollection.insertOne(data);
    
            console.log(result);
    
            mongoConn.close();
    
            res.status(201).json({message: 'Insert was successful'});;
        } catch (error) {
            console.log(error);
        }

    }
};

export default handler;