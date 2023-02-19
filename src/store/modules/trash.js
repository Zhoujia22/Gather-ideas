import { trash } from "../../api/trash";
import { commit } from "lodash/seq";
import { Message } from "element-ui";
import notebook from "./notebook";

const state = {
  trashNotes: null,
  curTrashNoteId: null,
};

const getters = {
  trashNotes: (state) => state.trashNotes || [],
  curTrashNote: (state, getters) => {
    if (!state.curTrashNoteId) return getters.trashNotes[0] || {};
    return (
      state.trashNotes.find((note) => note.id == state.curTrashNoteId) || []
    );
  },
  belongTo: (state, getters, rootState, rootGetters) => {
    let nootbook =
      rootGetters.notebooks.find(
        (notebook) => notebook.id == getters.curTrashNote.notebookId
      ) || {};
    return nootbook.title || "";
  },
};

const mutations = {
  setTrashNotes(state, payload) {
    state.trashNotes = payload.trashNotes;
  },
  addTrashNote(state, payload) {
    setTrashNotes.unshift(payload.note);
  },
  deleteTrashNote(state, payload) {
    state.trashNotes = state.trashNotes.filter(
      (note) => note.id != payload.noteId
    );
  },
  setCurTrashNote(state, payload={}) {
    state.curTrashNoteId = payload.curTrashNoteId;
  },
};

const actions = {
  getTrashNotes({ commit }) {
    return trash.getAll().then((res) => {
      commit("setTrashNotes", { trashNotes: res.data });
    });
  },
  deleteTrashNote({ commit }, { noteId }) {
    return trash.deleteNote({ noteId }).then((res) => {
      commit("deleteTrashNote", { noteId });
      Message.success(res.msg);
    });
  },
  revertTrashNote({ commit }, { noteId }) {
    return trash.revertNote({ noteId }).then((res) => {
      commit("deleteTrashNote", { noteId });
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
