<template>
  <span :title="username">{{ slug }} </span>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Avatar",
  created() {
    this.checkLogin({ path: "/login" });
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["username", "slug"]),
  },
  methods: {
    ...mapActions(["checkLogin"]),
  },
};
</script>

<style scoped lang="less">
span {
  display: inline-block;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  background: rgba(217, 217, 217, 0.6);
  border: 2px solid rgba(196, 196, 199, 0.2);
  box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.3);
  text-shadow: 1px 0 1px #b4cfb0;
  color: white;
  font-size: 24px;
  text-transform: uppercase;
  margin: 30px 0;
  font-weight: bold;
  font-family: Tahoma, sans-serif;
}
</style>
