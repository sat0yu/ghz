import {
  TextInput,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { queryBrowserOperations } from '../../state/queryBrowser';

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
      <form noValidate={true} autoComplete="off">
        <TextInput
          placeholder={QueryForm.defaultQuery}
          value={this.state.value}
          onChange={this.handleOnChange}
        />
        <Button title="search" onPress={this.handleClickSearchButton} />
      </form>
    );
  }

  private handleOnChange(
    event: NativeSyntheticEvent<TextInputChangeEventData>,
  ) {
    event.preventDefault();
    this.setState({ value: event.target.toString() });
  }
  private handleClickSearchButton() {
    this.props.searchRequest({ query: this.state.value });
  }
}

export default connect(
  undefined,
  mapDispatchToProps,
)(QueryForm);
