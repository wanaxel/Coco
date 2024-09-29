let currentStep = 0;
const steps = [
    {
        title: "Statement",
        description: `A line of code is called a statement. A statement performs a specific task. The output command is an example of a statement.
                      <br><br>
                      System.out.println("Write one, run anywahere!");
                      <br>
                      Question:
                      <br>
                      <button class="answer-button" onclick="checkAnswer('A', 'B')">A. Angle bracket></button>
                      <br>
                      <button class="answer-button" onclick="checkAnswer('B', 'B')">B. Semicolon;</button>
                      <br>
                      <p id="feedback"></p>`
    },
  
    {
        title: "Multiple Statement",
        description: `You can add as many statements (or lines of code) as you need. The following piece of code consists of 2 statements. It outputs two messages in different lines.
                      <br></br>
                      public class Program 
                      {
                        public static void main(string[] args){
                            System.out.println("Name: ");
                            System.out.println("Surename: ");
                        }
                      }
                      <br><br>
                      Complete the code without errors
                      <br>
                      System.out.println"Address)
                      System.out.println("Phone Number";
                      <br>
                      Answer:
                      <br>
                      <button class="answer-button" onclick="checkAnswer('A', 'A')">A. (, ;, ) </button>
                      <br>
                      <button class="answer-button" onclick="checkAnswer('B', 'A')">B. ), ;, (</button>
                      <br>
                      <button class="answer-button" onclick="checkAnswer('C', 'A')">C. ), ), ;</button>
                      <p id="feedback"></p>`
    },
    
    {
        title: "Text vs Numbers",
        description: `Computers treat text and numbers differently. When printing text outputs, you need to enclose the text in double quotes. You don't need quotes when outputting numbers.
                    <br><br>
                    public class Program{
                        public static void main(String[] args){
                            System.out.println("Points: ");
                            System.out.println(500);
                        }
                    }
                    <br>
                    Question: 
                    <br> 
                    write code that have an output of 5
                    <br></br>

                    Answer: 
                    <br>
                    <button class="answer-button" onClick="checkAnswer('A', 'A')">A. System.out.println(5);</button>
                    <br>
                    <button class="answer-button" onClick="checkAnswer('B', 'A')">B. System.out.println(“5”);</button> 
                    <br>
                    <p id="feedback"></p>`
    },

    {
        title: "write code that runs without errors",
        description: `  System.out.("Account Balance:")
                        System..println(5000);
                        <br></br>
                        Answer:
                        <br>
                        <button class="answer-button" onClick="checkAnswer('A', 'A')">A. System.out.println(“Account balance:”);
                        System.out.println(5000);</button>
                        <br>
                        <button class="answer-button" onClick="checkAnswer('B', 'A')">B. System.out.println(Account balance:);
                        System.out.println(“5000”);</button>
                        <br>
                        <button class="answer-button" onClick="checkAnswer('C', 'A')">C. System.out.println(“account Balance:”);
                        System.out.println(5000);</button>     
                        <br>                   
                        <p id="feedback"></p>`
    },

    {
        title: "Java is",
        description: `When you write a code of java, you need to pay attention to the correct input of uppercase and lowercase letters. That mean java is an?
                      <br> 
                      <button class="answer-button" onClick="checkAnswer('A', 'B')">A. case-insensitive language</button>
                      <br>
                      <button class="answer-button" onClick="checkAnswer('B', 'B')">B. case-sensitive language</button>
                      <br>
                      <p id="feedback"></p>`
    },
    
    {
        title: "Lesson Takeaways",
        description:`Great work 🎯! You completed the lesson. You learned that:
                    <br></br>
                    💡 You can add multiple statements to your programs
                    <br>
                    💡 Text needs to be enclosed in quotes
                    <br>
                    💡 Java is a case-sensitive language.
                    <br></br>
                    In the next lesson, you’ll learn about the structure of programs in Java.
                        `
    }
];

document.addEventListener("DOMContentLoaded", () => {
    loadStep(currentStep);
});

function loadStep(stepIndex) {
    document.getElementById("course-title").innerHTML = steps[stepIndex].title;
    document.getElementById("course-description").innerHTML = steps[stepIndex].description;
    updateProgressBar(stepIndex);
    document.getElementById("next-button").disabled = true;
    document.getElementById("feedback").innerHTML = '';
}

function updateProgressBar(stepIndex) {
    const progressBar = document.getElementById("progress-bar");
    const progress = ((stepIndex + 1) / steps.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        loadStep(currentStep);
        saveProgress(currentStep);
    }
}

function previousStep() {
    if (currentStep > 0) {
        currentStep--;
        loadStep(currentStep);
        saveProgress(currentStep);
    }
}

function saveProgress(stepIndex) {
    fetch("/save-progress", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ step: stepIndex })
    }).then(response => response.json())
      .then(data => console.log(data));
}

function checkAnswer(selectedAnswer, correctAnswer) {
    const feedback = document.getElementById("feedback");
    if (selectedAnswer === correctAnswer) {
        feedback.innerHTML = "Correct! You can proceed to the next step.";
        document.getElementById("next-button").disabled = false;
    } else {
        feedback.innerHTML = "Wrong answer. Please try again.";
        document.getElementById("next-button").disabled = true;
    }
}