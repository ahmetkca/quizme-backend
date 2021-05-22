import Question from '../models/question.model.js';
import answerService from './answer.service.js';

export default {
    async getAll() {
        return Question.find()
            .populate('answers')
            .populate('correctAnswer')
            .then(question => {
                return question;
            });
    },

    async deleteById(id) {
        return await Question.deleteOne({ _id : id})
            .populate('answers')
            .populate('correctAnswer')
            .then(question => {
                return question;
            });
    },

    async getById(id) {
        return await Question.findOne({ _id: id })
            .populate('answers')
            .populate('correctAnswer')
            .then(question => {
                return question;
            });
    },

    async create(questionParams) {
        const question = new Question(questionParams);
        return await question.save();
    },

    async update(id, questionParams) {
        return Question.updateOne({ _id: id }, questionParams);
    },

    async addAnswer(id, answerParams) {
        const question = await this.getById(id);
        if (!question) throw 'Question not found'
        const newAnswer = await answerService.create(answerParams);
        question.answers.push(newAnswer);
        return await question.save();
    }
}

