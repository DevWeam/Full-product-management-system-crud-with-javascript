let Room_number = document.getElementById('room_nu');
let Name = document.getElementById('name')
let Room_Fee = document.getElementById('room_fee');
let Nights_nu = document.getElementById('nights_nu');
let Doctor_Fee = document.getElementById('doctor_fee');
let Service = document.getElementById('service')
let total = document.getElementById('total');
let submit = document.getElementById('submit');

let mood = 'create'
let tmp;

// get total 
function getTotal() {
    if (Room_Fee.value != '') {
        let result = (+Room_Fee.value * +Nights_nu.value) + +Doctor_Fee.value + +Service.value;
        total.innerHTML = result;
        total.style.background = 'rgba(52, 137, 52, 1)'
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02'
    }
}

// use if to avoid not removing elements from the array(dataPatient) if it contains elements //
let dataPatient ;
if (localStorage.patient  != null) {
    dataPatient = JSON.parse(localStorage.patient )
} else {
     dataPatient = [];
}

// create patient when click on the button create
submit.onclick = function () {
    let newPatient  = {
        Room_number: Room_number.value,
        Name: Name.value.toLowerCase(),
        Room_Fee: Room_Fee.value,
        Nights_nu: Nights_nu.value,
        Doctor_Fee: Doctor_Fee.value,
        Service: Service.value,
        total: total.innerHTML   
    }
     if(Name.value !='' && Room_number.value !=''){
        if(mood ==='create'){
        dataPatient.push(newPatient);
    } else{
        dataPatient[tmp] = newPatient;
        mood ='create';
        submit.innerHTML ='Create';
    }
     clearData()
    }
  


   // save localstorage
    localStorage.setItem('patient', JSON.stringify(dataPatient))
     
     showData();
}

//clear inputs
function clearData() {
    Room_number.value = '';
    Name.value = '';
    Room_Fee.value = '';
    Nights_nu.value = '';
    Doctor_Fee.value = '';
    Service.value = '';
    total.innerHTML = '';
}

// read
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPatient.length; i++) {
        table += `
                <tr>
                    <td>${dataPatient[i].Room_number}</td>
                    <td>${dataPatient[i].Name}</td>
                    <td>${dataPatient[i].Room_Fee}</td>
                    <td>${dataPatient[i].Nights_nu}</td>
                    <td>${dataPatient[i].Doctor_Fee}</td>
                    <td>${dataPatient[i].Service}</td>
                    <td>${dataPatient[i].total}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick ="deleteData(${i})"  id="delete">delete</button></td>
                </tr>
             `
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if (dataPatient.length > 0) {
        btnDelete.innerHTML = `
         <button onclick= "deleteAll()">delete All</button>
          `
    } else {
        btnDelete.innerHTML = '';
    }
}
showData()

//delete
function deleteData(i) {
    dataPatient.splice(i, 1);
    localStorage.patient = JSON.stringify(dataPatient);
    showData()
}

function deleteAll() {
    localStorage.removeItem('patient')
    dataPatient.splice(0)
    showData()
}
// update
function updateData(i){
   Room_number.value = dataPatient[i].Room_number
   Name.value = dataPatient[i].Name
   Room_Fee.value = dataPatient[i].Room_Fee
   Nights_nu.value = dataPatient[i].Nights_nu
   Doctor_Fee.value = dataPatient[i].Doctor_Fee
   Service.value = dataPatient[i].Service
   getTotal()
   submit.innerText = 'update'
   mood = 'update';
   tmp = i;
   scroll({
      top:0,
      behavior:'smooth'
   })
}

// search mood
let searchMood = 'Name';
function getSearchMood(id){
  let search = document.getElementById('search');
  if(id =='searchName'){
    searchMood ='Name';
  }else{
    searchMood ='room_number'; 
  }
  search.placeholder = 'Search By' + searchMood;
  search.focus()
  search.value = '';
  showData();
}

// search function 
function searchData(value){
  let table = '';
  for(let i =0 ; i< dataPatient.length ; i++){
     if(searchMood =='Name'){
       if(dataPatient[i].Name.includes(value)){
         table += `
                <tr>
                    <td>${dataPatient[i].Room_number}</td>
                    <td>${dataPatient[i].Name}</td>
                    <td>${dataPatient[i].Room_Fee}</td>
                    <td>${dataPatient[i].Nights_nu}</td>
                    <td>${dataPatient[i].Doctor_Fee}</td>
                    <td>${dataPatient[i].Service}</td>
                    <td>${dataPatient[i].total}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick ="deleteData(${i})"  id="delete">delete</button></td>
                </tr>
            `
        }
    }   
      else{
                if(dataPatient[i].Room_number.includes(value)){
                table += `
                <tr>
                    <td>${dataPatient[i].Room_number}</td>
                    <td>${dataPatient[i].Name}</td>
                    <td>${dataPatient[i].Room_Fee}</td>
                    <td>${dataPatient[i].Nights_nu}</td>
                    <td>${dataPatient[i].Doctor_Fee}</td>
                    <td>${dataPatient[i].Service}</td>
                    <td>${dataPatient[i].total}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick ="deleteData(${i})"  id="delete">delete</button></td>
                </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}
      
    
      
  






