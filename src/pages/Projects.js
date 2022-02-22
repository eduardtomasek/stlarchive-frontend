import React from 'react'

import Grid from '@mui/material/Grid'

import ProjectCard from '../components/ProjectCard'

const ProjectsPage = () => {
    return <div>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(Array(40)).map(index => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                    <ProjectCard />
                </Grid>
            ))}
        </Grid>
    </div>
}

export default ProjectsPage
