<template>
  <div>
    <div class="head">
      <span class="as iconfont aicon-zhedie" @touchend="end()"></span>
      <span class="tit">{{this.name}}</span>
      <span class="more iconfont aicon-dashujukeshihuaico-"></span>
      <span class="ling iconfont aicon-lingdang"></span>
    </div>
    <mt-swipe :auto="4000" class="banner">
      <mt-swipe-item
        v-for="(item,index) in bimg"
        :key="index"
        class="img"
      >
        <img :src="item.image"  @touchstart="start($event)"
        @touchmove="move($event)"
        @touchend="ends(item.id)">
        <h2>{{item.title}}</h2>
      </mt-swipe-item>
    </mt-swipe>
    <list></list>
    <vnav ref="mask" class="mask" :style="style" @hide="end()"></vnav>
  </div>
</template>

<script type="text/ecmascript-6">
import api from "../../common/js/api";
import list from "../view/list";
import vnav from "../view/nav";
export default {
  components: {
    list,
    vnav
  },
  props: {},
  data() {
    return {
      name: "首页",
      bimg: "",
      isshow: false,
      style: {
        left: "-100%"
      }
    };
  },
  methods: {
    end() {
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
    ends(id) {
      if (this.endY == 0) {
        this.$router.push("/xiangq?id=" + id);
      }
    }
  },
  mounted() {
    var that = this;
    this.$api({
      url: api.banner
    }).then(d => {
      this.bimg = d.data.top_stories;
      console.log(this.bimg);
    });
    window.onscroll = function() {
      var wenh =
        document.documentElement.clientHeight || document.body.clientHeight;
      var stopp = document.documentElement.scrollTop || document.body.scrollTop;
      var stoph =
        document.documentElement.scrollHeight || document.body.scrollHeight;
      var hh =
        document.documentElement.offsetHeight || document.body.offsetHeight;
      console.log(stopp, stoph);

      if (stopp < 150) {
        that.name = "首页";
      } else if (stopp >= 150 && stopp <= 800) {
        that.name = "今日新闻";
      } else if (stopp > 800) {
        var times = document.querySelectorAll(".tit");
        for (var i = 0; i < times.length; i++) {
          if (times[i].getBoundingClientRect().top + stopp < stopp + hh) {
            that.name = times[i].innerHTML;
          }
        }
      }
    };
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylu/index.styl';

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

  .ling {
    float: right;
    font-size: 0.35rem;
    line-height: 1rem;
    margin-left: 0.56rem;
    color: $fonc;
  }

  .more {
    float: right;
    font-size: 0.35rem;
    line-height: 1rem;
    margin: 0 0.3rem;
    color: $fonc;
  }
}

.mask {
  transition: all 0.5s;
}

.banner {
  height: 5.5rem;
  position relative
  overflow hidden

  .img {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
  h2 {
      padding 0 .3rem
      position absolute
      bottom 0
      left 0
      height: 1.6rem;
      width 100vw
      line-height: 0.8rem;
      font-size: 0.4rem;
      color: $bg2;
      box-sizing border-box
      background rgba(0, 0,0,0.5)
    }
}
</style>