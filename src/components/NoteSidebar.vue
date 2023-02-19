<template>
  <div class="note-sidebar">
    <button class="btn add-note" @click="onAddNote">添加笔记</button>
    <el-dropdown
      class="notebook-title"
      @command="handleCommand"
      placement="bottom"
    >
      <span class="el-dropdown-link">
        {{ curBook.title }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="notebook in notebooks"
          :key="notebook.id"
          :command="notebook.id"
        >{{ notebook.title }}</el-dropdown-item
        >
        <el-dropdown-item command="trash"
        >回收站 <i class="el-icon-delete el-icon--right" />
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="tit le">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "NoteSidebar",
  created() {
    this.getNotebooks()
      .then(() => {
        this.setCurBook({ curBookId: this.$route.query.notebookId });
        return this.getNote({ notebookId: this.curBook.id });
      })
      .then(() => {
        this.setCurNote({ curNoteId: this.$route.query.noteId });
        if (this.$route.query.noteId || this.$route.query.notebookId) {
          return;
        }
        this.$router.replace(
          `/note?noteId=${this.curNote.id}&notebookId=${this.curBook.id}`
        );
      });
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["notebooks", "notes", "curBook", "curNote"]),
  },
  methods: {
    ...mapMutations(["setCurBook", "setCurNote"]),
    ...mapActions(["getNotebooks", "getNote", "addNote"]),
    handleCommand(notebookId) {
      if (notebookId == "trash") {
        return this.$router.push({ path: "/trash" });
      }
      this.setCurBook({ curBookId: notebookId });
      this.getNote({ notebookId }).then(() => {
        this.setCurNote();
        this.$router.replace(
          `/note?noteId=${this.curNote.id}&notebookId=${this.curBook.id}`
        );
      });
    },
    onAddNote() {
      this.addNote({ notebookId: this.curBook.id });
    },
  },
};
</script>

<style scoped lang="less">
@import url(../assets/css/note-sidebar);
</style>
