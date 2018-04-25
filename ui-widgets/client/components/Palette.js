import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import axios from 'axios';
import {GridListTile, GridList} from 'material-ui/GridList';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import FilterList from 'material-ui-icons/FilterList'
import Collapse from 'material-ui/transitions/Collapse';
import { FormControl, FormLabel, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Typography from 'material-ui/Typography';
import Pagination from 'material-ui-v1-pagination';


const styles = {
  root: {
    padding: 24
  },
  gridRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 1075,
    height: 500,
    overflow: 'initial',
  },
};


class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalResults: 0,
            total: 0,
            number: 1,
            display: 7,
            expanded: false,
            paramsWidget: 'all',
            paramsColour: '',
            widgetType: '',
            colourName: '',
            widgets: ['Button', 'ProgressBar',],
            colours: ['Blueberry', 'Platinum',],
            data: []
        };
        this.handleExpandClick = this.handleExpandClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleExpandClick() {
      this.setState(prevState => ({
          expanded: !prevState.expanded
        }));
    }

    handleChange(event) {
      console.log("handleChange")
      if(event.target.name == "widgetType")
      {
        this.setState({
          number: 1,
          [event.target.name]: event.target.value,
          paramsWidget: event.target.value.toLowerCase(),
        });

        axios.get('/' + event.target.value.toLowerCase() + '/1' + '/' + this.state.paramsColour)
          .then((response) => {
            console.log(response);
            this.setState({
              data: response.data.results,
              total: response.data.pagination.pageCount,
              totalResults: response.data.pagination.rowCount,
            });
          })
          .catch((error) => {
            console.log(error);
            this.setState({data: []});
          });
      }
      else
      {
        this.setState({
          number: 1,
          [event.target.name]: event.target.value,
          paramsColour: event.target.value.toLowerCase(),
        });

        axios.get('/' + this.state.paramsWidget + '/1' + '/' + event.target.value)
          .then((response) => {
            console.log(response);
            this.setState({
              data: response.data.results,
              total: response.data.pagination.pageCount,
              totalResults: response.data.pagination.rowCount,
            });
          })
          .catch((error) => {
            console.log(error);
            this.setState({data: []});
          });
      }

    }

    handlePageChange(num) {
      this.setState({ number: num });
      axios.get('/' + this.state.paramsWidget + '/' + num)
          .then((response) => {
            console.log(response);
            this.setState({
              data: response.data.results,
              total: response.data.pagination.pageCount,
              totalResults: response.data.pagination.rowCount,
            });
          })
          .catch((error) => {
            console.log(error);
          });
    }

    handleClick(event) {
      console.log("handleClick");
      if(event.target.name == "widgetType" && event.target.value == this.state[event.target.name])
      {
       event.target.value = "all"  
      }
      else if(event.target.name == "colourName" && event.target.value == this.state[event.target.name])
      {
        event.target.value = ''
      }
      this.handleChange(event) 
    }

    componentDidMount() {
        console.log("componentDidMount()");
        axios.get('/' + this.state.paramsWidget + '/' + this.state.number)
          .then((response) => {
            console.log(response);
            this.setState({
              data: response.data.results,
              total: response.data.pagination.pageCount,
              totalResults: response.data.pagination.rowCount,
            });
          })
          .catch((error) => {
            console.log(error);
          });
    }

    render() {

        const { classes } = this.props;

        //.map(function callback(currentValue, index, array) {
        /*const listItems = this.state.widgets.map((widget, idx) =>
            <a className={idx == 0 ? "nav-link p-2 active" : "nav-link p-2"} data-toggle="pill" href="#" role="tab" aria-expanded="true" key={widget} onClick={this.handleClick.bind(this, widget)}>{widget}</a>
        );*/

        const widgetTypes = this.state.widgets.map((widget, idx) =>
          <FormControlLabel value={widget} control={<Radio />} label={widget} />
        );

        const colours = this.state.colours.map((colour, idx) =>
          <FormControlLabel value={colour} control={<Radio />} label={colour} />
        );


        /*const gallery = this.state.data.map((widget, idx) =>
            <img src={widget.filepath} key={idx} alt="..." class="img-thumbnail"/>
        );*/

        return (
            /*<div className="row">
                <div className="nav flex-column nav-pills ml-5 mt-5" role="tablist">
                    <h6>Palette</h6>
                    {listItems}
                </div>
                <div className="flex-column">
                    {gallery}
                </div>
            </div>*/
            //<img src={tile.filepath} key={idx} style={styles.img}/>
            <div className={classes.root}>
              <Grid container spacing={0}>
                <Grid item xs={12} >
                  <Grid container justify={'space-between'}>
                    <Grid item style={{ 'padding-top': 18 }}>
                      <Typography type="button">
                        About {this.state.totalResults} results
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button className={classes.btn} style={{ outline: 'none' }} onClick={this.handleExpandClick}>
                        <FilterList />
                        FILTER
                      </Button>
                    </Grid>
                  </Grid>
                  <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <Grid container spacing={40}>
                      <Grid item xs={6}>
                        <Typography type="button" gutterBottom>
                          WIDGET TYPE
                        </Typography>
                        <Divider light />
                        <FormControl component="fieldset">
                          <RadioGroup
                            name="widgetType"
                            aria-label="widgetType"
                            value={this.state.widgetType}
                            onChange={this.handleChange}
                            onClick={this.handleClick}
                          >
                            {widgetTypes}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography type="button" gutterBottom>
                          COLOURS
                        </Typography>
                        <Divider light />
                        <FormControl component="fieldset">
                          <RadioGroup
                            name="colourName"
                            aria-label="colourName"
                            value={this.state.colourName}
                            onChange={this.handleChange}
                            onClick={this.handleClick}
                          >
                            {colours}
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Collapse>
                </Grid>
                <Grid item xs={12}>
                  <Divider light />
                  <div className={classes.gridRoot}>
                    <GridList
                      cols={5}
                      cellHeight={150}
                      spacing={0}
                      className={classes.gridList}
                      style={{ margin: 0 }}
                    >
                      {this.state.data.map((tile, idx) => (
                        <GridListTile key={idx} style={{'backgroundImage': 'url('+tile.filepath.replace(/\\/g, "\\\\")+')', 'backgroundSize': 'contain', 'backgroundPosition': 'center', 'backgroundRepeat': 'no-repeat',}} />
                      ))}
                    </GridList>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Divider light />
                  <Pagination
                    total = { this.state.total }
                    current = { this.state.number }
                    display = { this.state.display }
                    onChange = { this.handlePageChange }
                  />
                </Grid>
              </Grid>
            </div>
        );
    }
}

//export default Palette;

Palette.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Palette);