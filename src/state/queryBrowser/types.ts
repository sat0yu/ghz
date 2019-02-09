import { actionCreatorFactory } from 'typescript-fsa';

const enum actions {
  POST_QUERY = 'POST_QUERY',
}

const actionCreator = actionCreatorFactory();

interface PostQueryParams {
  query: string;
}
interface PostQueryPayload {
  query: string;
}

const postQuery = actionCreator.async<PostQueryParams, PostQueryPayload, Error>(
  actions.POST_QUERY,
);

export default {
  postQuery,
};
