import mongoose from "mongoose";
import {nanoid} from 'nanoid';

const QuizSchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    urlId: { required: true, unique: true, type: String, default: () => { return nanoid(8); }, immutable: true },
    createdBy: { type: String, required: true, immutable: true }
},{ timestamps: true });

export default mongoose.model('Quiz', QuizSchema);
