<template>
  <div>
    <div class="head">
      <span class="as iconfont aicon-fanhui" @touchend="fan()"></span>
      <span class="tit">{{pin}}条点评</span>
      <span class="more iconfont aicon-dianping"></span>
    </div>
    <div class="main">
      <div class="pl">{{comments.length}}条长评论</div>
      <div class="mains">
        <div class="img" v-if="comments==0">
          <img src="../assets/aa.jpg" alt>
        </div>
        <div class="cp" v-if="comments!=0">
          <div class="cps" v-for="(item,index) in comments" :key="index">
            <div class="t">
              <span class="lo">
                <img :src="item.avatar" alt>
              </span>
              <span class="us">{{item.author}}</span>
              <span class="zhan iconfont aicon-dianzan">{{item.likes}}</span>
            </div>
            <div class="mi">{{item.content}}</div>
            <div class="time">{{item.time|time}}</div>
          </div>
        </div>
      </div>
      <div
        class="dpl"
        @touchstart="start($event)"
        @touchmove="move($event)"
        @touchend="end()"
      >{{pin-comments.length}}条短评论</div>
      <div class="cp" v-if="duan">
        <div class="cps" v-for="(item,index) in scomments" :key="index">
          <div class="t">
            <span class="lo">
              <img :src="item.avatar" alt>
            </span>
            <span class="us">{{item.author}}</span>
            <span class="zhan iconfont aicon-dianzan">{{item.likes}}</span>
          </div>
          <div class="mi">{{item.content}}</div>
          <div class="time">{{item.time|time}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Indicator } from "mint-ui";
import api from "../../common/js/api";
function getOffsetT(obj) {
  var l = 0;
  var t = 0;
  while (obj) {
    l += obj.offsetLeft;
    t += obj.offsetTop;
    obj = obj.offsetParent;
  }
  return {
    left: l,
    top: t
  };
}
export default {
  components: {},
  props: {},
  data() {
    return {
      id: "",
      pin: "",
      comments: 0,
      scomments: 0,
      duan: false
    };
  },
  methods: {
    fan() {
      this.$router.go(-1);
    },
    start(ev) {
      this.startY = ev.touches[0].clientY;
      this.endY = 0;
    },
    move(ev) {
      this.endY = ev.touches[0].clientY;
    },
    end(id) {
      Indicator.open("Loading...");
      if (this.endY == 0) {
        this.$api({
          url: api.cp + this.id + "/short-comments"
        }).then(d => {
          Indicator.close();
          console.log(d);
          this.scomments = d.data.comments;
        });
        this.duan = !this.duan;
      }
      // var top = document.documentElement.scrollTop || document.body.scrollTop;

      // var windowHeight =
      // document.documentElement.clientHeight || document.body.clientHeight;
      // console.log(top,windowHeight);
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.pin = this.$route.query.pin;
    this.$api({
      url: api.cp + this.id + "/long-comments"
    }).then(d => {
      this.comments = d.data.comments;
    });
  },
  watch: {},
  updated() {
    if(this.scomments.length>0){
      var pp = document.querySelector(".dpl");
      document.documentElement.scrollTop = getOffsetT(pp).top-50;
      document.body.scrollTop = getOffsetT(pp).top-50;
    }
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
    margin: 0 0.26rem;
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

.main {
  margin-top: 1rem;

  .pl {
    height: 0.8rem;
    border-top: 0.02rem solid $fonc2;
    border-bottom: 0.02rem solid $fonc2;
    line-height: 0.8rem;
    font-size: 0.3rem;
    padding-left: 0.5rem;
  }

  .dpl {
    height: 0.8rem;
    border-top: 0.02rem solid $fonc2;
    border-bottom: 0.02rem solid $fonc2;
    line-height: 0.8rem;
    font-size: 0.3rem;
    padding-left: 0.5rem;
  }

  .img {
    height: 10.5rem;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .cp {
    .cps {
      border-bottom: 0.02rem solid $fonc2;

      .t {
        height: 1rem;
        line-height: 1rem;
        padding: 0 0.1rem;
        overflow: hidden;

        .lo {
          display: inline-block;
          height: 0.8rem;
          width: 0.8rem;
          border-radius: 50%;
          margin: 0.1rem;
          box-sizing: border-box;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            vertical-align: top;
          }
        }

        .us {
          height: 1rem;
          line-height: 1rem;
          font-size: 0.4em;
          margin: 0.1rem;
          margin-left: 0.2rem;
        }

        .zhan {
          height: 1rem;
          line-height: 1rem;
          font-size: 0.2rem;
          float: right;
          color: $fonc2;
        }
      }

      .mi {
        padding: 0 0.6rem;
      }

      .time {
        heihgt: 1rem;
        line-height: 1rem;
        font-size: 0.3rem;
        color: $fonc2;
        padding: 0 0.6rem;
      }
    }
  }
}
</style>