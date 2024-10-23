const questionData = [
  {
    question: 'Which is the tallest grass in the world ?',
    options: ["Bamboo" , "Napier grass" , "Pampas grass" , "Lemongrass"],
    correctAnswer: 'Bamboo'
  },

  {
    question: 'What element does the chemical symbol Au stand for?',
    options: ['Silver' , 'Gold' , 'Salt' , 'Magnesium'],
    correctAnswer: 'Gold'
  },

  {
    question: 'What is the only food that cannot go bad?',
    options: ['Dark chocolate' , 'Peanut butter' , 'Canned tuna' , 'Honey' ],
    correctAnswer: 'Honey'
  },
  {
    question: 'Which was René Magritte’s first surrealist painting?',
    options: ['Not to Be Reproduced' , 'Personal Values' , 'The Lovers' , 'The Lost Jockey' ],
    correctAnswer: 'The Lost Jockey'
  },
  {
    question: 'What’s the name of Hagrid’s pet spider?',
    options: ['Nagini' , 'Crookshanks' , 'Aragog' , 'Mosag' ],
    correctAnswer: 'Aragog'
  }
]


const startBtn = document.querySelector('.js-start');
const exit = document.querySelector('.exit');
const container = document.querySelector('.container');
const instruction = document.querySelector('.instruction-container');
const startQuiz = document.querySelector('.continue');
const quizPopup = document.querySelector('.quiz-popup');
const resultPopup = document.querySelector('.result-container');
const tryAgain = document.querySelector('.tryAgain');
const goHome = document.querySelector('.goHome');


startBtn.onclick = ()=>{
  instruction.classList.add('active');
  container.classList.add('active');
};

exit.onclick = ()=>{
  instruction.classList.remove('active');
  container.classList.remove('active');
};

startQuiz.addEventListener('click' , ()=>{
  quizPopup.classList.add('start');
  instruction.classList.remove('active');
  container.classList.add('blur');
  questionText(0);
})

goHome.addEventListener('click' , ()=>{
  resultPopup.classList.remove('show');
  container.classList.remove('active');

})

tryAgain.addEventListener('click' , ()=>{
  instruction.classList.add('active');
  resultPopup.classList.remove('show')
})

let questionCount = 0;
const next = document.querySelector('.next');
next.addEventListener('click' , ()=>{
  questionCount++;
  questionText(questionCount);
  
})

function questionText(index){
  if(questionCount < 5){
    const question = document.querySelector('.question');
    question.textContent = `${index + 1}. ${questionData[index].question}`;
  
    const optionText = document.querySelector('.options');
  
    let optContainer = `
      <ol class="hello" type="A" onclick="disableOptions(event) ">
        <li class="opt" >${questionData[index].options[0]}</li>
        <li class="opt">${questionData[index].options[1]}</li>
        <li class="opt">${questionData[index].options[2]}</li>
        <li class="opt">${questionData[index].options[3]}</li>
      </ol>
    `;
  
    optionText.innerHTML = optContainer;
  
    const numOfQue = document.querySelector('.question-count');
    numOfQue.textContent = `${index + 1} of 5 Questions`;
  
    const optionChoosen = document.querySelectorAll('.opt');
    for(let i = 0 ; i < 4; i++){
      optionChoosen[i].setAttribute('onclick' , 'optionSelected(this)');
    }
  }

  else{
    resultPopup.classList.add('show');
    quizPopup.classList.remove('start');

  }
}

let count = 0;

function optionSelected(ans){
  let userAns = ans.textContent;
  let correctAns =  questionData[questionCount].correctAnswer;
  const positiveScore = document.querySelector('.final-score');
  const percent = document.querySelector('.percent');
  let progressStart = 0;
  const pieChart = document.querySelector('.pie-chart');


  if(userAns === correctAns){
      ans.classList.add('correct');
      const score = document.querySelector('.score');
      count++;
      score.textContent = `Score: ${count} / 5`;
      positiveScore.textContent = `Your Score ${count} out of 5`;
  }
  else {
    ans.classList.add('incorrect');
    
  }
  let progressEnd = ((count/5)*100);
  let progress = setInterval(()=>{
    progressStart++;
    
    percent.textContent = `${progressStart}`;
    pieChart.style.background = `conic-gradient(#9329fc ${progressStart*3.6}deg , rgba(62, 62, 62, 0.438) 0deg)`;
    
    if(progressStart == progressEnd){
      clearInterval(progress);
    }
  }, 40)
}

function disableOptions(event) {
  const targetElement = event.target;

  if (targetElement.tagName === 'LI' && targetElement.classList.contains('opt')) {
    const options = document.querySelectorAll('.opt');
    options.forEach(option => option.classList.add('disabled'));
  }
}
