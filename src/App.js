import "./App.scss";
import SearchCity from "./view/searchCity/searchCity";
import DetailForecast from "./view/detailForecast/detailForecast";

function App () {
  return (
    <div className="app">
      <div className="main-layout">
        <SearchCity />
        <DetailForecast />
      </div>
    </div>
  )
}

export default App