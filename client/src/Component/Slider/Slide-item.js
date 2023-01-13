import Images1 from '../../Assets/Images/Images_1.jpg';
const SlideItem = ({Title, Subtitle, fileFollder, Descer}) => {
    return (
    <li className="silde_item">
        <div className='info'>
          <div className='slide_title'>{Title}</div>
          <div className='slide_subtitle'>{Subtitle}</div>
          <div className='slide_descer'>{Descer}</div>
          <a href='#' className='uk-button uk-button-danger btn'>Замовити</a>  
        </div>
         <img src={`./fileFolder/${fileFollder}/Body.jpg`} alt="Box" />
    </li>
    )
}

export default SlideItem