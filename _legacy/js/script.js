const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", e => {

    glow.style.left = e.clientX - 200 + "px";
    glow.style.top = e.clientY - 200 + "px";

});

const counters = document.querySelectorAll("[data-target]");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter = entry.target;
const target = +counter.dataset.target;

let count = 0;

const update = () => {

count += Math.ceil(target / 60);

if(count < target){

counter.innerText = count;
requestAnimationFrame(update);

}else{

counter.innerText = target + "+";

}

};

update();

}

});

});

counters.forEach(counter=>{

observer.observe(counter);

});