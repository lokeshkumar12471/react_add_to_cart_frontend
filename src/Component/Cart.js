import React, { useEffect, useState } from 'react';
import '../styles/cart.css';

const Cart = ({ cart, setCart }) => {
    const [price, setPrice] = useState(0);

    const handlePrice = () => {
        let ans = 0;
        cart.map((item) => (
            ans += item.product_quantity * item.product_price
        ));
        setPrice(ans);
    }

    const handleRemove = (id) => {
        const arr = cart.filter((item) => item.id !== id)
        setCart(arr);
    }

    const handleChange = (item, d) => {
        const updatedCart = cart.map((cartItem) =>
            cartItem.id === item.id
                ? { ...cartItem, product_quantity: Math.max(parseInt(cartItem.product_quantity) + d, 1) }
                : cartItem
        );

        setCart(updatedCart);
    }


    useEffect(() => {
        handlePrice();
    });

    return (
        <article>
            {
                cart.map((item) => (
                    <div className="cart_box" key={item.id}>
                        <div className="cart_img">
                            <img src={`http://127.0.0.1:8000/upload/images/${item.product_image}`} alt="images" width={150} height={150} />
                            <p>{item.product_title}</p>
                        </div>
                        <div>
                            <button onClick={() => handleChange(item, 1)}> + </button>
                            <button>{item.product_quantity}</button>
                            <button onClick={() => handleChange(item, -1)}> - </button>
                        </div>
                        <div>
                            <span>{item.product_price}</span>
                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            <div className='total'>
                <span>Total Price Of Your Cart</span>
                <span>Rs = ${price}</span>

            </div>

        </article>

    );
}

export default Cart;
