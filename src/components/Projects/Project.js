import React, {useContext} from 'react'
import ProjectContext from '../../context/Projects/ProjectContext';
import TaskContext from '../../context/tasks/TaskContext';

const Project = ({ project }) => {
    //get state of projects
    const projectsContext = useContext(ProjectContext);
    const { selectActiveProject } = projectsContext;

    const taskContext = useContext(TaskContext);
    const { getTasks } = taskContext;
    
    //fn for adding active project

    const selectProject = id => {
        selectActiveProject(id); // set active project
        getTasks(id); //set tasks for that project
    };
    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => selectProject(project._id)}
            >{project.projectname}</button>
        </li>
    );
}

export default Project;