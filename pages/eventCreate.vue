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
           <input type="text" name="name" placeholder="Навание события" id="name">
           <input type="text" name="password" placeholder="Дата проведения. пример: 21.09.2001" id="date" >
           <input type="time" name="password" placeholder="Время проведения" id="time" >
           <select id="sl">
             <option>Очно</option>
             <option>Заочно</option>
           </select>
         </div>
         <button type="button" class="but">Прикрепить фотографии</button>
       </div>
       <textarea class="bigInput" placeholder="Описание события" id="main">
         Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
       </textarea>
       <div class="button_block">
         <button type="button" class="but" @click="send()">Создать мероприятие</button>
       </div>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  methods:{
    send(){
     let date = document.getElementById('date').value + " " + document.getElementById('time').value
     let name = document.getElementById('name').value
     let main = document.getElementById('main').value
     let sl = document.getElementById('sl').value
     let shortMain = main.substring(0, 100);
     console.log(shortMain);


     console.log(main);


     const requestURL = 'https://activae-vitae.herokuapp.com/event'

      function sendRequest(method, url, body = null) {
          return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.open(method, url)

            let stas = localStorage.getItem('token')

            xhr.responseType = 'json'
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.setRequestHeader('Authorization' , `Basic ${stas}`)

            xhr.onload = () => {
              resolve(xhr.response);
            }

            xhr.onerror = () => {
              reject(xhr.response)
            }

            xhr.send(JSON.stringify(body))
          })
        }

        const body = {
          name: name,
          date: date,
          description: main,
          short_description: shortMain,
          format: sl,
          photos: "n"
        }


        sendRequest('POST', requestURL, body)
          .then(data => console.log(data))
          .catch(err => console.log(err))

     alert("Мероприятие Создано")
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
select{
  margin-top: 32px;
  background: #FFFFFF;
  border:none;
  width: 280px;
  height: 50px;
  font-size: 18px;
  padding: 0 10px;
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
