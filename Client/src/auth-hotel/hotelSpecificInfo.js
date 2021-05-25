import React, { Component } from 'react'
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import PetsIcon from "@material-ui/icons/Pets";

export class HotelSpecificInfo extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const { values, handleChange } = this.props;
        const paperStyle = {
            padding: 20,
            margin: "20px auto",
        };
        const fieldStyle = { padding: "20px" };
        return (<Grid
            container
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
                            onChange={handleChange('city')}
                            label="city"
                            placeholder="Enter city"
                            required
                            defaultValue={values.city}
                        />
                        <TextField
                            style={fieldStyle}
                            onChange={handleChange('address')}
                            label="address"
                            placeholder="Enter address"
                            type="address"
                            required
                            defaultValue={values.address}
                        />
                    </div>
                    <div>
                    <TextField
                        style={{ padding: "20px" }}
                        onChange={handleChange('phone')}
                        label="phone"
                        placeholder="Enter phone"
                        required
                        defaultValues={values.phone}
                    />
                    <TextField
                        style={{ padding: "20px" }}
                        onChange={handleChange('rooms')}
                        label="Rooms"
                        placeholder="Enter number of rooms"
                        required
                        defaultValue={values.rooms}
                    />
                    </div>
                    <TextField
                        style={{ padding: "20px" }}
                        onChange={handleChange('pricePerNight')}
                        label="Price for one night"
                        placeholder="Enter for one night"
                        required
                        defaultValue={values.pricePerNight}
                    />
                </form>
                <Button
                    style={{ float: 'right', margin: "20px", marginTop: 'auto' }}
                    label="Continue"
                    color="primary"
                    variant="contained"
                    onClick={this.continue}>Sign in
                </Button>
                <Button
                    style={{ float: 'right', margin: "20px", marginTop: 'auto' }}
                    label="Previously"
                    color="primary"
                    variant="contained"
                    onClick={this.back}>Go back
                </Button>
            </Paper>
        </Grid>);
    }

}
export default HotelSpecificInfo