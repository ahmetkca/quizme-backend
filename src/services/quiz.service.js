import Quiz from '../models/quiz.model.js';
import questionService from './question.service.js';

export default {
    async getAll(createdBy) {
        return await Quiz.find({ createdBy: createdBy.sub })
            .populate('questions')
            .then(quiz => {
                return quiz;
            });
    },

    async deleteById(id) {
        return await Quiz.deleteOne({ _id: id })
            .populate('questions')
            .then(quiz => {
                return quiz;
            });
    },

    async getById(id) {
        return await Quiz.findOne({ _id: id })
            .populate('questions')
            .then(quiz => {
                return quiz;
            });
    },
    
    
    async create(quizParams, createdBy) {
        console.log(createdBy);
        Object.assign(quizParams, { createdBy: createdBy.sub })
        console.log(quizParams);
        const quiz = new Quiz(quizParams);

        return await quiz.save()
    },
    
    async update(id, quizParams) {
        return await Quiz.updateOne({ _id: id }, quizParams)
            .populate('questions')
            .then(quiz => {
                return quiz;
            })
    },

    async addQuestion(id, questionParams) {
        const quiz = await this.getById(id);
        if (!quiz) throw 'Quiz not found';
        const newQuestion = await questionService.create(questionParams);
        quiz.questions.push(newQuestion);
        return await quiz.save();
    },
}

