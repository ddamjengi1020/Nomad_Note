import { NOTE_FRAGMENT } from "./fragments";
import { GET_NOTE } from "./queries";

export const defaults = {
  notes: [
    {
      __typename: "Note",
      id: 1,
      title: "first",
      content: "second",
    },
  ],
};
export const typeDefs = [
  `
    schema {
        query: Query
        mutation: Mutation
    }
    type Query {
        notes: [Note]!
        note(id: Int!): Note!
    }
    type Mutation {
        createNote(title: String!, content: String!)
        editNote(id: Int!, title: String!, content: String!)
    }
    type Note {
        id: Int!
        title: String!
        content: String!
    }
`,
];
export const resolvers = {
  // Query notes는 defaults에서 작성해쥼
  Query: {
    note: (_, { _id }, { cache }) => {
      const id = cache.config.dataIdFromObject({
        __typename: "Note",
        id: _id,
      });
      const note = cache.readFragment({
        fragment: NOTE_FRAGMENT,
        id,
      });
      return note;
    },
  },
  Mutation: {
    createNote: (_, { title, content }, { cache }) => {
      const { notes } = cache.readQuery({ query: GET_NOTE });
      const newNote = {
        __typename: "Note",
        id: notes.length + 1,
        title,
        content,
      };
      cache.writeData({
        data: {
          notes: [newNote, ...notes],
        },
      });
      return newNote;
    },
    editNote: (_, { id, title, content }, { cache }) => {
      const noteId = cache.config.dataIdFromObject({
        __typename: "Note",
        id,
      });
      const note = cache.readFragment({
        fragment: NOTE_FRAGMENT,
        id: noteId,
      });
      const updateFragment = {
        ...note,
        title,
        content,
      };
      cache.writeFragment({
        id: noteId,
        fragment: NOTE_FRAGMENT,
        data: updateFragment,
      });
      return updateFragment;
    },
  },
};
