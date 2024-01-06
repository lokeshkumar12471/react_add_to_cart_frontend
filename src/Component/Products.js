import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cart from './Cart';


// Custom function to format date string
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleString(undefined, options);
}
// Custom function to extract and decode image file name
function extractAndDecodeImageFileName(encodedString) {
    const match = encodedString.match(/s:(\d+):"(.+?)";/);

    if (match && match[2]) {
        return match[2];
    }
    return '';
}

const Products = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [show, setShow] = useState(true);
    const [warning, setWarning] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products`);
                const decodedProducts = response.data.products.map((prod) => ({
                    ...prod,
                    product_image: extractAndDecodeImageFileName(prod.product_image),
                }));
                setProducts(decodedProducts);
                if (response) {
                    console.log('data displaying successfully');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        };
        fetchData();
    }, []);

    //Cart Number How many Product Added it will be display and give the message. 
    const handleClick = (prod) => {
        let isPresent = false;
        cart.forEach((product) => {
            if (product.id === prod.id)
                isPresent = true;
        })
        if (isPresent) {
            setWarning(true);
            setTimeout(() => {
                setWarning(false);
            }, 2000);
            return;
        }
        setCart([...cart, prod]);
    }
    return (
        show ? (
            <div className='container mt-5'>
                <div className='float-end'>
                    <span onClick={() => setShow(false)}>
                        <i className="fa-solid fa-cart-shopping"></i>
                        <span>{cart.length}</span>
                    </span>
                </div>

                {
                    warning && <div className='text-warning'>Item is already added to your cart</div>
                }
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">S.no</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Status</th>
                            <th scope="col">Created at</th>
                            <th scope="col">Add To Cart</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((prod, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{prod.product_title}</td>
                                <td>{prod.product_price}</td>
                                <td><img src={`http://127.0.0.1:8000/upload/images/${prod.product_image}`} alt="images" width={50} height={50} /></td>
                                <td>{prod.product_checkbox}</td>
                                <td>{formatDate(prod.created_at)}</td>
                                <td className='btn btn-warning' onClick={() => handleClick(prod)}>Add To Cart</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : <Cart cart={cart} setCart={setCart} />
    );
}

export default Products;
