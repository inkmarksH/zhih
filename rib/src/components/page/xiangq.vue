<template>
  <div class="xiang">
    <link rel="stylesheet" :href="css">
    <div class="head">
      <span class="as iconfont aicon-fanhui" @touchend="fan()"></span>
      <span
        class="ling iconfont aicon-dianzan"
        @touchend="jia()"
        :style="style1"
      >&nbsp;&nbsp;{{popularity}}</span>
      <span
        class="ling iconfont aicon-comment"
        @touchstart="start($event)"
        @touchmove="move($event)"
        @touchend="end()"
      >&nbsp;&nbsp;{{comments}}</span>
      <span class="shou iconfont aicon-xingxing1" @touchend="tiao()" :style="style"></span>
      <span class="more iconfont aicon-fenxiang3"></span>
    </div>
    <div class="tit">
      <img :src="img" alt>
      <div class="title">
        <h3>{{title}}</h3>
        <em>{{image_s}}</em>
      </div>
    </div>
    <div v-html="bd"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import api from "../../common/js/api";
export default {
  components: {},
  props: {},
  data() {
    return {
      style: {
        a: false,
        color: "#ffffff"
      },
      style1: {
        a: false,
        color: "#ffffff"
      },
      css: "",
      id: "",
      bd: "",
      img: "",
      image_s: "",
      title: "",
      comments: "",
      popularity: ""
    };
  },
  computed: {
    background() {
      return {
        "background-image": "url(" + this.img + ")"
      };
    }
  },
  methods: {
    jia() {
      
      this.style1.a = !this.style1.a;
      if (this.style1.a) {
        this.popularity=this.popularity+1
        this.style1.color = "yellow";
      } else {
        this.popularity=this.popularity-1
        this.style1.color = "#ffffff";
      }
    },
    tiao() {
      var arr = localStorage.getItem("arr")
        ? JSON.parse(localStorage.getItem("arr"))
        : [];
      if (arr.some(item => item.id == this.$route.query.id)) {
        //有当前id的这条信息，删除
        this.style.color = "#fff";
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id == this.$route.query.id) {
            arr.splice(i, 1);
            break;
          }
        }
      } else {
        // push
        this.style.color = "yellow";
        arr.push({
          title: this.title,
          images: this.img,
          id: this.$route.query.id
        });
      }
      localStorage.setItem("arr", JSON.stringify(arr));
      // // this.style.a = !this.style.a;
      // if (this.style.a) {
      //   this.style.color ='#ffffff'
      // } else {
      //   this.style.color = "yellow";
      // }
    },
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
      if (this.endY == 0) {
        this.$router.push("/dianp?id=" + this.id + "&pin=" + this.comments);
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id;

    var arr = localStorage.getItem("arr")
      ? JSON.parse(localStorage.getItem("arr"))
      : [];
    if (arr.some(item => item.id == this.$route.query.id)) {
      this.style.color = "yellow";
    } else {
      this.style.color = "#fff";
    }

    this.$api({
      url: api.xiangq + this.id
    }).then(d => {
      console.log(d);

      this.bd = d.data.body;
      this.img = d.data.image;
      this.image_s = d.data.image_source;
      this.title = d.data.title;
      this.css = d.data.css[0];
    });
    this.$api({
      url: api.shuj + this.id
    }).then(d => {
      this.comments = d.data.comments;
      this.popularity = d.data.popularity;
    });
  }
};
</script>

<style lang='stylus' scoped >
@import '../../common/stylu/index.styl';

.xiang {
  margin-top: 0.2rem;
}

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

  .shou {
    float: right;
    font-size: 0.5rem;
    line-height: 1rem;
    margin: 0 0.26rem;
    // color: $fonc;
  }

  .more {
    float: right;
    font-size: 0.35rem;
    line-height: 1rem;
    margin: 0 0.3rem;
    color: $fonc;
  }
}

.tit {
  height: 4rem;
  width: 100%;
  position: absolute;

  img {
    width: 100%;
    height: 100%;
  }

  .title {
    position: absolute;
    bottom: 0;
    width: 100vw;

    h3 {
      padding: 0.1rem 0.3rem;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 1.6rem;
      width: 100vw;
      line-height: 0.8rem;
      font-size: 0.4rem;
      color: $bg2;
      box-sizing: border-box;
      background: rgba(0, 0, 0, 0.2);
    }

    em {
      height: 0.4rem;
      line-height: 0.2rem;
      color: $fonc2;
      float: right;
    }
  }
}
</style>