import React, { useContext, useState, useEffect } from 'react';
import ProjectContext from '../../context/Projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';


const TaskForm = () => {

    //extract initial state
    const projectsContext = useContext(ProjectContext);
    const { project } = projectsContext;
    const tasksContext = useContext(TaskContext);
    const { selectedTask,
        taskerror,
        addTask,
        validateTask,
        getTasks,
        updateTask,
        cleanTask } = tasksContext;


    //Effect that detect is a task is sleceted

    useEffect(() => {
        if (selectedTask !== null) {
            setTask(selectedTask);
        } else {
            setTask({
                taskname: ''
            })
        }
    }
        , [selectedTask])

    //form state:
    const [task, setTask] = useState({
        taskname: ''
    })
    //extract the projectname
    const { taskname } = task;

    if (!project) return null;
    //Array destructuring

    const [activeProject] = project;

    //read values of form

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    };
    const onSubmitTaskFormHandler = e => {
        e.preventDefault();

        //add new task
        if (taskname.trim() === '') {
            validateTask();
            return;
        }

        //Is edit or new task?
        if (selectedTask === null) {
            task.project = activeProject._id;
            addTask(task)
        } else {
            updateTask(task);

            //deltes selected task from state
            cleanTask();
        }
        
        //get and filter tasks of active project
        getTasks(activeProject._id);
        //reset form
        setTask({
            taskname: ''
        })
    };
    return (
        <div className="formulario">
            <form
                onSubmit={onSubmitTaskFormHandler}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task Name"
                        name="taskname"
                        value={taskname}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={selectedTask ? 'Edit Task' : 'Add Task'}
                    />
                </div>
            </form>
            {taskerror ? <p className="mensaje error">You need to put a task name </p> : null}
        </div>
    );
}

export default TaskForm;