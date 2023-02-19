<template>
  <div class="detail" id="notebook-list">
    <header>
      <button class="btn" @click="onCreate">
        <i class="iconfont icon-add-bold"></i> 新建笔记本
      </button>
    </header>
    <main>
      <div class="layout">
        <h3>笔记本列表 ({{ notebooks.length }})</h3>
        <div class="book-list">
          <router-link
            v-for="notebook in notebooks"
            :key="notebook.id"
            :to="`/note?notebookId=${notebook.id}`"
            class="notebook"
          >
            <div>
              <i class="iconfont icon-a-bookPage"></i> {{ notebook.title }}
              <span>共{{ notebook.noteCounts || 0 }}条</span>
              <span class="action" @click.stop.prevent="onEdit(notebook)"
                >编辑</span
              >
              <span class="action" @click.stop.prevent="onDelete(notebook)"
                >删除</span
              >
              <span class="date">{{ notebook.createdAtFriendly }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "NotebookList",
  data() {
    return {};
  },
  created() {
    this.checkLogin({ path: "/login" });
    this.getNotebooks();
  },
  computed: {
    ...mapGetters(["notebooks"]),
  },
  methods: {
    ...mapActions([
      "getNotebooks",
      "addNotebook",
      "updateNotebook",
      "deleteNotebook",
      "checkLogin",
    ]),
    onCreate() {
      MessageBox.prompt("请输入笔记本标题:", "新建笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不为空，且不超过30字符",
      }).then(({ value }) => {
        this.addNotebook({ title: value });
      });
    },

    onEdit(notebook) {
      MessageBox.prompt("请输入笔记本标题:", "编辑笔记本", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: "标题不为空，且不超过30字符",
      }).then(({ value }) => {
        this.updateNotebook({ notebookId: notebook.id, title: value });
      });
    },
    onDelete(notebook) {
      MessageBox.confirm("是否删除该笔记?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.deleteNotebook({ notebookId: notebook.id });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url(../assets/css/notebook-list);
</style>
