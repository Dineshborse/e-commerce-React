import React, { useEffect, useState } from "react";
import "./ProductsPage.css"
import PopUpSelectedProduct from "./PopUpSelectedProduct";
const PageNumber = ({ page, activePage, setActivePage }) => {

    return (
        <div onClick={() => { setActivePage(page) }} className={page === activePage ?
            "products-page-all-footer-page-navigator-num-active" :
            "products-page-all-footer-page-navigator-num"}>{page}</div>
    )
}




const ProductsPage = ({ allCato }) => {

    const [AllProducts, setAllProducts] = useState([])
    const [CurrentCategory, setCurrentCategory] = useState("All Categories")
    const [CurrentPageProducts, setCurrentPageProducts] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0);
    const [AllPages, setAllPages] = useState([]);
    const [selectedProduct, setselectedProduct] = useState({});
    const [popUpVisibility, setPopUpVisibility] = useState(false);
    // let productselectedtry ={};



    useEffect(() => {
        let temptotalpages = Math.ceil(AllProducts.length / 10)
        const tempAllpages = []
        for (let i = 0; i < temptotalpages; i++) {
            tempAllpages.push(i + 1);
        }
        setAllPages(tempAllpages);
        setCurrentPageProducts(AllProducts.slice((10 * (CurrentPage - 1)), (10 * CurrentPage)));

        // console.log(CurrentPageProducts)
    }, [CurrentPage])


    useEffect(() => {
        setCurrentPage(0);
        let category = ""
        if (CurrentCategory !== "All Categories") {
            category = "category/" + CurrentCategory;
        }


        fetch(`https://fakestoreapi.com/products/${category}`)
            .then(res => res.json())
            .then(json => {
                setAllProducts(json)
                setCurrentPage(1);
                // console.log(json)
            })

    }, [CurrentCategory])

    const handleNextPageClick = () => {
        console.log(CurrentPage, "handleNextPageClick")
        if (CurrentPage < AllPages.length) {
            setCurrentPage(CurrentPage + 1);
        }
    }
    const handlePrevPageClick = () => {
        console.log(CurrentPage, "handlePrevPageClick")
        if (CurrentPage > 1) {
            setCurrentPage(CurrentPage - 1);
        }
    }

    const handleProductClick = (product) => {
        setselectedProduct(product.product);
        // productselectedtry=product.product;
        setPopUpVisibility(true);
        // console.log(product.product)
    }
    return (

        <div className="products-page-main-container" >
            <div className="products-page-title-available-products">Available Products</div>
            <div className="products-page-dropdown-label">
                {/* <label htmlFor="catergories">Choose a catergory : </label> */}
                <select className="products-page-dropdown-select" onChange={(e) => { console.log(e.currentTarget.value); setCurrentCategory(e.currentTarget.value) }} name="catergory" id="catergories">
                    {allCato.map((ele, i) => { return <option key={`optionCategories${i}`} value={ele}>{ele}</option> })}
                </select>
            </div>
            <section className="products-page-display-products-container">
                {CurrentPageProducts.map((product, i) => {
                    return <div key={`productList${i}${product.id}`} className="products-page-product-card">
                        <div onClick={() => { handleProductClick({ product }) }} className="products-page-product-title">
                            {product.title}
                        </div >
                        <img onClick={() => { handleProductClick({ product }) }}
                            className="products-page-product-img"
                            src={product.image} alt="product img">
                        </img>
                    </div>
                })}

            </section>
            <footer className="products-page-all-footer-container-div">
                <div className="products-page-all-footer-page-navigator-container">
                    <div className="products-page-all-footer-page-navigator-arrow-box-prev" onClick={handlePrevPageClick}>
                        <img className="products-page-all-footer-page-navigator-arrow-img" src="Vectorpage-arrow-prev.svg" alt="Vectorpage-arrow-prev" />
                    </div>
                    {AllPages.map((ele, i) => { return <PageNumber key={`currentPAGE${i}`} page={ele} activePage={CurrentPage} setActivePage={setCurrentPage} /> })}
                    <div className="products-page-all-footer-page-navigator-arrow-box-next" onClick={handleNextPageClick}>
                        <img className="products-page-all-footer-page-navigator-arrow-img" src="Vectorpage-arrow-next.svg" alt="Vectorpage-arrow-next" />
                    </div>
                </div>
            </footer>

            {popUpVisibility && <PopUpSelectedProduct setOwnVisibility={setPopUpVisibility} productsel={selectedProduct} category={CurrentCategory} />}
        </div>

    );
}

export default ProductsPage;