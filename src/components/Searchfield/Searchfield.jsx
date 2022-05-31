const Searchfield = (props) => {
  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <input className="search-field" type="text" onKeyDown={props.onKeyDown} />
    </form>
  );
};

export default Searchfield;
