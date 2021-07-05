<template>
  <div class="login">
    <h1>登录页面</h1>
    <a-button type="primary" @click="notification.success({message: '失败', description: '本次操作失败了'})">点击</a-button>
  </div>
</template>
<script>
import { notification } from 'ant-design-vue';
export default {
  name: 'Login',
  data () {
    return {
      notification
    }
  },
  methods: {
    
  },
  created () {
    
  },
  component: {
    Notification
  }
}
</script>
<style lang="less">
  
</style>