

function getAllEmployees() {
    $.ajax({
        "type": "GET",
        "url": "https://feligoemployees.free.beeceptor.com/",
        "dataType": "json",
        "headers": { "Content-Type": "application/json" },
        "success": (data) => {


            for (let i = employeeRow; i < employeeRow+10; i++) {
                let tr = `<tr data-id="${data[i].id}" class="text-center">

                <td><i class="fas fa-user"></i></td>
                <td>${data[i].employee_name}</td>
                <td>${data[i].employee_salary}</td>
                <td>${data[i].employee_age}</td>
                <td>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-info"><i
                                class="fas fa-search"></i></button>
                        <button type="button" class="btn btn-light"><i
                                class="fas fa-pencil-alt"></i></button>
                        <button type="button" class="btn btn-danger deleteButton"><i
                                class="fas fa-trash-alt"></i></button>
                    </div>
                        </td>
                    </tr>`
                $("#mytable > tbody").append(tr)
                
                console.log(data[i])
            }
            employeeRow += 10
            $(".deleteButton").off();
            $(".deleteButton").click((event) => {
                deleteEmployee($(event.target));
            })

        },
        "error": (error) => { console.log(error) }
    })
}



let employeeRow = 0


function deleteEmployee(thisButton) {

    let tr = thisButton.parent().parent().parent();
    let employeeID = tr.attr("data-id")
    console.log(employeeID);

     tr.remove()

    // $.ajax({
    //     "type": "GET",
    //     "url": `https://feligoemployees.free.beeceptor.com/${employeeID}`,
    //     "dataType": "json",
    //     "headers": { "Content-Type": "application/json" },
    //     "success": (data) => { console.log(data) },
    //     "error": (error) => { console.log(error) }
    // })


}



$(window).ready(() => {
    getAllEmployees()


});