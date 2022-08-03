//select all the font awesome trashcans and thumbs up
const deletePlayerText = document.querySelectorAll('.fa-trash')
const removeStroke = document.querySelectorAll('.fa-circle-minus')
const addStoke = document.querySelectorAll('.fa-circle-plus')


Array.from(deletePlayerText).forEach((element)=>{
    element.addEventListener('click', deletePlayer)
})

Array.from(removeStroke).forEach((element)=>{
    element.addEventListener('click', removeOne)
})

Array.from(addStroke).forEach((element)=>{
    element.addEventListener('click', addOne)
})

async function deleteRapper(){
    const pName = this.parentNode.childNodes[1].innerText
    const pScore = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('deletePlayer', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'playerNameCur': pName,
              'scoreCur': pScore
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
//starts by identifying exactly which <li> we need to change using the parent node of the button clicked. Then it gets ready to send this information using the path specified in server.js ('addOneLike' will be the specified put path)
async function addOne(){
    const pName = this.parentNode.childNodes[1].innerText
    const pScore = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneStroke', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'playerNameCur': pName,
              'scoreCur': pScore,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

//starts by identifying exactly which <li> we need to change using the parent node of the button clicked. Then it gets ready to send this information using the path specified in server.js ('addOneLike' will be the specified put path)
async function removeOne(){
    const pName = this.parentNode.childNodes[1].innerText
    const pScore = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('removeOneStroke', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'playerNameCur': pName,
              'scoreCur': pScore,
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}