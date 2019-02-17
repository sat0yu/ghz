import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { default as SearchIcon } from '@material-ui/icons/Search';
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
        <TextField
          placeholder={QueryForm.defaultQuery}
          label="Query"
          value={this.state.value}
          onChange={this.handleOnChange}
          margin="normal"
          variant="outlined"
        />
        <IconButton onClick={this.handleClickSearchButton}>
          <SearchIcon />
        </IconButton>
      </form>
    );
  }

  private handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    this.setState({ value: event.target.value });
  }
  private handleClickSearchButton() {
    this.props.searchRequest({ query: this.state.value });
  }
}

export default connect(
  undefined,
  mapDispatchToProps,
)(QueryForm);
