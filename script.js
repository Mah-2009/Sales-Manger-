// Calling Html ELements
let title = document.getElementById("title");
let price = document.getElementById("price");
let tax_fee = document.getElementById("tax_fee");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("Count");
let Category = document.getElementById("Category");
let submit = document.getElementById("submit");


// Create Mood Variable To use it When Edit Data 
let mood = "Create";

// Create A global Variable
let global;

// Create a function That sums The Input Values 
function sum() {
    if(price.value !== "") {
        let result = (+price.value + +tax_fee.value + +ads.value) - +discount.value;
            total.innerHTML = result;


        total.style.backgroundColor="#040"
    }else{
        total.innerHTML=""
        total.style.backgroundColor="#a00d02"
    }
}

// Create The Product
let data_product ;

// check The Data In LocalStorage
if(localStorage.Products != null){
    data_product = JSON.parse(localStorage.Products);
} else{
   data_product=[]   
}


// Create A function To Add Products
submit.onclick=function(event){
    
    // Prevent the default form submission behavior
    event.preventDefault();
    
    // Create An Objet To Organize The Data
    let new_obj = {
        title:title.value,
        price : price.value,
        tax_fee : tax_fee.value,
        ads : ads.value,
        discount : discount.value,
        count:count.value,
        total : total.innerHTML,
        count:count.value,
        Category : Category.value,
    };

if(title.value.trim() !="" && price.value.trim() != "" &&Category.value.trim() !=""  && new_obj.count < 100){
    // Update Data
    if(mood === "Create"){
        // Check The count Value
        if(new_obj.count > 1){
            // Looping on the count
            for(let i = 0; i < new_obj.count; i++){
                data_product.push(new_obj);
            } 
                // Check Other Cases
            } else{
            // Add The object To The Array
            data_product.push(new_obj);
            }

    } else{
        // Update The Object
        data_product[global] = new_obj;
        // return The mood to Create 
        mood="Create";
        // return innerHtml 
        submit.innerHTML = "Create"
        // Show Count Box
        count.style.display = "block";
    }
    clearInput();}

    // Clear Data From Input
    // Save To Local Storage
    localStorage.setItem("Products",JSON.stringify(data_product));



    // Add The Data
     Read();
}
// Clear Input Function 
function clearInput() {
    // Change The Input Value
    title.value="";
    price.value=""
    tax_fee.value="";
    ads.value  = "";
    discount.value = "";
    total.innerHTML="";
    count.value="";
    Category.value="";     
    total.style.backgroundColor="#a00d02"
}

// Read Products Function
function Read() {
    let table = '';
    for (let i = 0; i < data_product.length; i++) {
        // Create A Table and add elements
        table +=  `
        <tr>
        <td>${i + 1}</td>
        <td>${data_product[i].title}</td>
        <td>${data_product[i].price}</td>
        <td>${data_product[i].tax_fee}</td>
        <td>${data_product[i].ads}</td>
        <td>${data_product[i].discount}</td>
        <td>${data_product[i].count}</td>
        <td>${data_product[i].total}</td>
        <td>${data_product[i].Category}</td>
        <td><button id="update" onclick=updateData(${i})>Update</button></td>
        <td><button id="delete" onclick=deleteProduct(${i}) >Delete</button></td>
        </tr>`;
    }
    // Get The element
        document.getElementById("tbody").innerHTML = table;
        let del=document.getElementById("delete_All");
        if(data_product.length > 0){
            del.innerHTML=`
            <button onclick= deleteAll() >Delete All (${data_product.length})</button>
            `
        } else{
            del.innerHTML="";
        }
        sum()
    }
    Read();
    
    
    // Create A delete function
    function deleteProduct(i) {
        data_product.splice(i,1);
        localStorage.Products=JSON.stringify(data_product)
        Read();
    }
    
    // Create Delete All Function
    function deleteAll() {
        localStorage.clear();
        data_product.splice(0)
        Read();
    }



// Create A function To Update Data
function updateData(i){
    // Update Data
    title.value= data_product[i].title;
    price.value= data_product[i].price;
    tax_fee.value= data_product[i].tax_fee;
    ads.value= data_product[i].ads;
    discount.value= data_product[i].discount;
    count.style.display="none"
    Category.value= data_product[i].Category;
    
    // Sum Total
    sum();
    // Change Submit Value
    submit.innerHTML="Update";
    // Change mood Variable
    mood = "Update"
    // declare The global value
    global= i;
    scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })
}


// title variable
let search_  = 'title'
// Create A Search Function 
function Search_method(id) {
    let Search_btn = document.getElementById("Search_btn");
    if("s_title"==id){
        search_ = 'title'.trim();
    } else{
        search_ = 'Category'.trim();
    }
    Search_btn.setAttribute(`placeholder`, `Search By ${search_}`);
    Search_btn.focus();
    Search_btn.value=""   
    Read()
}

// Create Search Data Function
function Search_data(s_value) {
    let table=""
    // Search For Category or Title
    for(let i = 0;i<data_product.length;i++){
        if("title" === search_){
            if(data_product[i].title && data_product[i].title.toLowerCase().includes(s_value.toLowerCase())){
                table +=  `
                <tr>
                <td>${i + 1}</td>
                <td>${data_product[i].title}</td>
                <td>${data_product[i].price}</td>
                <td>${data_product[i].tax_fee}</td>
                <td>${data_product[i].ads}</td>
                <td>${data_product[i].discount}</td>
                <td>${data_product[i].count}</td>
                <td>${data_product[i].total}</td>
                <td>${data_product[i].Category}</td>
                <td><button id="update" onclick=updateData(${i})>Update</button></td>
                <td><button id="delete" onclick=deleteProduct(${i}) >Delete</button></td>
                </tr>`;
            }
            } else{
            if (data_product[i].Category && data_product[i].Category.toLowerCase().includes(s_value.toLowerCase())) {
            table +=  `
            <tr>
            <td>${i + 1}</td>
            <td>${data_product[i].title}</td>
            <td>${data_product[i].price}</td>
                <td>${data_product[i].tax_fee}</td>
                <td>${data_product[i].ads}</td>
                <td>${data_product[i].discount}</td>
                <td>${data_product[i].count}</td>
                <td>${data_product[i].total}</td>
                <td>${data_product[i].Category}</td>
                <td><button id="update" onclick=updateData(${i})>Update</button></td>
                <td><button id="delete" onclick=deleteProduct(${i}) >Delete</button></td>
                </tr>`;
        }
    }}
    document.getElementById("tbody").innerHTML = table;

}