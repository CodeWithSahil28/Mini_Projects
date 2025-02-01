const quizeData = [
  {
    question: "what is full form of HTML?",
    options: [
      "Hyper Text Markup Language",
      "Hyper Text Makeup Language",
      "Hyper Text Mark Language",
      "Hyper link Markup Langauge",
    ],
    correct: 0,
  },
  {
    question: "what is full form of CSS?",
    options: [
      "Cascading Style Sheep",
      "Cartoon Style Sheet",
      "Cascading Style Sheet",
      "Cascading Super Sheet",
    ],
    correct: 2,
  },
  {
    question: "what is full form of HTTP?",
    options: [
      "Hyper Text Transfer Product",
      "Hyper Text Test Protocol",
      "Hyper Text Transfer Process",
      "Hyper Text Transfer Protocol",
    ],
    correct: 3,
  },
  {
    question: "what is full form of JS?",
    options: ["JavaScript", "JavaSuper", "JustScript", "JordenShu"],
    correct: 0,
  },
  {
    question: "Which company developed JavaScript?",
    options: ["Microsoft", "Netscape", "Sun Microsystems", "Oracle"],
    correct: 1,
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<style>", "<script>", "<css>", "<link>"],
    correct: 0,
  },
  {
    question: "Which property is used to change the background color in CSS?",
    options: ["bgcolor", "color", "background-color", "background"],
    correct: 2,
  },
  {
    question:
      "Which method is used to add an element at the end of an array in JavaScript?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correct: 0,
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["class", "style", "id", "styles"],
    correct: 1,
  },
];

const questionEl = document.querySelector("#question");
const answer = document.querySelectorAll(".ansRd");
const [option_1, option_2, option_3, option_4] = document.querySelectorAll(
  ".option_1,.option_2,.option_3,.option_4"
);
const submit = document.querySelector("#submit");
const body = document.querySelector("body");
const result = document.querySelector(".result");
const optionItems = document.querySelectorAll(".answer li");

let currentQuestion = 0;
let score = 0;

const loadQuestion = () => {
  const { question, options } = quizeData[currentQuestion];
  console.log(question, options);
  questionEl.innerText = `${currentQuestion + 1}. ${question}`;

  const optionElements = [option_1, option_2, option_3, option_4];
  optionElements.forEach((optionEl, index) => {
    optionEl.innerText = options[index];
  });
};
loadQuestion();

const getSelectedOpt = () => {
  let answerIndex;
  answer.forEach((ans, index) => {
    if (ans.checked) {
      answerIndex = index;
      console.log("answerIndex", answerIndex);
    }
  });
  return answerIndex;
};

const deselect = () => {
  answer.forEach((ans) => {
    ans.checked = false;
  });
};

submit.addEventListener("click", () => {
  const selectedOpt = getSelectedOpt();

  if (selectedOpt === undefined) {
    alert("Please select an answer!");
    return;
  }

  // ✅ Highlight the correct answer in green
  optionItems[quizeData[currentQuestion].correct].style.backgroundColor =
    "lightgreen";

  // ✅ If the selected answer is wrong, highlight it in red
  if (selectedOpt !== quizeData[currentQuestion].correct) {
    optionItems[selectedOpt].style.backgroundColor = "lightcoral";
  } else {
    score++; // ✅ Increase score if the answer is correct
  }

  setTimeout(() => {
    currentQuestion++; // Move to the next question

    if (currentQuestion < quizeData.length) {
      deselect();
      optionItems.forEach((el) => {
        el.style.backgroundColor = ""; // This resets it to default
      });
      loadQuestion();
    } else {
      // ✅ Show the final score at the end
      body.innerHTML = `<body>
          <div class="result">
            <h3>
              You've answered <span id="score">${score}</span> of <span id="total">${quizeData.length}</span>
              questions correctly!
            </h3>
            <p> Congratulations on completing the Quiz 🎉️</p>
            <div class="relode">
              <button id="reload" onclick="location.reload()">Play Again 🔄️</button>
            </div>
          </div>
          </body>`;
    }
  }, 1000); // ✅ Delay moving to the next question for 1 second to show colors
});
