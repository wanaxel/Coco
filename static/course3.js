let currentStep = 0;
const steps = [
    {
        title: "Java Program",
        description: `
        In this lesson we will break down the structure of Java programs and understand how they work.
        <br><br>
        The whole code to create a valid Java program that outputs a simple text is the following:
        <br><br>
        class Demo{
            public static void main(String[] args) {
                System.out.println("Hi there");
            }
        }
        <br></br>
        The first line of the code defines a class called Demo.
        <br>
        class Demo {

        }
        <br> 
        In Java, every line of code that can actually run needs to be inside a class. You can call the class anything you want.`
    },
  
    {
        title: "Java Program 2",
        description: `Our program includes one more thing that we need to cover:
                      <br></br>
                      public static void main(String[] args) {
                        System.out.println("Hi there");
                    }
                }
                      <br>
                      As you can see, the Demo class includes the following line:
                      <br>
                      public static void main(String[] args){

                      }
                      <br>
                      In Java, each application has an entry point, or a starting point, which is a method called main.
                      `
    },
    
    {
        title: "Fill in the blank",
        description: `Fill in the blanks to create a valid main method that outputs a text.
                    <br></br>
                    public static void (String[] args){
                        System.out.println("Welcome");
                    }
                    <br></br>
                    Answer:
                    <br>
                    <button class="answer-button" onClick="checkAnswer('A', 'B')">A. public static void main(args String[]) {
                        System.out.println( "Welcome" );
              }</button>
                    <br>
                    <button class="answer-button" onClick="checkAnswer('B', 'B')">B.public static void main(String[] args) {
                        System.out.println( "Welcome" );
              }</button>
                    <br>
                    <button class="answer-button" onClick="checkAnswer('C', 'B')">C. public static void welcome(String[] args) {
                        System.out.println( "Welcome" );
              }</button>
                    <br>
                    <p id="feedback"></p>`
    },

    {
        title: "Java Program 3",
        description: `The main method can contain multiple statements, for example:
                        <br>
                        class Demo{
                            public static void main(String[] args){
                                System.out.println("Welcome");
                                System.out.println("This is a demo");
                                System.out.println("Bye");
                            }
                        }
                        <br></br>
                        Fill in the blanks to create a valid Java program.
                        <br></br>
                         Bot {
                            public static void (String[] args){
                                System..println("Hello, World");
                            }
                         }
                         <br>
                        <button class="answer-button" onClick="checkAnswer('A', 'B')">A. out,main,class</button>
                        <br>
                        <button class="answer-button" onClick="checkAnswer('B', 'B')">B. class,main,out</button>
                        <br>
                        <button class="answer-button" onClick="checkAnswer('C', 'B')">C. main,out,class</button>     
                        <br>                   
                        <p id="feedback"></p>`
    },

    {
        title: "Lesson Takeaways",
        description: `Great job 🎯! You now know how to create a valid Java program structure!
                      Remember the following important points:
                      <br></br>
                      💡 You need to start your program by creating a class.
                      <br>
                      💡 The class needs to include a main method, which is the starting point of the program.
                      <br>
                      💡 The main method includes the statements that need to be executed when the program runs.
                      <br>
                      💡 The class, as well as the main method opens and closes using opening and closing curly brackets.`
    }
];

document.addEventListener("DOMContentLoaded", () => {
    loadStep(currentStep);
    nextButton.id = "next-button";
    nextButton.innerText = "Next";
    document.body.appendChild(nextButton);
});

function loadStep(stepIndex) {
    document.getElementById("course-title").innerHTML = steps[stepIndex].title;
    document.getElementById("course-description").innerHTML = steps[stepIndex].description;
    updateProgressBar(stepIndex);
    document.getElementById("next-button").disabled = true;
    document.getElementById("feedback").innerHTML = '';
    if (stepIndex === 0 || stepIndex === 1) {
        document.getElementById("next-button").disabled = false;
    }
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
        if (currentStep === 0 || currentStep === 1) {
            document.getElementById("next-button").disabled = false;
        } else {
            document.getElementById("next-button").disabled = true;
        }
    }
}
