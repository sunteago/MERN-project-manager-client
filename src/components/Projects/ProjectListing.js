import React, { useContext, useEffect } from 'react'
import Project from './Project';
import ProjectContext from '../../context/Projects/ProjectContext';
import AlertContext from '../../context/alerts/alertContext';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const ProjectListing = () => {

    //Extract projects of initial state
    const projectsContext = useContext(ProjectContext);
    const { message, projects, getProjects } = projectsContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;


    //check if projects has content

    useEffect(() => {
        if(message) {
            showAlert(message.msg, message.category)
        }

        getProjects();
        //eslint-disable-next-line
    }, [message]);

    if (projects.length === 0) return <p>No projects yet, start yours right now!</p>;
    return (
        <ul className="listado-proyectos">
            {alert ? (<div className={`alerta ${alert.category}`}>{alert.msg}</div>) : null}
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={300}
                        classNames="proyecto"
                    >
                        <Project
                            project={project}
                        ></Project>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}

export default ProjectListing;