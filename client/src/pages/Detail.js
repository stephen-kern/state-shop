import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../utils/actions";

import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from "../assets/spinner.gif";

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const { products } = state;

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
    }
  }, [products, data, dispatch, id]);

  // The useEffect() hook is used to check if there is data in the global state's products array. If there is, the current product is displayed. If there is no data, the product data is fetched from the useQuery() hook and saved to the global state object. The current product is then displayed.
  // The current product is saved locally because it is only used in this specific component. Saving it to the global state object would not benefit us in any way.
  
  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{" "}
            <button>Add to Cart</button>
            <button>Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </>
  );
}

export default Detail;
