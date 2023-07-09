const Header = () => {
  return (
    <div>
      <h4>Today is 📆</h4>
      <h1 style={{color: 'brown'}}>{new Date().toLocaleDateString()}</h1>
    </div>
  );
};

export default Header;
