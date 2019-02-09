import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { default as SearchIcon } from '@material-ui/icons/Search';
import * as React from 'react';

interface Props {
  onSubmit: (query: string) => void;
}

const QueryForm: React.FC<Props> = props => {
  const [value, setValue] = React.useState('');
  return (
    <form noValidate={true} autoComplete="off">
      <TextField
        label="Query"
        value={value}
        onChange={e => setValue(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <IconButton onClick={() => props.onSubmit(value)}>
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default QueryForm;
