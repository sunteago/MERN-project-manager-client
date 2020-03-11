import React, {useContext} from 'react'
import TaskContext from '../../context/tasks/TaskContext';
import ProjectContext from '../../context/Projects/ProjectContext';


const Task = ({ task }) => {

    const taskContext = useContext(TaskContext);
    const {deleteTask, getTasks, saveActiveTask, updateTask } = taskContext;

    const projectContext = useContext(ProjectContext);
    const {project} = projectContext;


    //Extracting project with array destructuring, va en ORDEN de los index, como useState
    const [activeProject] = project;
    const deleteButtonHandler = id => {
        deleteTask(id, activeProject._id);
        getTasks(activeProject._id);
    }

    //fn that modifies task states

    const changeState = task => {
        if (task.taskstatus) {
            task.taskstatus = false;
        } else {
            task.taskstatus = true;
        }
        updateTask(task);
    };

    const editButtonHandler = task => {
        saveActiveTask(task);
    };
    return (
        <li className="tarea sombra">
            <p>{task.taskname}</p>
            <div className="estado">
                {task.taskstatus
                    ? (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => changeState(task)}

                        >Completed</button>
                    )
                    : (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => changeState(task)}
                        >Incomplete</button>
                    )
                }
            </div>
            <div className="acciones">
                <button
                    onClick={() => editButtonHandler(task)}
                    type="button"
                    className="btn btn-primario"
                >Edit</button>

                <button
                      type="button"
                      className="btn btn-secundario"
                      onClick={() => deleteButtonHandler(task._id)}
                >Delete</button>
            </div>
        </li>
    );
}

export default Task;