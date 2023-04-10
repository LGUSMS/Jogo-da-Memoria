
//chamando a grid(cartas);;
const grid = document.querySelector('.grid');

//criando variavel para chamar o nome do usuario//
const spanPlayer = document.querySelector('.player')

//pegando o nome do player//
const player = document.querySelector('player');

//criando variável para o time//
const timer= document.querySelector('.timer');


//array de personagens//
const characters= [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];

//criando elemento html//
    const createElement = (tag,className) =>{
    const element = document.createElement(tag)
    element.className = className;
    return element;

}

    let firstCard = '';
    let secondCard = '';
     
            
      //checando se as cartas são iguais//       
    const checkCards = () =>{
        const firstCharacter = firstCard.getAttribute('data-character');
        const secondCharacter = secondCard.getAttribute('data-character');

        if (firstCharacter === secondCharacter){

          firstCard.firstChild.classList.add('disabled-card');
          secondCard.firstChild.classList.add('disabled-card');


            firstCard = '';
            secondCard= '';

            checkEndGame();
          

        }else {

        setTimeout(()=>{
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');

        firstCard= '';
        secondCard = '';

        },500)
      } 
    }

        //checando se ganhou//
        const checkEndGame = () =>{
            const disabledCards = document.querySelectorAll('.disabled-card');
    
            if (disabledCards.length === 20){
                clearInterval(this.loop)
                alert(`Parabéns,${spanPlayer.innerHTML}! Seu tempo foi:${timer.innerHTML}`);
                
            }
        }

    const revealCard = ({target}) =>{

     
     if(target.parentNode.className.includes('reveal-card')){
        return;
     }
     if(firstCard === ''){
      target.parentNode.classList.add('reveal-card');
      firstCard = target.parentNode;

     }else if (secondCard === ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
     }

   

    }


    //criando carta//
    const createCard = (character) =>{

        const card =createElement('div','card');
        const front =createElement('div','face front');
        const back =createElement('div', 'face back');
         
        front.style.backgroundImage = `url('../images/${character}.png')`;


        card.addEventListener('click',revealCard);
        card.setAttribute('data-character',character)
      

        card.appendChild(front);
        card.appendChild(back);
    
    

    return card;

}
 //carrega o jogo//

 const loadGame = () =>{
    const duplicatecharacters = [...characters,...characters];

    const shuffledArray = duplicatecharacters.sort(() => Math.random()-0.5);

    shuffledArray.forEach((character) =>{
        const card = createCard(character);
        grid.appendChild(card);
    })
}



     //criando contator de tempo//
     const startTime = () => {

        this.loop = setInterval(() => {
        const currentTime =  +timer.innerHTML;
         timer.innerHTML = currentTime + 1;

        }, 1000);
     }
     



    //pegando o nome do usuário e trazendo para tela de do jogo//
    window.onload = () =>{
    spanPlayer.innerHTML= localStorage.getItem('player');

    startTime();
    loadGame();
 }
