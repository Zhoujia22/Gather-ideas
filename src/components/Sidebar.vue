<template>
  <div class="sidebar">
    <Avatar class="avatar" />
    <div class="icons">
      <RouterLink to="/note" title="笔记"
      ><i class="iconfont icon-note"></i
      ></RouterLink>
      <RouterLink to="/notebooks" title="笔记本"
      ><i class="iconfont icon-Notebook"></i
      ></RouterLink>
      <RouterLink to="/trash" title="回收站 "
      ><i class="iconfont icon-trash"></i
      ></RouterLink>
    </div>
    <div class="logout" title="登出">
      <i class="iconfont icon-tuichu" @click="onLogout"></i>
    </div>
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";
import { mapActions } from "vuex";
export default {
  name: "Sidebar",
  components: { Avatar },
  methods: {
    ...mapActions(["logout"]),
    onLogout() {
      this.logout();
    },
  },
};
</script>

<style scoped lang="less">
.sidebar {
  position: relative;
  width: 60px;
  text-align: center;
  background: linear-gradient(315deg, #ffbc00, #ff0058);
  border-right: 3px solid white;
}
.avatar {
  transform: translateX(-1px);
}
.icons {
  margin-top: 15px;
  a {
    margin-top: 20px;
    padding: 6px 0;
    display: block;
    border-radius: 16px;
  }
  .router-link-active {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  }
}
.logout {
  position: absolute;
  bottom: 60px;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  cursor: pointer;
}
.iconfont {
  font-size: 24px;
  color: white;
}
</style>
