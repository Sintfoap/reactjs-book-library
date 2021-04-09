import Loading_animation from '../constants/images/Loading_animation.gif';

function loading_screen() {
    return <div className="text-center row">
        <img
            src={Loading_animation}
            alt="Loading_animation"
        />
    </div>
} 
export default loading_screen