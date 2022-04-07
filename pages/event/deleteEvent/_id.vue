<template lang="html">
  <div class="cont">
   <div class="mainCont">
     <div class="navbar">
       <nuxt-link class="arrow" to="/main"></nuxt-link>
       <h4></h4>
       <div class="star"></div>
     </div>
     <div class="main">
       <div class="headerBlock">
         <div class="twoInpBlock">
           <input type="text" name="name" ref="name">
           <input type="text" name="name" ref="time">
           <input type="text" name="name" ref="format">
         </div>
         <button type="button" class="but">Прикрепить фотографии</button>
       </div>
       <textarea class="bigInput" ref="main">
         {{ main }}
       </textarea>
       <div class="button_block">
         <button type="button" class="but" @click="Change()">Изменить мероприятие</button>
         <button type="button" class="but" @click="Delete()">Удалить мероприятие</button>
       </div>
       <p v-show="false" id="first"> {{ $route.params.id }}</p>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      main:"",
    }
  },
  mounted(){
    if(localStorage.getItem('role') == 'student'){
      document.location.href = "http://activaevitae.hopto.org/main"
    }
    let self = this
    let id = document.getElementById('first').innerHTML
    const requestURL = `https://activae-vitae.herokuapp.com/event?id=${id}`

    function sendRequest(method, url, body = null) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()

          xhr.open(method, url)

          xhr.responseType = 'json'
          xhr.setRequestHeader('Content-Type', 'application/json')


          xhr.onload = () => {
            resolve(xhr.response)
            let stas = xhr.response;
            self.main = stas.event.description;
            self.$refs.name.value = `${stas.event.name}`
            self.$refs.time.value = `${stas.event.date}`
            self.$refs.format.value = `${stas.event.format}`
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
    Delete(){
      let next = document.getElementById('first').innerHTML
      const requestURL = `https://activae-vitae.herokuapp.com/event?id=${next}`

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


        sendRequest('DELETE', requestURL)
          .then(data => console.log(data))
          .catch(err => console.log(err))


    },
    Change(){
      let name = this.$refs.name.value
      let time = this.$refs.time.value
      let format = this.$refs.format.value
      let main = this.$refs.main.value
      let shortMain = main.substring(0, 100)
      let next = document.getElementById('first').innerHTML
      const requestURL = `https://activae-vitae.herokuapp.com/event?id=${next}&name=${name}&date=${time}&format=${format}&description=${main}&short_description=${shortMain}`

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


        sendRequest('PATCH', requestURL)
          .then(data => console.log(data))
          .catch(err => console.log(err))

          alert("Событие изменено!")
    }
  }
}
</script>

<style lang="css" scoped>
body{
    max-width: 1500px;
}
.cont{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mainCont{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1500px;
}
.main{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: -30px;
}
.headerBlock{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  align-items: flex-end;
}
input{
  margin-top: 32px;
  background: #FFFFFF;
  border:none;
  width: 280px;
  height: 50px;
  font-size: 18px;
  padding: 0 20px;
}
.twoInpBlock{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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
h4{
  margin-top: 10px;
}
.but{
  border: none;
  border-radius: 12px;
  font-size: 20px;
  margin-top: 20px;
  background-color: white;
  width: 283px;
  height: 60px;
}
.bigInput{
  width: 70%;
  min-height: 400px;
  margin-top: 32px;
  background: #FFFFFF;
  padding: 10px;
  border:none;
}
.button_block{
  width: 70%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 150px;
}
@media (max-width: 857px) {
  .headerBlock{
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  .twoInpBlock{
    width: 100%;
  }
  input{
    width: 90%;
  }
  .but{
    width: 200px;
    height: 50px;
  }
  .bigInput{
    width: 90%;
  }
  .button_block{
    width: 100%;
    justify-content: center;
  }
}
</style>
