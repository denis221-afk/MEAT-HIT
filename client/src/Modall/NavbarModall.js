import {Component} from 'react';
import ItemSarch from '../Component/Item-search/ItemSearch';
import Axios from 'axios';
import BasketItem from '../Component/Basket-item/BasketItem';



class NavbarModall extends Component {
    constructor(props) {
        super(props);

        this.state = {
            term: '',
            data: [],
        }
    }

    componentDidMount() {
        this.onModall();
    }







    getClientTerm = (event) => {
        const value = event.target.value;
        this.setState({
            term: value
        })
     }


     clearInputs = () => {
        setTimeout(() => {
            this.setState({
                term: ''
            })
        }, 3000);
     }


     onSubmit = (e) => {
        e.preventDefault();
        this.setState({spinner: true})

        const {term} = this.state
        Axios.post('http://localhost:7000/API/SEARCH', {
            Title: term
        })
        .then(this.setState({spinner: false}))
        .then(res => this.setState({data: res.data.data}))
        .catch(err => this.setState({term: err.response.data.masenge}))
        .finally(this.clearInputs())
     }

    onModall = () => {
        const {active, setActive, setActiveBasket} = this.props;
        window.document.addEventListener('keydown', (e) => {
            if(e.code == 'Escape') {
                setActive(false);
                setActiveBasket(false);
            } else if (e.code == 'KeyS') {
                setActive(true);
            } 
        })
    }



    render() {
       const {term, data, spinner} = this.state;
       const {active, setActive, activeBasket, setActiveBasket, basketData, total} = this.props;
       let element 
       if(data.length > 0) {
         element = data.map((item, i) => {
            const {fileFollder, Title, Price, _id, Subtitle} = item;
            return(
                <ItemSarch fileFollder={fileFollder} Title={Title} Price={Price} key={_id} index={i} Subtitle={Subtitle}/>
            )
        })
       }


       const item = basketData.map((item, i) => {
        const {fileFollder, Title, Price, Subtitle} = item;
        const {deleteItem} = this.props
        return(
            <BasketItem fileFollder={fileFollder} Title={Title} Price={Price} key={i} deleteItem={() => deleteItem(i)} Subtitle={Subtitle}/>
        )
       })


      
        return(
            <>
            <div id="offcanvas-usage" className="navbarmodall" uk-offcanvas={toString()}>
                <div className="uk-offcanvas-bar">
                    <div className="navbar__header">
                        <div className="logo"><span>M</span>EAT-HIT</div>
                    </div>
                    <div className="navbar__body">
                    <div className="uk-width-1-1@s">
                        <ul className="uk-nav-default uk-nav-divider" uk-nav={toString()}>
                            <li><a href="#">Каталог</a></li>
                            <li><a href="#">Про нас</a></li>
                            <li><a href="#">Відгуки клієнтів</a></li>
                            <li><a href="#">Оплата і доставка</a></li>
                            <li><a href="#">Наш Instagram</a></li>
                            <li><a href="#">Наш Telegram</a></li>
                            <li><a href="#">Наш TikTOK</a></li>
                        </ul>
                    </div>
                    </div>
                    <div className="navbar__footer"></div>
                </div>
            </div>
    
                <div className={active ? 'modall_search active_modall' : 'modall_search'} onClick={() => setActive(false)}>
                    <div className='uk-background-muted uk-padding uk-panel modall-dialog uk-width-1-3' onClick={e => e.stopPropagation()}>
                    <form className="uk-search uk-search-default search uk-width-1-1" onSubmit={(e) => this.onSubmit(e)}>
                        <input className="uk-search-input" type="search" placeholder="Search" aria-label="Пошук" value={term} onChange={(event) => this.getClientTerm(event)} />
                        <button className='btn btn-search'>Пошук</button>
                    </form>
                
                    <ul className={data.length > 0 ? 'uk-list uk-list-divider listItem' : 'uk-list uk-list-divider'}>
                        {element}
                    </ul>
                    </div>
                </div>



                <div className={activeBasket ? 'modall_basket active_modall' : 'modall_basket'} onClick={() => setActiveBasket(false)}>
                    <div className='uk-background-secondary uk-panel modall-dialog uk-width-1-3@m' onClick={e => e.stopPropagation()}>
                        <div className='basket_header'>
                            <div className='basket_logo'><span>M</span>EAT-HIT</div>
                            <a href="#" onClick={() => setActiveBasket(false)} uk-icon="icon: close"></a>
                        </div>
                        <div className='basket_body'>
                        <ul className="uk-list uk-list-divider">
                            {item}
                        </ul>
                        </div>
                        <div className='basket_footer'>
                        <div>
                            <button className="uk-button uk-button-danger btn">Купити</button>
                            <span>Загальна ціна : {total}грн</span>
                        </div>
                        </div>
                    </div> 
                </div>
            </>
        )
    }
}

export default NavbarModall;
