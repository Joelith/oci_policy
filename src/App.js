import React, {Fragment, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Autocomplete as MuiAutocomplete} from '@material-ui/lab';
import data from './data.js';
import styled from 'styled-components';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { StylesProvider } from '@material-ui/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import {
  Grid,
  TextField,
  Select, 
  MenuItem,
  FormControl as MuiFormControl,
  InputLabel,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Paper,
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails as MuiExpansionPanelDetails
} from '@material-ui/core';

console.log('data', data);
const Root = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled(Paper)`
  flex: 1;
  padding: 0;
  padding-top: 20px;
  padding-bottom: 150px;
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    flex: none;
  }

  .MuiPaper-root .MuiPaper-root {
    box-shadow: none;
  }

`;

const AppContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PolicySyntax = styled.div`
  font-family: "Lucida Console", Monaco, monospace;
  display: inline;
`;

const AlignedGrid = styled(Grid)`
  vertical-align: middle;
  line-height: 4.1876em;
`;

const SpacedSpan = styled.span`
  padding-right: 10px;
  padding-left: 10px;
`;

const FormControl = styled(MuiFormControl)`
  min-width: 150px;
`;

const Autocomplete = styled(MuiAutocomplete)`
  display: inline-flex;
  padding-left: 10px;
  position: relative;
`;
const OutputFooter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid;
  padding: 10px;
  background-color: white;
`;
const ExpansionPanelDetails = styled(MuiExpansionPanelDetails)`
  width: 750px;
`;

const PermissionWrapper = styled.div`
  width: 900px;
`;
function ApiLink (props) {
  const { title, url, note} = props.api;
  return (
    <li>
      <a href={url}>{title}</a> {note && ` - ${note}`}
    </li>
  );
}

const generalVariables = [{
  value: 'request.user.id',
  title: 'OCID of the requesting user',
  type: 'Common'
}, {
  value: 'request.user.mfaTotpVerified',
  title: 'Whether the user has been verified by Multi-Factor Authentication',
  type: 'Common'
},{
  value: 'request.groups.id',
  title: 'OCID of the group the user is in',
  type: 'Common'
},{
  value: 'request.permission',
  title: 'The underlying permission',
  type: 'Common'
},{
  value: 'request.operation',
  title: 'The API operation being requested',
  type: 'Common'
},{
  value: 'request.networkSource.name',
  title: 'The name of the network source group',
  type: 'Common'
},{
  value: 'request.region',
  title: 'The 3-letter key for the region',
  type: 'Common'
},{
  value: 'request.ad',
  title: 'The Availability Domain of the request',
  type: 'Common'
},{
  value: 'request.principal.compartment.tag',
  title: 'Compare against compartment tag',
  type: 'Common'
},{
  value: 'request.principal.group.tag',
  title: 'Tags applied to user group',
  type: 'Common'
},{
  value: 'target.compartment.name',
  title: 'The name of the compartment containing the primary resource',
  type: 'Common'
},{
  value: 'target.compartment.id',
  title: 'The OCID of the compartment containing the primary resource',
  type: 'Common'
},{
  value: 'target.compartment.tag',
  title: 'The tag applied to the target compartment',
  type: 'Common'
},{
  value: 'request.request.tag',
  title: 'The tag applied to the tag resource of the request being evaluated',
  type: 'Common'
}]

function PermissionExplanation (props) {
  const { group, verb, resourceType, permissions} = props;

  if (!verb) return null;

  if (!resourceType || !permissions || !permissions[verb] || (permissions[verb].apis.length == 0 && permissions[verb].permissions.length == 0)) {

    let verb_description = '';
    if (!group) verb_description = 'This allows users in a group to ';
    else verb_description = `This allows users in the ${group} group to `;
    switch (verb) {
      case 'inspect':
        verb_description += 'list resources, without access to any confidential information or user-specified metadata that may be part of that resource';
        break;
      case 'read': 
        verb_description += 'list resources, but with the ability to get user-specified metadata and the actual resource itself';
        break;
      case 'use':
        verb_description += 'list and work with resources (it varies). Generally this does not include the ability to create or delete resources';
        break;
      case 'manage':
        verb_description += 'list and perform any action on resources';
        break;
    }
    return (
      <Fragment>
        <Typography variant="h6">Permission Description</Typography>
        <p>{verb_description}</p>
      </Fragment>
    );
  }

  if (permissions[verb]) {
    return (
      <div>
        <Typography variant="h6">Permission Description</Typography>
        <p>This gives the following permissions {group ? `to users in the ${group} group` : null}: {permissions[verb].permissions.join(', ')}
      &nbsp;and access to the following APIs: </p>
        <ul>
          { permissions[verb].apis.map((api, index) => <ApiLink key={index} api={api}/>)}
        </ul>
        { permissions[verb].partial_apis && permissions[verb].partial_apis.length > 0 &&
        <div>
          <p>As well as partial access to the following APIs</p>
          <ul>
            { permissions[verb].partial_apis.map((api, index) => <ApiLink key={index} api={api}/>)}
          </ul>
        </div>
        }
      </div>
    )
  }

  return null;
}

function getWhereSyntax (conditions, conditionGrouping) {
  if (conditions.length > 1 && !conditionGrouping) return '';
  let where_syntax = ' where ';
  if (conditions.length > 1) where_syntax += conditionGrouping + ' ';
  let fail = false;
  conditions.map((condition, index) => {
    console.log('condition', condition);
    if (condition != '') where_syntax += condition;
    else fail = true;
    if (index !== conditions.length - 1) where_syntax += ', ';
  })
  return fail ? '' : where_syntax;
}
function PolicyOutput (props) {
  const { group, subject, verb, resourceType, permissions, location, locationType, conditions, conditionGrouping} = props;

  if (subject && verb && resourceType && locationType) {
    let syntax = `Allow ${subject} ${group} to ${verb} ${resourceType}`;
    if (locationType) syntax += ` in ${locationType} ${location}`;
    if (conditions && conditions.length > 0 && conditions[0] != '') {
      syntax += getWhereSyntax(conditions, conditionGrouping);
    }
    return (
      <OutputFooter>
        <Typography variant="h6">Policy Output</Typography>
        <PolicySyntax>{syntax}</PolicySyntax>
        <CopyToClipboard text={syntax}>
          <IconButton aria-label="Copy to clipboard">
            <FileCopyIcon />
          </IconButton>
        </CopyToClipboard>
      </OutputFooter>
    );
  } else {
    return null;
  }
}

function Clause (props) {
  const { condition, conditions, setConditions, index, variableOptions} = props;
  const [variable, setVariable] = React.useState('');
  const variableChange = (event, item) => {
    setVariable(item.value);
  }
  const [equality, setEquality] = React.useState('');
  const equalityChange = (event) => {
    setEquality(event.target.value);
  }
  const [value, setValue] = React.useState('');
  const valueChange = (event) => {
    setValue(event.target.value);
  }

  useEffect(() => {
    if (variable && equality && value) {
      //setCondition();
      let values = [...conditions];
      values[index] =`${variable} ${equality} ${value}`;
      setConditions(values);
    }
  }, [variable, equality, value]);

  const addCondition = () => {
    let values = [...conditions];
    values.push('');
    setConditions(values);
  }
  return (
    <Grid item xs={12}>
      <Autocomplete
        id="variable"
        options={variableOptions}
        groupBy={(option) => option.type}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        onChange={variableChange}
        renderInput={(params) => <TextField {...params} label="Variable"/>}
      />
      <FormControl>
        <InputLabel id="variable-label">Equality</InputLabel>
        <Select
          labelId="equality-label"
          id="equality"
          onChange={equalityChange}
          value={equality}
        >
          <MenuItem value="=">Equals</MenuItem>
          <MenuItem value="!=">Does not equal</MenuItem>
        </Select>
      </FormControl>
      <TextField id="value" label="Value" onChange={valueChange}/>
      {index !== 0 && <IconButton aria-label="Delete">
        <RemoveCircleIcon />
      </IconButton>}
      <IconButton aria-label="Add" onClick={addCondition}>
        <AddCircleIcon/>
      </IconButton>
    </Grid>
  )
}

function WhereManage (props) {
  const { conditions, setConditions, conditionGrouping, setConditionGrouping, variableOptions } = props;

  const conditionGroupingChange = (event) => {
    setConditionGrouping(event.target.value);
  };
  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="where-content"
        id="where-header"
      >
        <Typography>Where</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2">Note: Not all variables will work with all resource-types. Check the documentation if in doubt</Typography>
          </Grid>
          { conditions.length > 1 && 
            <Grid item xs={12}>
              <FormControl>
                <InputLabel id="conditionGrouping-label">Condition Grouping</InputLabel>
                <Select
                  labelId="conditionGrouping-label"
                  id="conditionGrouping"
                  onChange={conditionGroupingChange}
                  value={conditionGrouping}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="any">Any</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          }
          { conditions.map((condition, index) => <Clause key={index} index={index} condition={condition} conditions={conditions} setConditions={setConditions} variableOptions={variableOptions}/> )}
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

function App() {
  const [group, setGroup] = React.useState('');
  const groupChange = (event) => {
    setGroup(event.target.value);
  };
  const [subject, setSubject] = React.useState('');
  const subjectChange = (event) => {
    if (event.target.value == 'any-user') setGroup('');
    setSubject(event.target.value);
  }
  
  const [verb, setVerb] = React.useState('');
  const verbChange = (event) => {
    setVerb(event.target.value);
  };
  const [location, setLocation] = React.useState('');
  const locationChange = (event) => {
    setLocation(event.target.value);
  };
  const [locationType, setLocationType] = React.useState('');
  const locationTypeChange = (event) => {
    if (event.target.value == 'tenancy') setLocation('');
    setLocationType(event.target.value);
  }

  const [resourceType, setResourceType] = React.useState('');
  const [permissions, setPermissions] = React.useState('');
  const resourceTypeChange = (event, value) => {
    if (!value || !value.title) {
      setResourceType();
      setPermissions();
      setVariableOptions(generalVariables);
    } else {
      //setResourceType(event.target.value);
      setResourceType(value.title);

      /*if (value.title === value.type) {
        // A family resource
        const family = resourceTypeOptions.filter((item) => {
          if (item.type == value.type && item.type != item.title) return item;
        }) 
        let _perms = [];
        let _variables = [];
        family.map((type) => {
          if (type.permissions) _perms = _perms.concat(type.permissions);
          if (type.variables) _variables = _variables.concat(type.variables);
        })
        console.log('family', family, _perms, _variables);
      }*/
      setPermissions(value.permissions);
      setVariableOptions((value.variables || []).concat(generalVariables));
    }
  };

  const [conditions, setConditions] = React.useState(['']);
  const [conditionGrouping, setConditionGrouping] = React.useState('');

  const [variableOptions, setVariableOptions] = React.useState(generalVariables);

  return (
    <Root>
      <StylesProvider injectFirst>
        <AppContent>
          <AppBar position="static" elavation={0}>
            <Toolbar>
              <Grid container alignItems="center" spacing={6}>
                <Grid item xs>
                  <Typography variant="h6">
                    Unofficial OCI Policy Editor
                  </Typography>
                </Grid>
                <Grid item xs/>
                <Grid item>
                  <Button href="https://github.com/Joelith/oci_policy" target="_blank" color="inherit">Source</Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <MainContent>
            <Grid container spacing={2}>
             <Grid item xs={12}>
                <Grid container justify="center" spacing={5}>
                  <AlignedGrid item>
                    <Typography variant="overline" display="block" gutterBottom>
                      Note: This site is not affiliated with Oracle Corporation. It is provided as-is and there is no guarantee that it remains accurate with the OCI API
                    </Typography>
                  </AlignedGrid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={5}>
                  <AlignedGrid item>
                    <SpacedSpan>Allow</SpacedSpan>
                    <FormControl>
                      <InputLabel id="subject-label">Subject</InputLabel>
                      <Select
                        labelId="subject-label"
                        id="subject"
                        onChange={subjectChange}
                        value={subject}
                      >
                        <MenuItem value="group">Group</MenuItem>
                        <MenuItem value="group id">Group ID</MenuItem>
                        <MenuItem value="dynamic-group">Dynamic Group</MenuItem>
                        <MenuItem value="dynamic-group id">Dynamic Group ID</MenuItem>
                        <MenuItem value="any-user">Any User</MenuItem>
                      </Select>
                    </FormControl>
                    { subject && subject != 'any-user' && 
                    <TextField id="group_name" label="Group Name" onChange={groupChange} helperText="Use commas to seperate group names/ids"
/>
                    }
                    <SpacedSpan>to</SpacedSpan>
                    <FormControl>
                      <InputLabel id="verb-label">Verb</InputLabel>
                      <Select
                        labelId="verb-label"
                        id="verb"
                        onChange={verbChange}
                        value={verb}
                      >
                        <MenuItem value="inspect">Inspect</MenuItem>
                        <MenuItem value="read">Read</MenuItem>
                        <MenuItem value="use">Use</MenuItem>
                        <MenuItem value="manage">Manage</MenuItem>
                      </Select>
                    </FormControl>
                  </AlignedGrid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={5}>
                  <AlignedGrid item>
                     <Autocomplete
                        id="grouped-demo"
                        options={data}
                        groupBy={(option) => option.type}
                        getOptionLabel={(option) => option.title}
                        style={{ width: 300 }}
                        onChange={resourceTypeChange}
                        renderInput={(params) => <TextField {...params} label="Resource Types"/>}
                      />
                      <SpacedSpan>in</SpacedSpan>

                      <FormControl>
                        <InputLabel id="locationType-label">Location</InputLabel>
                        <Select
                          labelId="locationType-label"
                          id="locationType"
                          onChange={locationTypeChange}
                          value={locationType}
                        >
                          <MenuItem value="tenancy">Tenancy</MenuItem>
                          <MenuItem value="compartment">Compartment</MenuItem>
                          <MenuItem value="compartment id">Compartment ID</MenuItem>
                        </Select>
                      </FormControl>
                      { locationType && locationType != 'tenancy' && 
                      <TextField id="location" label="Location Detail" onChange={locationChange} helperText="Use commas to seperate compartment names/ids"
  />
                      }
                  </AlignedGrid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={5}>
                  <AlignedGrid item>
                    <WhereManage conditions={conditions} setConditions={setConditions} conditionGrouping={conditionGrouping} setConditionGrouping={setConditionGrouping} variableOptions={variableOptions}/>
                  </AlignedGrid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={5}>
                  <Grid item>
                    <PermissionWrapper>
                      <PermissionExplanation verb={verb} group={group} resourceType={resourceType} permissions={permissions}/>
                    </PermissionWrapper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container item xs={12} justify="center">
              </Grid>
            </Grid>
          </MainContent>
          <PolicyOutput verb={verb} subject={subject} group={group} resourceType={resourceType} permissions={permissions} locationType={locationType} location={location} conditions={conditions} conditionGrouping={conditionGrouping}/>
        </AppContent>
      </StylesProvider>
    </Root>
  );
}

export default App;
