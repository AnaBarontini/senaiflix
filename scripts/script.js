// ------------------- DADOS FIXOS -------------------
// Lista de filmes e séries com título, imagem e gêneros
const dados = {
    filmes: [
      { titulo: "É Assim Que Acaba", imagem: "../assets/imgs/eassimqueacaba.webp", genero: ["Drama", "Romance"] },
      { titulo: "Bad Boys: Para Sempre", imagem: "../assets/imgs/badboys.webp", genero: ["Ação", "Comédia"] },
      { titulo: "Um Lugar Silencioso: Dia Um", imagem: "../assets/imgs/umlugarsilencioso.webp", genero: ["Ficção", "Terror", "Mistério"] },
      { titulo: "Venom", imagem: "../assets/imgs/venom.webp", genero: ["Ação", "Ficção"] },
      { titulo: "Deadpool & Wolverine", imagem: "../assets/imgs/deadpoolewolverine.webp", genero: ["Ação", "Comédia", "Ficção"] },
      { titulo: "Divertida Mente 2", imagem: "../assets/imgs/divertidamente.webp", genero: ["Ficção", "Animação", "Aventura", "Comédia"] },
    ],
    series: [
      { titulo: "Guerra dos Tronos", imagem: "../assets/imgs/gameofthrones.webp", genero: ["Ficção", "Aventura", "Ação", "Fantasia"] },
      { titulo: "Sobrenatural", imagem: "../assets/imgs/sobrenatural.webp", genero: ["Ficção", "Terror", "Mistério", "Drama", "Thriller"] },
      { titulo: "Grey's Anatomy", imagem: "../assets/imgs/greysanatomy.webp", genero: ["Drama", "Romance"] },
      { titulo: "Prison Break", imagem: "../assets/imgs/prisonbreak.webp", genero: ["Ação", "Drama", "Mistério", "Crime"] },
      { titulo: "O Senhor dos Anéis: Os Anéis de Poder", imagem: "../assets/imgs/osenhordosaneis.webp", genero: ["Ficção", "Aventura", "Sci-Fi & Fantasy"] },
      { titulo: "O Segredo do Rio", imagem: "../assets/imgs/osegredodorio.webp", genero: ["Drama", "Mistério"] },
    ]
  };
  
  // ------------------- SELETORES DO DOM -------------------
  const filmesCards = document.querySelectorAll("#filmes-container a");
  const seriesCards = document.querySelectorAll("#series-container a");
  const selectGenero = document.getElementById("genero");
  const btnLimpar = document.getElementById("limpar-filtro");
  const inputPesquisar = document.getElementById("pesquisar");
  const btnMenu = document.getElementById("menu-btn");
  const menuMobile = document.getElementById("menu-mobile");
  
  // ------------------- FUNÇÃO RENDERIZAR (AGORA GLOBAL) -------------------
  function renderizar(cards, lista, filtro = "todos") {
    cards.forEach((card, index) => {
      const item = lista[index];
      const generos = item && item.genero;
      const correspondeFiltro = filtro === "todos" || (generos && generos.includes(filtro));
  
      if (item && correspondeFiltro) {
        card.style.display = "block";
        card.style.backgroundImage = `url(${item.imagem})`;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";
      } else {
        card.style.display = "none";
      }
    });
    console.log(`Renderizados os cards com filtro: ${filtro}`);
  }
  
  // ------------------- FUNÇÃO APLICAR FILTRO -------------------
  function aplicarFiltro(generoSelecionado) {
    renderizar(filmesCards, dados.filmes, generoSelecionado);
    renderizar(seriesCards, dados.series, generoSelecionado);
  }
  
  // ------------------- EVENTOS DO DOM -------------------
  document.addEventListener("DOMContentLoaded", function () {
  
    // Filtrar quando troca o gênero
    if (selectGenero) {
      selectGenero.addEventListener("change", function () {
        aplicarFiltro(this.value);
      });
    }
  
    // Limpar filtro
    if (btnLimpar) {
      btnLimpar.addEventListener("click", function () {
        selectGenero.selectedIndex = 0;
        aplicarFiltro("todos");
      });
    }
  
    // Exibir todos os itens inicialmente
    aplicarFiltro("todos");
  });
  
  // ------------------- PESQUISA POR TEXTO -------------------
  if (inputPesquisar) {
    inputPesquisar.addEventListener("input", function () {
      const palavraDigitada = this.value.toLowerCase();
  
      filmesCards.forEach((card, index) => {
        const titulo = dados.filmes[index].titulo.toLowerCase();
        card.style.display = titulo.includes(palavraDigitada) ? "block" : "none";
      });
  
      seriesCards.forEach((card, index) => {
        const titulo = dados.series[index].titulo.toLowerCase();
        card.style.display = titulo.includes(palavraDigitada) ? "block" : "none";
      });
  
      // Volta filtro de gênero para "Todos" ao pesquisar
      if (selectGenero) selectGenero.selectedIndex = 0;
    });
  }
  
  // ------------------- MENU MOBILE -------------------
  if (btnMenu && menuMobile) {
    btnMenu.addEventListener("click", () => {
      menuMobile.style.display = menuMobile.style.display === "flex" ? "none" : "flex";
    });
  }
  