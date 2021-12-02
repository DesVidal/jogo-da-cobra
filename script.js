let canvas = document.getElementById('snake') //chama o id do html;
let context = canvas.getContext('2d') //context: renderiza o desenho no canvas; indicando 2d ele passa a tratar o arquivo como 2d;
let box = 32
let snake = []
snake[0] = {
  x: 8 * box,
  y: 8 * box
}
let direction = 'right'

let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
  // criarBG = criar background => quadrado verde
  context.fillStyle = 'lightblue' //context cria fundo: fillStyle trabalha com o estilo,  desenha o fundo 2D
  context.fillRect(0, 0, 16 * box, 16 * box) //fillRect: desenha o retângulo onde a cobra caminha; fillRect: trabalha com 4 parâmetros: x, y, altura e lardura; cada quadradinho do jogo terá 32px,
}

function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    context.fillStyle = 'green'
    context.fillRect(snake[i].x, snake[i].y, box, box)
  }
}
// criando a 'comida' da cobrinha
function drawFood() {
  context.fillStyle = 'red'
  context.fillRect(food.x, food.y, box, box) // cria um array para as coordenadas de movimento da comida -> "let food". Usa 2 métodos  que criam números aleatórios e fazem ela aparecer e desaparecer em lugares diferentes da tela:
}

document.addEventListener('keydown', update) // evento de 'escuta': capta o comando e executa o código correspondente para movimentar a cobrinha

//programando as direções da cobrinha. não andará na direção oppsta.
function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left'
  if (event.keyCode == 38 && direction != 'down') direction = 'up'
  if (event.keyCode == 39 && direction != 'left') direction = 'right'
  if (event.keyCode == 40 && direction != 'up') direction = 'down'
}

function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == 'right') snake[0].x = 0 //se o valor de 'snake[0], que é a cabeça, em X, for maior que 15, indo para a direita, ela sairá da tela, e aí recebe o valor de 0 e reaparece na posição [0], lado esquerdo da tela; Fazer em todas as direções.
  if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0
  if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      clearInterval(jogo)
      alert('Game Over')
    }
  }

  criarBG()
  criarCobrinha()
  drawFood()

  let snakeX = snake[0].x //array na posição 0 de x
  let snakeY = snake[0].y //array na posição 0 de y

  if (direction == 'right') snakeX += box
  if (direction == 'left') snakeX -= box
  if (direction == 'up') snakeY -= box
  if (direction == 'down') snakeY += box

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop() //retira o último elemento do array
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box //alterando a posição da comida em x
    food.y = Math.floor(Math.random() * 15 + 1) * box // alterando a posição da comida em y
  }

  let newHead = {
    x: snakeX,
    y: snakeY
  }

  snake.unshift(newHead)
}

let jogo = setInterval(iniciarJogo, 100)
