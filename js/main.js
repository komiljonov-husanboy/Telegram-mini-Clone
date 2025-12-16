
let elList = document.querySelector(".list")
let elForm = document.querySelector(".message-form")
let elChooseImg = document.querySelector(".choose-img")
let elAudioBtn = document.querySelector(".audio-btn")
let elVideoBtn = document.querySelector(".video-btn")
let videoPrev = document.getElementById("video-preview")
let videoRec;
let videBox = [];
let audioBox = [];

let messageList = get("message") || []
 



// storage save start 
function set(key ,value) {
    localStorage.setItem(key , typeof value == "object" ? JSON.stringify(value) : value)
}

function get(key) {
    try{
        const result = JSON.parse(localStorage.getItem(key))
        return result
    }catch{
        return localStorage.getItem(key)
    }
}

set("message" , messageList)
// storage save end



// render message start 
function renderMessage(arr , list) {
    const reversedArr = [...arr].reverse();
   list.innerHTML = null 
    reversedArr.forEach(item => {
        let elItem  = document.createElement("li")
        list.appendChild(elItem) 
        if (item.image) {
             elItem.outerHTML = `
     <li  class=" relative    telegram-box bg-[#77cf8cff] ml-auto p-2 rounded-tl-[18px] rounded-bl-[18px] rounded-tr-[15px]  text-white text-shadow-md text-[16px] w-[80%]    ">
        <img class="w-full rounded-[18px]" src="${item.image}" alt="">
        <p class=" text-[#00000167] mt-[5px]" >${item.content}</p>
        <div class=" flex items-center justify-end gap-2  text-green-700 text-end text-[13px]">
            <span>${item.creatAt}</span>
             <img src=" ./images/check.svg" width="20"/>

        </div>
    </li>
        `
        }else if (item.audio) {
                  elItem.outerHTML = `
     <li  class=" relative    telegram-box bg-[#77cf8cff] ml-auto p-2 rounded-tl-[18px] rounded-bl-[18px] rounded-tr-[15px]  text-white text-shadow-md text-[16px] w-[80%]    ">
        <div class=" flex items-center justify-end gap-2  text-green-700 text-end text-[13px]">
           <audio controls src="${item.audio}" class="w-full"></audio> <div class="flex items-center justify-end gap-2 text-green-700 text-end text-[13px]">
            <span>${item.creatAt}</span>
             <img src=" ./images/check.svg" width="20"/>

        </div>
    </li>
        `
        }
        else if (item.video) {
    elItem.outerHTML = `
    <li class="relative telegram-box bg-[#77cf8cff] ml-auto p-2 rounded-tl-[18px] rounded-bl-[18px] rounded-tr-[15px] text-white h-[340px] w-[310px]">
        <video controls src="${item.video}" class=" rounded-full  h-[300px] border-[1px] border-green-500   w-[300px] rounded-[15px]"></video> <div class="flex items-center justify-end gap-2 text-green-700 text-end text-[13px]">
            <span>${item.creatAt}</span>
            <img src="./images/check.svg" width="20"/>
        </div>
    </li>`
}
        else{

            elItem.outerHTML = `
            <li class=" relative   telegram-box bg-[#77cf8cff] ml-auto p-2 rounded-tl-[18px] rounded-bl-[18px] rounded-tr-[15px]  text-white text-shadow-md text-[16px] w-[80%]    ">
           <p class=" text-[#00000182] mt-[5px]" > ${item.content}</p>
            <div class=" flex items-center justify-end gap-2 text-green-700 text-end  text-[13px]">
                <span class=" ">${item.creatAt}</span>
                 <img src=" ./images/check.svg" width="20"/>
            </div>
        </li>
            `
        }
    });
}
renderMessage(messageList , elList)
set("message" , messageList)    
// render message end




// choose img start 
   let urlImg;
elChooseImg.addEventListener("change", (evt)=> {
    urlImg = (URL.createObjectURL(evt.target.files[0]))
})
// choose img end 
// submit message start 

elForm.addEventListener("submit" , (evt)=> {
    evt.preventDefault()
    
    let date = new Date()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    const Time  = `${hour}:${minutes}`
   const Data = {
    id: messageList[messageList.length -1]?.id ? messageList[messageList.length -1]?.id + 1 : 1,
    image:urlImg,
    content:evt.target.message.value,
    creatAt:Time,
   }
   messageList.push(Data)
renderMessage(messageList , elList)
set("message" , messageList)
   urlImg =null     
   evt.target.reset()
})

//============ start Audio rec
elAudioBtn.addEventListener("mousedown", async ()=>{
 const stream = await navigator.mediaDevices.getUserMedia({audio:true})
 audioRecorder = new MediaRecorder(stream);
 audioRecorder.ondataavailable = (evt)=>{
    audioBox.push(evt.data);
 }
 audioRecorder.onstop = () => {

 }
 audioBox = [];
 audioRecorder.start();
 console.log("Yozish boshlandi");
 

})

elAudioBtn.addEventListener("mouseup" ,()=>{
    audioRecorder.stop()
   audioRecorder.onstop = ()=>{
    const allAudio = new Blob(audioBox, {type: "audio/mp3 "})
    const audioUrl = URL.createObjectURL(allAudio)
     
     let date = new Date()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    const Time  = `${hour}:${minutes}`
   const newData = {
    id: messageList[messageList.length -1]?.id ? messageList[messageList.length -1]?.id + 1 : 1,
    audio:audioUrl,
    content:"evt.target.message.value",
    creatAt:Time,
   }
   messageList.push(newData)
renderMessage(messageList , elList)
// set("message" , messageList)
   }
})

//============ end Audio rec








//============ start Audio rec


elVideoBtn.addEventListener("mousedown" , async ()=>{
    const stream  = await navigator.mediaDevices.getUserMedia({video:true ,audio:true})
    
    videoPrev.srcObject = stream;
    videoPrev.classList.remove("hidden")
    videoRec = new MediaRecorder(stream)
    videoRec.ondataavailable = (evt)=>{
        videBox.push(evt.data)
    }
    
    videBox = [];
    videoRec.start()
    console.log("video yozish boshlandi");
})
    

elVideoBtn.addEventListener("mouseup" ,() =>{

videoRec.stop()

videoPrev.srcObject.getTracks().forEach(track => track.stop())
videoPrev.classList.add("hidden")

videoRec.onstop = ()=>{
    const vidBlob = new Blob(videBox , {type: "video/mp4"})
    const  videoUrl = URL.createObjectURL(vidBlob)
    
     let date = new Date()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    const Time  = `${hour}:${minutes}`
   const newData = {
    id: messageList[messageList.length -1]?.id ? messageList[messageList.length -1]?.id + 1 : 1,
    audio:null,
    video:videoUrl,
    content:"evt.target.message.value",
    creatAt:Time,
   }
   messageList.push(newData)
   renderMessage(messageList , elList)
   set("message" , messageList)
   videBox = []
}
})
//============ end Audio rec
