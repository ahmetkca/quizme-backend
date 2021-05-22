import Answer from '../models/answer.model.js';

export default {
    async getAll() {
        return await Answer.find();
    },

    async getById(id) {
        const answer = Answer.findOne({ _id: id } );
        if (!answer) throw "Answer not found!";
        return answer;
    },

    async deleteById(id) {
        return await Answer.deleteOne({_id: id});
    },

    async create(answerParams) {
        const answer = new Answer(answerParams);
        return await answer.save();
    },

    async update(id, answerParams) {
        return await Answer.updateOne({ _id: id }, answerParams);
    }
}

