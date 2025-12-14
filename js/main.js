let elList = document.querySelector(".list")
let elForm = document.querySelector(".message-form")
let elChooseImg = document.querySelector(".choose-img")

let elModalWrap = document.querySelector(".telegram-wrapp")
let elModalInn = document.querySelector(".telegram-modal")

let messageList = get("message") || []
 





// Modal code start

function AutoShowModal(active) {
    if (active) {
        elModalWrap.classList.remove("hidden")
        elModalWrap.classList.remove("scale-[0]")
        elModalWrap.classList.add("scale-[1]")
    }else{
          elModalWrap.classList.add("scale-[0]")
        elModalWrap.classList.remove("scale-[1]")
    }
}
elModalWrap.addEventListener("click" , (evt)=> evt.target.id == "Wrapper" && AutoShowModal())
//Modal code end
AutoShowModal()




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
        }else{

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
    const Time  = ` ${date.toString().split(" ")[4].split(":")[0]}:${date.toString().split(" ")[4].split(":")[1]}`
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