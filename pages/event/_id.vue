<template lang="html">
  <div class="cont">
    <div class="navbar">
      <nuxt-link class="arrow" to="/main"></nuxt-link>
      <h4>{{ name }}</h4>
      <div class="star"></div>
    </div>
    <div class="main">
      <div class="buttons">
        <button type="button" name="button" class="but" v-if="one" @click="memory()">Напомнить о событии за день до начала</button>
        <button type="button" name="button" class="but" v-if="two" @click="feedback()">Оставить отзыв</button>
        <button type="button" name="button" class="but" v-if="three" @click="change()">Изменить событие</button>
        <button type="button" name="button" class="but" v-if="four" @click="feedbacks()">Отзывы</button>
      </div>
      <div class="text">
         <p>{{ main }}</p>
         <p class="time"> {{ time }}  </p>
         <p>Форма проведения: {{ och }}</p>
         <div class="sl">
           <Slider />
         </div>
         <p id="one" v-show="false">{{$route.params.id}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '@/components/Slider.vue'
import array from '@/components/array.js'
export default {
  data(){
    return{
      array:array,
      name: "",
      time: "",
      och:"",
      main: "",
      one: true,
      two: true,
      three: true,
      four: false,
      gl: 0,
    }
  },
  components:{
    Slider
  },
  mounted(){
    if(localStorage.getItem('role') == 'teacher' || localStorage.getItem('role') == 'Teacher' || localStorage.getItem('role') == 'Director' || localStorage.getItem('role') == 'director'){
      this.three = true
      this.four = true
    }else {
      this.three = false
      this.four = false
    }
    let self = this
    let id = document.getElementById('one').innerHTML
    this.gl = id
    const requestURL = `https://activae-vitae.herokuapp.com/event?id=${id}`

    function sendRequest(method, url, body = null) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()

          xhr.open(method, url)

          xhr.responseType = 'json'
          xhr.setRequestHeader('Content-Type', 'application/json')


          xhr.onload = () => {
            let stas = xhr.response
            console.log(stas.event);
            self.time = stas.event.date
            self.och = stas.event.format
            self.main = stas.event.description
            self.name = stas.event.name
            resolve(xhr.response)
          }

          xhr.onerror = () => {
            reject(xhr.response)
          }

          xhr.send(JSON.stringify(body))
        })
      }



      sendRequest('GET', requestURL)
        .then(data => console.log(data))
        .catch(err => console.log(err))
  },
  methods:{
    change(){
      this.$router.push('/event/deleteEvent/' + this.gl)
    },
    feedback(){
      this.$router.push('/eventFeedbackSt/' + this.gl)
    },
    feedbacks(){
      this.$router.push('/eventFeedbackTe/' + this.gl)
    }
  }

}
</script>

<style lang="css" scoped>
body{
    max-width: 1500px;
    margin: 100px;
}
.cont{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.navbar{
  margin-top: 20px;
  height: 50px;
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.arrow{
  background: url("@/assets/arrow.svg");
  background-size: cover;
  width: 50px;
  height: 25px;
}
.star{
  background: url("@/assets/star.png");
  background-size: cover;
  width: 25px;
  height: 25px;
}
h4{
  margin-top: 10px;
}
.buttons{
  display: flex;
  flex-direction: column;
}
.main{
  display: flex;
  flex-direction: row;
  width: 95%;

}
.but{
  border: none;
  border-radius: 12px;
  font-size: 20px;
  margin-top: 20px;
  background-color: white;
  width: 283px;
  height: 85px;
}
.text{
  margin-left: 20px;
  margin-top: 20px;
  font-size: 25px;
  display: flex;
  flex-direction:column;
  align-items:flex-start;
}
.time{
  margin-top: 10px;
}
.sl{
  width: 100%;
  height: 300px;
  max-width: 500px;
}
@media (max-width: 720px) {
  .main{
    flex-direction: column;
    align-items: center;
  }
  .but{
    width: 100%;
    height: 60px;
    font-size: 15px;
  }
}
@media (max-width: 420px) {
  h4{
    font-size: 18px;
  }
  .text{
    font-size: 16px;
    margin-left: 0px;
    width: 100%;
  }
}
</style>
