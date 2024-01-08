
window.addEventListener('load', () => {
    $('[data-bs-toggle="tooltip"]').tooltip();
    //call table refresh function
    refreshEmployeeTable();
    //call form refreash function
    refreshEmployeeForm()
})

let userPrivilege = ajaxGetRequest("/privilege/bylogedusermodule/USER")

//create function for refreash table record
const refreshEmployeeTable = () => {

    users = ajaxGetRequest('/user/findall')

    const displayProperty = [
        { property: getEmployee_id, dataType: 'function' },
        { property: 'username', dataType: 'string' },
        { property: 'email', dataType: 'string' },
        { property: getEmpRole, dataType: 'function' },
        { property: getStatus, dataType: 'function' },

    ]

    //call fill data into table function
    // fillDataIntoTable(tableId,dataList, display property List, refillFunctionName, deleteFunctionName, printFunctionName,buttonVisibility)
    fillDataIntoTable(tableUser, users, displayProperty, refillEmployeeForm, deleteButtonFunction, printEmployee, true,userPrivilege)
    // Initialize DataTables on the tableEmployee
    $(document).ready(function () {
        $('#tableUser').DataTable({
            paging: true, // Enable pagination
            searching: true, // Enable search
        });
    });

}

const getEmployee_id = (rowOb) => {
    return rowOb.employee_id.fullname;
}

const getStatus = (rowOb) => {
    if (rowOb.status) {
        return '<p class="working-status">' + "Yes" + '</p>';
    } else {
        return '<p class="deleted-status">' + "No" + '</p>';
    }
}
const getEmpRole = (rowOb) => {
    // console.log(rowOb.employee_id.designation_id.name);
    // if (rowOb.employee_id.designation_id.name == 'Manager') {
    //     return '<p class="working-status">' + rowOb.employee_id.designation_id.name + '</p>';
    // }
    // if (rowOb.employee_id.designation_id.name == 'Store-Manager') {
    //     return '<p class="resign-status">' + rowOb.employee_id.designation_id.name + '</p>';
    // }
    // if (rowOb.employee_id.designation_id.name == 'Cashier') {
    //     return '<p class="deleted-status">' + rowOb.employee_id.designation_id.name + '</p>';
    // }
    let userRoles = '';
    rowOb.roles.forEach(element => {
        userRoles = userRoles + element.name + ","
    })
    return userRoles;
}


const deleteButtonFunction = (rowOb, rowindex) => {
    const userConfirm = confirm('Are you sure you want to delete' + rowOb.employee_id.fullname);
    if (userConfirm) {
        // employees[rowindex].employeeStatus_id = {id:3, name:'Delete'};

        const deleteServerResponse = ajaxRequestBodyMethod("/user", "DELETE", rowOb)
        if (deleteServerResponse == "OK") {
            alert("Delete successfully...!")
            refreshEmployeeTable();
        } else {
            alert("Delete not succefully  .." + deleteServerResponse)
        }

        // alert('Employee delete succefully');
        // refreshEmployeeTable()

    } else {
        refreshEmployeeTable();
    }
}


//create function for check form error
//need to check all required property values
const checkError = () => {
    let errors = '';
    console.log(user);
    // if (inputFullName1.value == "")
    if (user.employee_id == null) {
        errors = errors + "Please select employee"
    }
    if (user.username == null) {
        errors = errors + "Please enter a valid fullname";
        // inputFullName1.style.border = '2px solid red';
        inputUsername.classList.add("is-invalid");
    } else {
        inputUsername.classList.remove("is-invalid");
        inputUsername.classList.add("is-valid");
    }
    if (user.password == null) {
        errors = errors + "Please enter a password";
        // inputFullName1.style.border = '2px solid red';
        inputPassword.classList.add("is-invalid");
    }
    if (user.email == null) {
        errors = errors + "Please enter a email";
        // inputFullName1.style.border = '2px solid red';
        inputEmail.classList.add("is-invalid");
    }
    if(olduser == null){
        if(inputRePassword.value == ""){
            errors = errors + "Please retype Passsword"
            inputRePassword.classList.add("is-invalid");
        }
    }

    return errors;
}

//create function for add button
const buttonUserAdd = () => {
    console.log(user);
    //1.need to check form error ---> checkError()
    let Errors = checkError()
    if (Errors == "") {
        // alert("no errors")
        //2.need to check user confirmation
        let userConfirm = window.confirm("Are you sure?" +
            user.username +
            user.password +
            user.email +
            user.employee_id.fullname

        )
        if (userConfirm) {
            //3.pass data into backend
            //call ajaxRequestBodyMethod function
            console.log("user==>", user);
            let serverUserResponse = ajaxRequestBodyMethod("/user", "POST", user);
            console.log(serverUserResponse);
            if (serverUserResponse == "OK") {
                alert("Save successfully")
                refreshEmployeeTable();
                refreshEmployeeForm();
                formEmployee.reset();
            } else {
                alert("Error: " + serverUserResponse);
            }

        }
    } else {
        alert("formErrors: " + Errors)
    }
}

const refillEmployeeForm = (item, index) => {
    $('#empForm').modal('show');

    // employee = employees[rowindex]; // No 'let' declaration, directly update the outer 'employee'
    user = JSON.parse(JSON.stringify(item));
    olduser = JSON.parse(JSON.stringify(item));

    // employeeListWithoutUserAccount = ajaxGetRequest("/employee/listwithoutuseraccount")
    employeeListWithoutUserAccount.push(user.employee_id);
    console.log(user);
    console.log(user.employee_id.fullname);
    console.log(employeeListWithoutUserAccount);

    // fillDataIntoSelect(selectDesignation, "Select Designation", designations, 'name', employee.designation_id.name)
    fillDataIntoSelect(selectEmployee, "Select Employee", employeeListWithoutUserAccount, 'fullname', user.employee_id.fullname)


    inputUsername.value = user.username
    inputEmail.value = user.email

    //select designation

    //select emp status
    // fillDataIntoSelect(selectEStatus, "Select Status", Empstatuses, 'name', employee.employeestatus_id.name)


    //set user status
    if (user.status) {
        inputStatus.checked = true;
        inputStatusLbl.innerText = "User Account is active"
    } else {
        inputStatus.checked = false;
        inputStatusLbl.innerText = "User Account is not active"
    }


    //need to get role list
    roles = ajaxGetRequest("/role/findall") // meken check box generate wenna one
    inputRole.innerHTML = ""
    roles.forEach(element => {
        const div = document.createElement("div")
        div.className = "col-lg-4 form-check"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.className = "form-check-input"
        input.id = "chk" + element.name

        input.onchange = function () {
            if (this.checked) {
                user.roles.push(element)

            } else {
                console.log(this.id);
                console.log(this.id.substring(3));
                console.log("unchecked element: " + element);
                let extIndex = user.roles.map(item => item.name).indexOf(element.name)
                if (extIndex != -1) {
                    user.roles.splice(extIndex, 1);
                }
            }
        }
        let extURoleExist = user.roles.map(item => item.name).indexOf(element.name)
        if (extURoleExist != -1) {
            input.checked = true;
        }

        const label = document.createElement("label")
        label.className = "form-check-label"
        label.innerText = element.name

        div.appendChild(label)
        div.appendChild(input)

        inputRole.appendChild(div)
    });

    // $('#empForm').modal('hide');

}

//define method for check updates
const checkUpdate = () => {
    let updates = "";

    // Comparing both arrays using stringify method
    // if (JSON.stringify(user.roles) != JSON.stringify(olduser.roles)) {
    //     updates = updates + "Roles is changed"
    // }
    if (JSON.stringify(user.roles) != JSON.stringify(olduser.roles)) {

        if (user.roles.length != olduser.roles.length) {
            updates = updates + "Roles are changed"
        } else if (user.roles.length == olduser.roles.length) (

            user.roles.forEach(element => {

                let extRoleCount = 0;
                olduser.roles.forEach(element1 => {
                    if (element.id != element1.id) {
                        // updates = updates + element.name," are changed"
                        extRoleCount++
                    }
                })
                if (extRoleCount == olduser.roles.length) {
                    updates = updates + element.name, "roles are changed"
                }
           })
        )
    }

    if (user.username != olduser.username) {
        updates = updates + "Username is changed"
    }
    if (user.email != olduser.email) {
        updates = updates + "email is changed into" + user.email
    }
    if (user.status != olduser.status) {
        updates = updates + "Status is changed"
    }
    if (user.employee_id.id != olduser.employee_id.id) {
        updates = updates + "Employee is changed"
    }

    return updates;
}

//define function for employee update
const buttonUserUpdate = () => {
    console.log(user);
    console.log(olduser);
    //check error
    let error = checkError();
    if (error == "") {
        //check form update
        let updates = checkUpdate();
        if (updates != "") {
            //call put service
            let userConfirmation = confirm("are u sure to update following changes...?" + updates)
            if (userConfirmation) {
                let updateServiceResponse = ajaxRequestBodyMethod("/user", "PUT", user)
                //check backend response
                if (updateServiceResponse == "OK") {
                    alert("Update successfully...!")
                    refreshEmployeeTable();
                    formEmployee.reset();
                    refreshEmployeeForm();
                    //need hide modal
                    $('#empForm').modal('hide');

                } else {
                    alert("Update not succefully  .." + updateServiceResponse)
                }

            }
        } else {
            alert("Form has no any changes");
        }

    } else {
        alert("Form has following errors \n" + error)
    }
}

const printEmployee = (rowindex) => {

}




//create function for refreashForm area
const refreshEmployeeForm = () => {
    //create empty object
    user = new Object();
    olduser = null;
    user.roles = new Array();
    //employee list without user account
    employeeListWithoutUserAccount = ajaxGetRequest("/employee/listwithoutuseraccount")
    fillDataIntoSelect(selectEmployee, "Select Employee", employeeListWithoutUserAccount, 'fullname')

    //set auto binding
    user.status = true;

    //set default color
    inputUsername.style.border = "2px solid #ced4da"


    //need to get role list
    roles = ajaxGetRequest("/role/findall") // meken check box generate wenna one
    inputRole.innerHTML = ""
    roles.forEach(element => {
        const div = document.createElement("div")
        div.className = "col-lg-4 form-check"

        const input = document.createElement("input")
        input.type = "checkbox"
        input.className = "form-check-input"
        input.id = "chk" + element.name

        input.onchange = function () {
            if (this.checked) {
                user.roles.push(element)

            } else {
                console.log(this.id);
                console.log(this.id.substring(3));
                console.log("unchecked element: " + element);
                let extIndex = user.roles.map(item => item.name).indexOf(element.name)
                if (extIndex != -1) {
                    user.roles.splice(extIndex, 1);
                }
            }
        }

        const label = document.createElement("label")
        label.className = "form-check-label"
        label.innerText = element.name

        div.appendChild(label)
        div.appendChild(input)

        inputRole.appendChild(div)
    });
}

//define function for password retype
const passwordValidation = () => {
    if (inputPassword.value != "") {
        if (inputPassword.value == inputRePassword.value) {
            inputPassword.style.border = "2px solid green";
            inputRePassword.style.border = "2px solid green";
            user.password = inputPassword.value;
        } else {
            inputPassword.style.border = "2px solid red";
            inputRePassword.style.border = "2px solid red";
            user.password = null;
        }

    } else {
        alert("Please fill password")
        inputPassword.style.border = "2px solid red";
        inputRePassword.style.border = "2px solid red";
        user.password = null;
    }
}

//define function for generateUserEmail automatically
//when selecting dropdown we can bring the user email
const generateUserEmail = () => {
    inputEmail.value = JSON.parse(selectEmployee.value).email; //set value
    user.email = inputEmail.value; //bind value
    inputEmail.style.border = "2px solid green"
}



