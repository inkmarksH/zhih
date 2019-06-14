<template>
  <div class="mask" @touchstart="start($event)"
        @touchmove.prevent="move($event)"
        @touchend.self="endp()">
    <div class="list">
      <div class="subt">
         <div class="user"><em><img src="../assets/222.jpg" alt=""></em><div>偶尔会发疯的人</div></div>
         <div class="gn"><div class="iconfont aicon-xingxing1" @touchend='end()'>&nbsp;&nbsp;&nbsp;我的收藏</div><div class="iconfont aicon-xiazai">&nbsp;&nbsp;&nbsp;离线下载</div></div>
      </div>
      <div class="subm">
        <div class="home" @touchend='home()'>
          <em class="iconfont aicon-weibiaoti1"></em><span>首页</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {
      startX: 0,
      endX: 0,
      startY: 0,
      endY: 0
    };
  },
  methods: {
    endp(){
      this.$emit('hide')
    },
    start(ev) {
      this.startX= ev.touches[0].clientX;
      this.endY = 0;
    },
    move(ev) {
      this.endX = ev.touches[0].clientX;
    },
    end() {
      if (this.endX == 0) {
        this.$router.push("/shouc");
      }
    },
    home(){
      this.$router.push("/index");
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylu/index.styl';
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
}

.list
  position: absolute;
  z-index: 30;
  width: 70vw;
  height: 100vh;
  background: $bg2;
  
  .subt
    height 3rem;
    background $bg3
    overflow hidden
    box-sizing border-box
    .user
      height 1.5rem
      display flex
      overflow hidden
      em
        display inline-block
        height 1rem
        width 1rem
        margin .3rem .3rem .2rem
        border-radius 50%
        img
          width 100%
          height 100%
          border-radius 50%
      div
        // display inline-block
        flex 1
        height 1rem
        line-height 1rem
        font-size .3rem
        margin: .3rem .3rem .2rem
        color $bg2
    .gn
      margin-top .5rem
      display flex
      div
        flex 1
        text-align center
        line-height 1rem
        color $bg2
  .subm
    .home
      height 1rem
      background $bg4
      line-height 1rem
      padding-left .3rem
      color $bg
      span 
        margin-left .2rem
</style>