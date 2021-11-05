import './App.css';

function App() {
  console.log("window:", window.location.pathname)
  return (
    <div className="container">
      <img src="http://static.businessworld.in/article/article_extra_large_image/1632366734_ocEIq5_Zolve_Logo.png" alt="Zolvo" height="100px" />
      <ul>
        <li><a className={`${window.location.pathname === '/graph' || window.location.pathname === '/'  ? 'active' : ''}`} href="graph">Graph</a></li>
        <li><a className={`${window.location.pathname === '/clipboard' ? 'active' : ''}`} href="clipboard">Clipboard</a></li>
        <li><a className={`${window.location.pathname === '/media' ? 'active' : ''}`} href="media">Media</a></li>
      </ul>
    </div>
  );
}

export default App;
