const express = require('express')

const server = express()

server.use(express.json())


const projects = []
let totalReq = 0

// Middleware para fornecer o número de requisições

server.use((req, res, next) => {
    totalReq++
    console.log(`${totalReq} requisições até o momento.`)
    next()
})

// Middleware para checar se o projeto existe

function checkingProject(req, res, next) {
    const project = projects.find(i => i.id == req.params.id)

    if(!project){
        return res.status(400).json({ error: 'Project not found'})
    }
    return next()
}

server.get('/projects', (req, res) => {
    return res.json(projects)
})

server.post('/projects', (req, res) =>{
    const { id, title } = req.body
    const project = {
        id,
        title,
        tasks: []
    }

    projects.push(project)

    return res.json(projects)

})

server.put('/projects/:id', checkingProject, (req, res) => {
    const { title } = req.body
    const project = project.find(i => i.id == req.params.id)


    project.title = req.body.title

    return res.json(project)
})

server.delete('/projects/:id', checkingProject, (req, res) => {
    const item = projects.findIndex(i => i.id == req.params.id)

    projects.splice(item, 1)

    return res.json(project)
})

server.post('/projects/:id/tasks', checkingProject, (req, res) => {

const project = projects.find(i = i.id == req.params.id)

project.tasks.push(req.body.title)

return res.json(project)

})

server.listen(3000)
