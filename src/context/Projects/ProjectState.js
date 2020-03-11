import React, { useReducer } from 'react';

import ProjectContext from './ProjectContext';
import ProjectReducer from './ProjectReducer';
import {
    FORM_PROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    VALIDATE_FORM,
    ACTIVE_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from '../../types';
import axiosClient from '../../config/axios';

const ProjectState = props => {

    const initialState = {
        projects: [],
        form: false,
        errorform: false,
        activeproject: null,
        message: null
    }

    //Dispatch para ejecutar acciones

    const [state, dispatch] = useReducer(ProjectReducer, initialState);

    //serie de funciones para el CRUD
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    };

    //Get projects

    const getProjects = async () => {
        try {
            //no necesitamos pasar nada 
            const result = await axiosClient.get('/api/projects'); 
            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    // Add new Project

    const addProject = async project => {
        try {
            const result = await axiosClient.post('/api/projects', project);
            //add project to state
            dispatch({
                type: ADD_PROJECT,
                payload: result.data
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    };

    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    };

    //selects the clicked project

    const selectActiveProject = projectId => {
        dispatch({
            type: ACTIVE_PROJECT,
            payload: projectId
        })
    };

    //deletes project

    const deleteProject = async projectId => {
        try {
            await axiosClient.delete(`/api/projects/${projectId}`)
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            const alert = {
                msg: 'There was an error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                errorform: state.errorform,
                project: state.activeproject,
                message: state.message,
                showForm,
                getProjects,
                addProject,
                showError,
                selectActiveProject,
                deleteProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )
}

export default ProjectState;