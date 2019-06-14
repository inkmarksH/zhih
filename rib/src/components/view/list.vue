<template>
  <div class="list" @touchend="scroll()">
    <dl class="lists">
      <dt class="tit">今日新闻</dt>
      <dd
        v-for="(item,index) in img"
        :key="index"
        @touchstart="start($event)"
        @touchmove="move($event)"
        @touchend="end(item.id)"
      >
        <p>{{item.title}}</p>
        <div class="img">
          <img :src="item.images[0]" alt>
        </div>
      </dd>
    </dl>
    <dl class="lists" v-for="(ite,ind) in list" :key="ind">
      <dt class="tit">{{ite.data.date|data}}</dt>
      <dd
        v-for="(item,index) in ite.data.stories"
        :key="index"
        @touchstart="start($event)"
        @touchmove="move($event)"
        @touchend="end(item.id)"
      >
        <p>{{item.title}}</p>
        <div class="img">
          <img :src="item.images[0]" alt>
        </div>
      </dd>
    </dl>
  </div>
</template>

<script type="text/ecmascript-6">
import api from "../../common/js/api";
export default {
  components: {},
  props: {},
  data() {
    return {
      list: [],
      img: "",
      imgs: "",
      dates: new Date().getTime() + 1000 * 60 * 60 * 24,
      now: "",
      startY: 0,
      endY: 0,
      qid: false
    };
  },
  methods: {
    scroll() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight =
        document.documentElement.scrollHeight - 10 ||
        document.body.scrollHeight - 10;
      //滚动条到底部的条件
      if (scrollHeight - (scrollTop + windowHeight) < 100) {
        //写后台加载数据的函数
        console.log(
          "距顶部" +
            scrollTop +
            "可视区高度" +
            windowHeight +
            "滚动条总高度" +
            scrollHeight
        );
        this.qid = false;
        var a = (this.dates -= 24 * 60 * 60 * 1000);
        var date = new Date(a);
        var y = date.getFullYear();
        var MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        this.now = y + MM + d;
        this.dong();
      }
    },
    dong() {
      this.$api({
        url: api.news + this.now
      }).then(d => {
        this.qid = true;
        if (this.qid) {
          this.list.push(d);
        }
      });
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
    this.$api({
      url: api.banner
    }).then(d => {
      this.img = d.data.stories;
    });
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylu/index.styl';

.list {
  width: 100%;
  background: $bg1;

  .lists dt {
    height: 1rem;
    line-height: 1rem;
    font-size: 0.3rem;
    color: $fonc1;
    margin-left: 0.48rem;
  }

  .lists dd {
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