import React from "react";
import { Mutation } from "react-apollo";
import Editor from "../../Components/Editor";
import { ADD_NOTE } from "../../queries";

export default class Add extends React.Component {
  render() {
    return (
      <Mutation mutation={ADD_NOTE}>
        {(createNote) => {
          this.createNote = createNote;
          return <Editor onSave={this._onSave} />;
        }}
      </Mutation>
    );
  }
  _onSave = (title, content) => {
    const {
      history: { push },
    } = this.props;
    if (title !== "" && content !== "") {
      this.createNote({ variables: { title, content } });
      push("/");
    }
  };
}
