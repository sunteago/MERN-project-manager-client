import React from 'react'
import NewProject from '../Projects/NewProject';
import ProjectListing from '../Projects/ProjectListing';

const Sidebar = () => {
    return ( 
        <aside>
            <h1>MERN <span>Tasks</span></h1>
            <NewProject/>
            <div className="proyectos">
                <h2>Your Projects</h2>
                <ProjectListing/>
            </div>
        </aside>
     );
}
 
export default Sidebar;