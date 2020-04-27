import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Link from '@material-ui/core/Link';
import './Footer.css';

const Footer = () => (
    <div style={{ maxWidth: 700, margin: "auto", textAlign: "center", color: "white" }}>
        <Typography variant="caption" align={"center"}>
            © Copyright 2020 Gil Palikaras
        </Typography>
        <Divider style={{ margin: "24px auto", width: 60 }} />
        <Grid container justify={"center"} spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                <Typography align={"center"} gutterBottom color={"textSecondary"}>
                    <Link href="https://corona.lmao.ninja/" target="_blank" rel="noreferrer">
                        Data Source
                    </Link>
                </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Typography align={"center"} gutterBottom color={"textSecondary"}>
                    <a href="mailto:gil.palikaras@gmail.com">Contact</a>
                </Typography>
            </Grid>
        </Grid>
    </div>
);

export default Footer;