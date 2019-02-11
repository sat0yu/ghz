import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { default as SettingsIcon } from '@material-ui/icons/Settings';
import * as React from 'react';
import { Auth } from '../../helpers/Auth';

const ConfigurationForm: React.FC = () => {
  const [value, setValue] = React.useState(Auth.getAccessToken());
  return (
    <form noValidate={true} autoComplete="off">
      <TextField
        label="Access Token"
        value={value}
        onChange={e => setValue(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <IconButton onClick={() => Auth.setAccessToken(value || '')}>
        <SettingsIcon />
      </IconButton>
    </form>
  );
};

export default ConfigurationForm;
