import questionService from '../../services/question.service.js';

export default async function (fastify, opts) {
    fastify.get('/', async function(request, reply) {
        return await questionService.getAll();
    })

    fastify.get('/:id', async function(request, reply) {
        return await questionService.getById(request.params.id);
    })

    fastify.delete('/:id', async function(request, reply) {
        return await questionService.deleteById(request.params.id);
    })

    fastify.post('/create', async function(request, reply) {
        return await questionService.create(request.body);
    })

    fastify.put('/update/:id', async function(request, reply) {
        return await questionService.update(request.params.id, request.body);
    })

    fastify.put('/add/answer/:id', async function(request, reply) {
        return await questionService.addAnswer(request.params.id, request.body);
    })
}