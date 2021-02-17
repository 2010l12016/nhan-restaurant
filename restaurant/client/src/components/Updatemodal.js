import React,{useState,useEffect} from "react"
import "./Addmodal.css"
import { useForm } from "react-hook-form";
import axios from "axios";


function Updatemodal(){


    
    const [productName, setProduct] = useState("");
    const [Document_type, setDocument_type] = useState("");
    const [stock, setStock] = useState("");
    const [grossprice, setGrossPrice] = useState("");
    const [netprice, setNetPrice] = useState("");
    const [filenow, setFilenow] = useState("");
    const [change, setChange] = useState(false);


    const { register, handleSubmit, errors, watch } = useForm();

    
    const authAxios = axios.create({
      baseURL: "https://souvikbackendapp.herokuapp.com",
      
    });
  
  
    let id = localStorage.getItem('id')
    let name = localStorage.getItem('user_name')
     let gp = localStorage.getItem('price_gross')
     let vat = localStorage.getItem('vat')
     let np = localStorage.getItem('price_net')
     let stock2 = localStorage.getItem('stock')
     let img = localStorage.getItem('image')
    

    



      const onSubmit = ()=>{

        // let formData = new FormData();
        // formData.append("productName", productName);
        // formData.append("price_gross", grossprice);
        // formData.append("vat", Document_type);
        // formData.append("price_net", netprice);
        // formData.append("total_stock", stock);
        // formData.append("productImage", filenow);
        




        const add_data = {
       
           productName: productName,
           price_gross: grossprice,
           vat: Document_type,
           price_net: netprice,
           total_stock: stock,
         };
         console.log(add_data)

   


   authAxios.put("/products/" + id,add_data).then((res) => {
    //  console.log(res);


    alert("Your product has been updated successfully")

    //  console.log(res.data);
     
    

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
      <div style={{display:'flex',justifyContent: 'center'}}>
<div class="tablecon5" >
{/* <span class="close" onClick={closePanel}>&times;</span><br/><br/> */}

 <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

   <div style={{textAlign:'center',paddingTop:'2%'}}>
   <h1 >Edit Product</h1><br/>

   </div>
<div style={{textAlign:'center'}}>
         <label for="amount" > Product Name </label>
            <input  name="amountInput" type="text"  
            style={{marginLeft:'3%'}}
            required
            defaultValue={name}
            // placeholder="Enter Product"
            onChange={(event) => {
              setProduct(event.target.value);
              setChange(true);
              setStock(stock || stock2);
              setGrossPrice(grossprice || gp);
              setNetPrice(netprice || 0 || np);
              setDocument_type(Document_type || vat)
         }}/>
</div>
        
        <br/>
        <div style={{textAlign:'center'}}>
        <label>Current VAT</label>
        <input
          style={{marginLeft:'2%'}}
          value={Document_type || vat}
        />
        </div>
        
        <br/>
        <div style={{display:'flex',justifyContent:'center'}}>
        <label for="amount"> (optional) </label>
        <select 
            id="exampleFormControlSelect1"
            class="form-control selectbox"
            
            style={{width:'fit-content'}}
            onClick={documentName}
          >
            <option value="">Select new VAT</option>
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
        //  placeholder="Enter Stock"
        defaultValue={stock2}
         onChange={(event) => {
            setStock(event.target.value);
            setChange(true);
            setGrossPrice(grossprice || gp);
            setProduct(productName || name);
            setNetPrice(netprice || 0 || np);
            setDocument_type(Document_type || vat)

          }}
         />
         <br/>
         
         <label for="amount"> Price (Gross)</label>
         <input type="number"
         required
         style={{marginLeft:'9.5%',width:'55%'}}
        //  placeholder="Enter Price"
        defaultValue={gp}
         onChange={(event) => {
            setGrossPrice(event.target.value);
            setNetPrice(event.target.value - Number(Document_type/100));
            setChange(true);
            setProduct(productName || name)
            setStock(stock || stock2);
            setDocument_type(Document_type || vat)

          }}
         />
        <span> $</span>
<br/>
        <label for="amount"> Price (Net)</label>
         <input type="number"
         class="netPrice"
         required
         style={{marginLeft:'15%',width:'53%'}}
         value={netprice || 0 || np}
         readOnly
         
         />
        <span> $</span>

          {/* <p id="descriptionError" style={{visibility: 'hidden', color:'red', textAlign: 'center'}}>Please enter a description</p> */}
        
        
        <br/>
        <br/>
        <div  style={{textAlign:'center'}}>
            <button className="btn btn-success btn-md" type="submit" disabled={!change? 'none' : ''}>Update Product</button>
        </div>
        
         
     </form>
    </div>
 </div>
    )
}

export default Updatemodal
