import mongoose from "mongoose";

export async function mongooseConnect() {
    try{
        mongoose.connect(process.env.MONGO_URL!);   //when using TypeScript add '!' .bt it will always resolve(available)
        const connection = mongoose.connection;

        connection.on('connected', () => {   //  '.on' listens to events plus a callback function
            console.log('MongoDB connected Succesfully!');
        });

        //Listen to errors just in case
        connection.on('error', (err)=>{
            console.log('MongoDB connection error. Make sure MongoDB is running. '+err);
            process.exit();
        })
    } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
    }
}