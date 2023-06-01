const socket = io('http://localhost:8000');

const form = document.getElementById("send-container");
const massageInput = document.getElementById("massageInp");
const massageContainer = document.querySelector(".container");
const audio = new Audio('extra/sound.mp3')

const append = (massage, position)=>{
    const massageElement = document.createElement('div');
    massageElement.innerText = massage;
    massageElement.classList.add('massage');
    massageElement.classList.add(position);
    massageContainer.append(massageElement);
    if (position == 'left'){
        audio.play();
    }
}

const name = prompt("Enter Your Name");
socket.emit("user-new-joined", name);

socket.on("user-joined", name =>{
    append(`${name}: joined the chat`, 'right')
});

socket.on('receive',data =>{
    append(`${data.name}: ${data.massage}`, 'left');
});

socket.on('left', userLeft =>{
    append(`${userLeft} has left the chat`, 'right');
});

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const massage = massageInput.value;
    append(`You: ${massage}`, 'right');
    socket.emit("send", massage);
    massageInput.value = ''
})