const e=React.createElement;
//users section
//add user subsection

function toast(msg, clas="bg-success") {
 //create icon element
  var icon=document.createElement("span");
     
//create Div
var div=document.createElement("div");

//give id to the div
div.id="toast";

//give it a classname
div.className="card show"+" "+ clas+" "+ " border border-info ";
var msg=msg;

//create textNode
var text=document.createTextNode(msg);

//add text element to the div
div.appendChild(icon);
div.appendChild(text);

//append the div to the document
document.body.appendChild(div);

setTimeout(function(){

  div.className=div.className.replace("show","");

  div.parentNode.removeChild(div);
},3000)


}
class UserComponent extends React.Component {

 constructor(props) {
    super(props);
    this.state={
    data:""
    }

 } 
componentDidMount(){
  let user=this.props.prop;
 
 $.ajax({
   Method:'GET',
   url:'user.php',
   data:{id:parseInt(user)}
 }).then(data=>{

this.setState({data:JSON.parse(data)});
 })



 //   fetch("http://localhost/Denis/Admin/user.php")
 //   .then(response=>response.json())
 //   .then(data=>{
 // this.setState({data:data});
 //   })
 }
//get the email

getfile(e) {
console.log(e.target.value);
}
//validation function
validate(value,column) {
  if(value=="") {
    this.toast("please enter "+column+" if you want to edit");
    return false
  }
 return true;
}//
toast(msg) {
 //create icon element
  var icon=document.createElement("span");
     
//create Div
var div=document.createElement("div");

//give id to the div
div.id="toast";

//give it a classname
div.className="card show bg-success border border-info ";
var msg=msg;

//create textNode
var text=document.createTextNode(msg);

//add text element to the div
div.appendChild(icon);
div.appendChild(text);

//append the div to the document
document.body.appendChild(div);

setTimeout(function(){

  div.className=div.className.replace("show","");

  div.parentNode.removeChild(div);
},3000)


}

//function to validate inputs
validateInput(item,name,min,max) {
if(item.length=="") {
this.toast(name+"is required");
return false;
}else if(item.length<min) {
  this.toast(name+"should be more than"+min+"characters")

  return false;
}else if(item.length>max) {
   this.toast(name+"should less than"+max+"characters")
   return false;
}else {
  return item;
}
}
postdata1(e) {

   




//get firstname



let firstname=this.validateInput($("#firstname").val(),"Firstname",2,30);
let lastname=this.validateInput($("#lastname").val(),"Lastname",2,30);
let email=this.validateInput($("#email").val(),"Email",7,30);
let username=this.validateInput($("#username").val(),"Username",2,10);
let role=this.validateInput($("#role").val(),"Role",1,1);
let password=this.validateInput($("#password").val(),"password",4,14);
 let image=$("#round_image_user").attr("src");


 if(firstname&&lastname&&email&&username&&role&&password) {
   //send the data
  $.ajax({
   Method:'GET',
   url:'add_user.php',
   data:{
 firstname:firstname,
 lastname:lastname,
 email:email,
 username:username,
 role:role,
 password:password,
 image:image

   }
 }).done((res)=> {
   this.toast(res)
 })

 }else {
  alert("something went wrong");
 }

 



  



}



postdata2(e){
  //for edit button to search for image
let image=$("#round_image_user").attr("src");
 let id=this.props.prop;
$.post("edit_user.php",{value:image,column:"image",id:id}).done(function(res){
//create icon element
  var icon=document.createElement("span");
     
//create Div
var div=document.createElement("div");

//give id to the div
div.id="toast";

//give it a classname
div.className="card show bg-success border border-info ";
var msg=res;

//create textNode
var text=document.createTextNode(msg);

//add text element to the div
div.appendChild(icon);
div.appendChild(text);

//append the div to the document
document.body.appendChild(div);

setTimeout(function(){

  div.className=div.className.replace("show","");

  div.parentNode.removeChild(div);
},3000)


})

}


postdata(e) {
  let btn=$("#submit").text();
    let value=e.target.value;
 let column=e.target.getAttribute("name")
 let id=this.props.prop;
  if(btn!="Add")  {

 // this.toast("Update  Successful")

let validated=this.validate(value,column);
if(validated) {
  //post this to the database
$.post("edit_user.php",{value:value,column:column,id:id})
.done(function(res){


if(!res) {
 // console.log("empty");
}else {
 //create icon element
  var icon=document.createElement("span");
     
//create Div
var div=document.createElement("div");

//give id to the div
div.id="toast";

//give it a classname
div.className="card show bg-success border border-info ";
var msg=res;

//create textNode
var text=document.createTextNode(msg);

//add text element to the div
div.appendChild(icon);
div.appendChild(text);

//append the div to the document
document.body.appendChild(div);

setTimeout(function(){

  div.className=div.className.replace("show","");

  div.parentNode.removeChild(div);
},3000)

}

})
}

  }





}


 render() {

  const {title:title, btntitle:btntitle}=this.props;

const { id,username,firstname,lastname,email,role,image }=this.state.data;

if(role=="user") {
var  active=2
}
    return(
  e("div",{className:"w-100"},
//first div
e("div",{className:"card w-75 mx-auto text-center p-2 cadduser"},
        e("h2",{className:"h3"},title)),
//the second div
  e("div",{className:"row mt-3 mx-auto"},
         e("div",{className:"col-6"},e("div",{className:"round_image_user"},
      e("img",{src:image,height:"150px", width:"150px",className:"round_image_user",id:"round_image_user"})
          )),
         e("div",{className:"col-6"},
          e("form",{action:"upload.php",id:"form",method:"post","encType":"multipart/form-data", target:"iframe"},
              e("input",{name:"file", type:"file",id:"upload_img"}),
              e("input",{type:"submit",name:"submit",className:"btn btn-primary btn w-50",value:"submit"})
            ),
          e("iframe",{name:"iframe",style:{display:"none"}}),
          e("div",{className:"card bg-success text-white",id:"error",style:{display:"none"}},"here is upload log")
          
                )
         ),//end of row
  //the third div
  e("div",{className:"row text-center mx-auto w-100 mt-3"},
    e("div",{className:"col-6"},
   e("div",{className:"form-group"},
    e("label",null,"Your Firstname:"),
   e("input",
    {type:"text",
     name:"firstname",
     id:"firstname",
     className:"form-control",
     onBlur:(e)=>this.postdata(e),

    placeholder:firstname})
    ),
   //last name
     e("div",{className:"form-group"},
      e("label",null,"Your Lastname:"),
   e("input",
    {type:"text",
     name:"lastname",
     id:"lastname",
     className:"form-control",
     onBlur:(e)=>this.postdata(e),
     placeholder:lastname})
    ),
       e("div",{className:"form-group"},
        e("label",null,"Your Email:"),
   e("input",
    {type:"text",
     name:"email",
     id:"email",
     className:"form-control",
     onBlur:(e)=>this.postdata(e),
     placeholder:email})
    ),
    e("div",{className:"form-group"},
      e("label",null," Your username:"),
   e("input",
    {type:"text",
     name:"username",
     id:"username",
     className:"form-control",
     onBlur:(e)=>this.postdata(e),
     placeholder:username})
    )
        ),
     e("div",{className:"col-6"},
      e("div",{className:"form-group"},
      e("label",null,"Assign New Role"),
        e("select",{
            name:"role",
            id:"role",
            className:"form-control w-50 d-inline-block",
            onChange:(e)=>this.postdata(e),
            defaultValue:active !=undefined?active:""
        },
            e("option",{value:""},"Not Selected"),
            e("option",{value:"1"},"Admin"),
            e("option",{value:"2"},"User"),
            e("option",{value:"3"},"Manager")
        )//end select
    ),
      //password
         e("div",{className:"form-group"},
   e("input",
    {type:"password",
    id:"password",
     name:"password",
     className:"form-control",
     onBlur:(e)=>this.postdata(e),
     placeholder:"Enter new password"
})
    ),
  
         //submit
 e("div",{className:"form-group"},
   e("button",
    {type:"button",
     name:"submit",
     id:"submit",
     onClick:btntitle=="Add"?(e)=>this.postdata1(e):(e)=>this.postdata2(e),
     className:"btn btn-success w-100 p-2"
     
     },btntitle)
    )

        )
    )
  )
        )
    
  
 }  
}
 //end add user subsection

class User extends React.Component {
    constructor() {
      super();
      this.state={
        data:[
        {
          id:1,
          image:"images/user.jpg",
          data:[
        {Name:"Name:",value:"Kiprono Denis",style:{}},
        {Name:"Email:",value:"kipronokemei98@gmail",style:{}},
        {Name:"Customers served:",value:1200,style:{}},
        {Name:"Status:",value:"Active",style:{color:"#10E37D"}},
        {Name:"Date Added:",value:"12/12/18",style:{}},
        {Name:"Role:",value:"Admin",style:{color:"#BB3131"}},
        {Name:"Last Login:",value:"12/2/19",style:{color:"#999999",fontWeight:" 100",fontSize:"16px"}}

                   
                ]


        }
       
        
        ]
      }//end of state


    }//end of constructor

componentDidMount() {
   fetch("http://localhost/Denis/Admin/users.php")
   .then(response=>response.json())
   .then(data=>{
    let changedS=this.state;
    changedS.data=data;
    this.setState(changedS);

   })
}

toast(msg) {
 //create icon element
  var icon=document.createElement("span");
     
//create Div
var div=document.createElement("div");

//give id to the div
div.id="toast";

//give it a classname
div.className="card show bg-success border border-info ";
var msg=msg;

//create textNode
var text=document.createTextNode(msg);

//add text element to the div
div.appendChild(icon);
div.appendChild(text);

//append the div to the document
document.body.appendChild(div);

setTimeout(function(){

  div.className=div.className.replace("show","");

  div.parentNode.removeChild(div);
},3000)


}


deleteHandler(e) {
 let id=e.target.id;
 let realState=this.state;
let newstate=realState.data.filter(item=>{
  if(item.id!=id) {
return item;
  }


});

 $.ajax({
   Method:'GET',
   url:'delete_user.php',
   data:{id:id}
 }).done((res)=>{
   if(res==1) {
realState.data=newstate;
this.setState(realState);
this.toast("Successfully Deleted");
   }else {
    this.toast("Failed to deleted");
   }
 })



}
    render(){

      return(
          e("div",{className:"deck mx-2 text-center "},
            e("span",{className:"btn btn-primary ml-0",onClick:(e)=>this.props.click(7,e.target.id)},"Add new User"),

             this.state.data.map(item=>{
          return  e("div",{className:"card col-md-4 mx-auto d-inline-block m-2",key:item.id},

           e("img",{src:item.image,className:"card-img-top user_card"}),
           e("div",{className:"card-body mt-3 px-0",style:{backgroundColor:"white !importart",border:"none !important"}},
            e("ul",{className:"list-group"},
              item.data.map(data=>{
                
                return e("li",{className:"list-group-item",key:data.value},
                            e("strong",null,data.Name),
                            e("span",{style:data.style},data.value)
                    )
              }),
              e("li",{},e("a",{href:"#",id:item.id,onClick:(e)=>this.deleteHandler(e),className:"btn btn-danger float-right m-2"},"Delete"),
                e("a",{href:"#",id:item.id,className:"btn btn-success float-left m-2",onClick:(e)=>this.props.click(6,e.target.id)},"Edit")
                ),
              
              )
            )
              )
          }))
         
        )
    }
}

//end of user section


//start of product section

const Products=(props)=> {

	const list=props.list;
 return (
 	e("div",{className:"col-6"},
      e("div",{className:"card card-p"},
       e("table",{className:"w-100"},
         e("tr",null,
           e("td",null,
            e("span",{className:"badge badge-primary float-right p-2 bg-success",onClick:()=>props.click(9)},"Create Product"),
            e("h4",null,"PRODUCT LIST")
           	),
         e("td",null,
            e("p",{className:"circle-badge float-right"},list.length)
         	)
         	)
       	 ),

       e("div",{style:{"maxHeight":"350px !important",'overflowY': "scroll"}},
      e("table",{className:"table table-hover",id:"product-table1"},
         e("thead",null,
          e("tr",null,
          	e("td",null,"#"),
          	e("td",null,"Name"),
          	e("td",null,"Price"),
          	e("td",null,"Action"),
          	e("td",null,"Instock")
          	 )
         	),
         e("tbody",null,
           list.map(item=>{

           	return(
            e("tr",{key:item.id},
             e("td",null,item.id),
               e("td",null,item.name),
               e("td",null,"20"),
               e("td",null,
                 e("span",{id:item.id,className:"text-primary far fa-edit hover",onClick:(e)=>props.click(11,e.target.id)}),
                 e("span",{name:item.id,className:"text-danger fas fa-trash hover",onClick:(e)=>props.deleting(e)})
               	  ),
               e("td",null,
                 e("a",{ name:item.id,onClick:(e)=>props.enable(e),className:item.instock==1?"btn btn-primary":"btn btn-warning"},item.instock==1?"Disable":"Enable")
               	)

            	)
           		)
           })
         	)
      	)
       	)
      	)
 		)

 // 	e("div",null,list.map(item=>{

 // 	return e("li",{key:item},item)
 // }))

 	)
}
class Product extends React.Component {
    constructor(props) {
    	super(props);
  this.state={
     title:"SELECT CATEGORY",
     title2:"Product List",
     table_head:['#',"Name","products","Action"],
     tabledata:[{
     	id:1,
     	Category:{
     		name:"Main Meals",
     		products:[
                 {id:1,name:"Ugali Mix"},
                 {id:2,name:"Ugali Mix"},
                 {id:3,name:"Ugali Mix"},
                 {id:4,name:"Ugali Mix"}

               ]
     	}
     },
     {
     	id:2,
     	Category:{
     		name:"Main Meals",
     		products:[
                 {id:1,name:"Ugali Mix"},
                 {id:2,name:"Ugali Mix"}

               ]
     	}
     },
     {
     	id:3,
     	Category:{
     		name:"Main Meals",
     		products:[
                 {id:1,name:"Ugali Mix"},
                 {id:2,name:"Ugali Mix"}

               ]
     	}
     }],

     selected:{
     		id:1,
     	Category:{
     		name:"Main Meals",
     		products:[
                 {id:1,name:"Ugali Mix"},
                 {id:2,name:"Ugali Mix"},
                 {id:3,name:"Ugali Mix"},
                 {id:4,name:"Ugali Mix"}

               ]
     	}
     }
  }
         
    		
    }





componentDidMount(){
  fetch("http://localhost/Denis/Admin/pro.php")
.then(response=>response.json())
.then(data=>{
  let changed=this.state;
  changed.tabledata=data;
  changed.selected=data[0];
   this.setState(changed);

})
}
deletecat(e) {
  let id=e.target.getAttribute("name");

   $.ajax({
   Method:'GET',
   url:'delete_cat.php',
   data:{id:id}
 }).then(data=>{

  toast(data);

    fetch("http://localhost/Denis/Admin/pro.php")
.then(response=>response.json())
.then(data=>{
  let changed=this.state;
  changed.tabledata=data;
  changed.selected=data[0];
   this.setState(changed);

})
 })  

}

    render() {
const disenable=(e)=>{
let id=e.target.getAttribute("name");
let text=e.target.innerHTML;
let value=false;
if(text=="Enable") {
value=1;
}else {
  value=0;
}
//ajax to update here

  $.ajax({
   Method:'GET',
   url:'disableProduct.php',
   data:{instock:value,id:id}
 }).done(res=>{
if(res!=1) {
toast(res);
  //copy the state
  let sc=this.state;
  //get the selected category

  let cid=sc.selected.id;
//lets navigate to the actual category
let index="";
 for(var i=0;i<sc.tabledata.length;i++) {

  if(sc.tabledata[i].id==cid) {
index=i;

  }
 }

//index of the products
var Pindex="";
//navigate to the category
let selectedproducts=sc.tabledata[index].Category.products;
for(var c=0;c<selectedproducts.length;c++) {
  if(selectedproducts[c].id==id) {
 Pindex=c;
  }
}

//navigate to the product and change
sc.tabledata[index].Category.products[Pindex].instock=value;
console.log(sc.tabledata[index].Category.products[Pindex].instock);
this.setState(sc);
}

 })

}

const deleteproductHandler= (e)=> {
  //product id
console.log(this);
 let id= e.target.getAttribute("name");
 //ajax

    $.ajax({
   Method:'GET',
   url:'deleteProduct.php',
   data:{id:id}
 }).done(res=>{
  toast(res);
      fetch("http://localhost/Denis/Admin/pro.php")
.then(response=>response.json())
.then(data=>{

   let changed=this.state;
  changed.tabledata=data;
  changed.selected=data[0];
   this.setState(changed);

})
 })


}
const categoryHandler=(event)=>{

let selected_category=	event.target.parentElement.id;
let change=this.state;

let products_cat=this.state.tabledata.filter(item=>{
	if(item.id==selected_category)return item;
});
change.selected=products_cat[0];

this.setState(change);

}

let list=this.state.selected.Category.products;

    	return(

e("div",{className:"row mx-2 w-100", id:"product-body"},

 e("div",{className:"col-6"},
 e("div",{className:"card"},

 e("table",{className:"bg-primary w-100"},
 e("tr",null,
  e("td",null,
    e("span",{className:"badge badge-primary float-right p-2",onClick:()=>this.props.click(8)},"Create Category"),
  	e("h4",null,this.state.title)),
     e("td",null,
     	 e("p",{className:"circle-badge float-right"},this.state.tabledata.length))
 	),
   e("div",{style:{maxHeight:"350px !important","overflowY":"scroll"}},
    e("table",{className:"table table-hover w-100",id:"product-table"},
       e("thead",null,
         e("tr",null,
           e("td",null,"#"),
           e("td",null,"Name"),
           e("td",null,"Products"),
           e("td",null,"Action")
          )
        ),
       e("tbody",null,
        this.state.tabledata.map(item=>{
          return(
               e("tr",{key:item.id,id:item.id,onClick:categoryHandler},
                  e("td",null,item.id),
                  e("td",null,item.Category.name),
                  e("td",null,item.Category.products.length),
                  e("td",null,
                      e("span",{id:item.id,className:"text-primary far fa-edit hover",onClick:(e)=>this.props.click(10,e.target.getAttribute("id"))}),
                      e("span",{className:"text-danger fas fa-trash hover",name:item.id,onClick:(e)=>this.deletecat(e)})
                      )
                )
            )
        })
        )
      ))
 	))
 ),


  e(Products,{list:list,enable:disenable,click:this.props.click,deleting:deleteproductHandler})

)



        
    		)
    }
}

//start of statistics section
const Aggregate=(props)=>{
  return(
 e("div",{className:"stat_container text-center mt-2"},
   e("div",{className:"card round", id:"stat_sales"},
       e("h2",{className:"display-4"},props.amount)),
   e("h5",{className:"card-text mt-1",style:{color:"#9A1F41"}},props.Text)
  )
    )
}

const Graph=()=> {
  const month=["Select Month","January","February","March","April","May","June","July","August","September","October","November","December"];
  return(
 e("div",{className:"card",id:"stat_top_card"},
    e("table",{className:"table"},
       e("tbody",null,
         e("tr",null,
           e("td",null,
            e("h4",null,"Weekly Transactions")
            ),
             e("td",null,e("select",{name:"Month",className:"form-control",defaultValue:"Select month"},
              month.map(item=>{
                return(
           e("option",{value:month.indexOf(item),key:item},item)
                  )
              })
              ))
           )
        )
      )
  )

    )
}
class Statisctic extends React.Component {
       constructor(){
        super();
       }
   componentDidMount() {
    //get canvas
  var canvas=document.querySelector("#canvas");

  //get context
  var context=canvas.getContext("2d");
var values=['10','100','300','320','10','100','350'];
  //declare constant width
  var width=60;
  var X=0;//starting x-axis position
  var colors=['#811',"#6E16A2",'#811',"#6E16A2",'#811',"#6E16A2",'#811'];
  context.fillStyle="#811";
  for (var i = 0; i < values.length; i++) {
    
      context.fillStyle=colors[i];
    
    var h=values[i];
    //draw
    context.fillRect(X,canvas.height-h,width,h);

    X+=width+1;
  }

   }
       render() {

        return(
          e("div",{className:"row"},
          e("div",{className:"col-md-4"},
                e(Aggregate,{amount:"123",Text:"AGGREGATE SALES"}),
                e(Aggregate,{amount:"12",Text:"AGGREGATE TRANSACTIONS"})
            )
            ,
            e("div",{className:"col-md-8 mx-auto"},
              e(Graph),
               e("canvas",{id:"canvas",height:"350",width:"500",style:{border:"1px solid white",className:"mt-1"}})
              )
            )
          ) 
       }

}


//end of statistics section

//START OF PROMOTION SECTION
const PromoCard=(props)=>{
  return(
     e("div",{className:"btn btn-primary w-75 promo_btn mt-5  p-5"},props.title)
    )
}

const PromoDiv=()=> {
  return(
    e("div",{className:"col-6 p-2"},

 e(PromoCard,{title:"New Promotion"}),
 e(PromoCard,{title:"Edit Promotion"}),
 e(PromoCard,{title:"View Promotion"})
      )

    )
}

class CreatePromo extends React.Component {
  constructor() {
    super();
    this.state={
      Categories:["Main Meals","Beverages","Drinks","Others"],
      products:["Ugali Makande","Rice Beans","Uji Moto","Menginevyo"]
    }

  }

  render() {

    return(
     e("div",{className:"col-6 mt-5 p-2"},
         e("div",{className:"card w-75"},
          e("div",{className:"card-header text-center"},
            e("h4",null,"Create New Promotion")
            ),
         e("form",{className:"px-2"},
          e("div",{className:"form-group"},
                e("label",null,"Enter Promotion name:"),
                e("input",{type:"text",name:"prom_name", className:"form-control"})
            ),

           e("div",{className:"form-group"},
                e("label",null,"Select Category:"),
                e("select",{name:"Category" ,className:"form-control"},
                      this.state.Categories.map(item=>{
                        return(
                   e("option",{value:this.state.Categories.indexOf(item),key:item},item)
                          )
                      })
                  )
            ),
           e("div",{className:"form-group"},
                e("label",null,"Select Product:"),
                e("select",{name:"product_promo", className:"form-control"},
                      this.state.products.map(item=>{
                        return(
                   e("option",{value:this.state.Categories.indexOf(item),key:item},item)
                          )
                      })
                  )
            ),
           e("div",{className:"form-group"},
                e("label",null,"Enter Price Off:"),
                e("input",{type:"number",name:"priceoff" ,className:"form-control"})
            ),
           e("div",{className:"form-group"},
          
                e("input",{type:"button",name:"prom_submit" ,className:"btn btn-success w-100 py-3",value:"Submit"})
            )
           )
          )
      )
      )
  }
}

const PromotionB=()=> {
  return(
    e("div",{className:"row"},
        e(PromoDiv),
        e(CreatePromo)
      )
    )
}
//END OF PROMOTION SECTION
//start of index section
class Nav extends React.Component {

	constructor(){
		super();
		this.state={
			user:{name:"Kiprono",id:"58"}

		}
	}
  
  componentDidMount() {

    fetch("http://localhost/Denis/Admin/server.php")
     .then(response=>response.json())
     .then(data=>{
      let chang=this.state;
      chang.user=data;
      this.setState(chang);
      console.log(this.state.user);
     })
  }
	render() {
		 const {name,id}=this.state.user;
     const url="http://localhost/Denis/userlogin.php?id="+id;
			return e("nav",{className:"navbar", id:"navbar"},
        e("h1",null,"EasyCafe"),
        e("a",{href:"http://localhost/Denis/index.php"},"Home"),
        e("a",{href:url},"LogOut"),
        e("p",{className:"navbar-right"},
        	e("span",{className:"fa fa fa-user fa-2x"}),name) 

		);

	}
}

ReactDOM.render(React.createElement(Nav),document.querySelector("#nav_root"));

const List=(props)=>{
	//console.log(props);
	return (
		e("li",{className:"list-group-item my-3",id:props.id,onClick:props.click()},
   props.name
		))
}
//this is sideBar
class SideBar extends React.Component {
	constructor(){
		super();
		this.state={
			name:[{name:"Home",id:"1"},
			{name:"Users",id:"2"},
			{name:"Products",id:"3"},
			{name:"Statistics",id:"4"},
			{name:"Promotion",id:"5"}]
		}
	}


	render(){
	const changing=(e)=> {
		//console.log(e.target.id)
		this.props.change(e.target.id)
		
	}
		return(
         e("div",{className:"card navigation mt-3 ml-2"},
           	e("div",{className:"card-header text-center w-100 "},
            e("h2",{className:"Circular"},"Navigation")
           		),
           	e("div",{className:"card-body p-0 m-0"},
               e("ul",{className:"list-group p-0  w-75",id:"navigation_li"},
               	this.state.name.map(name=>{
               return(e(List,{name:name.name,key:name.id,id:name.id,click:()=>changing}));	
               	})
            
               	)
           		)

         	)
			)
	}
	}

//ReactDOM.render(React.createElement(SideBar),document.querySelector("#sideBar"));

//this is the first row
class FirstRow extends React.Component {
	constructor(){
		super();
		this.state={
			data:[{id:"customers",qty:200,desc:"Customers Served"},
			{id:"products",qty:210,desc:"Product Sold"},
			{id:"sales",qty:20,desc:"Today's Total Sales"}]
		}
	}

	componentDidMount() {
		fetch("http://localhost/Denis/Admin/index_controller.php")
		 .then(response=>response.json())
		 .then(data=>{
		 	this.setState({
			data:[{id:"customers",qty:data.Customers,desc:"Customers Served"},
			{id:"products",qty:data.products_sold,desc:"Product Sold"},
			{id:"sales",qty:data.sales,desc:"Today's Total Sales"}]
		})


		 })
	}
	render(){
		return(
          e("div",{className:"row mx-auto"},this.state.data.map(item=>{
          	return(
          		e("div",{key: item.id,className:"col-4"},e(
                   "div",{className:"row rounded",id:item.id},
                   e("div",{className:"col-6 amount"},item.qty),
                   e("div",{className:"col-6 description p-1"},item.desc)
          			))
          		);
          }))
			)
	}
}
//ReactDOM.render(React.createElement(FirstRow),document.querySelector("#first_row"));

//this is the second row

class SecondRow extends React.Component {
	constructor(){
		super();
		this.state={
			data:[{id:"card1",qty:2,desc:"Active Users"},
			{id:"card2",qty:20,desc:"Categories"},
			{id:"card3",qty:300,desc:"Products"}]
		}
	}
 componentDidMount() {
 	fetch("http://localhost/Denis/Admin/index_controller.php")
		 .then(response=>response.json())
		 .then(data=>{
		 	this.setState(
        {
			data:[{id:"card1",qty:data.users,desc:"Active Users"},
			{id:"card2",qty:data.categories,desc:"Categories"},
			{id:"card3",qty:data.products,desc:"Products"}]
		}
		 		)
		 })
 }
	render(){
		return(
          e("div",{className:"row mx-auto mt-5",id:"body2"},this.state.data.map(item=>{
          	return(
          		e("div",{key: item.id,className:"col-4"},
          			e("div",{className:"card mt-1 text-center",id:item.id},
                        e("div",{className:"card-header mt-1"},
                        	e("h5",null,item.desc)
                        	),
                        e("h1",{className:"display-4"},item.qty),
                        e("a",{href:"#",className:"btn btn-success mt-3 w-50 mx-auto"},"View")
          				)
          			)
          		);
          }))
			)
	}
}
class Body extends React.Component {

	constructor() {
		super();
		this.state={
			which:1
		}
	}

	render() {
		return(
         e("div",{className:"w-100"},
         e(FirstRow),
         e(SecondRow)
         	)
			)
	}
}

//class that router


const home=()=>{
	return(e("div",null,"This is home 1")

		)
}

const home2=()=>{
	return(e("div",null,"This is home 2")

		)
}
//add product section
class AddProduct extends React.Component {
 constructor(){
  super();
  this.state={
    updated:false,
    cat:[{
      id:0,
      name:"choose category",
      value:""
    },
    {
      id:1,
      name:"Main Meals",
      value:"fa-delicious"
    },
     {
      id:2,
      name:"Drinks",
      value:"fa-coffee"
    },
      {
      id:3,
      name:"Beverages",
      value:"fa-lemon-o"
    },
        {
      id:4,
      name:"Others",
      value:"fa-birthday-cake"
    }
    ],
    product:{
      id:"",
      name:"",
      amount:""
    

    }
  }

 }

//get the all the categories
componentDidMount() {



  if(this.props.btntitle=="Edit") {

   let id=this.props.prop;
console.log(id);
//ajax here
     $.ajax({
   Method:'GET',
   url:'getProduct.php',
   data:{id:id}
  }).done((res)=>{

  let data=JSON.parse(res);

     let sc=this.state;
     sc.product=data;
      this.setState(sc);

  })
 //.then(res=>response.json())
 //     .then(data=>{
 //      console.log(data);
 //      // let sc=this.state;
 //      // sc.product=data;
 //      // this.setState(sc);
 //     })

  }

     fetch("http://localhost/Denis/Admin/getCategory.php")
   .then(response=>response.json())
   .then(data=>{
let sc=this.state;
sc.cat=data;
this.setState(sc);

   })
}
addproduct(e) {
//get the details
let name=$("#name").val();
let price=$("#price").val();
let category=$("#category").val();
//
if(name.length<2){
  toast("Name must be greater than 2 characters","btn btn-danger");
}else if(price.length==0) {
  toast("Price is required","btn btn-danger")
}else if(category==0) {
  toast("please Choose Category","btn btn-danger","btn btn-danger");
}else if(name>30){
  toast("Name must be less than 30 characters","btn btn-danger");
}else if(price<1) {
  toast("Price must be greater than 0","btn btn-danger")
}else {
  //post the data
     $.ajax({
   Method:'GET',
   url:'addproduct.php',
   data:{name:name,price:price,category:category}
 }).done(res=>{

if(res==0) {
toast("Error..try Unique name!!"," btn btn-danger");
}else {
  toast(res);
}


 })
 
}


}

editproduct(e) {
  //get the value
let value=e.target.value;
let id=this.props.prop;
let column=e.target.getAttribute("name");

if(value.length==""){
  toast(column+" should be more than 2 characters","btn btn-danger");
}else if(value.length>30) {
  toast(column +" should be less than 30 characters","btn btn-danger");
}else if(value=="0") {
  toast("Please Choose a Category","btn btn-danger");
}else {


     $.ajax({
   Method:'GET',
   url:'editProduct.php',
   data:{column:column,value:value,id:id}
 }).done((res)=>{
  if(res==1) {

  }else {
      toast(res);
let sc=this.state;
sc.updated=true;
this.setState(sc);

  }

 })

}
//ajax

  //get the column
}

//butn to check if editing was done
editproductbtn(e){
  if(this.state.updated) {
    toast("Update was successful");
  }else {
    toast("You have not changed anything yet","bg-primary")
  }
}
 render() {
  return(
   e("div",{className:"w-100"},
//h3
e("h3",{className:"h3 text-center mt-1"},this.props.btntitle=="Edit"?this.props.title:"Add Product To Category"),
e("div",{className:"w-50 mx-auto mt-5"},
//product name
e(
"div",{className:"form-group"},
   e("label",null,"Type Product Name:"),
    e("div",{className:"input-group"},
      e("div",{className:"input-group-prepend"},
  e("span",{className:"input-group-text"},
  e("i",{className:"fa fa-coffee"})
    )
        ),

      e("input",{type:"text",
        className:"form-control",
        name:"name", id:"name",
        onBlur:this.props.btntitle=="Edit"?(e)=>this.editproduct(e):"",
        placeholder:this.state.product.name})
      )
  ),//price
e(
"div",{className:"form-group"},
   e("label",null,"Type Product Price:"),
    e("div",{className:"input-group"},
      e("div",{className:"input-group-prepend"},
  e("span",{className:"input-group-text"},
  e("i",{className:"fa fa-dollar-sign"})
    )
        ),

      e("input",{type:"text",
        className:"form-control",
        name:"amount",id:"price",
        onBlur:this.props.btntitle=="Edit"?(e)=>this.editproduct(e):"",
        placeholder:this.state.product.price})
      )
  ),
//seclect
e("div",{className:"form-group"},
e("label",null,"Select category"),
 e("div",{className:"input-group"},
   e("div",{className:"input-group-prepend"},
      e("span",{className:"input-group-text"},
      e("i",null,"Choose")
        )
    ),
   //select
   e("select",{className:"form-control",
    name:"category",
    onChange:this.props.btntitle=="Edit"?(e)=>this.editproduct(e):"",
    id:"category"},
  e("option",{value:"0"},"Choose Category"),this.state.cat.map(item=>{

  return  e("option",{value:item.id,key:item.id},item.name)
   }))
  )
  ),

e("div",{className:"form-group"},
  e("button",{className:"btn btn-success w-100",
    name:"submit",
    onClick:this.props.btntitle=="Edit"?(e)=>this.editproductbtn(e):(e)=>this.addproduct(e)},
    this.props.btntitle=="Edit"?this.props.btntitle:"Add",
     e("span",{className:"fa fa-plus-square"})
    )
  )
  )
    )
    ) //end of return
 }
 } 


//end of product section


//add cagegory section
 

 class AddCategory extends React.Component {
 constructor(){
  super();
  this.state={
    edited:false,
    name:"Category name",
        cat:[{
     
      id:0,
      name:"choose category",
      value:""
    },
    {
      id:1,
      name:"Main Meals",
      value:"fa-delicious"
    },
     {
      id:2,
      name:"Drinks",
      value:"fa-coffee"
    },
      {
      id:3,
      name:"Beverages",
      value:"fa-lemon-o"
    },
        {
      id:4,
      name:"Others",
      value:"fa-birthday-cake"
    }
    ]
  }
 }

componentDidMount() {

  if(this.props.btntitle=="Edit"){
 
   //id
var id=this.props.prop;
   $.get("onecategory.php",{id:id}).done(res=>{

  let sc=this.state;
  sc.name=res;
  this.setState(sc);
   })


$("#cat_name").on("blur",(e)=>{

  let value=e.target.value;
  let column=e.target.getAttribute("name");

//get here
   $.ajax({
   Method:'GET',
   url:'edit_category.php',
   data:{column:column,value:value,id:id}
 }).then(data=>{
  if(data.length==0) {
      toast("Category name must be Unique");

    }else {
        toast(data);
  let sc=this.state;
  sc.edited=true;
  this.setState(sc);
    }

  console.log(id);
 })

})
 //when the select change

 $("#cat_icon").on("change",(e)=>{

  let value=e.target.value;
  let column=e.target.getAttribute("name");
//get here
   $.ajax({
   Method:'GET',
   url:'edit_category.php',
   data:{column:column,value:value,id:id}
 }).then(data=>{
  toast(data);
  let sc=this.state;
  sc.edited=true;
  this.setState(sc);
 })

}) 
  

  }
}
editcat(){
 if(this.state.edited) {
  toast("You successfully Edited data");
 }
//CHECK IF THE EDITED IS TRUE
}
addcategory(e) {
  e.preventDefault();
 let name=$("#cat_name").val();
 let icon=$("#cat_icon").val();

//validate 
if(name=="") {
  alert("Kindly Enter category Name");
}

else if(icon==0) {
  alert("Kindly Choose a category");
}else {
  //submit

   $.ajax({
   Method:'GET',
   url:'newcategory.php',
   data:{name:name,icon:icon}
 }).then(data=>{
  toast(data);
 })

}
}


 render() {
  return(
 e("div",{className:"w-100", id:"addcategory"},
//row
e("div",{className:"row mx-auto "},
   e("div",{className:"card w-75 text-center mx-auto"},
    e("h2",null,this.props.title)
    )
    ), //end of row
//start form
e("div",{className:"w-50 mx-auto mt-5"},
e("div",{className:"form-group"},
e("label",null,"Enter Cagetory Name"),
e("input",{type:"text",name:"category_name",className:"form-control",id:"cat_name",placeholder:this.state.name})
  ),
//select icon
e("div",{className:"form-group"},
e("label",null,"Select Icon"),
e("select",{name:"icon",className:"form-control",id:"cat_icon"},this.state.cat.map(item=>{
  return(
  e("option",{value:item.value,key:item.id},item.name)
    )
}))
  ),
//button
e("div",{className:"form-group"},
e("button",{className:"btn btn-primary d-inline-block  mr-4",onClick:()=>this.props.click(9)},
e("span",{className:"fa fa-plus-square"},"Add Products")
  ),
e("button",{className:"btn btn-success d-inline-block",onClick:this.props.btntitle=="Save"?(e)=>this.addcategory(e):(e)=>this.editcat(e)},
e("span",{className:"fa fa-plus-square"},this.props.btntitle)
  )
  )
  )
  )//end of wrapper
    ) //end of return
 }
 } 

//end of category section




 class App extends React.Component {

 	constructor() {
 		super();
 		this.state={
 			which:1,
      data:""
 		}
 	}

 	// componentDidMount() {
 	// 	setTimeout(()=>{
  //  this.setState({which:5})
 	// 	},3000)
 	// }

 	render() {
const Update=(item,prop="")=> {
	
	this.setState({which:parseInt(item),data:prop})
}
 const switchhandler=(data)=> {


	switch(data) {
        	case 1:
        	return(e(Body))
        	break;
        	case 2:
        	return(e(User,{click:Update}))
        	break;
        	case 3:
        	return(e(Product,{click:Update}))
        	break;
        	case 4:
        	return(e(Statisctic))
        	break;
        	case 5:
        	return(e(PromotionB))
        	break;
          case 6:
          return(e(UserComponent,{prop:this.state.data,title:"EDIT USER",btntitle:"Save"}))
          break;
            case 7:
          return(e(UserComponent,{prop:this.state.data,title:"Add User",btntitle:"Add"}))
          break;
           case 8:
          return(e(AddCategory,{click:Update,prop:this.state.data,title:"Create new Category",btntitle:"Save"}))
          break;
          case 9:
          return(e(AddProduct))
          break;
          case 10:
          return(e(AddCategory,{click:Update,prop:this.state.data,title:"Edit Category",btntitle:"Edit"}))
          break;
           case 11:
          return(e(AddProduct,{prop:this.state.data,title:"Edit Product Details",btntitle:"Edit"}))
          break;
        	default:
        	 return(e(Body))
        	 break;
        }
}

return (e("div",{className:"container-fluid d-flex"},
   e("div",{className:"col-3",id:"sideBar"},e(SideBar,{change:Update})),
   e("div",{className:"col-9 mt-3",id:"body"},switchhandler(this.state.which))
	)
	
	);
        }

 	}
 
ReactDOM.render(e(App),document.querySelector("#index_body"))


//ReactDOM.render(React.createElement(Body),document.querySelector("#body"));
const Footer=()=>{
	return(
        e("footer",{className:"footer w-100 py-2 text-center"},
        	e("p",null,'copyright2019.WEBTECHIE'))
		)
}
ReactDOM.render(React.createElement(Footer),document.querySelector("#footer"));

