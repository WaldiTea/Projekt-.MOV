import Facebook from '../../assets/images/facebook-logo.png';
import Instagram from '../../assets/images/instagram-logo.png';

const SocailMedia = () => {
  return (
    <div className='icon-wrapper'>
      <a href="https://www.instagram.com/">
        <img className="icon" src={Instagram} alt="instagram-logo" />
      </a>
      <a href="https://www.facebook.com/">
        <img className="icon" src={Facebook} alt="facebook-logo" />
      </a>
    </div>
  );
}

export default SocailMedia;