import ProductItem from "./product-item";
import useListProducts from "./useListProducts";

export default function ListProducts() {
    const { itemsQuery, actualPage, onClickNextButton, onClickPreviousButton, shouldNextButtonActive, shouldPreviousButtonActive } = useListProducts()
    return (
        <div className="list-items">
            <div className="items flex mb-6">
            {
                itemsQuery.isLoading ? <progress className="progress w-100"></progress> : ''
            }
            {
                itemsQuery.data?.data.map(item => 
                    (
                        <div key={item.id} className="mr-3">
                            <ProductItem {...item} />
                        </div>
                    )
                )   
            }
            </div>
            <div className="btn-group">
                <button onClick={onClickPreviousButton} className={`btn ${!shouldPreviousButtonActive ? 'btn-disabled' : ''}`}>«</button>
                <button className="btn">Page {actualPage}</button>
                <button onClick={onClickNextButton} className={`btn ${!shouldNextButtonActive ? 'btn-disabled' : ''}`}>»</button>
            </div>
        </div>
    )
}