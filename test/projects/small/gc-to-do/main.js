function id(id,valBool){
    if(valBool){
        return id(id).value
    }else{
        return document.getElementById(id)
    }
}

function toggleHide(ida){
    let content1 = id('content-1')
    let content2 = id('content-2')
    let content3 = id('content-3')
    let content4 = id('content-4')

    if(ida=="content-1"){
        content2.classList.remove('show')
        content3.classList.remove('show')
        content4.classList.remove('show')
    }
    if(ida=="content-2"){
        content1.classList.remove('show')
        content3.classList.remove('show')
        content4.classList.remove('show')
    }
    if(ida=="content-3"){
        content1.classList.remove('show')
        content2.classList.remove('show')
        content4.classList.remove('show')
    }
    if(ida=="content-4"){
        content1.classList.remove('show')
        content2.classList.remove('show')
        content3.classList.remove('show')
    } 
    id(ida).classList.toggle('show')
}

function rotate(num){
    let section1 = id('section-1').getElementsByTagName('i')[0]
    let section2 = id('section-2').getElementsByTagName('i')[0]
    let section3 = id('section-3').getElementsByTagName('i')[0]
    let section4 = id('section-4').getElementsByTagName('i')[0]

    if(num=="section-1"){
        section2.classList.remove('down')
        section3.classList.remove('down')
        section4.classList.remove('down')
        console.log('oof')
    }
    if(num=="section-2"){
        section1.classList.remove('down')
        section3.classList.remove('down')
        section4.classList.remove('down')
    }
    if(num=="section-3"){
        section1.classList.remove('down')
        section2.classList.remove('down')
        section4.classList.remove('down')
    }
    if(num=="section-4"){
        section1.classList.remove('down')
        section2.classList.remove('down')
        section3.classList.remove('down')
    } 

    id(num).getElementsByTagName('i')[0].classList.toggle('down')
}

function show(rotateId,hide){
    toggleHide(hide);
    rotate(rotateId);
}

function makeNew(){
    id('pop-2').classList.toggle('show-flex')
    id('pop-up').classList.toggle('show')
    document.getElementsByClassName('blurable')[0].classList.toggle('blur')
    document.getElementsByClassName('blurable')[1].classList.toggle('blur')
    if(id('pop-up').classList.contains('show')){
        id("+button").innerHTML = '-'
    }else{
        id("+button").innerHTML = '+'
    }
}

function countAssignments(){
    for(let i = 0; i<4;i++){
        document.getElementsByClassName('num')[i].innerHTML = document.getElementsByClassName("section")[i].getElementsByClassName('section-content-container')[0].childElementCount
    }
}

function makeNewAssignment(){
    let assignmentName = id('assignment-name').value
    let className = id('class-name').value
    let date = id('date').value
    let weekNum = id('week-num').value
    let a = new Assignment(assignmentName, className, date, weekNum)
    for(let i = 0; i < document.getElementsByTagName('input').length; i++){
        document.getElementsByTagName('input')[i].value = ''
    }
    a.makeAssignment()
    countAssignments()
}

class Assignment {
    constructor(name,clas,due,week) {
        this.name = name;
        this.clas = clas;
        this.due = due;
        this.week = week;
    }
    makeAssignment(){
        let parent = document.getElementsByClassName('section-content-container')[this.week]
        let mainDiv = document.createElement('div')
        mainDiv.classList.add('section-content')

        let child1 = document.createElement('div')
        child1.classList.add('section-sub-title')

        let child1Text = document.createTextNode(this.name)
        child1.appendChild(child1Text)

        let child2 = document.createElement('div')
        child2.classList.add('flex-row')
        child2.classList.add('space-between')

        let classChild = document.createElement('div')
        classChild.classList.add('section-class')

        let classChildText = document.createTextNode(this.clas)
        classChild.appendChild(classChildText)

        let dateChild = document.createElement('div')
        dateChild.classList.add('section-date')

        let dateChildText = document.createTextNode(this.due)
        dateChild.appendChild(dateChildText)

        child2.appendChild(classChild)
        child2.appendChild(dateChild)

        mainDiv.appendChild(child1)
        mainDiv.appendChild(child2)
        
        parent.appendChild(mainDiv)
    }
}
