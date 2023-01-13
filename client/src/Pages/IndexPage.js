import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Assets/Footer/Footer";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from "./Main-page/MainPage";
import ItemElenet from "./Item-element/ItemElement";
const IndexPage = ({basketData, onItem, total, deleteItem}) => {
    return(
        <div>
            <BrowserRouter >
                <Navbar  basketData={basketData} total={total}  deleteItem={deleteItem}/>
                <Routes>
                    <Route path="/" element={<MainPage  onItem={onItem}/>} />
                    <Route path="/Product/:itemID" element={<ItemElenet />} />
                    <Route path="*" element={<MainPage onItem={onItem} />} />
                </Routes>
                <Footer />
            </BrowserRouter>

        </div>
    )
}

export default IndexPage