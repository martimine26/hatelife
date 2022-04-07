<template lang="html">
  <section>
    <div class="cont">
      <h1>Ку)</h1>
      <input type="text" placeholder="Введите id пользователя ,чтобы его подтвердить" ref="a">
      <button type="button" name="button" id="a" @click="send()">Подтвердить</button>
    </div>
  </section>
</template>

<script>
export default {
  mounted(){
    const requestURL = `https://activae-vitae.herokuapp.com/accounts?offset=0&limit=50`

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


      sendRequest('GET', requestURL)
        .then(data => console.log(data))
        .catch(err => console.log(err))
  },
  methods:{
    send(){
      let go = this.$refs.a.value
      console.log(go);
      const requestURL = 'https://activae-vitae.herokuapp.com/verify'

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
          user_id: go
        }

        sendRequest('POST', requestURL, body)
          .then(data => console.log(data))
          .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="css" scoped>
.cont{
  width: 90%;
  margin-top: 20px;
  margin-left: 40px;
}
</style>
