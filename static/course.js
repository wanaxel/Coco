let currentStep = 0;
const steps = [
    {
        title: "Coding",
        description: `Humans use computer programs to communicate with machines. Without computer programs, we wouldn't have smartphones, websites, or even exploration in outer space.
                      <br><br>
                      Learning some coding can help you innovate and create different solutions to problems, giving you a competitive edge in this technology-driven world.
                      <br><br>
                      Question:
                      <br>
                      What's a programming language?
                      <br>
                      <button class="answer-button" onclick="checkAnswer('A', 'B')">A. A language used by machines to communicate with aliens</button>
                      <br>
                      <button class="answer-button" onclick="checkAnswer('B', 'B')">B. A language used by humans to communicate with machines</button>
                      <br>
                      <p id="feedback"></p>`
    },
  
    {
        title: "Output",
        description: `Most computer programs are designed to produce outputs. Here are some examples:
                      <ul>
                        <li>"You've got a new message" notifications</li>
                        <li>"Game Over" displayed on the screen when playing video games</li>
                        <li>Your account balance when checking your online banking app.</li>
                      </ul>
                      The simplest output consists of displaying a message on the screen.
                      <br><br>
                      Question:
                      <br>
                      Notifications and text displayed on a screen are examples of outputs from computer programs.
                      <br>
                      <button class="answer-button" onclick="checkAnswer('A', 'A')">A. True</button>
                      <br>
                      <button class="answer-button" onclick="checkAnswer('B', 'A')">B. False</button>
                      <br>
                      <p id="feedback"></p>`
    },
    
    {
        title: "Output 2",
        description: `Coders use outputs all the time to check that the computer is following the given instructions and fix problems with code. The following line of code displays Javas slogan on the screen as an output:
                    <br></br>
                    System.out.println("Write once, run anywhere!")
                    <br></br>
                    Question:
                    <br>
                    Write a line of code that outputs "New Message"
                    <br>
                    <button class="answer-button" onClick="checkAnswer('A', 'B')">A. new message</button>
                    <br>
                    <button class="answer-button" onClick="checkAnswer('B', 'B')">B. "New Message"</button>
                    <br>
                    <button class="answer-button" onClick="checkAnswer('C', 'B')">C. "new message"</button>
                    <br>
                    <button class="answer-button" onClick="checkAnswer('D', 'B')">D. println</button>
                    <br>
                    <p id="feedback"></p>`
    },

    {
        title: "The Code Playground",
        description: `You'll see other lines of code when you open the Code Playground. They are needed for the code to run without errors. You will learn everything about these lines in the upcoming lessons.
                        <br></br>
                        complete a line of code that outputs "Game Over".
                        <br>
                        Sytem.out.(..).("Game Over");
                        <br>
                        <button class="answer-button" onClick="checkAnswer('A', 'A')">A. println</button>
                        <br>
                        <button class="answer-button" onClick="checkAnswer('B', 'A')">B. print</button>
                        <br>
                        <button class="answer-button" onClick="checkAnswer('C', 'A')">C. output</button>     
                        <br>                   
                        <p id="feedback"></p>`
    },

    {
        title: "create a line of code that runs without errors.",
        description: `System.().().("Great Progress!");
                      <br> 
                      <button class="answer-button" onClick="checkAnswer('A', 'A')">A. out and println</button>
                      <br>
                      <button class="answer-button" onClick="checkAnswer('B', 'A')">B. println and out</button>
                      <br>
                      <button class="answer-button" onClick="checkAnswer('C', 'A')">C. printlnand output</button>
                      <br>
                      <p id="feedback"></p>`
    },
    
    {
        title: "lesson Takeaways",
        description: `Awesome! You completed your first lesson 🚀. Remember the following important points:
        <br></br>
        💡 You can write code that generates outputs with the System.out.println() statement
        <br>
        💡 The println instruction needs to be followed by parentheses
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