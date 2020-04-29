import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import {InlineShareButtons} from 'sharethis-reactjs';
import './Footer.css';

const Footer = () => (
    <div style={{ maxWidth: 700, margin: "auto", textAlign: "center", color: "white" }}>
        <Typography variant="caption" align={"center"}>
            © Copyright 2020 Gil Palikaras
        </Typography>
        <Divider style={{ margin: "24px auto", width: 60 }} />
        <Grid container justify={"center"} spacing={2}>
            <InlineShareButtons
                config={{
                    alignment: 'center',  // alignment of buttons (left, center, right)
                    color: 'social',      // set the color of buttons (social, white)
                    enabled: true,        // show/hide buttons (true, false)
                    font_size: 16,        // font size for the buttons
                    labels: 'cta',        // button labels (cta, counts, null)
                    language: 'en',       // which language to use (see LANGUAGES)
                    networks: [           // which networks to include (see SHARING NETWORKS)
                        'whatsapp',
                        'linkedin',
                        'facebook',
                        'sharethis'
                    ],
                    padding: 12,          // padding within buttons (INTEGER)
                    radius: 4,            // the corner radius on each button (INTEGER)
                    show_total: true,
                    size: 30,             // the size of each button (INTEGER)

                    // OPTIONAL PARAMETERS
                    url: 'https://corona-watch-app.herokuapp.com/', // (defaults to current url)
                    image: 'https://bit.ly/2yZkmo7',  // (defaults to og:image or twitter:image)
                    description: 'custom text',       // (defaults to og:description or twitter:description)
                    title: 'Corona Watch - COVID-19 World Statistics', // (defaults to og:title or twitter:title)
                    message: 'Corona Watch - COVID-19 World Statistics', // (only for email sharing)
                    username: 'custom twitter handle' // (only for twitter sharing)
                }}
            />
            <a className="bmc-button" target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/geepalik">
                <img
                src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg" alt="Buy me a coffee" />
                    <span style={{"margin-left":"15px","font-size":"28px !important;"}}>Buy me a coffee</span>
            </a>
        </Grid>
        <Grid container justify={"center"} spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
                <Typography align={"center"} gutterBottom color={"textSecondary"}>
                    <a href="https://corona.lmao.ninja/" rel="noopener noreferrer" target="_blank" rel="noreferrer">Data Source</a>
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