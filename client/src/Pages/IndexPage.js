import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Assets/Footer/Footer";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from "./Main-page/MainPage";
import ItemElenet from "./Item-element/ItemElement";
import CatalogPage from "./Item-element/Catalog-page.js/CatalogPage";
const IndexPage = ({basketData, onItem, total, deleteItem, getID, id}) => {
    return(
        <div>
            <BrowserRouter >
                <Navbar  basketData={basketData} total={total}  deleteItem={deleteItem}/>
                <Routes>
                    <Route path="/" element={<MainPage  onItem={onItem} getID={getID}/>} />
                    <Route path="/Product/:itemID" element={<ItemElenet id={id} getID={getID} onItem={onItem}/>} />
                    <Route path="*" element={<MainPage  onItem={onItem} getID={getID}/>} />
                    <Route path="/Catalog" element={<CatalogPage />} /> 
                </Routes>
                {/* <Footer /> */}
            </BrowserRouter>

        </div>
    )
}

export default IndexPage