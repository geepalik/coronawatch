import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const NavBar = () => {
    return(
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h4" color="inherit">
                        CoronaWatch - COVID-19 World Statistics
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;