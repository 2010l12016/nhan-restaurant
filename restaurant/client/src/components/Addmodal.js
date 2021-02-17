import React,{useState,useEffect} from "react"
import "./Addmodal.css"
import { useForm } from "react-hook-form";
import axios from "axios";


function Addmodal(){


    
    const [productName, setProduct] = useState("");
    const [Document_type, setDocument_type] = useState("");
    const [stock, setStock] = useState("");
    const [grossprice, setGrossPrice] = useState("");
    const [netprice, setNetPrice] = useState("");
    const [filenow, setFilenow] = useState("");

    const { register, handleSubmit, errors, watch } = useForm();

    
    const authAxios = axios.create({
      baseURL: "https://souvikbackendapp.herokuapp.com",
      
    });
  
  
    function closePanel() {
        let modal = document.querySelector("#myModal");
        
    
        modal.style.display = "none";
      }

    



      const onSubmit = ()=>{

        let formData = new FormData();
        formData.append("productName", productName);
        formData.append("price_gross", grossprice);
        formData.append("vat", Document_type);
        formData.append("price_net", netprice);
        formData.append("total_stock", stock);
        formData.append("productImage", filenow);
        

        



        // const add_data = {
       
        //    productName: productName,
        //    price_gross: grossprice,
        //    vat: Document_type,
        //    price_net: netprice,
        //    total_stock: stock,
        //    productImage: filenow,
        //  };
        //  console.log(add_data)

   


   authAxios.post("/products/add",formData).then((res) => {
    //  console.log(res);


    alert("Your product has been added successfully")

    //  console.log(res.data);
     let paybox = document.querySelector(".tablediv");

     paybox.style.display = "none";
     window.location.reload();
   }
   );
  }

  function documentName() {
    let e = document.getElementById("exampleFormControlSelect1");
    let documentName = e.value;
    setDocument_type(documentName);
  }


  
  

    return(
<div class="tablecon3" >
<span class="close" onClick={closePanel}>&times;</span><br/><br/>

 <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

   
        <h1>Add Product</h1><br/>
<div>
         <label for="amount"> Product Name </label>
            <input  name="amountInput" type="text"  
            style={{marginLeft:'3%'}}
            required
            placeholder="Enter Product"
            onChange={(event) => {
              setProduct(event.target.value);
         }}/>
</div>
        
        <br/>
        <div style={{display:'flex',justifyContent:'center'}}>
        {/* <label for="amount"> VAT </label> */}
        <select 
            id="exampleFormControlSelect1"
            class="form-control selectbox"
            required
            style={{width:'fit-content'}}
            onClick={documentName}
          >
            <option value="">Select VAT</option>
            <option value="10" >
              10%
            </option>
            <option value="15" >
              15%
            </option>
            <option value="25" >
              25%
            </option>
            
          </select>
        </div>
        
<br/>
          <label for="amount"> Total Stock</label>
         <input type="number"
         style={{marginLeft:'12%'}}
         required
         placeholder="Enter Stock"
         onChange={(event) => {
            setStock(event.target.value);
          }}
         />
         <br/>

         <label for="amount"> Price (Gross)</label>
         <input type="number"
         required
         style={{marginLeft:'9.5%',width:'55%'}}
         placeholder="Enter Price"
         onChange={(event) => {
            setGrossPrice(event.target.value);
            setNetPrice(event.target.value - Number(Document_type/100))
          }}
         />
        <span> $</span>
<br/>
        <label for="amount"> Price (Net)</label>
         <input type="number"
         class="netPrice"
         required
         style={{marginLeft:'15%',width:'53%'}}
         value={netprice ||0}
         readOnly
         />
        <span> $</span>

          {/* <p id="descriptionError" style={{visibility: 'hidden', color:'red', textAlign: 'center'}}>Please enter a description</p> */}
        <br/><br/>
        <label>Upload image</label>

        <div style={{marginLeft: '16%'}}>
        <input type='file' name='productImage' required
         onChange={(event) => {
          setFilenow(event.target.files[0]);      
        }}
        />
        </div>
        
        <br/>
        <br/>
        <div  >
            <button className="btn btn-success btn-md" type="submit" >Add Product</button>
        </div>
        
         
     </form>
    </div>
 
    )
}

export default Addmodal
