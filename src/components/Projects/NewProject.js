import React, { Fragment, useState, useContext } from 'react'
import ProjectContext from '../../context/Projects/ProjectContext';

const NewProject = () => {

    //get state of form
    const projectsContext = useContext(ProjectContext);
    const { form , errorform, showForm, addProject, showError} = projectsContext;

    //State for project
    const [project, setProject] = useState({
        projectname: ''
    });

    //destructuring
    const { projectname } = project;

    //reads the input
    const onChangeProject = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    //user sends a project
    const onSubmitForm = e => {
        e.preventDefault();
        //validate prject
        if ( projectname.trim() === ''){
            showError();
            return;
        }
        //add to state
        addProject(project);
        //reset form
        setProject({
            projectname: ''
        })
    }
    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={() => showForm()}
            >New Project</button>

            {
                form ? (
                    <form
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitForm}
                    >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Project name"
                            name="projectname"
                            value={projectname}
                            onChange={onChangeProject}
                        />
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Add project"
                        />
                    </form>
                )
                    : null}

                    {errorform ? <p className="mensaje error">The project name is required</p> : null}
        </Fragment>
    );
}

export default NewProject;