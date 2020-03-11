import React, { Fragment, useContext } from 'react'
import Task from './Task';
import ProjectContext from '../../context/Projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TaskListing = () => {
    //extract initial state
    const projectsContext = useContext(ProjectContext);
    const { project, deleteProject } = projectsContext;
    //get tasks of project
    const taskContext = useContext(TaskContext);
    const { projectTasks } = taskContext;

    //If no project selected

    if (!project) return <h2>Select a project</h2>
    //Array destructuring

    const [activeProject] = project;


    const deleteProjectHandler = () => {
        deleteProject(activeProject._id);
    };
    return (
        <Fragment>
            <h2>Project: {activeProject.projectname}</h2>
            <ul className="listado-tareas">
                {projectTasks.length === 0
                    ? (<li className="tarea"><p>No tasks yet!</p></li>)
                    : <TransitionGroup>
                        {projectTasks.map(task => (
                        <CSSTransition
                            key={task._id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Task
                                task={task}
                            />
                        </CSSTransition>)
                )}
                    </TransitionGroup>}
            </ul>
            <button
                type="button"
                className="btn btn-primario"
                onClick={() => deleteProjectHandler()}
            >Delete Project &times;</button>
        </Fragment>
    );
}

export default TaskListing;