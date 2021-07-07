let formHeads = [
    'taskTitle',
     "taskType",
      "taskContent", 
      "startDate", 
      "dueDate"]
showHide.addEventListener('click', function(e){
    form_div.classList.toggle('d-none')
    this.textContent == "Show" ? this.textContent='Hide': this.textContent='Show'
    myAddFormBtn.textContent ="add Task" 
    
})

myAddForm.addEventListener('submit', function(e){
    e.preventDefault()
    let task = { status:false }
    formHeads.forEach(h => {
            task[h]= this.elements[h].value
    })
    console.log(task)
    if(myAddFormBtn.textContent =="add Task"){
        addTask(task)
    }
    else{
        console.log("updatedTaskID = " + updatedTaskID)
        udpateTask(task,updatedTaskID)

    }
    
})
