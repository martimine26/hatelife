<template lang="html">
  <div class="cont">
    <div class="navbar">
      <nuxt-link class="arrow" to="/main"></nuxt-link>
      <h4>Событие</h4>
      <p v-show="false" id="id">{{$route.params.id}}</p>
      <div class="star"></div>
    </div>
    <div class="main" style="max-width:1300px">
      <div class="diagram">
        <canvas id="myCanvas"></canvas>
        <h4>70% понравилось<br>30% не понравилось</h4>
      </div>
      <div class="mb-3">
        <div v-for="item in joy" :key="item.id">
          <div class="col">
           <div class="card" style="z-index:1">
            <div class="card-img-top"></div>
            <div class="card-body">
              <p class="card-text">{{ item.text }}</p>
            </div>
          </div>
         </div>
        </div>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      joy:[],
    }
  },
  mounted(){
    let id = document.getElementById('id').innerHTML
    let myCanvas = document.getElementById('myCanvas')

    let self = this
    const requestURL = `https://activae-vitae.herokuapp.com/comments?event_id=${id}`

    function sendRequest(method, url, body = null) {
        return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()

          xhr.open(method, url)

          xhr.responseType = 'json'
          xhr.setRequestHeader('Content-Type', 'application/json')


          xhr.onload = () => {
            let stas = xhr.response
            console.log(stas);
            for(let i = 0; i < stas.comments.length; i++){
              self.joy.push(stas.comments[i])
            }
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


        var myCnvas = document.getElementById("myCanvas");
        myCnvas.width = 300;
        myCnvas.height = 300;


        function drawPieSlice(ctx,centerX, centerY, radius, startAngle, endAngle, color ){
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(centerX,centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();
        }

        var myVinyls = {
          "Понраввилочь": 10,
          "Не знаю": 14,
          "Не понравилось": 50
        };

        var Piechart = function(options){
            this.options = options;
            this.canvas = options.canvas;
            this.ctx = this.canvas.getContext("2d");
            this.colors = options.colors;

            this.draw = function(){
                var total_value = 0;
                var color_index = 0;
                for (var categ in this.options.data){
                    var val = this.options.data[categ];
                    total_value += val;
                }

                var start_angle = 0;
                for (categ in this.options.data){
                    val = this.options.data[categ];
                    var slice_angle = 2 * Math.PI * val / total_value;

                    drawPieSlice(
                        this.ctx,
                        this.canvas.width/2,
                        this.canvas.height/2,
                        Math.min(this.canvas.width/2,this.canvas.height/2),
                        start_angle,
                        start_angle+slice_angle,
                        this.colors[color_index%this.colors.length]
                    );

                    start_angle += slice_angle;
                    color_index++;
                }

            }
        }

        var myPiechart = new Piechart({
                canvas:myCnvas,
                data:myVinyls,
                colors:["#fde23e", "#57d9ff","#937e88"]
            });
        myPiechart.draw();

  }
}
</script>

<style lang="css" scoped>
.cont{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
.main{
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 90%;
}
.diagram{
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
  margin-right: 40px;
}
.card-img-top{
  width: 100%;
  height: 30px;
  background: #9FB7FF;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}
h5{
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.card{
  background-color: #C6D4FF;
  margin-top: 30px;
  min-width: 300px;
}
@media (max-width: 600px) {
 .main{
   flex-direction: column;
   align-items:center;
 }
 .diagram{
   margin-right: 0px;
 }
}
</style>
