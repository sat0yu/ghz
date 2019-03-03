import { View } from 'react-native';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { queryBrowserOperations } from '../../state/queryBrowser';
import { Input, Button } from 'react-native-elements';

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = DispatchProps;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      searchRequest: queryBrowserOperations.searchRequest,
    },
    dispatch,
  );

interface State {
  value: string;
}

class QueryForm extends React.Component<Props, State> {
  private static defaultQuery = 'is:issue is:open';

  public constructor(props: Props) {
    super(props);
    this.state = { value: QueryForm.defaultQuery };
    this.handleClickSearchButton = this.handleClickSearchButton.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  public render() {
    return (
      <View>
        <Input
          placeholder={QueryForm.defaultQuery}
          value={this.state.value}
          onChangeText={this.handleOnChange}
        />
        <Button title="search" onPress={this.handleClickSearchButton} />
      </View>
    );
  }

  private handleOnChange(value: string) {
    this.setState({ value });
  }

  private handleClickSearchButton() {
    this.props.searchRequest({ query: this.state.value });
  }
}

export default connect(
  undefined,
  mapDispatchToProps,
)(QueryForm);
