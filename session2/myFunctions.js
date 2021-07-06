tasks = null
myAddForm = document.querySelector('#form-div form')
myAddFormBtn = document.querySelector('#form-div form button')
let showHide = document.querySelector('#showHide')
form_div = document.querySelector('#form-div')
p = document.querySelector('#content-wrapper')
updatedTaskID = -1


const getAllTasks = ( ) =>{
    try { 
        tasks = JSON.parse(localStorage.getItem('tasks')) || []
        if(!Array.isArray(tasks)) throw new Error()
     }
    catch(e) { tasks = [] }
}
const createCustomElements = function(parent, elementTag, classes, textContent, attributes){
    myNewElement = document.createElement(elementTag)
    myNewElement.classList = classes
    myNewElement.textContent = textContent
    attributes.forEach(attr=>{
        myNewElement.setAttribute(attr.attrName, attr.attrValue)
    })
    parent.appendChild(myNewElement)
    return myNewElement
}

changeStatus = (index) =>{
    let allDivs = document.querySelectorAll('.x')
    allDivs[index].classList.toggle('bg-warning')
    allDivs[index].classList.toggle('bg-primary')
    tasks[index].status = !tasks[index].status
    saveAllTasks(tasks)
} 
showSingleTask = (element, i)=>{
    const mainDiv = createCustomElements(p, 'div', 'col-4 p-3 y', '', []) 
    const mainDiv2 = createCustomElements(mainDiv, 'div', 'border border-3 border-primary m-3 p-3 x', '', []) 
    element.status? mainDiv2.classList.add('bg-warning'):mainDiv2.classList.add('bg-primary');
    createCustomElements(mainDiv2,'h3','',element.taskTitle, [])
    createCustomElements(mainDiv2,'span','',element.taskType, [])
    createCustomElements(mainDiv2,'p','',element.taskContent, [])
    btn1 = createCustomElements(mainDiv2,'button','btn btn-danger mx-2','delete', [])
    btn1.addEventListener('click', function(e){ deletebtn(element.ind, e)})
    btn2 = createCustomElements(mainDiv2,'button','btn btn-warning mx-2','edit', [])
    btn2.addEventListener('click', function(e){ editBtn (i)})
    btn3 = createCustomElements(mainDiv2,'button','btn btn-primary mx-2','change status', [])
    btn3.addEventListener('click', function(e){ changeStatus(i) })
}

showAllTasks = () =>{
    p.innerHTML = ""
tasks.forEach((element, i) => {
showSingleTask(element, i)
});
}
getAllTasks()
showAllTasks()
saveAllTasks = ( ) =>{
    console.log('from save')
    console.log(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
deletebtn = (ind, e) =>{
    (e.target.parentNode).parentNode.remove()
    tasks = tasks.filter(el=> el.ind!=ind)
   saveAllTasks(tasks)

}
showTaskData=(i)=>{
    let formControls = document.querySelectorAll('.form-control')
    formControls[0].value=tasks[i].taskTitle
    formControls[1].value=tasks[i].taskType
    formControls[2].value=tasks[i].taskContent
    formControls[3].value=tasks[i].startDate
    formControls[4].value=tasks[i].dueDate
    updatedTaskID = i
}
editBtn =(i) => {
    form_div.classList.toggle('d-none')
    showHide.textContent == "Show" ? showHide.textContent='Hide': showHide.textContent='Show'
    myAddFormBtn.textContent='update Task'

    showTaskData(i)
}
addTask = (task,updatedTaskID=-1) =>{
    if(updatedTaskID==-1){
        tasks.length == 0 ? task.ind = 0: task.ind = tasks[tasks.length-1].ind+1;
    }
    else{
        task.ind = updatedTaskID
    }
      console.log(task.ind)
//    task.ind = tasks.length
    tasks.push(task)
    saveAllTasks()
    myAddForm.reset()
    form_div.classList.add('d-none')
    showHide.textContent="Show"
    if(updatedTaskID==-1 ){ showSingleTask(task, tasks.length-1) }
    else{
        showSingleTask(task, updatedTaskID)
        location.reload();
    
    }
}
