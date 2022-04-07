<template lang="html">
  <div class="cont">
    <div class="navbar">
      <nuxt-link class="arrow" to="/main"></nuxt-link>
      <h4>Событие</h4>
      <div class="star"></div>
    </div>
    <div class="main">
      <div class="headerBlock">
        <h3>Вам понравилось мероприятие?</h3>
        <div class="buttons">
          <button type="button" class="YesNo" ref="a" @click="yes()" v-bind:class="{ gray: a }">Да</button>
          <button type="button" class="YesNo" ref="b" @click="no()" v-bind:class="{  gray: b }">Нет</button>
          <button type="button" class="YesNo" ref="c" @click="don()" v-bind:class="{  gray: c }">Не знаю</button>
        </div>
      </div>
      <div class="mainBlock">
        <h3>Если хотите, можете оставить более подробный отзыв:</h3>
        <textarea class="bigInput" ref="text">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </textarea>
      </div>
      <div class="buttonBlock">
        <button type="button" class="but" @click="send()">Отправить отзыв</button>
        <p v-show="false" id="one">{{ $route.params.id }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      rate: 2,
      a: true,
      b: true,
      c: true
    }
  },
  methods:{
    send(){
      let rate = this.rate
      let id = document.getElementById('one').innerHTML
      let text = this.$refs.text.value
      if (text.length > 100) {
        alert("Комментарий слишком длинный.Максимум можно написать 100 символов")
      }
      else{
        const requestURL = `https://activae-vitae.herokuapp.com/comments`

        function sendRequest(method, url, body = null) {
            return new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest()

              xhr.open(method, url)

              let stas = localStorage.getItem('token')

              xhr.responseType = 'json'
              xhr.setRequestHeader('Content-Type', 'application/json')
              xhr.setRequestHeader('Authorization' , `Basic ${stas}`)


              xhr.onload = () => {
                resolve(xhr.response)
              }

              xhr.onerror = () => {
                reject(xhr.response)
              }

              xhr.send(JSON.stringify(body))
            })
          }

          const body = {
            event_id: id,
            text: text,
            rate: rate
          }

          sendRequest('POST', requestURL, body)
            .then(data => console.log(data))
            .catch(err => console.log(err))


          alert("Спасибо,ваш отзыв отправвлен")
      }
    },
    yes(){
      this.rate = 1
      this.a = false
      this.b = true
      this.c = true
    },
    no(){
      this.rate = -1
      this.a = true
      this.b = false
      this.c = true
    },
    don(){
      this.rate = 0
      this.a = true
      this.b = true
      this.c = false
    }
  }
}
</script>

<style lang="css" scoped>
body{
    max-width: 1500px;
}
.gray{
  background-color: white;
}
.cont{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.main{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 30px;
}
.mainBlock{
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-top: 50px;
}
.navbar{
  margin-top: 20px;
  height: 50px;
  width: 100%;
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
  background: none;
  background-size: cover;
  width: 25px;
  height: 25px;
}
.headerBlock{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  align-items: center;
}
.YesNo{
  width: 100px;
  height: 45px;
  border: none;
  border-radius: 12px;
  font-size: 20px;
}
h3{
  margin-top: 10px;
}
.bigInput{
  width: 100%;
  min-height: 200px;
  margin-top: 32px;
  background: #FFFFFF;
  padding: 10px;
  border:none;
}
.but{
  border: none;
  border-radius: 12px;
  font-size: 20px;
  margin-top: 20px;
  background-color: white;
  width: 283px;
  height: 40px;
}
.buttonBlock{
  display: flex;
  justify-content: flex-end;
  width: 70%;
}
@media (max-width: 750px) {
  h3{
    font-size: 20px;
  }
}
@media (max-width: 650px) {
  .headerBlock{
    flex-direction: column;
    align-items: flex-start;
  }
  h3{
    font-size: 18px;
  }
  .mainBlock{
    margin-top: 10px;
  }
}
</style>
