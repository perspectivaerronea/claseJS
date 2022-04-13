const URL_NEW = "http://deckofcardsapi.com/api/deck/new/shuffle/";
const mesa = document.getElementById("cartas");
const nuevoJuego = document.getElementById("nuevoJuego");
const pedirCarta = document.getElementById("pedirCarta");

let baraja = "";

const getBaraja = async () =>{
    const req = await fetch(URL_NEW);
    const res = await req.json();

    baraja = res.deck_id;
/*
    let imagen = document.createElement("img");

    imagen.setAttribute("src",res.cards[0].image);

    console.log(imagen);
    mesa.appendChild(imagen);*/



    // await console.log(res.cards.value);

    // await console.log(res.cards[0].value);

    // return res.cards[0].value;
}

const getCarta = async () => {
    const URL_CARTA = `http://deckofcardsapi.com/api/deck/${baraja}/draw/?count=1`
    const req = await fetch(URL_CARTA);
    const res = await req.json();
    let imagen = document.createElement("img");
// console.log(res);
     imagen.setAttribute("src",res.cards[0].image);

    // console.log(imagen);
    mesa.appendChild(imagen);
};

nuevoJuego.addEventListener("click", getBaraja);
pedirCarta.addEventListener("click", getCarta);

