
import { Database } from './database.js';
import { randomUUID } from 'node:crypto';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();


export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query
            console.log(search);
            const tasks = database.select('tasks', search ? { 
                description: search
            }: null)

            return res.end(JSON.stringify(tasks))
        }

    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body;
            const task = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                createad_at: new Date(),
                updated_at: new Date()
            }
    
            database.insert('tasks', task);
    
            return res.writeHead(201).end()
        }

    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            database.delete('tasks', id);

            return res.writeHead(204).end()
        }

    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body

            const task = database.select('tasks',{ 
                id: id
            });
            
            database.update('tasks', id, { 
                title, 
                description, 
                completed_at: task[0].completed_at, 
                createad_at: task[0].createad_at, 
                updated_at: new Date() 
            });

            return res.writeHead(204).end()
        }

    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params;

            const task = database.select('tasks',{ 
                id: id
            });

            database.update('tasks', id, { 
                title:  task[0].title, 
                description:  task[0].description, 
                completed_at : new Date(),
                createad_at: task[0].createad_at, 
                updated_at: new Date() 
            });

            return res.writeHead(204).end()
        }

    },
]