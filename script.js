                                  // use gt code practice

const scroller = document.getElementById("scroller");
const leftButton = document.querySelector(".scroll-btn.left");
const rightButton = document.querySelector(".scroll-btn.right");
                                      
                                          // Initially hide the left button
 leftButton.classList.add("hidden");
                                          // Function to scroll left
 function scrollLeft() {
 scroller.scrollBy({ left: -300, behavior: "smooth" });
 }
                                      
                                         // Function to scroll right
 function scrollRight() {
 scroller.scrollBy({ left: 300, behavior: "smooth" });
 }
                                      
                                         // Update button visibility based on scroll position
 function updateButtons() {
 const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
                                      
                                         // Hide left button if at the start
 if (scroller.scrollLeft <= 0) {
leftButton.classList.add("hidden");
 } else {
  leftButton.classList.remove("hidden");
  }
                                      
                                            // Hide right button if at the end
  if (scroller.scrollLeft >= maxScrollLeft) {
   rightButton.classList.add("hidden");
   } else {
     rightButton.classList.remove("hidden");
     }
  }
                                      
                                          // Event listeners for button clicks
  leftButton.addEventListener("click", () => {
   scrollLeft();
    setTimeout(updateButtons, 300);      // Update buttons after scrolling animation
  });
   rightButton.addEventListener("click", () => {
  scrollRight();
    setTimeout(updateButtons, 300);     // Update buttons after scrolling animation
   });
                             
                                        // Event listener for scrolling
 scroller.addEventListener("scroll", updateButtons);
                                      

                                         //  typewriter effect 

const fixedPart = "Search";
const changeableWords = ["Genuine Colleges,", "Courses,", "Programs"];
const typewriterElement = document.querySelector(".typewriter");
let currentSentence = fixedPart; // Stores the fixed part with completed words
let wordIndex = 0;
let charIndex = 0;
let repeatCount = 0; // Counter for extra runs after all words are typed
                                     
function typeWriterEffect() {
const currentWord = changeableWords[wordIndex];
                                     
if (charIndex <= currentWord.length) {
// Add one character at a time
typewriterElement.textContent = `${currentSentence} ${currentWord.substring(0, charIndex)}`;
charIndex++;
} else {
// When word is completely typed, fix it and move to the next
currentSentence += ` ${currentWord}`;
charIndex = 0;
wordIndex++;
                                     
// After all words are typed
if (wordIndex === changeableWords.length) {
repeatCount++;
if (repeatCount > 2) {
// Stop after two extra runs
typewriterElement.textContent = currentSentence;
return;
}
wordIndex = 0; // Restart the effect for two extra runs
currentSentence = fixedPart; // Reset to fixed part for reruns
setTimeout(typeWriterEffect, 1000);
return;
}
                                     
// Pause before starting the next word
setTimeout(typeWriterEffect, 1000);
return;
}
                                     
setTimeout(typeWriterEffect, 150); // Typing speed
}
                                     
typeWriterEffect();

                                                 // Effect for main page slider of college images 

const imagesWrapper=document.querySelector('.slideshow-container');
const images =document.querySelectorAll('.slideshow-container');
let currentIndex=0;

function slideImages(){
  if(currentIndex<images.length-1){
    currentIndex++;
    imagesWrapper.computedStyleMap.tranform =`translateX(-${currentIndex*100}%)`;
    setTimeout(slideImages,2500);
  }else{
    // stop after all the images are shown
    console.log("slideshow complete.");
  }
}
// swiper effect on page load
 window.onload=()=>{
  setTimeout(slideImages,1000);   
 };
