import {Component} from 'react';
import axios from 'axios';
import '../../Style/Main.scss';
import images from '../../Assets/Intro/bg.png';
import Slider from '../../Component/Slider/Slider';
import CardItem from '../../Component/Cards/CardsItem';


class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }



   async componentDidMount() {
        await this.getData();
        
    
    }

    getData = () => {
        axios
         .get('http://192.168.0.24:7000/API/GET')
         .then(res => this.setState({
            data: res.data.cards
         }))
    }


    byField = (field) => {
        return (a, b) => a[field] < b[field] ? 1 : -1;
    }

    onLike = async (id) => {
        const data = this.state.data;
        this.splice(data, id)
        await axios 
         .post('http://192.168.0.24:7000/API/LIKE', {
            _id: id
         })
        
    }


    splice = async (data, id) => {
       await  data.map(item => {
            if(item._id == id) {
                item.Like++
            }
        })
        this.setState({
            data: data
        })
    }
    render() {
        const {data} = this.state;
        data.sort(this.byField('Like'));
       
       
        
        const element = data.map((item, index) => {
            const {fileFollder, Title, Subtitle, Descer, Weight, Price, Like, _id} = item;
            const {onItem} = this.props;

            if(index <= 5) {
                return(
                    <CardItem fileFollder={fileFollder} Title={Title} Subtitle={Subtitle} Descer={Descer} Weight={Weight} Price={Price} Like={Like} key={index} onLike={() => this.onLike(_id)} onItem={() => onItem(_id)} _id={_id}/>
                )
            }

        })

    

        return(
            <div>
               <div class="Container">
                <section className="Main_intro">
                    <div className='intro_info'>
                        <h1 className='title'><span>M</span>EAT-HIT</h1>
                        <h2 className='subtitle'>Задоволення в кожній пачці...</h2>
                        <p className='description'>Ми молода компанія, яка займається виготовленням крафтових снеків. В нашому магазині ви знайдете натуральну та смачну продукцію, яка стане вашою улюбленою закускою. Джерки, пивчики та грiнки найвищої якості, приготовані з любов'ю. </p>
                        <a class="uk-button uk-button-danger btn" href="#">Замовити</a>
                    </div> 
                    <img src={images} alt="intro" />
                    <div className='line'></div>
                </section>
               </div>
             
    
               <section class="pruduction">
                    <div className='center'>
                        <h3 className='section_title'>Наша <span>продукція</span></h3>
                    </div>
                    <Slider />
               </section>
    
    
                <section className='Main_catalog'>
                    <div class="Container">
                        <div className='Catalog_wrapper'>
                            {element}
                        </div>
                        <div className='center'>
                            <a href="#" className="uk-button uk-button-danger uk-margin-small-right btn">Каталог</a>
                        </div>
                    </div>
                </section>
                
            </div>
        )
    }
}


export default MainPage;