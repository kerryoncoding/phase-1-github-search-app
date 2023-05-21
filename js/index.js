


document.addEventListener("DOMContentLoaded", ()=>{
   let searchForm = document.querySelector("#github-form")
   searchForm.addEventListener("submit", (e)=>{
      e.preventDefault()
      let input = e.target[0].value
      sendFetch(input)
      searchForm.reset()
   })
})


function sendFetch(input){
   console.log(input)
   fetch(`https://api.github.com/search/users?q=${input}`)
   .then(res => res.json())
   .then(data => {
      populateUserList(data)
   })
}

function populateUserList(data){
   console.log(data)
   let dataArr = data.items
   dataArr.forEach(element => {
      let ulUser = document.querySelector("#user-list")
      let liUser = document.createElement("li")
      //let img = document.createElement("img")
      
      
      liUser.textContent = element.login

      //img.src = element.avatar_url

      //liUser.append(img)

   
      ulUser.append(liUser)

      liUser.addEventListener("click", ()=> {
         //console.log(`${element.login}`)
         fetch(`https://api.github.com/users/${element.login}/repos`)
         .then(res => res.json())
         .then(foo => {
            for (let i=0; i<foo.length; i++){
               console.log(foo[i].name)
               let ulRepo = document.querySelector("#repos-list")
               let liRepo = document.createElement("li")

               liRepo.textContent = foo[i].name
               ulRepo.append(liRepo)
            }
         })
      })
   })
   
  
}

