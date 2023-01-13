import {Component} from 'react';
import SlideItem from "./Slide-item";
import  Axios  from 'axios';


class Slider extends Component {
    constructor() {
        super();
        

        this.state = {
            data: [],
        }
    }


    componentDidMount() {
        this.getProduction();
    }


    getProduction = async () => {
        await Axios .get('http://localhost:7000/API/GETBOX').then(res => this.setState({data: res.data.data}))
    }

    render() {
        const {data} = this.state;

        const element = data.map((item, i) => {
            const {Title, fileFollder, Subtitle, Descer, _id} = item;

            return (
                <SlideItem Title={Title} fileFollder={fileFollder}  Subtitle={Subtitle} Descer={Descer} key={_id}/>
            )
        })
        return (
            <div className="Container">
                <div class="uk-slider-container-offset" uk-slider={toString()}>
    
                    <div class="uk-position-relative uk-visible-toggle uk-light" tabindex="-1">
    
                        <ul class="uk-slider-items uk-child-width-1-2@s uk-grid list">     
                            {element}      
                        </ul>
    
                        <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous={toString()} uk-slider-item="previous"></a>
                        <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next={toString()} uk-slider-item="next"></a>
                    </div>
                    <ul class="uk-slider-nav uk-dotnav uk-flex-center uk-margin"></ul>
                    </div>
            </div>
        )
    }
}
export default Slider