import React, { useState } from "react";
import "../css/home.css";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { productInventory } from "../json/products";
import { prefrenceType } from "../redux/actions/prefrenceAction";
import { cartType } from "../redux/actions/cartAction";
import { compareType } from "../redux/actions/compareAction";

function User() {
  const dispatchCall = useDispatch();
  const { current_cart } = useSelector((state: any) => state && state?.cart);
  const { compare_cart } = useSelector((state: any) => state && state?.compare);

  const { isTableView } = useSelector((state: any) => state && state.prefrence);
  const [isTableViewState, setIsTableViewState] = useState(isTableView);
  const addToCart = (ParaData) => {
    let temp: any = [];
    if (current_cart && current_cart.length > 0) {
      temp = [...current_cart];
      const index = current_cart.findIndex(
        (e) => e.product_id === ParaData.product_id
      );
      if (index === -1) {
        temp.push({
          product_id: ParaData?.product_id,
          quantity: 1,
        });
      } else {
        temp[index] = {
          product_id: temp[index]?.product_id,
          quantity: parseInt(temp[index]?.quantity) + 1,
        };
      }
    } else {
      temp.push({
        product_id: ParaData?.product_id,
        quantity: 1,
      });
    }
    console.log("&&&&&&&", temp);
    dispatchCall(cartType({ current_cart: temp }));
  };
  const addToCompare = (ParaData) => {
    let temp: any = [];
    if (compare_cart && compare_cart.length > 0) {
      temp = [...compare_cart];
      const index = compare_cart.findIndex(
        (e) => e.product_id === ParaData.product_id
      );
      if (index === -1) {
        temp.push({
          ...ParaData,
        });
      }
    } else {
      temp.push({
        ...ParaData,
      });
    }
    dispatchCall(compareType({ compare_cart: temp }));
  };
  const findInCurrentCart = (ParaId) => {
    let result;
    if (current_cart && current_cart.length > 0) {
      const index = current_cart.findIndex((e) => e.product_id === ParaId);
      if (index === -1) {
        result = false;
      } else {
        result = true;
      }
    } else {
      result = false;
    }

    return result;
  };
  const findInCompareCart = () => {
    let result;
    if (compare_cart && compare_cart.length < 3) {
      result = false;
    } else if (!compare_cart || (compare_cart && compare_cart.length === 0)) {
      result = false;
    } else {
      result = true;
    }
    return result;
  };
  return (
    <React.Fragment>
      <h5 className="title">mital action test</h5>
      <div className="buttons">
        <button
          className={isTableView ? "main-btn-active" : "main-btn"}
          onClick={() => {
            setIsTableViewState(true);
            dispatchCall(
              prefrenceType({
                isTableView: true,
              })
            );
          }}
        >
          Table view{" "}
        </button>
        <button
          className={!isTableView ? "main-btn-active" : "main-btn"}
          onClick={() => {
            setIsTableViewState(false);
            dispatchCall(
              prefrenceType({
                isTableView: false,
              })
            );
          }}
        >
          Gridview{" "}
        </button>
      </div>

      <div className="container">
        {!isTableViewState && (
          <div id="div1">
            <section className="section-grid">
              <div className="grid-prod">
                {productInventory &&
                  productInventory.length > 0 &&
                  productInventory.map((element) => (
                    <div className="prod-grid" key={element?.product_id}>
                      <img
                        src={element?.image}
                        alt="kalita"
                        className="prod-image"
                      />
                      <h3>{element?.product_name} </h3>
                      <p>{element?.desc} </p>
                      <p>
                        <NumberFormat
                          decimalScale={3}
                          fixedDecimalScale
                          value={element?.unit_price}
                          displayType="text"
                          thousandSeparator
                          prefix="$"
                        />
                      </p>
                      {findInCurrentCart(element?.product_id) ? (
                        <div className="info-div">
                          Already in Cart. Please Visit Cart List For any
                          Quantity Change
                        </div>
                      ) : (
                        <button
                          className="btn"
                          onClick={() => {
                            addToCart(element);
                          }}
                        >
                          {" "}
                          Add To Cart{" "}
                          <i
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                          ></i>
                        </button>
                      )}
                      <br />
                      {findInCompareCart() ? (
                        <div className="info-div">
                          Max 3 can be added to compare. please remove some
                          items from compare page
                        </div>
                      ) : (
                        <button
                          className="btn"
                          onClick={() => {
                            addToCompare(element);
                          }}
                        >
                          {" "}
                          Add To Compare{" "}
                          <i
                            className="fa fa-shopping-cart"
                            aria-hidden="true"
                          ></i>
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          </div>
        )}

        {isTableViewState && (
          <div id="div2">
            <section className="section-list">
              <table>
                {productInventory &&
                  productInventory.length > 0 &&
                  productInventory.map((element) => (
                    <tr key={element?.product_id}>
                      <td>
                        <img
                          src={element?.image}
                          alt="kalita"
                          className="table-prod-img"
                        />
                        <td>
                          <td>
                            <h3>{element?.product_name} </h3>
                            <p>{element?.desc}</p>
                            <p>
                              {" "}
                              <NumberFormat
                                decimalScale={2}
                                fixedDecimalScale
                                value={element?.unit_price}
                                displayType="text"
                                thousandSeparator
                                prefix="$"
                              />{" "}
                            </p>
                            {findInCurrentCart(element?.product_id) ? (
                              <div className="info-div">
                                Already in Cart. Please Visit Cart List For any
                                Quantity Change
                              </div>
                            ) : (
                              <button
                                className="btn-list"
                                onClick={() => {
                                  addToCart(element);
                                }}
                              >
                                {" "}
                                Add To Cart
                              </button>
                            )}
                            {findInCompareCart() ? (
                              <div className="info-div">
                                Max 3 can be added to compare. please remove
                                some items from compare page
                              </div>
                            ) : (
                              <button
                                className="btn-list"
                                onClick={() => {
                                  addToCompare(element);
                                }}
                              >
                                {" "}
                                Add To Compare{" "}
                                <i
                                  className="fa fa-shopping-cart"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            )}
                          </td>
                        </td>
                      </td>
                    </tr>
                  ))}
              </table>
            </section>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default User;
