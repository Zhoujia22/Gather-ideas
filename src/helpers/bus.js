import Vue from "vue";

export default new Vue();

/* 使用方法
import Bus from 'helpers/bus'

Bus.$on('test',(data)=>console.log(data))  监听test事件

Bus.$emit('test','Hello,This is the test')  发送test事件
*/
