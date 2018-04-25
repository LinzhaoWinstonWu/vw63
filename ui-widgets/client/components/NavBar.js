import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
//import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import FileUpload from 'material-ui-icons/FileUpload';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import path from 'path'
import TextField from 'material-ui/TextField';
import Input from 'material-ui/Input';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  input: {
    display: 'none',
  },
  btn: {
    'margin-left': 10,
  },
  form: {
    display: 'inline',
  },
};


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: false, folder: "..."};
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick() {   
        this.setState(prevState => ({
          isToggleOn: !prevState.isToggleOn
        }));
    }

    handleChange(files) {
      this.setState({folder: files[0].webkitRelativePath.split(path.sep)[0]});
    }

    render() {
        const { classes } = this.props;

        const Upload = (
          /*<ToolbarGroup>
            <IconButton onClick={this.handleClick}>
              <i className="material-icons">file_upload</i>
            </IconButton>
          </ToolbarGroup>*/
          <IconButton color="primary" onClick={this.handleClick} >
            <FileUpload />
          </IconButton>
        );

        const Uploading = (
          /*<ToolbarGroup>
            <IconButton onClick={this.handleClick}>
              <i className="material-icons">file_upload</i>
            </IconButton>
            <ToolbarSeparator />
            <TextField disabled={true} hintText={this.state.folder} style={{"margin-left": 24}} />
            <form method="post" action="/" enctype="multipart/form-data">
              <Button raised>
                  Browse
                  <input type="file" name="images" webkitdirectory="" directory="" style={{ display: "none"}} onChange={ (e) => this.handleChange(e.target.files)} />
              </Button>
            </form>
          </ToolbarGroup>*/
          <div>
            <IconButton color="primary" onClick={this.handleClick} >
              <FileUpload />
            </IconButton>
            <Input
              value={this.state.folder}
              disabled
            />
            <form className={classes.form} method="post" action="/" enctype="multipart/form-data">
              <input className={classes.input} id="icon-button-file" type="file" name="images" webkitdirectory="" directory="" onChange={ (e) => this.handleChange(e.target.files)} />
              <label htmlFor="icon-button-file">
                <Button raised className={classes.btn} component="span">
                  Browse
                </Button>
              </label>
              <Button raised className={classes.btn} type="submit" color="primary">
                Upload
              </Button>
            </form>
          </div>
        );
        return(
            /*
            <RaisedButton containerElement="label" label="Browse" style={style}>
                <input type="file" name="images" webkitdirectory="" directory="" style={{ display: "none"}} onChange={ (e) => this.handleChange(e.target.files)} />
              </RaisedButton>
              <RaisedButton type="submit" primary={true} label="Upload" style={style} /> 
            */
            /*
            <Toolbar>
              <ToolbarGroup>
                <ToolbarTitle text="UIpalette" />
              </ToolbarGroup>
              {this.state.isToggleOn ? Uploading : Upload}
            </Toolbar>
            */
            <div className={classes.root}>
              <AppBar position="static" color="default">
                <Toolbar>
                  <Typography type="title" color="primary" className={classes.flex} >
                    UIpalette
                  </Typography>
                  {this.state.isToggleOn ? Uploading : Upload}
                </Toolbar>
              </AppBar>
            </div>
        );
    }
}

//export default NavBar;

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);