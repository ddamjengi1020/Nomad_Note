import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";

const TitleInput = styled(TextareaAutosize)`
  font-size: 50px;
  font-weight: 600;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  &::placeholder {
    font-weight: 600;
  }
`;

const ContentPreview = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
`;

const ContentInput = styled(TextareaAutosize)`
  font-size: 18px;
  margin-top: 15px;
  background-color: transparent;
  border: none;
  outline: none;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;

const Button = styled.button`
  display: block;
  border: 3px solid black;
  background-color: transparent;
  padding: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s linear;
  outline: none;
  &:hover {
    background-color: black;
    color: white;
  }
  &:active {
    opacity: 0.6;
  }
`;

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title || "",
      content: props.content || "",
      id: props.id || null,
    };
  }

  render() {
    const { title, content } = this.state;
    return (
      <>
        <TitleContainer>
          <TitleInput
            value={title}
            onChange={this._onInputChange}
            placeholder={"Untitled..."}
            name={"title"}
            autoFocus={true}
          />
          <Button onClick={this._onSave}>Save</Button>
        </TitleContainer>
        <ContentPreview>
          <ContentInput
            value={content}
            onChange={this._onInputChange}
            placeholder={"# This supports markdown!"}
            name={"content"}
          />
        </ContentPreview>
      </>
    );
  }
  _onInputChange = (event) => {
    const {
      target: { value, name },
    } = event;
    this.setState({
      [name]: value,
    });
  };

  _onSave = () => {
    const { onSave } = this.props;
    const { title, content, id } = this.state;
    onSave(title, content, id);
  };
}
