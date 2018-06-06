/* 
* @Author: leeZ
* @Date:   2018-04-26 10:38:06
* @Last Modified by:   leeZ
* @Last Modified time: 2018-04-26 16:32:20
*/

new Vue({
  el: '#app',
  components: {
    'v-head': Vhead, 
    'v-slide': Vslide
  },
  computed: {
    disabled() {
      if(this.message.phones.length && this.message.content.length) {
        return false
      }else {
        return true
      }
    }
  },
  data () {
    return {
      loading: false,
      message: {
        phones: '',
        content: '',
        token: localStorage.getItem('token')
      }
    }
  },
  methods: {
    send() {
      var _that = this;
      if(!this.message.phones.length) {
        this.$Message.warning('请输入需要发送的号码!');
        return;
      }
      if(!this.message.content.length) {
        this.$Message.warning('请输入需要发送的内容!');
        return;
      }
      $.post(baseUrl + '/gzcu/sms/send', _that.message, function(res) {
        res = checkRes(res)
        if(res.status == ERR_OK) {
          _that.$Message.success('短信发送成功！')
        }else {
          _that.$Message.error(res.msg)
        }
      })
    },
    reset(status) {
      if(status) {
        this.message.content = '';
      }else {
        this.message.phones = '';
      }
    }
  }
})