import React, { Component } from 'react'
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import PetsIcon from "@material-ui/icons/Pets";
export class HotelGeneralInfo extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    render() {
        const { values, handleChange } = this.props;
        const paperStyle = {
            padding: 20,
            margin: "20px auto",
        };
        const fieldStyle = { padding: "20px" };
        return (<Grid container
            direction="row"
            justify="center"
            alignItems="center">
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={{ backgroundColor: "#7c3fb5" }}>
                        <PetsIcon />
                    </Avatar>
                    <h2>Sign in as provider</h2>
                </Grid>
                <form>
                    <div>
                        <TextField
                            style={fieldStyle}
                            onChange={handleChange('email')}
                            label="E-mail"
                            placeholder="Enter e-mail"
                            required
                            defaultValue={values.email}
                        />
                        <TextField
                            style={fieldStyle}
                            onChange={handleChange('password')}
                            label="Password"
                            placeholder="Enter password"
                            type="password"
                            required
                            defaultValue={values.password}
                        />
                    </div>
                    <TextField
                        fullWidth
                        style={{ padding: "20px" }}
                        onChange={handleChange('hotelName')}
                        label="Hotel Name"
                        placeholder="Enter hotel name"
                        required
                        defaultValue={values.hotelName}
                    />
                    <TextField
                        fullWidth
                        multiline
                        rows={5}
                        style={{ padding: "20px" }}
                        onChange={handleChange('hotelDescription')}
                        label="Hotel Description"
                        placeholder="Enter hotel description"
                        required
                        defaultValue={values.hotelDescription}
                    />
                </form>
                <Button
                    style={{ float: 'right', margin: "20px" }}
                    label="Continue"
                    color="primary"
                    variant="contained"
                    onClick={this.continue}>Continue
                </Button>
            </Paper>
        </Grid>)
    }
}
export default HotelGeneralInfo