<template>
  <div id="trash" class="detail">
    <div class="note-sidebar">
      <h3 class="notebook-title">回收站 🚮</h3>
      <div class="menu">
        <div>更新时间</div>
        <div>标题</div>
      </div>
      <ul class="notes">
        <li v-for="note in trashNotes" :key="note.id">
          <router-link :to="`/trash?noteId=${note.id}`">
            <span class="date">{{ note.updatedAtFriendly }}</span>
            <span class="tit le">{{ note.title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="note-detail">
      <div class="note-bar" v-if="true">
        <span> 创建日期: {{ curTrashNote.createdAtFriendly }}</span>
        <span> | </span>
        <span> 更新日期: {{ curTrashNote.updatedAtFriendly }}</span>
        <span> | </span>
        <span> 所属笔记本: {{ belongTo }}</span>
        <a class="btnRevert action" @click="onRevert">恢复</a>
        <a class="btnDelete action" @click="onDelete">彻底删除</a>
      </div>
      <div class="note-title">
        <span>{{ curTrashNote.title }}</span>
      </div>
      <div class="editor">
        <div class="preview markdown-body" v-html="compiledMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import { mapActions, mapGetters, mapMutations } from "vuex";

let md = new MarkdownIt();
export default {
  name: "TrashDetail",
  data() {
    return {};
  },
  created() {
    this.checkLogin({ path: "/login" });
    this.getNotebooks();
    this.getTrashNotes().then(() => {
      this.setCurTrashNote({ curTrashNoteId: this.$route.query.noteId });

      if (this.$route.query.noteId === undefined) {
        this.$router.replace(`/trash?noteId=${this.curTrashNote.id}`);
      }
    });
  },
  methods: {
    ...mapMutations(["setCurTrashNote"]),
    ...mapActions([
      "checkLogin",
      "getTrashNotes",
      "deleteTrashNote",
      "revertTrashNote",
      "getNotebooks",
    ]),
    onDelete() {
      this.deleteTrashNote({ noteId: this.curTrashNote.id }).then(() => {
        this.setCurTrashNote();
        this.$router.replace(`/trash?noteId=${this.curTrashNote.id}`);
      });
    },

    onRevert() {
      this.revertTrashNote({ noteId: this.curTrashNote.id }).then(() => {
        this.setCurTrashNote();
        this.$router.replace(`/trash?noteId=${this.curTrashNote.id}`);
      });
    },
  },
  computed: {
    ...mapGetters(["trashNotes", "curTrashNote", "belongTo"]),
    compiledMarkdown() {
      return md.render(this.curTrashNote.content || "");
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.setCurTrashNote({ curTrashNoteId: to.query.noteId });
    next();
  },
};
</script>

<style lang="less" scoped>
@import url(../assets/css/note-detail);
@import url(../assets/css/note-sidebar);

#trash {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
  .note-bar {
    background: #eeeeee;
    .action {
      float: right;
      margin-left: 30px;
      padding: 3px 8px;
      font-size: 12px;
      border-radius: 6px;
    }
    .btnRevert {
      background: #008542;
      color: white;
      &:active {
        transform: translateY(1px);
      }
    }
    .btnDelete {
      background: #be0426;
      color: white;
      &:active {
        transform: translateY(1px);
      }
    }
  }
}
</style>
