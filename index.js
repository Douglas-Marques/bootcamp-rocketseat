const express = require('express')

const server = express()

server.use(express.json())

let numReq = 0
const projects = []

server.use((req, res, next) => {
  numReq++
  console.log(`Número de requisições: ${numReq}`)
  next()
})

function checkProjectExists(req, res, next) {
  const { id } = req.params
  const project = projects.find(p => p.id === id);
  if (!project) return res.sendStatus(404).json({ error: 'Project not found' })
  return next()
}

server.get('/projects', (req, res) => {
  return res.json(projects)
})

server.post('/projects', (req, res) => {
  req.body.tasks = []
  projects.push(req.body)
  return res.json(projects)
})

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params
  const { task } = req.body
  projects.forEach(project => {
    if (project.id === id) project.tasks.push(task)
  })
  return res.json(req.body)
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params
  const { title } = req.body
  projects.forEach(project => {
    if (project.id === id) project.title = title
  })
  return res.send()
})

server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params
  const projectIndex = projects.findIndex(project => project.id === id);
  projects.splice(projectIndex, 1);
  return res.send()
})

server.listen(3000)
