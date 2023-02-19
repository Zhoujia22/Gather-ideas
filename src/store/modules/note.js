import { Message } from "element-ui";
import { notes } from "../../api/notes";
const state = {
  notes: null,
  curNoteId: null,
};

const getters = {
  notes: (state) => state.notes,
  curNote: (state) => {
    if (!Array.isArray(state.notes)) return {};
    if (!state.curNoteId) return state.notes[0] || {};
    return (
      state.notes.find((note) => note.id.toString() === state.curNoteId) || {}
    );
  },
};

const mutations = {
  setNote(state, payload) {
    state.notes = payload.notes;
  },
  addNote(state, payload) {
    state.notes.unshift(payload.note);
  },
  updateNote(state, payload) {
    let note = state.notes.find((note) => note.id === payload.noteId) || {};
    note.title = payload.title;
    note.content = payload.content;
  },
  deleteNote(state, payload) {
    state.notes = state.notes.filter((note) => note.id !== payload.noteId);
  },
  setCurNote(state, payload = {}) {
    state.curNoteId = payload.curNoteId;
  },
};

const actions = {
  getNote({ commit }, { notebookId }) {
    return notes.getAll({ notebookId }).then((res) => {
      commit("setNote", { notes: res.data });
    });
  },
  addNote({ commit }, { notebookId, title, content }) {
    return notes
      .addNote({ notebookId: notebookId }, { title, content })
      .then((res) => {
        commit("addNote", { note: res.data });
      });
  },
  updateNote({ commit }, { noteId, title, content }) {
    return notes
      .updateNote({ noteId: noteId }, { title, content })
      .then((res) => {
        commit("updateNote", { noteId, title, content });
      });
  },
  deleteNote({ commit }, { noteId }) {
    return notes.deleteNote({ noteId }).then((res) => {
      commit("deleteNote", { noteId });
      Message.success(res.msg);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
