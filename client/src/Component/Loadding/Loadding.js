import Loadding from '../../Assets/Loadding/Main.mp4';
const Loaddings = () => {

    return(
       <>
         <video className='Loadding' src={Loadding} muted={true} autoPlay={true} playsInline={true}></video>
       </>
    )
}

export default Loaddings