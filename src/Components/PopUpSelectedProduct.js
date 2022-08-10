import React, { useRef } from "react";
import "./PopUpSelectedProduct.css";

function PopUpSelectedProduct({ setOwnVisibility,productsel,category }) {
  const modalRef = useRef();

  const closeModal = e => {
    console.log(productsel)
    if (modalRef.current === e.target) {
        setOwnVisibility(false);
    }
  };


  return (
    <div onClick={closeModal} ref={modalRef} className="modalBackground">
      <div className="modalContainer" >
        <div className="PopUpSelectedProduct-category-name" >{productsel.category}</div>
        <div className="PopUpSelectedProduct-title-div">
            <div className="PopUpSelectedProduct-title-name">{productsel.title}</div>
            <button onClick={()=>{ console.log(productsel.image);
                setOwnVisibility(false);}} className="PopUpSelectedProduct-close-btn" >CLOSE</button>
        </div>
        <div className="PopUpSelectedProduct-description-div">
            <img className="PopUpSelectedProduct-description-img" 
            src={productsel.image} alt="product image"></img>
            <div className="PopUpSelectedProduct-description"><strong>Description : </strong>{productsel.description}</div>
        </div>
      </div>
    </div>

  );
}

export default PopUpSelectedProduct;
