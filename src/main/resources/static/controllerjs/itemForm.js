//browser onload event
window.addEventListener('load',()=>{
    itemFormRefresh();
})

//define function for refresh item form
const itemFormRefresh = () =>{
    item = new Object();

    itemStatuses = ajaxGetRequest("itemstatus/list");
    fillDataIntoSelect(selectItemStatus,"select item status",itemStatuses, "name")
    //bind data into item object
    // item.itemstatus_id = JSON.parse(selectItemStatus.value)
    //set valid color
    selectItemStatus.style.border = "2px solid green"

    brands = ajaxGetRequest("/brands/list");
    fillDataIntoSelect(selectBrand,"select brand",brands, "name", "")

    categories = ajaxGetRequest("/categories/list");
    fillDataIntoSelect(selectCategory,"select category",categories, "name", "")

    subcategories = ajaxGetRequest("/subcategory/list");
    fillDataIntoSelect(selectSubCategory,"select sub category",subcategories, "name", "")

    unittypes = ajaxGetRequest("/unittypes/list");
    fillDataIntoSelect(selectUnitType,"select Unit types",unittypes,"name", "")

    packagetypes = ajaxGetRequest("/packagetype/list");
    fillDataIntoSelect(selectPackageType,"select packages",packagetypes, "name", "")
}

//define function for filter subcategory by category
const filterSubCategory = () =>{
    console.log(JSON.parse(selectCategory.value));

    subcategoriesByCategory = ajaxGetRequest("/subcategory/listbycategory?categoryid="+JSON.parse(selectCategory.value).id);
    fillDataIntoSelect(selectSubCategory,"select sub category",subcategoriesByCategory, "name", "")

    // brandsByCategory =ajaxGetRequest("/brand/listbycategory?brandid="+JSON.parse(selectCategory.value).id);
    // fillDataIntoSelect(selectBrand,"select brand",brandsByCategory, "name","");

}

//define function for filter category by brand
const filterCategory = () =>{
    // console.log(JSON.parse(selectCategory.value));
    categoriesByBrand = ajaxGetRequest("/category/listbybrand/"+JSON.parse(selectBrand.value).id);
    fillDataIntoSelect(selectCategory,"select category",categoriesByBrand, "name", "")

    // if(JSON.parse(selectCategory.value).name == "Rice"){
    //     open some ui components
    // }

}

//generate item name
const generateItemName = () =>{
    if(
    selectBrand.value != "" && 
    selectSubCategory.value != "" && 
    textItemSize.value != "" && 
    selectUnitType.value != "" && 
    selectPackageType.value != "")
    {

        inputFullItemName1.value = 
        JSON.parse(selectBrand.value).name + " " + 
        JSON.parse(selectSubCategory.value).name + " " + 
        textItemSize.value + " "
        +JSON.parse(selectUnitType.value).name +" " +
        JSON.parse(selectPackageType.value).name;

        item.itemname = inputFullItemName1.value;
        inputFullItemName1.style.border = "2px solid green"
    }
}



