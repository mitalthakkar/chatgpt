import React, { useCallback, useEffect, useState } from "react";
import "../css/cart.css";
import { productInventory } from "../json/products";
import { products } from "../json/products_inventory";

import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { cartType } from "../redux/actions/cartAction";

function Cart() {
  const dispatchCall = useDispatch();
  const { current_cart } = useSelector((state: any) => state && state?.cart);
  const [cartData, setCartData] = useState(current_cart);

  const getData = () => {
    dispatchCall(cartType({ current_cart: cartData }));
  };

  const stableHandler = useCallback(getData, [cartData]);

  useEffect(() => {
    stableHandler();
  }, [stableHandler]);

  const getProductData = (ParaId) => {
    const result = productInventory.find((item) => item.product_id === ParaId);
    return result;
  };
  const getInventoryData = (ParaId): any => {
    let result;
    for (var i in products) {
      if (products[i].product_id === ParaId) {
        result = products[i];
        break; //Stop this loop, we found it!
      }
    }
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

  const updateProductData = (ParaId, ParaQuantity) => {
    console.log(
      getInventoryData(ParaId)?.total_avilable_count,
      parseInt(ParaQuantity)
    );
    if (
      getInventoryData(ParaId)?.total_avilable_count >= parseInt(ParaQuantity)
    ) {
      const temp = [...cartData];
      for (var i in cartData) {
        if (temp[i].product_id == ParaId) {
          temp[i].quantity = ParaQuantity;
          break; //Stop this loop, we found it!
        }
      }
      setCartData(temp);
    }
  };
  const getTotal = () => {
    let total = 0;
    if (cartData && cartData.length > 0) {
      cartData.forEach((element) => {
        total +=
          element?.quantity * getProductData(element?.product_id)?.unit_price;
      });
    }
    return total;
  };

  return (
    <React.Fragment>
      <div className="small-container cart-page">
        <table>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
          {cartData &&
            cartData.length > 0 &&
            cartData.map((element) => (
              <tr>
                <td>
                  <div className="cart-info">
                    <img
                      className="cart-img"
                      src={getProductData(element?.product_id)?.image}
                      alt=""
                    />
                    <div>
                      <p>{getProductData(element?.product_id)?.product_name}</p>
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
                  <input
                    type="number"
                    value={element?.quantity}
                    onChange={(e) => {
                      updateProductData(element?.product_id, e?.target?.value);
                    }}
                  />
                  <br />
                  Note: Can be added Upto &nbsp;
                  {getInventoryData(element?.product_id)?.total_avilable_count}
                </td>
                <td>
                  <NumberFormat
                    decimalScale={2}
                    fixedDecimalScale
                    value={
                      getProductData(element?.product_id)?.unit_price *
                      element?.quantity
                    }
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

        <div className="total-price">
          <table>
            <tr>
              <td>Subtotal</td>
              <td>
                {" "}
                <NumberFormat
                  decimalScale={2}
                  fixedDecimalScale
                  value={getTotal()}
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                />{" "}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Cart;
