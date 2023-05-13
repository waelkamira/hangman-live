let allButtons = document.querySelectorAll('.button');
let result = document.querySelector('.result');
let showShots = document.querySelector('.shots');
let showWord = document.querySelector('.show--word');
let spaceShow = document.querySelector('.space');
let won = document.querySelector('.won');
let playAgain = document.querySelector('.play--again');
let imgs = document.querySelectorAll('.img');
let photos = document.querySelector('.photos');


fetch("https://random-word-api.herokuapp.com/word?number=1")
  .then(response => response.json())
  .then(words => {
    const randomWord = words[0];
    console.log(randomWord);
  
    let myWord = randomWord.split('');
    let spaceWord = randomWord.split('');
    let space = [];
    let randomArray = [];
    let shots = 10;
    showShots.textContent = `you have ${shots} shots`;
    
    // this function to make to arrays space that is full with spaces '_'
    // and randomArray to compare it with space array when the user won
    function myArrays () {
        for(let i = 0; i < spaceWord.length; i++){
            randomArray.push(spaceWord[i]);

            spaceWord[i] = '_';
            space.push(spaceWord[i]);
            spaceShow.textContent = space
        }
    }
        myArrays()


        // عمل لوب على الازرار كلها
        for(let le = 0; le < allButtons.length; le++) { 

            //   le indexعمل مستمع حدث للزر صاحب ال
            allButtons[le].addEventListener('click', function (){ 

                if(space === randomArray) {
                    won.classList.remove('hidden');
                }
                
                // make the clicked button displayed and clicked
                allButtons[le].classList.add('clicked');
                allButtons[le].classList.add('display');

                // في متغير le index وضع القيمة النصية للزر ذو 
                let myKey = allButtons[le].textContent ;

                 // عمل باترن يحتوي على قيمة الزر النصية لمقارنتها مع حروف الكلمة العشوائية
                let myLetter = new RegExp(`(${myKey})`, 'ig');
                
                // مقارنة الباترن مع حروف الكلمة العشوائية وحفظها في متغير
                let randomWordLetter = randomWord.match(myLetter); 
                    
                    // اي أن الكلمة لاتحتوي على هذا الحرفnullاذا كانت القيمة 
                    if(randomWordLetter === null) { 
                        console.log('this letter is no exsit in the randomWord');
                        shots--
                        showShots.textContent = `you have ${shots} shots`;

                        imgs[9 - shots].classList.remove('hidden');
                        imgs[10].classList.remove('hidden');

                        if(shots <= 0) {
                            showShots.textContent = '💣 Game Over 💣';

                            for(let le = 0; le < allButtons.length; le++) {
                                allButtons[le].classList.add('display');
                            } 
                        }

                    } else {     // اذا كانت الكلمة العشوائية تحتوي على هذا الحرف

                        if(randomWordLetter.length > 1){

                            for(let i = 0; i < spaceWord.length; i++){
                                
                                if(randomWordLetter[0] === myWord[i]) { // 'wood
                                    
                                    space[i] = randomWordLetter[0];
                                    spaceShow.textContent = space;
                                    
                                    console.log(randomArray);
                                    console.log(space);

                                    if(space == randomArray && shots !== 0) {
                                        won.classList.remove('hidden');
                                    }
                                }
                            }

                        } else {
                            
                            space[randomWord.indexOf(randomWordLetter)] = randomWordLetter[0];
                            spaceShow.textContent = space;
                            
                            console.log(randomArray);
                            console.log(space);

                            if(space == randomArray && shots !== 0) {
                                won.classList.remove('hidden');
                            }
                        }
                        
                    }
            })
        }

        playAgain.addEventListener('click', function (){
            
            shots = 10;
            showShots.textContent = `you have ${shots} shots`;

            space = [];
            myArrays()
            spaceShow.textContent = space;

            // we need to remove display class from all buttons
            for(let le = 0; le < allButtons.length; le++) {
                allButtons[le].classList.remove('display');
                allButtons[le].classList.remove('clicked');
            }

            // we need to add hidden class to all photos
            for(let i = 0; i < imgs.length; i++) {
                imgs[i].classList.add('hidden');
            }
            
            location.reload()
        })
    })
    .catch(error => console.error(error));
