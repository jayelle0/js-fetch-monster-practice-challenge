const monsterContainer = document.querySelector('#monster-container')
const formDiv = document.querySelector('#create-monster')


fetch('http://localhost:3000/monsters')
  .then(response => response.json())
  .then(monsterArray => {
    renderMonsters(monsterArray)  
    // console.log(monsterArray)});
  })

    const renderMonsters = monsterArray => {
        monsterArray.forEach(renderMonster)
    }

    const renderMonster = monster => {
      monsterDiv = document.createElement('div')
      monsterDiv.dataset.id = monster.id 
      monsterDiv.innerHTML = `
      <h2> ${monster.name}  </h2>
      <h4> Age: ${monster.age}</h4>
      <p> Bio: ${monster.description}</p>
      `
      monsterContainer.append(monsterDiv)
    }

    const monsterForm = document.createElement('form')
    monsterForm.id = "monster-form"
    monsterForm.innerHTML= `
    <input type="text"  id="name" placeholder= "name.." /> 
    <input type="text" id="age" placeholder= "age.." /> 
    <input type="text" id="description" placeholder= "description.." />
    <button type="submit"> Create </button>
    `
    formDiv.append(monsterForm)

    const monstForm = document.querySelector("#monster-form")



    monstForm.addEventListener('submit', (event) => {
        event.preventDefault()
     

        monsterObj = {
            name: event.target.name.value, 
            age: event.target.age.value, 
            description: event.target.description.value, 
        }

        console.log(monsterObj)

        fetch('http://localhost:3000/monsters', {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
                },
                body: JSON.stringify(monsterObj),
                })
        .then(response => response.json())
        .then(newMonsterObj => {
            renderMonster(newMonsterObj);
        })
        event.target.reset()

    })


