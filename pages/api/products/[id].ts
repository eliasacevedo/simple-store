import { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../core/product";
import _products from '../../../data/products.json'
import { Products } from "./sum";
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Product | undefined>
) {
    const { id } = req.query
    if (!id || typeof id != 'string') {
        res.status(400)
        return
    }

    const products = _products as unknown as Products
    res.status(200).json(products[id])
}