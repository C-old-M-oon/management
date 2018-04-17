/* 
* @Author: leeZ
* @Date:   2018-04-17 11:21:00
* @Last Modified by:   leeZ
* @Last Modified time: 2018-04-17 14:50:07
*/

new Vue({
  el: '#app',
  components: {
    'v-head': Vhead, 
    'v-slide': Vslide
  },
  data () {
    return {
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
      datas: [
        {
          mobileNumber: '13433333333',
          area: '成都',
          refundPrice: '500.00',
          unsubscribeState: '成功',
          refundState: '已退款',
          orderTime: '2018-4-1',
          orderProduct: '低消100元档',
          refundCause: '用户非常非常非常生气，心情非常非常不爽，总之就是想退款了，不想多说，乱七八糟的。强烈要求退款。要求道歉',
          agentName: '太字节',
          complainTime: '2018-4-14',
          submitPerson: '管理员',
          inputTime: '2018-4-15',
          inputPerson: '张晓晓'
        }
      ]
    }
  },
  methods: {
    add () {
      console.log('add')
    }
  }
  
});