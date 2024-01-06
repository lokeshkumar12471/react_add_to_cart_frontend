import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [form, setForm] = useState({
        product_title: "",
        product_price: "",
        product_image: "",
        product_quantity: "1",
    }
    );
    const [isCheck, setCheck] = useState('inactive');
    const [isTrue, setTrue] = useState('false');

    const changeHandle = (e) => {
        setForm({ ...form, [e.target.name]: e.target.name === "product_image" ? e.target.files[0] : e.target.value });
    }
    const submitHandle = async (e) => {
        e.preventDefault();
        let updatedForm = { ...form };
        updatedForm.product_checkbox = isCheck;
        updatedForm.product_input = isTrue;
        const response = await axios.post(`http://127.0.0.1:8000/api/product/store`, updatedForm, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        );
        if (response) {
            console.log(response.data.message);
        } else {
            console.log('data was not successfully stored');
        }
    }
    return (
        <div className='container mt-5'>
            <form onSubmit={submitHandle} encType='multipart/form-data'>
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input type="text" name="product_title" className="form-control" id="productName" aria-describedby="emailHelp" onChange={changeHandle} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productPrice" className="form-label">Product Price</label>
                    <input type="number" name="product_price" className="form-control" id="productPrice" onChange={changeHandle} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productImage" className="form-label">Product Image</label>
                    <input type="file" name='product_image' className="form-control" id="productImage" onChange={changeHandle} />
                </div>
                <div className="mb-3">
                    <label htmlFor="productRadio" className="form-radio-label">Product Status :</label> &nbsp;
                    <input
                        type="radio"
                        className="form-radio-input"
                        id="productRadio1"
                        name="product_input"
                        value={'true'}
                        onChange={(e) => setTrue(e.target.value)}
                    />
                    Active &nbsp;
                    <input
                        type="radio"
                        className="form-radio-input"
                        id="productRadio2"
                        name="product_input"
                        value={'false'}
                        onChange={(e) => setTrue(e.target.value)}
                    />
                    Inactive
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="productCheckbox"
                        name="product_checkbox"
                        value={'active'}
                        onChange={(e) => setCheck(e.target.checked ? 'active' : 'inactive')}
                    />
                    <label className="form-check-label" htmlFor="productCheckbox">
                        Terms And Conditions
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default AddProduct;
