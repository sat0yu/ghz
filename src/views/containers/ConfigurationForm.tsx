import { TextInput } from 'react-native';
import * as React from 'react';
import { Button } from 'react-native-elements';
import { Auth } from '../../helpers/Auth';

const ConfigurationForm: React.FC = () => {
  const [value, setValue] = React.useState(Auth.getAccessToken());
  return (
    <form noValidate={true} autoComplete="off">
      <TextInput
        value={value}
        onChange={e => {
          setValue(e.type);
        }}
      />
      <Button title="apply" onPress={() => Auth.setAccessToken(value || '')} />
    </form>
  );
};

export default ConfigurationForm;
