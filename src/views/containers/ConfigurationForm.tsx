import { View } from 'react-native';
import * as React from 'react';
import { Input, Button } from 'react-native-elements';
import { Auth } from '../../helpers/Auth';

const ConfigurationForm: React.FC = () => {
  const [value, setValue] = React.useState(Auth.getAccessToken());
  return (
    <View>
      <Input
        value={value}
        onChange={e => {
          setValue(e.type);
        }}
      />
      <Button title="apply" onPress={() => Auth.setAccessToken(value || '')} />
    </View>
  );
};

export default ConfigurationForm;
