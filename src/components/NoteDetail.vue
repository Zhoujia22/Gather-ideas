<template>
  <div id="note" class="detail">
    <NoteSidebar @update:notes="(val) => (notes = val)" />
    <div class="note-detail">
      <div class="note-empty" v-show="!curNote.id">请选择笔记</div>
      <div v-show="curNote.id">
        <div class="note-bar">
          <span>创建日期：{{ curNote.createdAtFriendly }}</span>
          <span>更新日期：{{ curNote.updatedAtFriendly }}</span>
          <span>{{ statusText }}</span>
          <span class="toggle" @click="isShowPreview = !isShowPreview"
            ><i class="iconfont icon-markdown"></i
          ></span>
          <span class="trash" @click="onDeleteNote"
            ><i class="iconfont icon-trash"></i
          ></span>
        </div>
        <div class="note-title">
          <input
            type="text"
            v-model:value="curNote.title"
            @input="onUpdateNote"
            @keydown="statusText = '正在输入...'"
            placeholder="请输入标题"
          />
        </div>
        <div class="editor">
          <textarea
            v-show="!isShowPreview"
            v-model="curNote.content"
            @input="onUpdateNote"
            @keydown="statusText = '正在输入...'"
            placeholder="请输入内容, 支持 markdown 语法"
          ></textarea>
          <div
            class="preview markdown-body"
            v-html="previewContent"
            v-show="isShowPreview"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteSidebar from "./NoteSidebar.vue";

import _ from "lodash";
import MarkdownIt from "markdown-it";
import { mapActions, mapGetters, mapMutations } from "vuex";

let md = new MarkdownIt();
export default {
  name: "NoteDetail",
  components: { NoteSidebar },
  data() {
    return {
      statusText: "笔记未改动",
      isShowPreview: false,
    };
  },
  computed: {
    ...mapGetters(["notes", "curNote"]),
    previewContent() {
      return md.render(this.curNote.content || "");
    },
  },
  methods: {
    ...mapMutations(["setCurNote", "setCurBook"]),
    ...mapActions(["updateNote", "deleteNote", "checkLogin"]),
    onUpdateNote: _.debounce(function () {
      this.updateNote({
        noteId: this.curNote.id,
        title: this.curNote.title,
        content: this.curNote.content,
      })
        .then(() => {
          this.statusText = "保存成功";
        })
        .catch(() => {
          this.statusText = "保存失败";
        });
    }, 500),
    onDeleteNote() {
      this.deleteNote({ noteId: this.curNote.id }).then((data) => {
        this.$router.replace({ path: "/note" });
      });
    },
  },
  created() {
    this.checkLogin({ path: "/login" });
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurNote({ curNoteId: to.query.noteId });
    this.statusText = "笔记未改动";
    next();
  },
};
</script>

<style scoped lang="less">
#note {
  display: flex;
  align-items: stretch;
  flex: 1;
}

@import url(../assets/css/note-detail);
</style>
