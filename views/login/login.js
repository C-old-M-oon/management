/* 
* @Author: leeZ
* @Date:   2018-04-10 11:40:24
* @Last Modified by:   leeZ
* @Last Modified time: 2018-04-16 11:15:33
*/

new Vue({
  el: '#app',
  data: {
    form: {
      userName: '',
      password: ''
    },
    rules: {
      userName: [
        { required: true, message: '账号不能为空', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '密码不能为空', trigger: 'blur' }
      ]
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          let jsonData = new URLSearchParams();
          jsonData.append('username', this.form.userName);
          jsonData.append('password', this.form.password);
          console.log(jsonData);
        }
      });
    }
  }
})