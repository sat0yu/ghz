import * as React from 'react';
import { View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Auth } from '../../helpers/Auth';

const ConfigurationForm: React.FC = () => {
  const [value, setValue] = React.useState(Auth.getAccessToken() || '');
  return (
    <View>
      <Input value={value} onChangeText={setValue} />
      <Button title="apply" onPress={() => Auth.setAccessToken(value)} />
    </View>
  );
};

export default ConfigurationForm;
