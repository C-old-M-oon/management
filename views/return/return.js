/* 
* @Author: leeZ
* @Date:   2018-04-17 11:21:00
* @Last Modified by:   leeZ
* @Last Modified time: 2018-04-25 15:38:01
*/

new Vue({
  el: '#app',
  components: {
    'v-head': Vhead, 
    'v-slide': Vslide
  },
  data () {
    return {
      cityList: [],
      filter: {
        inputPerson: '',
        mobileNumber: '',
        area: '',
        orderProduct: '',
        startTime: '',
        endTime: '',
        pageNo:1,
        pageSize: 15
      },
      totalRecords: 0,
      dataLoading: false,
      modal_loading: false,
      modalAdd: false,
      editInfo: {},
      columns: [
        {
          title: '号码',
          key: 'mobileNumber'
        },
        {
          title: '地州',
          key: 'area'
        },
        {
          title: '退款金额',
          key: 'refundPrice'
        },
        {
          title: '退订状态',
          key: 'unsubscribeState'
        },
        {
          title: '退款状态',
          key: 'refundState'
        },
        {
          title: '订单时间',
          key: 'orderTime'
        },
        {
          title: '订购产品',
          key: 'orderProduct'
        },
        {
          title: '原因',
          key: 'refundCause',
          width: 150,
          render: (h, params) => {
            return h('Tooltip', {
              props: {
                content: params.row.refundCause,
                placement: 'top-start'
              },
              style: {
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '130px'
              }
            }, params.row.refundCause)
          }
        },
        {
          title: '代理商',
          key: 'agentName'
        },
        {
          title: '投诉时间',
          key: 'complainTime'
        },
        {
          title: '提交人',
          key: 'submitPerson'
        },
        {
          title: '录入时间',
          key: 'inputTime'
        },
        {
          title: '录入人',
          key: 'inputPerson'
        }
      ],
      datas: [],
      editInfo: {
        mobileNumber: '',
        area: '',
        refundPrice: '',
        unsubscribeState: '',
        refundState: '',
        orderTime: '',
        orderProduct: '',
        refundCause: '',
        agentName: '',
        complainTime: '',
        submitPerson: ''
      },
      uploadUrl: baseUrl + '/xjcu/refund/uploadFile'
    }
  },
  methods: {
    getCity() {
      var _that = this
      axios.get(baseUrl + '/xjcu/tool/getArea', {
        params: {
          token: localStorage.getItem('token')
        }
      })
      .then(function(res){
        res = checkRes(res)
        if(res.data.status == ERR_OK) {
           res.data.data.map(item => {
            _that.cityList.push({
              key: item,
              value: item
            })
          })
        }else {
          _that.$Message.error(res.data.msg)
        }
      })
      .catch(function(err){
        console.log(err);
      });
    },
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
      axios.get(baseUrl + '/xjcu/refund/get', {
        params: _that.filter
      })
      .then(function(res){
        if(res.data.status == ERR_OK) {
          _that.datas = res.data.data.list
          _that.totalRecords = res.data.data.total
          _that.dataLoading = false
        }else {
          _that.$Message.error(res.data.msg)
          _that.dataLoading = false
        }
      })
      .catch(function(err){
        console.log(err)
      });
    },
    changePage(no) {
      this.search(no)
    },
    add () {
      var _that = this
      this.modal_loading = true
      axios.get(baseUrl + '/xjcu/refund/add', {
        params: _that.editInfo
      })
      .then(function(res){
        if(res.data.status == ERR_OK) {
          _that.$Message.success('添加成功！')
          _that.search(1)
          _that.modal_loading = false
          _that.modalAdd = false
        }else {
          _that.$Message.error(res.data.msg)
          _that.modal_loading = false
        }
      })
      .catch(function(err){
        console.log(err)
      });
    },
    excelOut() {
      window.location.href = baseUrl + '/xjcu/refund/excel'
    },
    uploadSuccess(res, file, fileList) {
      console.log(res)
      if(res.status == ERR_OK) {
        this.$Message.success('上传成功！')
        this.search(1)
      }else {
        this.$Message.error(res.msg)
      }
    },
    uploadError(res, file, fileList) {
      console.log('失败：' + res)
      this.$Message.error('上传失败！')
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.getCity()
    })
  }
})