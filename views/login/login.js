/* 
* @Author: leeZ
* @Date:   2018-04-10 11:40:24
* @Last Modified by:   leeZ
* @Last Modified time: 2018-04-26 15:05:07
*/

new Vue({
  el: '#app',
  data: {
    codeSrc: '',
    form: {
      username: 'admin',
      password: '123',
      code: ''
    },
    rules: {
      username: [
        { required: true, message: ' ', trigger: 'blur' }
      ],
      password: [
        { required: true, message: ' ', trigger: 'blur' }
      ],
      code: [
        { required: true, message: ' ', trigger: 'blur' }
      ]
    }
  },
  methods: {
    getCodeSrc () {
      this.codeSrc = baseUrl + '/system/verify/code?timetemprature='+new Date()
    },
    handleSubmit () {
      var _that = this
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          $.ajax({
            url: baseUrl + '/system/logon/login',
            type: 'POST',
            xhrFields: {
                withCredentials: true
            },
            data: _that.form,
          })
          .done(function(res) {
            res = checkRes(res)
            if(res.status == ERR_OK) {
              localStorage.setItem('token', res.msg)
              window.location.href = '../return/return.html'
            }else {
              _that.$Message.error(res.msg)
              _that.getCodeSrc()
            }
          })
          .fail(function(err) {
            console.log("error");
          })
        }
      });
    }
  },
  created() {
    this.getCodeSrc()
  }
})