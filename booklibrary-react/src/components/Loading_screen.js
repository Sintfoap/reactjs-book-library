import Loading_animation from '../constants/images/Loading_animation.gif';

function loading_screen() {
    return <div>
        <img
            src={Loading_animation}
            alt="Loading_animation"
            width="65%"
            height="50%"
            style={{ backgroundPosition: "center"}}
        />
    </div>
} 
export default loading_screen