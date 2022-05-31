import Logo from "../Logo/Logo";
import Searchfield from "../Searchfield/Searchfield";

const Header = (props) => {
  return (
    <header className="header" id="top">
      <Logo />
      <Searchfield onKeyDown={props.onKeyDown} />
    </header>
  );
};

export default Header;
