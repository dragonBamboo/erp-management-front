<template>
  <div id="container">
    <p>看累了？放松一下吧</p>
    <audio controls>
      <source :src="result.data.url" type="audio/mp3">
      <el-button @click="initAudio">下一首</el-button>
    </audio>
  </div>
</template>

<script>
import axios from "axios";

const resultDefault = {
    code: '',
    name: '',
    coverImgUrl: '',
    tags: '',
    data: {
        name: '',
        alname: '',
        id: '',
        url: '',
        picurl: '',
        artistsname: ''
    }
}
export default {
    name: "RelaxView",
    data() {
        return {
            result: resultDefault
        }
    },
    methods:{
        initAudio() {
            // axios.get('https://api.wqwlkj.cn/wqwlapi/wyy_random.php?type=json')
            //     .then((response)=>{
            //         console.log(response.data)
            //         this.result = response.data
            //     })
            //     .catch((error)=>{
            //         console.log(error)
            //     })
        },
    },
    created() {
        this.initAudio()
    }
}
</script>

<style scoped>

</style>