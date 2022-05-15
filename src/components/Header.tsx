import { AppBar, Typography } from '@mui/material'
import React from 'react'

function Header() {
    return (
        <AppBar className="appbar" color="inherit">
            <Typography className="apptitle" align="center" variant="h3">
                MOODZ
            </Typography>

        </AppBar>
    )
}

export default Header