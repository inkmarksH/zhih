<template>
  <div class="shouc">
    <div class="head">
      <span class="as iconfont aicon-zhedie" @touchend="fan()"></span>
      <span class="tit">{{arr.length}}&nbsp;条收藏</span>
    </div>
    <dl class="list">
      <dd
        v-for="(item,index) in arr"
        :key="index"
        @touchstart="start($event)"
        @touchmove="move($event)"
        @touchend="end(item.id)"
      >
        <p>{{item.title}}</p>
        <div class="img">
          <img :src="item.images">
        </div>
      </dd>
    </dl>
     <vnav ref="mask" class="mask" :style="style" @hide="ends()"></vnav>
  </div>
</template>

<script type="text/ecmascript-6">
import vnav from "../view/nav";
export default {
  components: {
    vnav
  },
  props: {},
  data() {
    return {
      isshow: false,
      style: {
        left: "-100%"
      },
      arr: localStorage.getItem("arr")
    };
  },
  methods: {
    ends() {
      this.isshow = !this.isshow;
      if (this.isshow) {
        this.style = {
          left: "0px"
        };
      } else {
        this.style = {
          left: "-100%"
        };
      }
    },
    fan(){
      this.isshow = !this.isshow;
      if (this.isshow) {
        this.style = {
          left: "0px"
        };
      } else {
        this.style = {
          left: "-100%"
        };
      }
    },
    start(ev) {
      this.startY = ev.touches[0].clientY;
      this.endY = 0;
    },
    move(ev) {
      this.endY = ev.touches[0].clientY;
    },
    end(id) {
      if (this.endY == 0) {
        this.$router.push("/xiangq?id=" + id);
      }
    }
  },
  mounted() {
    this.arr = JSON.parse(localStorage.getItem("arr"));
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylu/index.styl';
.shouc
  overflow hidden
.head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  height: 1rem;
  width: 100%;
  background: $bg;

  .as {
    font-size: 0.35rem;
    line-height: 1rem;
    margin-left: 0.56rem;
    color: $fonc;
  }

  .tit {
    font-size: 0.35rem;
    line-height: 1rem;
    margin-left: 0.8rem;
    color: $fonc;
    font-weight: 400;
    font-family: '圆体';
  }
}
.mask {
  transition: all 0.5s;
}
.list {
  margin-top 1.2rem
  width: 100%;
  background: $bg1;

  dd {
    width: 7rem;
    height: 2rem;
    border: 2px solid $bdc;
    background: $bg2;
    border-radius: 0.1rem;
    margin: 0 auto;
    padding: 0.2rem;
    box-sizing: border-box;
    display: flex;

    p {
      height: 1.2rem;
      line-height: 0.4rem;
      font-size: 0.4rem;
      flex: 1;
      overflow: hidden;
    }

    .img {
      height: 1.6rem;
      width: 1.6rem;
      margin-left: 0.2rem;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>