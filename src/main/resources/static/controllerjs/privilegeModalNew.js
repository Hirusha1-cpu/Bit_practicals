
window.addEventListener('load', () => {
    $('[data-bs-toggle="tooltip"]').tooltip();
    //call table refresh function
    refreshEmployeeTable();
    //call form refreash function
    refreshEmployeeForm()
})

//create function for refreash table record
const refreshEmployeeTable = () => {

    privileges = ajaxGetRequest('/privilege/findall')


    const displayProperty = [
        { property: getEmpRole, dataType: 'function' },
        { property: getModule, dataType: 'function' },
        { property: getSelect, dataType: 'function' },
        { property: getInsert, dataType: 'function' },
        { property: getUpdate, dataType: 'function' },
        { property: getDelete, dataType: 'function' },
        { property: getStatus, dataType: 'function' },

    ]

    //call fill data into table function
    // fillDataIntoTable(tableId,dataList, display property List, refillFunctionName, deleteFunctionName, printFunctionName,buttonVisibility)
    fillDataIntoTable(tablePrivilege, privileges, displayProperty, refillPrivilegeForm, deleteButtonFunction, printEmployee, true)
    // Initialize DataTables on the tableEmployee
    $(document).ready(function () {
        $('#tablePrivilege').DataTable({
            paging: true, // Enable pagination
            searching: true, // Enable search
        });
    });

}

const getSelect = (rowOb) => {
    if (rowOb.sel) {
        return '<p class="working-status">' + "True" + '</p>';
    } else {
        return '<p class="deleted-status">' + "False" + '</p>';
    }
}
const getInsert = (rowOb) => {
    if (rowOb.inst) {
        return '<p class="working-status">' + "True" + '</p>';
    } else {
        return '<p class="deleted-status">' + "False" + '</p>';
    }
}
const getUpdate = (rowOb) => {
    if (rowOb.upd) {
        return '<p class="working-status">' + "True" + '</p>';
    } else {
        return '<p class="deleted-status">' + "False" + '</p>';
    }
}
const getDelete = (rowOb) => {
    if (rowOb.del) {
        return '<p class="working-status">' + "True" + '</p>';
    } else {
        return '<p class="deleted-status">' + "False" + '</p>';
    }
}
const getStatus = (rowOb) => {
    if (rowOb.status) {
        return '<p class="working-status">' + "True" + '</p>';
    } else {
        return '<p class="deleted-status">' + "False" + '</p>';
    }
}

const getModule = (rowOb) => {
    // console.log(rowOb.employee_id.designation_id.name);
    if (rowOb.module_id.name == 'EMPLOYEE') {
        return '<p class="working-status">' + rowOb.module_id.name + '</p>';
    }
    if (rowOb.module_id.name == 'PRIVILEGE') {
        return '<p class="resign-status">' + rowOb.module_id.name + '</p>';
    }
    if (rowOb.module_id.name == 'USER') {
        return '<p class="deleted-status">' + rowOb.module_id.name + '</p>';
    }
    // let userRoles = '';
    // rowOb.roles.forEach(element => {
    //     userRoles = userRoles + element.name + ","
    // })
    // return userRoles;
}

const getEmpRole = (rowOb) => {
    // console.log(rowOb.employee_id.designation_id.name);
    if (rowOb.role_id.name == 'Manager') {
        return '<p class="working-status">' + rowOb.role_id.name + '</p>';
    }
    if (rowOb.role_id.name == 'Admin') {
        return '<p class="resign-status">' + rowOb.role_id.name + '</p>';
    }
    if (rowOb.role_id.name == 'Cashier') {
        return '<p class="resign-status">' + rowOb.role_id.name + '</p>';
    }
    if (rowOb.role_id.name == 'Store-Manager') {
        return '<p class="deleted-status">' + rowOb.role_id.name + '</p>';
    }
    // let userRoles = '';
    // rowOb.roles.forEach(element => {
    //     userRoles = userRoles + element.name + ","
    // })
    // return userRoles;
}


const deleteButtonFunction = (rowOb, rowindex) => {
    const userConfirm = confirm('Are you sure you want to delete');
    if (userConfirm) {
        // employees[rowindex].employeeStatus_id = {id:3, name:'Delete'};

        const deleteServerResponse = ajaxRequestBodyMethod("/privilege", "DELETE", rowOb)
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
    console.log(privilege);
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

    return errors;
}

//create function for add button
const buttonEmpAdd = () => {
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

const refillPrivilegeForm = (item, index) => {
    $('#empForm').modal('show');

    // employee = employees[rowindex]; // No 'let' declaration, directly update the outer 'employee'
    privilege = JSON.parse(JSON.stringify(item));
    oldprivilege = JSON.parse(JSON.stringify(item));

    //employee list without user account
    roles = ajaxGetRequest("/role/findall")
    fillDataIntoSelect(selectRole, "Select Role", roles, 'name', privilege.role_id.name)
    selectRole.disabled = true;

    modules = ajaxGetRequest("/module/findall")
    fillDataIntoSelect(selectModule, "Select Module", modules, 'name', privilege.module_id.name)
    selectModule.disabled = true;


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
                olduser.roles.forEach(element1 => {
                    if (element.id != element1.id) {
                        updates = updates + element.name, " are changed"
                    }
                })
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

    return updates;
}

//define function for employee update
const buttonEmpUpdate = () => {
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

const generateModuleList = () => {
    modulesByRole = ajaxGetRequest("/module/listbyrole?roleid=" + JSON.parse(selectRole.value).id)
    fillDataIntoSelect(selectModule, "Select Module", modulesByRole, 'name')

    selectModule.disabled = false;
}

//create function for refreashForm area
const refreshEmployeeForm = () => {
    //create empty object
    privilege = new Object();

    //employee list without user account
    roles = ajaxGetRequest("/role/findall")
    fillDataIntoSelect(selectRole, "Select Role", roles, 'name')
    selectRole.disabled = false;

    modules = ajaxGetRequest("/module/findall")
    fillDataIntoSelect(selectModule, "Select Module", modules, 'name')
    selectModule.disabled = true;


    //set auto binding
    inputSelect.checked = false;
    inputInsert.checked = false;
    inputUpdate.checked = false;
    inputDelete.checked = false;

    console.log(privilege);
    //set default color
    // inputUsername.style.border = "2px solid #ced4da"


}





