const tasks = [
    {
        id: 1,
        title: 'Fix a critical bug',
        project: 'Project Alpha',
        assignedTo: 'Bob',
        priority: 'high',
        status: 'open'
    },
    {
        id: 2,
        title: 'Implement a new feature',
        project: 'Project Alpha',
        assignedTo: 'Charlie',
        priority: 'medium',
        status: 'in progress'
    },
    {
        id: 3,
        title: 'Write documentation',
        project: 'Project Beta',
        assignedTo: 'Bob',
        priority: 'low',
        status: 'open'
    }
];

//filters all tasks relevant to a project
const getAllTasksForAProject = (projectName) => {
    let relevantTasks = tasks.filter(task => task.project.toLowerCase() === projectName.toLowerCase());
    return relevantTasks;
}

const getTasksForAPerson = (person) => {
    let relevantTasks = tasks.filter(task => task.assignedTo === person);
    return relevantTasks;
}

const getPendingTasks = () => {
    let relevantTasks = tasks.filter(task => task.status === 'open' );
    return relevantTasks;
}

const sortTaskByPriority = () => {
    const highPriorityTasks = tasks.filter(task => task.priority === 'high');
    const mediumPriorityTasks = tasks.filter(task => task.priority === 'medium');
    const lowPriorityTasks = tasks.filter(task => task.priority === 'low');

    const sortedTasks = [];
    for(let i=0;i<highPriorityTasks.length;i++) {
        sortedTasks.push(highPriorityTasks[i]);
    }
    for(let i=0;i<mediumPriorityTasks.length;i++) {
        sortedTasks.push(mediumPriorityTasks[i]);
    }

    for(let i=0;i<lowPriorityTasks.length;i++) {
        sortedTasks.push(lowPriorityTasks[i]);
    }
    return sortedTasks
}

//create sorted task array based project name
const createTaskArray = () => {
    const projectTaskCount = {};

    for (const task of tasks) {
        if (!projectTaskCount[task.project]) {
            projectTaskCount[task.project] = 0;
        }
        projectTaskCount[task.project]++;
    }

    const sortedProjects = [];
    for (const project in projectTaskCount) {
        sortedProjects.push({ project, taskCount: projectTaskCount[project] });
    }

    sortedProjects.sort((a, b) => b.taskCount - a.taskCount);
    return sortedProjects;
}

const addNewTask = (taskData) => {
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) : 0;
    const newTask = { id: maxId + 1, ...taskData };
    tasks.push(newTask);
    return newTask;
};

const getAllTasks = () => {
    return tasks;
}

const updateStatus = (id, newStatus) => {
    for(let i=0;i<tasks.length;i++) {
        if(tasks[i].id === id) {
            tasks[i].status = newStatus;
        }
    }
}


module.exports = {
    getAllTasksForAProject,
    createTaskArray,
    addNewTask,
    getAllTasks,
    getPendingTasks,
    getTasksForAPerson,
    sortTaskByPriority,
    updateStatus
}