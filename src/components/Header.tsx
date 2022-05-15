import { AppBar, Typography } from '@mui/material'
import React from 'react'

function Header() {
    return (
        <AppBar className="appbar" color="inherit">
            <Typography align="center" className='apptitle' variant="h3">
                MOODZ
            </Typography>

        </AppBar>
    )
}

export default Header