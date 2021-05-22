import mongoose from "mongoose";


const QuestionSchema = new mongoose.Schema({
    question: { required: true, type: String },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    correctAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}
},{ timestamps: true })


export default mongoose.model('Question', QuestionSchema);
