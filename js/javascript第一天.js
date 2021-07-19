var that;
class tab {
    constructor(id) {
        // 获取元素
        that = this;
        this.main = document.querySelector(id);
        this.btn = this.main.querySelector('button')
        //li的父元素
        this.ul = this.main.querySelector('.tab ul')
        // section的父元素
        this.fsection = this.main.querySelector('.content-container');
        this.init();
    }
    // 重新绑定所有点击事件，以及分配index
    init() {
        this.updateNode();
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.closeBtns[i].onclick = this.deleteTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
        this.btn.onclick = this.createTab;
    }
    //重新获取li和section元素
    updateNode(){
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.closeBtns = this.main.querySelectorAll('.close');
        this.spans = this.main.querySelectorAll('.tab ul li span:first-child')
    }

    // 清除li和section的classname
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 切换tab栏，className一定要注意大小写
    toggleTab() {
        that.clearClass();
        this.className = 'tab-active';
        that.sections[this.index].className = 'con-active';
    }

    createTab() {
        var random = Math.random();
        that.clearClass();
        var newtab = '<li class="tab-active"><span>新选项卡</span><span class="close"></span></li>';
        var newContent ='<section class="con-active">测试'+ random +'</section>';
        that.ul.insertAdjacentHTML('beforeend',newtab);
        that.fsection.insertAdjacentHTML('beforeend', newContent);
        that.init();
    }

    deleteTab(e) {
        e.stopPropagation();
        this.parentNode.remove();
        that.sections[this.parentNode.index].remove();
        that.init();
        //手动调用点击事件
        if(this.parentNode.className == 'tab-active' && this.parentNode.index != 0){
            that.lis[this.parentNode.index - 1].click();
        }else if(this.parentNode.className == 'tab-active' && this.parentNode.index == 0 ) {
            that.lis[0].click();
        }
    }
    editTab(e) {
        window.getSelection ? window.getSelection().removeAllRanges() : document.getSelection.empty();
        e.stopPropagation();
        var string = this.innerHTML;
        this.innerHTML = '<input type="text">';
        var input = this.children[0];
        input.value = string;
        input.select();
        input.onblur = function(){
            this.parentNode.innerHTML = this.value;
        } 
        input.onkeyup = function(e){
            if(e.keyCode == 13){
                this.blur();
            }
        }
    }
}
new tab('#tab');