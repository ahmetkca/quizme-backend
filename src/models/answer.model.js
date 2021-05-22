import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
    answer: { required: true, type: String }
},{ timestamps: true })

export default mongoose.model('Answer', AnswerSchema);