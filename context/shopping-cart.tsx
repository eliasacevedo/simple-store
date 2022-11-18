import React, { Dispatch, SetStateAction } from "react";
import { ShoppingCartItemList } from "../core/shopping-cart-item-list";

const initialValue: [ShoppingCartItemList, Dispatch<SetStateAction<ShoppingCartItemList>>] = [{}, () => {}]
const ShoppingCartContext = React.createContext(initialValue);

export {
    ShoppingCartContext,
    initialValue
}