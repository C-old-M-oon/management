/* 
* @Author: leeZ
* @Date:   2018-04-25 15:42:44
* @Last Modified by:   leeZ
* @Last Modified time: 2018-04-26 10:31:02
*/

new Vue({
  el: '#app',
  components: {
    'v-head': Vhead, 
    'v-slide': Vslide
  },
  data () {
    return {
      filter: {
        mobileNumber: '',
        startTime: '',
        endTime: '',
        pageNo:1,
        pageSize: 15,
        token: localStorage.getItem('token')
      },
      totalRecords: 0,
      dataLoading: false,
      columns: [
        {
          title: '号码',
          key: 'mobileNumber'
        },
        {
          title: '短信内容',
          key: 'content',
          width: '400'
        },
        {
          title: '提交状态',
          key: 'submitStatus'
        },
        {
          title: '状态报告',
          key: 'reportStatus'
        },
        {
          title: 'sp 号码',
          key: 'spNumber'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '状态报告时间',
          key: 'reportTime'
        }
      ],
      datas: []
    }
  },
  methods: {
    changeTime(time) {
      if(time.length) {
        this.filter.startTime = time[0]
        this.filter.endTime = time[1]
      }else {
        this.filter.startTime = ''
        this.filter.endTime = ''
      }
    },
    search(no) {
      var _that = this
      this.filter.pageNo = no
      this.dataLoading = true
      $.post(baseUrl + '/gzcu/sms/get', _that.filter, function(res) {
        res = checkRes(res)
        if(res.status == ERR_OK) {
          _that.datas = res.data.list
          _that.totalRecords = res.data.total
          _that.dataLoading = false
        }else {
          _that.$Message.error(res.msg)
          _that.dataLoading = false
        }
      })
    },
    changePage(no) {
      this.search(no)
    },
    download() {
      
    }
  }
})