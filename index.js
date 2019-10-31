let arrEmployees = [];

function getAllEmployees() {
    $("#mytable > tbody").html(`
    <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
    </div>
    `);
    $.ajax({
        "type": "GET",
        "url": "http://dummy.restapiexample.com/api/v1/employees",
        "dataType": "json",
        "headers": { "Content-Type": "application/json" },
        "success": (data) => { arrEmployees = data; $("#mytable > tbody").empty(); printEmployees() },
        "error": (error) => { console.log(error) }
    })
}

let employeeRow = 0;
let employeePage =;

function printEmployees() {

    for (let i = employeeRow; i < employeeRow + 10; i++) {
        let tr = `<tr data-id="${arrEmployees[i].id}" class="text-center">
                        <td><i class="fas fa-user"></i></td>
                        <td>${arrEmployees[i].employee_name}</td>
                        <td>${arrEmployees[i].employee_salary}</td>
                        <td>${arrEmployees[i].employee_age}</td>
                        <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" data-toggle="modal" data-target="#exampleModal" class="btn btn-info searchButton"><i
                                        class="fas fa-search"></i></button>
                                <button type="button" data-toggle="modal" data-target="#editEmployee" class="btn btn-light editButton"><i
                                        class="fas fa-pencil-alt"></i></button>
                                <button type="button" class="btn btn-danger deleteButton"><i
                                        class="fas fa-trash-alt"></i></button>
                            </div>
                        </td>
                    </tr>`
        $("#mytable > tbody").append(tr)
    }
    employeeRow += 10
    //BUSCAR
    $('.searchButton').each(function () {
        // this aqui viene del each
        $(this).click((event) => {

            event.preventDefault();
            getSingleEmployee($(this));
        })
    });
    //EDITAR
    $('.editButton').each(function () {
        // this aqui viene del each
        $(this).click((event) => {

            event.preventDefault();
            getEmployeeForm($(this));
        })
    });
    //BORRAR
    $('.deleteButton').each(function () {
        // this aqui viene del each
        $(this).click((event) => {

            event.preventDefault();
            deleteEmployee($(this));
        })
    })
    //PAGINAS
    $("body > div.container > div > div > div > div > div > button:nth-child(3)").html(Math.ceil(arrEmployees.length / 10))

}

function getemployeeID(thisButton) {

    let tr = thisButton.parent().parent().parent();
    let employeeID = tr.attr("data-id")
    console.log(employeeID);

    let objEmployee = {};
    for (let i = 0; i < arrEmployees.length; i++) {

        if (arrEmployees[i].id == employeeID) {
            objEmployee = arrEmployees[i]
        }

    }
    return objEmployee
}

//CREAR EMPLEADO
function addNewEmployee() {

    $.ajax({
        "type": "POST",
        "url": `http://dummy.restapiexample.com/api/v1/create`,
        "dataType": "json",
        "data": JSON.stringify({
            "name": $("#editEmployee > div > div > div.modal-body2 > form > div:nth-child(1) > div > input").val(),
            "salary": $("#editEmployee > div > div > div.modal-body2 > form > div:nth-child(2) > div > input").val(),
            "age": $("#editEmployee > div > div > div.modal-body2 > form > div:nth-child(3) > div > input").val()
        }),
        "headers": {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        "success": (data) => {
            $("#mytable > tbody").empty();
            $("#mytable > tbody").html(`
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>`);
            getAllEmployees();
            console.log(data)
        },
        "error": (error) => { console.log(error) }
    })
}



//LUPA
function getSingleEmployee(thisButton) {
    let objEmployee = getemployeeID(thisButton)
    console.log(objEmployee)
    let modalText = `<p>Name: ${objEmployee.employee_name}</p>
    <p>Age: ${objEmployee.employee_salary}</p>
    <p>Salary: ${objEmployee.employee_age}</p>`

    $("#exampleModal > div > div > div.modal-body").html(modalText)
}


//LAPIZ
function getEmployeeForm(thisButton) {

    let objEmployee = getemployeeID(thisButton)

    let modalText = `<form class="form-horizontal ng-valid ng-dirty ng-valid-number" role="form">
         <div class="form-group">
            <label class="col-sm-3 control-label">Name <sup class="sup-color">*</sup></label>

            <div class="col-sm-8">
               <input type="text" ng-model="employee_name" value=${objEmployee.employee_name} class="form-control ng-pristine ng-valid ng-empty ng-touched">
            </div>
			
         </div>
		 <div class="form-group">
            <label class="col-sm-3 control-label">Age <sup class="sup-color">*</sup></label>

            <div class="col-sm-8">
               <input type="number" ng-model="employee_age" value=${objEmployee.employee_salary} class="form-control ng-valid ng-touched ng-not-empty ng-dirty ng-valid-number">
            </div>
			
         </div>
		 <div class="form-group">
            <label class="col-sm-3 control-label">Salary <sup class="sup-color">*</sup></label>
            <div class="col-sm-8">
               <input type="number" ng-model="employee_salary" value=${objEmployee.employee_age} class="form-control ng-valid ng-touched ng-not-empty ng-dirty ng-valid-number">
            </div>
            <div class="form-group">
            <div class="col-sm-8">
               <input type="hidden" ng-model="employee_salary" value=${objEmployee.id} class="form-control ng-valid ng-touched ng-not-empty ng-dirty ng-valid-number">
            </div>
         </div>
      </form>`

    $("#editEmployee > div > div > div.modal-body2").html(modalText)
}
function editEmployee() {

    let employeeID = $("#editEmployee > div > div > div.modal-body2 > form > div:nth-child(3) > div.form-group > div > input").val()
    $.ajax({
        "type": "PUT",
        "url": `http://dummy.restapiexample.com/api/v1/update/${employeeID}`,
        "dataType": "json",
        "data": JSON.stringify({
            "name": $("#editEmployee > div > div > div.modal-body2 > form > div:nth-child(1) > div > input").val(),
            "salary": $("#editEmployee > div > div > div.modal-body2 > form > div:nth-child(2) > div > input").val(),
            "age": $("#editEmployee > div > div > div.modal-body2 > form > div:nth-child(3) > div > input").val()
        }),
        "headers": {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
        },
        "success": (data) => {
            $("#mytable > tbody").empty();
            $("#mytable > tbody").html(`
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>`);
            getAllEmployees();
            console.log(data)
        },
        "error": (error) => { console.log(error) }
    })
}
$("#editEmployee > div > div > div.modal-footer > button.btn.btn-primary").click(() => {
    editEmployee();

})

//PAPELERA
function deleteEmployee(thisButton) {

    let tr = thisButton.parent().parent().parent();
    let employeeID = tr.attr("data-id")

    console.log(employeeID);

    $.ajax({
        "type": "DELETE",
        "url": `http://dummy.restapiexample.com/api/v1/delete/${employeeID}`,
        "dataType": "json",
        "headers": { "Content-Type": "application/json" },
        "success": (data) => {
            tr.remove();
            $("#mytable > tbody").empty();
            $("#mytable > tbody").html(`
            <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
            </div>
            `);
            getAllEmployees()
        },
        "error": (error) => { console.log(error) }
    })


}



//previous
$("body > div.container > div > div > div > div > div > button:nth-child(1)").click(() => {
    if (employeeRow >= 20) {
        $("#mytable > tbody").empty();
        employeeRow -= 20
        printEmployees();
        employeePage = (employeeRow/10)
        $("body > div.container > div > div > div > div > div > button:nth-child(2)").html(employeePage)
        
    }
})
//next
$("body > div.container > div > div > div > div > div > button:nth-child(4)").click(() => {

    $("#mytable > tbody").empty();
    printEmployees();
    employeePage = (employeeRow/10)
    $("body > div.container > div > div > div > div > div > button:nth-child(2)").html(employeePage)
    
})

//Boton para formulario de nuevo trabajador
$("body > div.d-flex.flex-column.flex-md-row.align-items-center.p-3.px-md-4.mb-3.bg-dark.text-white.border-bottom.box-shadow > button").click(() => {

    let modalText = `<form class="form-horizontal ng-valid ng-dirty ng-valid-number" role="form">
         <div class="form-group">
            <label class="col-sm-3 control-label">Name <sup class="sup-color">*</sup></label>

            <div class="col-sm-8">
               <input type="text" ng-model="employee_name" value="" class="form-control ng-pristine ng-valid ng-empty ng-touched">
            </div>
			
         </div>
		 <div class="form-group">
            <label class="col-sm-3 control-label">Age <sup class="sup-color">*</sup></label>

            <div class="col-sm-8">
               <input type="number" ng-model="employee_age" value="" class="form-control ng-valid ng-touched ng-not-empty ng-dirty ng-valid-number">
            </div>
			
         </div>
		 <div class="form-group">
            <label class="col-sm-3 control-label">Salary <sup class="sup-color">*</sup></label>
            <div class="col-sm-8">
               <input type="number" ng-model="employee_salary" value="" class="form-control ng-valid ng-touched ng-not-empty ng-dirty ng-valid-number">
            </div>
      </form>`

    let buttons = `  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      <button type="button" data-dismiss="modal" class="btn btn-primary createButton">Save changes</button>`

    $("#editEmployee > div > div > div.modal-body2").html(modalText)
    $("#editEmployee > div > div > div.modal-footer").html(buttons)

    //Boton para confimar nuevo trabajador
    $(".createButton").click(() => {
        addNewEmployee();
        $("#mytable > tbody").empty();
        $("#mytable > tbody").html(`
        <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
        </div>
        `);
        getAllEmployees();
    })

})

$(window).ready(() => {
    getAllEmployees()


});