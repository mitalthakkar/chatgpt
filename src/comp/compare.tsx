import React, { useEffect, useState } from "react";
import "../css/cart.css";
import { productInventory } from "../json/products";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { compareType } from "../redux/actions/compareAction";

function Compare() {
  const dispatchCall = useDispatch();
  const { compare_cart } = useSelector((state: any) => state && state?.compare);
  const [cartData, setCartData] = useState(compare_cart);

  useEffect(() => {
    dispatchCall(compareType({ compare_cart: cartData }));
  }, [cartData]);

  const getProductData = (ParaId) => {
    const result = productInventory.find((item) => item.product_id === ParaId);
    return result;
  };
  const removeProductData = (ParaId) => {
    const resultIndex = cartData.findIndex(
      (item) => item.product_id === ParaId
    );
    const temp = [...cartData];
    temp.splice(resultIndex, 1);
    setCartData(temp);
  };

  return (
    <React.Fragment>
      <h5 className="title">Compare Device</h5>
      <div className="small-container cart-page">
        <table>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
          </tr>
          {cartData &&
            cartData.length > 0 &&
            cartData.map((element) => (
              <tr>
                <td>
                  <div className="cart-info">
                    <img className="cart-img" src={element?.image} alt="" />
                    <div>
                      <p>{element?.product_name}</p>
                      <small>
                        Price{" "}
                        <NumberFormat
                          decimalScale={2}
                          fixedDecimalScale
                          value={
                            getProductData(element?.product_id)?.unit_price
                          }
                          displayType="text"
                          thousandSeparator
                          prefix="$"
                        />{" "}
                      </small>
                      <br />
                      <a
                        className="cur-point"
                        onClick={() => {
                          removeProductData(element?.product_id);
                        }}
                      >
                        Remove
                      </a>
                    </div>
                  </div>
                </td>
                <td>
                  {element?.category}
                  <br />({element?.review} Users Review )
                </td>
                <td>
                  <NumberFormat
                    decimalScale={2}
                    fixedDecimalScale
                    value={getProductData(element?.product_id)?.unit_price}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                  />{" "}
                </td>
              </tr>
            ))}
          {!cartData ||
            (cartData && cartData.length === 0 && (
              <div>No Products added to cart. Please add now</div>
            ))}
        </table>
      </div>
    </React.Fragment>
  );
}

export default Compare;
