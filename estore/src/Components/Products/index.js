import { useDispatch, useSelector } from 'react-redux';
import './_products.scss';
// import productSlice from '../../Redux/Product/productSlice';
import { useEffect } from 'react';
import { getProducts } from '../../Redux/Product/productAction';
import { addCartItem } from '../../Redux/Cart/cartSlice';
const Products = () => {

    const productData = useSelector(state => state.product.products);
    // const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    const addToCart = (itemData) => {
        dispatch(addCartItem(itemData));
    };

    console.log(productData);
   return (
    <div className="products-container">
        {productData.map((product) => (
            <div className="product-card" key={product._id}>

                <div className="product-image-container">

                    <img
                        src={`http://localhost:5001${product.images?.[0]}`}
                        alt={product.title}
                    />

                </div>

                <div className="product-info">

                    <span className="product-category">
                        {product.category?.name || "Category"}
                    </span>

                    <h5>{product.title}</h5>

                    <p className="product-price">
                        ₹{product.price}
                    </p>

                </div>

                <button
                    className="cart-button"
                    onClick={() => addToCart(product)}
                >
                    <i className="fa fa-shopping-cart"></i>

                    <span>Add to Cart</span>
                </button>

            </div>
        ))}
    </div>
)
}

export default Products;


