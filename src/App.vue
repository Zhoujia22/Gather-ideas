<template>
  <div id="app">
    <sidebar />
    <router-view />
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";

export default {
  name: "App",
  components: { Sidebar },
};
</script>

<style>
@import "//at.alicdn.com/t/c/font_3880579_9g9oepciwrs.css";

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body,
#app {
  height: 100%;
}
body {
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica,
    "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
    "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN",
    "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti",
    SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  font-size: 14px;
  -moz-osx-font-smoothing: grayscale;
  background-color: #eee;
}
a {
  text-decoration: none;
  color: #444;
}
ul,
ol {
  list-style: none;
}
#app {
  display: flex;
  align-items: stretch;
}
</style>
git config --global user.email
