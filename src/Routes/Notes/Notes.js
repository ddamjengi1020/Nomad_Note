/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GET_NOTES } from "../../queries";
import { Query } from "react-apollo";

const Container = styled.div``;
const Title = styled.span`
  display: inline-flex;
  font-size: 55px;
  font-weight: 700;
  margin-right: 20px;
  margin-bottom: 30px;
`;
const AddBtn = styled(Link)`
  font-size: 30px;
  font-weight: 700;
  color: #636e72;
  &:hover {
    color: black;
  }
`;

const SubTitle = styled.div`
  margin-left: 10px;
  font-size: 23px;
  color: #00000099;
`;

const Contents = styled.div`
  padding: 20px;
  padding-top: 50px;
  font-size: 25px;
  font-weight: 600;
`;

const Content = styled(Link)`
  display: block;
  width: 300px;
  padding: 20px;
  background-color: #f7d794;
  box-shadow: 5px 5px 8px #84817a;
  margin-bottom: 20px;
`;
export default class Notes extends React.Component {
  render() {
    return (
      <Container>
        <Title>Nomad Notes</Title>
        <AddBtn to={"/add"}>+</AddBtn>
        <SubTitle>Taking notes while we learn.</SubTitle>
        <Contents>
          <Query query={GET_NOTES}>
            {({ data }) =>
              data && data.notes
                ? data.notes.map((note) => (
                    <Content key={note.id} to={`/${note.id}`}>
                      {note.title}
                    </Content>
                  ))
                : null
            }
          </Query>
        </Contents>
      </Container>
    );
  }
}
