/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GET_NOTES, DEL_NOTE } from "../../queries";
import { Query, Mutation } from "react-apollo";

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

const ContentContainer = styled.div`
  position: relative;
  width: fit-content;
  box-shadow: 5px 5px 8px #84817a;
  margin-bottom: 20px;
  background-color: #f7d794;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 6px 8px 12px #84817a;
  }
  &:active {
    transform: translateY(-2px);
    box-shadow: 5px 5px 8px #84817a;
    opacity: 0.9;
  }
`;

const Content = styled(Link)`
  padding: 20px;
  display: block;
  width: 300px;
`;

const Button = styled.button`
  height: fit-content;
  position: absolute;
  right: 15px;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s linear;
  font-size: 17px;
  &:hover {
    color: #e84118;
  }
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
                    <ContentContainer key={note.id}>
                      <Content to={`/${note.id}`}>{note.title}</Content>
                      <Mutation mutation={DEL_NOTE}>
                        {(delNote) => {
                          this.delNote = delNote;
                          return (
                            <Button onClick={() => this.onDelete(note.id)}>
                              <i className="fas fa-trash-alt"></i>
                            </Button>
                          );
                        }}
                      </Mutation>
                    </ContentContainer>
                  ))
                : null
            }
          </Query>
        </Contents>
      </Container>
    );
  }
  onDelete = (id) => {
    if (id) {
      this.delNote({ variables: { id } });
    }
  };
}
