import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

const runSchema = mongoose.Schema({
    distance: { type: String, required: true },
    time: { type: String, required: true },
    rpe: { type: Number, required: true },
    date: { type: String, required: true },
    notes: { type: String, required: true }
});

const Run = mongoose.model('Run', runSchema);

const createRun = async(distance, time, rpe, date, notes) =>{
    const run = new Run({ distance: distance, time: time, rpe: rpe, date: date, notes: notes });
    return run.save();
}

const findRunById = async (_id) => {
    const query = Run.findById(_id);
    return query.exec();
}

const findRuns = async() => {
    const query = Run.find();
    return query.exec();
}

const replaceRun = async(_id, distance, time, rpe, date, notes) => {
    const replacement = await Run.replaceOne({ _id: _id }, { distance: distance, time: time, rpe: rpe, date: date, notes: notes });
    return replacement.modifiedCount;
}

const deleteById = async(_id) => {
    const deleted = await Run.deleteOne({ _id: _id })
    return deleted.deletedCount;
}

export { createRun, findRunById, findRuns, replaceRun, deleteById }