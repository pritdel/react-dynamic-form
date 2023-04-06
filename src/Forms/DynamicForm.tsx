import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import { User } from "./models/User";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
    }
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const DynamicForm = () => {
  const classes = useStyles();

  const [inputFields, setInputFields] = useState([
    { firstName: "", lastName: "" }
  ]);

  const handleChangeInput = (index: number, event:React.SyntheticEvent) => {
    const values: any = [...inputFields];
    values[index][(event.target as HTMLInputElement).name] = (event.target as HTMLInputElement).value;
    console.log((event.target as HTMLInputElement).name);
    if ((event.target as HTMLInputElement).name === 'firstName') {
        values[index]['lastName'] = (event.target as HTMLInputElement).value
    }
    setInputFields(values);
  };

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    console.log(inputFields);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { firstName: "", lastName: "" }]);
  };

  const handleRemoveFields = (index: number) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <div className="App">
      <h1>Dynamic Form In React</h1>
      <Container className="Container">
        <form onSubmit={handleSubmit} className={classes.root}>
          {inputFields.map((inputField, index) => (
            <div key={index}>
              <TextField
                name="firstName"
                label="First Name"
                variant="filled"
                value={inputField.firstName}
                onChange={(event) => handleChangeInput(index, event)}
              />
              <TextField
                name="lastName"
                label="Last Name"
                variant="filled"
                value={inputField.lastName}
                onChange={(event) => handleChangeInput(index, event)}
              />
              <IconButton onClick={() => handleRemoveFields(index)}>
                <RemoveIcon />
              </IconButton>
              <IconButton onClick={() => handleAddFields()}>
                <AddIcon />
              </IconButton>
            </div>
          ))}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<Icon>send</Icon>}
            onClick={handleSubmit}
          >
            Send
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default DynamicForm;
