/* 
* @Author: leeZ
* @Date:   2018-04-10 11:48:08
* @Last Modified by:   leeZ
* @Last Modified time: 2018-04-17 11:22:32
*/

// const expandRow ='<div><Row class="expand-row"><i-col span="8"><span class="expand-key">Job: </span><span class="expand-value">{{ row.job }}</span></i-col><i-col span="8"><span class="expand-key">Interest: </span><span class="expand-value">{{ row.interest }}</span></Col><i-col span="8"><span class="expand-key">Birthday: </span><span class="expand-value">{{ row.birthday }}</span></i-col></Row><Row><i-col span="8"><span class="expand-key">Favorite book: </span><span class="expand-value">《{{ row.book }}》</span></i-col><i-col span="8"><span class="expand-key">Favorite movie: </span><span class="expand-value">{{ row.movie }}</span></i-col><i-col span="8"><span class="expand-key">Favorite music: </span><span class="expand-value">{{ row.music }}</span></i-col></Row></div>'

new Vue({
  el: '#app',
  components: {
    'v-head': Vhead, 
    'v-slide': Vslide
  },
  data () {
    return {
      userName: '',
      detailColumns: [
        {
          title: '订单号',
          key: 'orderNumber'
        },
        {
          title: '兑换码',
          key: 'chargeCode'
        },
        {
          title: '短信内容',
          key: 'message'
        },
        {
          title: '兑换状态',
          key: 'chargeStatus'
        },
        {
          title: '兑换时间',
          key: 'chargeTime'
        },
        {
          title: '生效时间',
          key: 'effectiveTime'
        }
      ],
      detailData: [
        {
          orderNumber: '12121212',
          chargeCode: 'XJDIEKQ12434',
          message: '给你送了100MB',
          chargeStatus: 1,
          chargeTime: '2018-4-10',
          effectiveTime: '2018-4-10'
        }
      ],
      columns: [
        {
          type: 'expand',
          width: 50,
          render: (h, params) => {
            return h('div', {
              slot: 'content',
              on: {
                click: () => {
                  console.log(params.row.batchNumber)
                }
              }
            }, [
              h('i-table', {
                props: {
                  columns: this.detailColumns,
                  data: this.detailData
                }
              })
            ])
          }
        },
        {
          title: '批次号',
          key: 'batchNumber'
        },
        {
          title: '电话号码',
          key: 'phoneNumber'
        },
        {
          title: '赠送名称',
          key: 'sendName'
        },
        {
          title: '赠送数量',
          key: 'sendNumber'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '录入人',
          key: 'enterPeople'
        },
        {
          title: '录入时间',
          key: 'enterTime'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          render: (h, params) => {
            return h('div', [
              h(params.row.status == -1 ? 'Tooltip' : '', {
                props: {
                  content: '生效'
                }
              } , [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    icon: 'checkmark'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      console.log('生效了')
                    }
                  }
                }, '')
              ]),

              h(params.row.status == -1 ? 'Tooltip' : '', {
                props: {
                  content: '修改'
                }
              }, [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'edit'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      console.log('修改了')
                    }
                  }
                }, ''),
              ]),
              
              h(params.row.status == -1 ? 'Tooltip' : '', {
                props: {
                  content: '删除'
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'close-round'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      console.log('删除了')
                    }
                  }
                }, '')
              ])
              
            ])
          }
        }
      ],
      datas: [
        {
          batchNumber: '332013',
          phoneNumber: '13438380098',
          sendName: '名称1',
          sendNumber: 3,
          status: -1,
          enterPeople: 'lee',
          enterTime: '1991-05-14'
        }
      ]
    };
  },
  methods: {
    // 展开
    expand (row, status) {
      if(status) {
        // console.log(row.batchNumber)
      }
    },
    init () {
      // this.userName = Cookies.get('user');
    },
    handleClickUserDropdown (name) {
      this.$router.push({
          name: 'login'
      });
    }
  },
  mounted: function() {
    
  }
});