import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import styled from "styled-components";
import { GET_NOTE } from "../../queries";

const TitleComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: 50px;
  margin: 0;
  padding: 0;
`;

const Button = styled.button``;

const Content = styled.div``;

export default class Note extends React.Component {
  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    return (
      <Query query={GET_NOTE} variables={{ id: Number(id) }}>
        {({ data }) =>
          data && data.note ? (
            <>
              <TitleComponent>
                <Title>{data.note && data.note.title}</Title>
                <Link to={`/${data.note.id}/edit`}>
                  <Button>Edit</Button>
                </Link>
              </TitleComponent>
              <Content>{data.note.content}</Content>
            </>
          ) : null
        }
      </Query>
    );
  }
}