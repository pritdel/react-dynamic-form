import React, { useState } from "react";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete, Box, Checkbox, Divider, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, Paper, Radio, RadioGroup, styled } from "@mui/material";
import { countries } from "./data/country";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import FileUpload from "react-mui-fileuploader";

const useStyles = makeStyles((theme: any) => ({
  root: {
    "& .MuiGrid-root": {
      padding: '0px 15px 0px 15px'
    },
    "& .MuiFormControl-root": {
      width: '100%'
    },
    "& .MuiAutocomplete-root": {
      width: '100%'
    },
    "& .add-remove-block": {
      paddingTop: '15px',
      paddingBottom: '15px'
    },
    ".main-heading": {
      paddingBottom: '20px'
    },
    "& .radio-label": {
      textAlign:"left"
    }
  },
  button: {
    margin: '0.25rem'
  }
}));

const DynamicForm = () => {
  const classes = useStyles();

  const [inputFields, setInputFields] = useState([
    { name: "", country: "", termsCondition: false, occupation: "", gender: "", pregnant: "", dateFormat: "", dob: "", help: "", file: "" }
  ]);

  const handleChangeInput = (index: number, event:any, value?: any) => {
    const values: any = [...inputFields];
    if ((event.target as HTMLInputElement)?.name === 'termsCondition') {
      values[index][(event.target as HTMLInputElement).name] = (event.target as HTMLInputElement).checked;
    } else {
      if (value) {
        if (event.target.id && event.target.id.includes('country-select')) {
          values[index]['country'] = value.code
        }
      } else {
        if (Array.isArray(event) && event.length) {
          values[index]['file'] = event;
        } else if (event.$d) {
          values[index]['dob'] = event.$d;
        }
        else {
          values[index][(event.target as HTMLInputElement)?.name] = (event.target as HTMLInputElement)?.value;
        }
      }
    }
    setInputFields(values);
  };

  const handleSubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    console.log(inputFields);
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { name: "", country: "", termsCondition: false, occupation: "", gender: "", pregnant: "", dateFormat: "", dob: "", help: "", file: "" }]);
  };

  const handleRemoveFields = (index: number) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
  }));

  return (
    <div className="App">
      <h1 className="main-heading">Dynamic Form In React</h1>
      <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {inputFields.map((inputField, index) => (
            <>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
              <Divider />
              <h2> Section 1</h2>
            </Grid>
            <Grid xs={6} sm={6} md={5} lg={5} xl={5}>
                <TextField
                name="name"
                label="Name"
                variant="standard"
                value={inputField.name}
                onChange={(event) => handleChangeInput(index, event)}
                />
              
            </Grid>
            <Grid xs={6} sm={6} md={4} lg={4} xl={4}>
            <Autocomplete
              id="country-select"
              sx={{ width: 300 }}
              options={countries}
              autoHighlight
              getOptionLabel={(option) => option.label}
              onChange={(event, value) => handleChangeInput(index, event, value)}
              renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
                  />
                  {option.label} ({option.code})
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Choose a country"
                  name="country"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
    />
            </Grid>
            <Grid xs={6} sm={6} md={3} lg={3} xl={3}>
            <FormControlLabel
              control={
                <Checkbox
                name="termsCondition"
                checked={inputField.termsCondition} 
                onChange={(event) => handleChangeInput(index, event)}  />
              }
              label="Terms & Condition"
            />
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
              <h2> Section 2</h2>
            </Grid>
            <Grid xs={12} sm={6} md={2} lg={2} xl={2}>
              <TextField
                  name="occupation"
                  label="Occupation"
                  variant="standard"
                  value={inputField.occupation}
                  onChange={(event) => handleChangeInput(index, event)}
                  />
            </Grid>

            <Grid xs={12} sm={6} md={3} lg={3} xl={3}>
                <FormControl>
                <FormLabel className="radio-label">Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(event) => handleChangeInput(index, event)}
                >
                  <FormControlLabel name="gender" value="female" control={<Radio />} label="Female" />
                  <FormControlLabel name="gender" value="male" control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {inputField.gender === 'female' && <Grid xs={12} sm={6} md={2} lg={2} xl={2}>
                <FormControl>
                <FormLabel className="radio-label">Are You Pregnant</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(event) => handleChangeInput(index, event)}
                >
                  <FormControlLabel name="pregnant" value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel name="pregnant" value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid> }

            <Grid xs={12} sm={6} md={2} lg={2} xl={2}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Date Format</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="dateFormat"
                  label="Date Format"
                  value={inputField.dateFormat}
                  onChange={(event) => handleChangeInput(index, event)}
                  variant="standard"
                >
                <MenuItem value='YYYY'>YYYY</MenuItem>
                <MenuItem value='MM/YYYY'>MM/YYYY</MenuItem>
                <MenuItem value='MM/DD/YYYY'>MM/DD/YYYY</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {inputField.dateFormat && <Grid xs={12} sm={6} md={3} lg={3} xl={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="Date of Birth"
                 onChange={(event) => handleChangeInput(index, event)}
                 views={inputField.dateFormat === 'YYYY' ? ["year"]: inputField.dateFormat === 'MM/YYYY' ? ['month', 'year'] : ['year', 'month', 'day']}
                 slotProps={{
                  textField: {
                    name: 'dob',
                    helperText: inputField.dateFormat
                  },
                  actionBar: {
                    actions: ['clear'],
                  },
                }}/>
              </DemoContainer>
            </LocalizationProvider>
            </Grid> }
          
            <Grid xs={12} sm={12} md={12} lg={12} xl={12}>
              <h2> Section 3 </h2>
            </Grid>
            <Grid xs={12} sm={6} md={6} lg={6} xl={6}>
              <TextField
                  multiline
                  rows={2}
                  name="help"
                  label="Please Provide Your Help"
                  variant="standard"
                  value={inputField.help}
                  onChange={(event) => handleChangeInput(index, event)}
                />
            </Grid>

            <Grid xs={12} sm={6} md={6} lg={6} xl={6}>
            <>
            <FileUpload
              multiFile={true}
              title="Please upload your document"
              imageSrc=""
              onFilesChange={(event) => handleChangeInput(index, event)}
              onContextReady={(context) => {}}
            />
            {/* <button onClick={uploadFiles}>Upload</button> */}
          </>
            </Grid>

            <Grid xs={12} sm={12} md={12} lg={12} xl={12} className="add-remove-block">
              <IconButton onClick={() => handleRemoveFields(index)}>
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={() => handleAddFields()}>
                  <AddIcon />
                </IconButton>
            </Grid>
           
            </>
            
          ))}
          
        </Grid>

        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Send
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default DynamicForm;
