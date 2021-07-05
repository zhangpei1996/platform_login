import Vue from 'vue'
import { 
  Button,
  notification
} from 'ant-design-vue'

Vue.component(Button.name, Button)

Vue.prototype.$notification = notification