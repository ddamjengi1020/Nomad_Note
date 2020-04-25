import gql from "graphql-tag";

export const GET_NOTE = gql`
  {
    notes @client {
      id
      title
      content
    }
  }
`;
