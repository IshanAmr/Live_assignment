const express = require('express');
const cors = require('cors');
const app = express();
const { getAllTasksForAProject, createTaskArray, addNewTask, getAllTasks, getPendingTasks, getTasksForAPerson, sortTaskByPriority, updateStatus } = require('./tasks');
app.use(cors());
app.use(express.json());

//getAllTasks
app.get('/tasks', (req, res) => {
    try {
       const tasks = getAllTasks();
       if(!tasks || tasks.length === 0) return res.status(404).json({ message : 'No task found' });
       res.status(200).json(tasks);
    } catch (error) {
       res.status(500).json({ message : 'Internal Server Error' });
    }
})

//endpoint to filter tasks relevant to a project
app.get('/projects/:name/tasks', (req, res) => {
    try {
       const projectName = req.params.name;
       if(!projectName) return res.status(400).json({message : 'Invalid project name'});
       const tasks = getAllTasksForAProject(projectName);
       if(tasks.length === 0) return res.status(404).json({ message : 'No task found for the project' });

       res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message : 'Internal Server error' });
    }
})

//get tasks sorted by project name
app.get('/projects/sort/by-task-size', (req, res) => {
    try {
       const getSortedProjectsByTaskSizeArray = createTaskArray();
       res.status(200).json(getSortedProjectsByTaskSizeArray);
    } catch (error) {
       res.status(500).json({ message : 'Internal Server error' });
    }
});

//add a new task
app.post('/tasks', (req, res) => {
    try {
        const { title, project, assignedTo, priority, status } = req.body;

        if (!title || !project || !assignedTo || !priority || !status) {
            return res.status(400).json({ error: 'All fields (title, project, assignedTo, priority, status) are required.' });
        }

        const newTask = addNewTask({ title, project, assignedTo, priority, status });
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server error' });
    }
});

app.get('/users/:name/tasks', (req, res) => {
    try {
       const personName = req.params.name;
       if(!personName) return res.status(400).json({ message : 'Person name is not correct '});
       const tasks = getTasksForAPerson(personName);
       if(tasks.length === 0) return res.status(404).json({ message : 'No task found' });

       res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message : 'Internal Server Error' });
    }
})

app.get('/tasks/pending', (req, res) => {
    try {
       const pendingTasks = getPendingTasks();
       if(pendingTasks.length === 0) return res.status(404).json({ message : 'No pending task found' });

       res.status(200).json(pendingTasks);
    } catch (error) {
        res.status(500).json({ message : 'Internal Server error' });
    }
})

app.get('/tasks/sort/by-priority', (req, res) => {
    try {
        const tasks = sortTaskByPriority();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message : 'Internal Server Error'});
    }
})

app.post('/tasks/:id/status', (req, res) => {
    try {
        const id = parseInt(req.params.id);
       const { status } = req.body;
       updateStatus(id, status);
       res.status(200).send('Status Updated SUccessfully');
    } catch (error) {
        res.status(500).json({ message : 'Internal Server Error'})
    }
})

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})