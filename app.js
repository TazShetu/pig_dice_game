/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- two consucative 6 make player loose all the score.

*/

var scores, roundScore, activePlayer, winningScore, gamePlaying;

// state variable remembers a state (gamePlaying)

// initiate function call
init();

var lastDice;


// querySelector to select and textContent to edit(but no html only plain text..)
// id name o var dia select kora jai
/* document.querySelector('#current-' + activePlayer).textContent = dice; */ 

// innerHTML also edit html (em italic text er jonno)
/* document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; */

// querySelector can also be used to read and store value from html
/* var x = document.querySelector('#current-0').textContent; */

// querySelector can be used to edit css
/* document.querySelector('.dice').style.display = 'none'; */
// here .dice is the dice class from html. style is a mathod of Js. display is css property and we set the value to none.


// getElementById works like querySelector but only select id(do not need to write #)
/*  document.getElementById('score-0').textContent = '0'; */


// addEventListener select event like click, scroll(list firefox a bookmark)
// addEventListener('event', f calll as soon as event happens)
/* function fbtn(){
     ........
    }
    fbtn();
    document.querySelector('.btn-roll').addEventListener('click', fbtn); */

// another way of writing
// here function does not have a name and cant be called elswhere
// roll btn
document.querySelector('.btn-roll').addEventListener('click', function(){
    // condition return true or false here gamePlaying is true or false
    if (gamePlaying) {
        
        // 1. read random number. 
        //(Math method er floor(integer) & random call. see internet more about Math method)
        var dice = Math.floor(Math.random() * 6) + 1;

        // 2. desplay result
        // selection can also be a var dont need o write everytime
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        // src to edit src
        // this only works if same name sequence file
        diceDOM.src = 'dice-' + dice + '.png'; 
        
       
        // 3. Update round score if its not 1
        if (dice === 6 && lastDice === 6){
            // player lose score
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer(); // nestP.. function a round score 0 kora
            
        }else {
            // !== not equal
            if (dice !== 1) {
                //add sccore
                roundScore += dice;  // x = x + y === x += y
                // display added score
                document.querySelector('#current-' + activePlayer).textContent = roundScore;

            }else {
                //Next player (function Call)
                nextPlayer();
            }
        }
        
        
        
        // 4. check if player won the gamne
        // .value property read value
        var input = document.querySelector('.final-score').value;
        // undefined, 0, nll or "" will conditioned to false everything els is true 
        if (input) {
            winningScore = input;
        }else {
            winningScore = 100;
        }
        
        
        if (scores[activePlayer] + roundScore >= winningScore){
            checkWinner();
        }
        
        lastDice = dice;
    }
    
    
});  


// HOLD btn
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. add current score to global score
        // only posssible if writing class names according to array number
        scores[activePlayer] += roundScore;

        // 2. update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // 3. Next player (function call) 
        nextPlayer();
        
    }    
});


// New Game btn (just call init) ...................................................
document.querySelector('.btn-new').addEventListener('click', init);






// check winner function
function checkWinner(){
    document.querySelector('#name-' + activePlayer).textContent = '*! Winner !*';
    // hide dice
    document.querySelector('.dice').style.display = 'none';
    // add winner class (better to write in css not manupulating css with js)
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner') 
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
    // reset state variablle (gamePlaying)
    gamePlaying = false;
};

// Dont repeat yourself

// we were using Next player for 2 times
function nextPlayer() {
    //Next player
    // another way of writing if elss .............for simple if else
    // if  x === o then x = 1 else x = 0
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    // set roundSscore to 0 for next player
    roundScore = 0;
    // set score to 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    // change active player display (active class transfer {remove and add})
    // classList(like textContent) a method(remove) call 
    /* document.querySelector('.player-0-panel').classList.remove('active');
       document.querySelector('.player-1-panel').classList.add('active');     */
        
    // like add & remove _ toggle a class thakle remove na thakle add
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    // hide dice
    document.querySelector('.dice').style.display = 'none';
};

// initiate function
function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // change winner UI
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    // add active class to player 0. But need to remove 1st cz if p0 wins there will be 2 active class
    document.querySelector('.player-0-panel').classList.add('active');
};


















