import answerService from '../../services/answer.service.js';
// import boom from 'boom';

export default async function (fastify, opts) {
    fastify.get('/', async function(request, reply) {
        return answerService.getAll();
    })

    fastify.get('/:id', async function(request, reply) {
        return await answerService.getById(request.params.id);
    })

    fastify.delete('/:id', async function(request, reply) {
        return await answerService.deleteById(request.params.id);
    })

    fastify.post('/create', async function (request, reply) {
        return await answerService.create(request.body)
    })

    fastify.put('/update/:id', async function(request, reply) {
        return await answerService.update(request.params.id, request.body);
    })
}