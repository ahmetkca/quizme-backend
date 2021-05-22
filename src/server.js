import dotenv from 'dotenv';
dotenv.config();
console.log(process.env.AUTH0_DOMAIN);

import Fastify from 'fastify'
import mongoose from "mongoose";
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import AutoLoad from 'fastify-autoload';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fastify = Fastify({ logger: true });
const mongoUrl = process.env.MONGO_URI || "mongodb://localhost:27017/quizzes"


export default async function (fastify, opts) {
    try {
        mongoose.connect(mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true, 'useCreateIndex': true })
            .then(() => console.log(`MongoDB connected`))
            .catch(err => console.log(err));
    } catch (err) {
        console.error(err);
    }

    fastify.register(import('fastify-cors'), { 
        // put your options here
    })

    fastify.register(import('fastify-auth0-verify'), {
        domain: process.env.AUTH0_DOMAIN,
        secret: process.env.AUTH0_SECRET
    })

    fastify.register(async function(instance,_options, done) {
        await instance.get('/verify', {
            handler: function (request, reply) {
                reply.send(request.user)
            },
            preValidation: instance.authenticate
        })
        done()
    })

    fastify.register(AutoLoad, {
        dir: join(__dirname, 'routes')
    });

    const start = async () => {
        try {
            await  fastify.listen(3000);
        } catch (err) {
            fastify.log.error(err);
            process.exit(1);
        }
    }
    
    start();
}

