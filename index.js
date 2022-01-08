const cartas = [
  {
    name: "um",
    img: "img/um.png",
  },
  {
    name: "dois",
    img: "img/dois.png",
  },
  {
    name: "tres",
    img: "img/tres.png",
  },
  {
    name: "quatro",
    img: "img/quatro.png",
  },
  {
    name: "cinco",
    img: "img/cinco.png",
  },
  {
    name: "seis",
    img: "img/seis.png",
  },
  {
    name: "sete",
    img: "img/sete.png",
  },
  {
    name: "oito",
    img: "img/oito.png",
  },
];



let jogadas = document.getElementById("jogadas")
jogadas.innerHTML += `Melhor Tempo: ${localStorage["Seconds"]}s`


if (localStorage["Seconds"] === undefined || localStorage["Seconds"] === 0){
  jogadas.innerHTML = `Melhor Tempo: `
}

const gameGrid = cartas
.concat(cartas)
.sort(() => 0.5 - Math.random());

const game = document.getElementById("game");
const grid = document.createElement("section");
grid.setAttribute("class", "grid");
game.appendChild(grid);

gameGrid.forEach((item) => {
const { name, img } = item;

const card = document.createElement("div");
card.classList.add("card");
card.dataset.name = name;

const front = document.createElement("div");
front.classList.add("front");

const back = document.createElement("div");
back.classList.add("back");
back.style.backgroundImage = `url(${img})`;

grid.appendChild(card);
card.appendChild(front);
card.appendChild(back);

// Deixa todas as cartas viradas e depois de 3 segundos ele retorna

card.classList.add("selected");

setTimeout(() => {
  card.classList.remove("selected");
}, 3000);
// -------------------------------------
});



// Inicia o jogo
function iniciar() {

  var inicio = new Date();


  let firstGuess = "";
  let secondGuess = "";
  let count = 0;
  let previousTarget = null;
  let delay = 1500;
  let pontos = 0;

  

  const btn = document.getElementById("btInicio");
  const timer = document.getElementById("temporizador");

  btn.disabled = true;
  btn.style.display = "none";
  timer.innerText = "Jogo iniciado";
  timer.style.background = "orange";


  const match = () => {
    const selected = document.querySelectorAll(".selected");
    selected.forEach((card) => {
      card.classList.add("match");
    });
  };

  const resetGuesses = () => {
    firstGuess = "";
    secondGuess = "";
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll(".selected");
    selected.forEach((card) => {
      card.classList.remove("selected");
    });
  };

  grid.addEventListener("click", (event) => {
    const clicked = event.target;

    if (
      clicked.nodeName === "SECTION" ||
      clicked === previousTarget ||
      clicked.parentNode.classList.contains("selected") ||
      clicked.parentNode.classList.contains("match")
    ) {
      return;
    }

    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name;
        console.log(firstGuess);
        clicked.parentNode.classList.add("selected");
      } else {
        secondGuess = clicked.parentNode.dataset.name;
        console.log(secondGuess);
        clicked.parentNode.classList.add("selected");
      }

      if (firstGuess && secondGuess) {
        if (firstGuess === secondGuess) {
          setTimeout(match, delay);
          pontos++;
          if (pontos === 8) {
            let resultado = 0
            timer.style.background = "green";
            timer.style.color = "white";
            
            document.getElementById("btFim").style.display = "block";
            btn.disabled = false;
            var fim = new Date();
            resultado = Math.floor((fim - inicio) / 1000);
            timer.innerHTML = `Parabens ! 
            Você ganhou em ${resultado}s`;

            if (localStorage["Seconds"] === undefined || resultado < localStorage.getItem("Seconds") ){
              localStorage.setItem("Seconds", resultado)
              jogadas.innerHTML += `${localStorage["Seconds"]}s`
            }
          }
        }
        setTimeout(resetGuesses, delay);
      }
      previousTarget = clicked;
    }
  });
}



