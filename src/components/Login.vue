<template>
  <div class="login">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="main">
            <img src="../assets/bg.jpg" alt="不好意思，图挂了哈哈" />
          </div>
          <div class="form">
            <h3 @click="showRegister">创建账户</h3>
            <div v-bind:class="{ show: isShowRegister }" class="register">
              <input type="text" placeholder="用户名" v-model="register.user" />
              <input
                type="password"
                placeholder="密码"
                v-model="register.password"
              />
              <p v-bind:class="{ error: register.isError }">
                {{ register.notice }}
              </p>
              <div class="button" @click="onRegister">创建账户</div>
            </div>
            <h3 @click="showLogin">登录账户</h3>
            <div v-bind:class="{ show: isShowLogin }" class="login">
              <input type="text" placeholder="用户名" v-model="login.user" />
              <input
                type="password"
                placeholder="密码"
                v-model="login.password"
              />
              <p v-bind:class="{ error: login.isError }">
                {{ login.notice }}
              </p>
              <div class="button" @click="onLogin">登录账户</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {},
  data() {
    return {
      isShowRegister: false,
      isShowLogin: true,
      login: {
        user: "",
        password: "",
        notice: "请输入用户名和密码",
        isError: false,
      },
      register: {
        user: "",
        password: "",
        notice: "创建账号后，请记住密码",
        isError: false,
      },
    };
  },
  methods: {
    ...mapActions({
      loginUser: "login",
      registerUser: "register",
    }),
    showLogin() {
      this.isShowLogin = true;
      this.isShowRegister = false;
    },
    showRegister() {
      this.isShowLogin = false;
      this.isShowRegister = true;
    },
    onRegister() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.register.user)) {
        this.register.isError = true;
        this.register.notice = "请输入3-15个字符（支持字母数字下划线中文）";
        return;
      }
      if (!/^.{6,16}$/.test(this.register.password)) {
        this.register.isError = true;
        this.register.notice = "密码长度6-16个字符";
        return;
      }
      this.registerUser({
        username: this.register.user,
        password: this.register.password,
      })
        .then(() => {
          this.register.isError = false;
          this.register.notice = "";
          this.$router.push("/notebooks");
        })
        .catch((data) => {
          this.register.isError = true;
          this.register.notice = data.msg;
        });
    },
    onLogin() {
      if (!/^[\w\u4e00-\u9fa5]{3,15}$/.test(this.login.user)) {
        this.login.isError = true;
        this.login.notice = "请输入3-15个字符（支持字母数字下划线中文）";
        return;
      }
      if (!/^.{6,16}$/.test(this.login.password)) {
        this.login.isError = true;
        this.login.notice = "密码长度6-16个字符";
        return;
      }
      this.loginUser({
        username: this.login.user,
        password: this.login.password,
      })
        .then(() => {
          this.login.isError = false;
          this.login.notice = "";
          this.$router.push("/notebooks");
        })
        .catch((data) => {
          this.login.isError = true;
          this.login.notice = data.msg;
        });
    },
  },
};
</script>

<style scoped lang="less">
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 1000px;
  height: 500px;
  opacity: 1;
  margin: 0 auto;
  border-radius: 30px;
  background: #e0e0e0;
  box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  display: flex;
  .main {
    flex: 1;
    display: flex;
    width: 700px;
    flex-direction: column;
    justify-content: center;
    position: relative;
    margin-left: 16px;
    margin-right: 10px;
  }
  .form {
    width: 270px;
    overflow: hidden;
    margin-top: 35px;
    h3 {
      padding: 20px 20px 10px 20px;
      font-size: 18px;
      border-bottom: 3px solid #eee;
      cursor: pointer;
      &:nth-of-type(2) {
        border-bottom: 3px solid #eee;
      }
    }
    .button {
      background-color: #444141;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      height: 36px;
      line-height: 36px;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 1px;
      text-align: center;
      margin-top: 20px;
      &:hover {
        background-image: linear-gradient(
          90deg,
          #53cbef 0%,
          #dcc66c 50%,
          #ffa3b6 75%,
          #53cbef 100%
        );
        animation: slidernbw 5s linear infinite;
        color: #000;
      }
    }
    .login,
    .register {
      padding: 10px 20px;
      border-top: 1px solid #eee;
      height: 0;
      overflow: hidden;
      transition: height 0.25s;
      &.show {
        height: 190px;
      }
      input {
        height: 35px;
        line-height: 35px;
        width: 100%;
        border: 2px solid transparent;
        border-bottom-color: #777;
        padding: 4px 6px;
        outline: none;
        background-color: transparent;
        font-size: 14px;
        color: #0d0c22;
        transition: 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        margin-top: 10px;
        &:hover,
        &:focus {
          outline: none;
          border-radius: 16px;
          border-color: #7a9cc6;
        }
      }
      p {
        font-size: 10px;
        margin-top: 8px;
        margin-left: 12px;
        color: #444;
      }
      .error {
        color: red;
      }
    }
    .login {
      border-top: 0;
    }
  }
}

@keyframes slidernbw {
  to {
    background-position: 20vw;
  }
}
</style>
