import quizService from '../../services/quiz.service.js';


export default async function (fastify, opts, next) {
    
    fastify.get('/', {
        handler: async function(request, reply) {
            const user = request.user;
            return await quizService.getAll(user);
        },
        preValidation: fastify.authenticate
    })

    fastify.get('/:id', async function(request, reply) {
        return await quizService.getById(request.params.id);
    })

    fastify.delete('/:id', async function(request, reply) {
        return await quizService.deleteById(request.params.id);
    })

    fastify.post('/create', {
        handler: async (request, reply) => {
            const user = request.user;
            return await quizService.create(request.body, user);
        },
        preValidation: fastify.authenticate
    } )

    fastify.put('/update/:id', async function(request, reply) {
        return await quizService.update(request.params.id, request.body);
    })

    fastify.put('/add/question/:id', {
        // preHandler: async function(request, reply, done) {
        //     console.log(request.user);

        // },
        handler: async function(request, reply) {
            return await quizService.addQuestion(request.params.id, request.body);
        },
        preValidation: fastify.authenticate
    })

    next()
}