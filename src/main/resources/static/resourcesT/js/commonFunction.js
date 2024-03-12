//set default color into element
const resetIntoDefault = () =>{
    elementArray.forEach(element => {
        // element.classList.remove("is-valid")
        // element.classList.remove("is-invalid")
        element.style.border = "1px solid #ced4da";
    });
}
//define function for ajax get request
const ajaxGetRequest = (url) =>{
    let serverResponse;
    $.ajax(url, {
        async: false,
        type: 'GET',
        dataType: 'json',
        success: function (data, status, ahr) {
            console.log("success" + status + " " + ahr);
            serverResponse = data;
        },
        error: function (ahr, status, errormsg) {
            console.log("Fail" + errormsg + " " + status);
            serverResponse = [];
        }
    })
    return serverResponse;
}
//common ajax function(post,put,delete)
const ajaxRequestBodyMethod = (url, method, object)=>{
    let serverResponse;
    $.ajax(url,{
    async: false,
    type: method,
    data:JSON.stringify(object),
    contentType:'application/json',
    success:function(data, status, ahr){
        console.log(url+" \n" +"success"+status + " " + ahr);
        serverResponse =data;
    },
    error:function(ahr, status, errormsg){
        console.log(url+" \n" +"Fail"+ errormsg+" "+ status +" "+ahr);
        serverResponse = [];
    }
})

return serverResponse;

}

// define function for fill data into select element
const fillDataIntoSelect = (fieldId,message, dataList, property, selectedValue)=>{
    fieldId.innerHTML = '';
    if (message !== "") {

        
                const optionMsg = document.createElement('option');
                optionMsg.value = ""
                optionMsg.innerText = message;
                optionMsg.selected = 'selected';
                optionMsg.disabled = 'disabled';
                fieldId.appendChild(optionMsg)
    }
    
    dataList.forEach(element => {
        let option = document.createElement('option');
        option.value = JSON.stringify(element);
        option.innerText = element[property];
        if (selectedValue === element[property]) {
            option.selected = 'selected';
        }
        fieldId.appendChild(option);
    })

}

// define function for fill data into select element
const fillDataIntoSelectTwo = (fieldId,message, dataList, property,propertyTwo, selectedValue)=>{
    fieldId.innerHTML = '';
    if (message !== "") {

        let optionMsg = document.createElement('option');
        optionMsg.value = ""
        optionMsg.innerText = message;
        optionMsg.selected = 'selected';
        optionMsg.disabled = 'disabled';
        fieldId.appendChild(optionMsg)
    }
   
    
    dataList.forEach(element => {
        let option = document.createElement('option');
        option.value = JSON.stringify(element);
        option.innerText = element[property] + ': ' + element[propertyTwo];
        if (selectedValue === element[property]) {
            option.selected = 'selected';
        }
        fieldId.appendChild(option);
    })

}

