/* 
* @Author: leeZ
* @Date:   2018-04-19 10:16:03
* @Last Modified by:   leeZ
* @Last Modified time: 2018-04-25 17:15:26
*/

var active = localStorage.getItem('activeIndex') || '1-2'
var activeMenu = localStorage.getItem('activeMenu') || ["1"]

var Vhead = {
  template: '<div style="display: flex;justify-content: space-between;align-items: center;"><div class="logo-con"><img src="../main/logo.jpg" key="max-logo"/></div><div class="user-con" style="margin-right: 30px;align-items: center"><Avatar icon="person" style="background: #619fe7;margin-left:10px;"></Avatar><a style="margin-left: 10px" href="../login/login.html">退出登陆</a></div></div>'
}

var Vslide = {
  template: '<Sider><i-menu accordion open-names="'+activeMenu+'" active-name="'+active+'" theme="dark" width="auto" class="menu-item"><Submenu name="1"><template slot="title"><Icon type="ios-navigate"></Icon>                  基本操作</template><menu-item name="1-1">赠送</menu-item><menu-item name="1-2" data-href="return">退费</menu-item><menu-item name="1-3">测试</menu-item></Submenu><Submenu name="2"><template slot="title"><Icon type="ios-keypad"></Icon>                  短信操作</template><menu-item name="2-1">发送列表</menu-item><menu-item name="2-2">发送短信</menu-item></Submenu><Submenu name="3"><template slot="title"><Icon type="ios-analytics"></Icon>                  Item 3</template><menu-item name="3-1">Option 1</menu-item><menu-item name="3-2">Option 2</menu-item></Submenu></i-menu></Sider>'
}

function setItem() {
  var _menu = document.getElementsByClassName('ivu-menu-submenu')
  var _item = document.getElementsByClassName('ivu-menu-item')
  for(let i = 0; i < _menu.length; i++) {
    for(let j = 0; j< _menu[i].children[1].children.length; j++) {
      let _j = j + 1
      _menu[i].children[1].children[j].setAttribute('data-item', i+1 + '-' + _j)
    }
  }

  for(let i = 0; i < _item.length; i++) {
    _item[i].onclick = function() {
      var _list = this.getAttribute('data-item')
      localStorage.setItem('activeIndex', _list)
      localStorage.setItem('activeMenu', _list.split('-')[0])
      switchPage(_list)
    }
  }
}

window.onload=function(){
  setItem()
}

function checkRes(res) {
  if(typeof res == 'object'){

  }else {
    res = JSON.parse(res)
  }
  if(res.status == 405){
    window.location.href = '../login/login.html'
  }else {
    return res
  }
}

function switchPage(pageIndex) {
  var _index = PageList.findIndex(item => {
    return item.index == pageIndex
  })

  window.location.href = '../' + PageList[_index].parent + '/' + PageList[_index].name + '.html'
}

var PageList = [
  {
    index: '1-1',
    parent: 'main',
    name: 'sendFee'
  },{
    index: '1-2',
    parent: 'return',
    name: 'return'
  },{
    index: '1-3',
    parent: 'return',
    name: 'test'
  },{
    index: '2-1',
    parent: 'message',
    name: 'messageList'
  },{
    index: '2-2',
    parent: 'message',
    name: 'sendMessage'
  },
]

