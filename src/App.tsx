import { useQuery } from "react-query";
import axios from "axios";
import "./App.css";
import NumberFormat from "react-number-format";
import bitcoin from "./images/bitcoin.png";

type Bitcoin = {
  last: string;
  high: string;
  low: string;
  volume: string;
  date: number;
};

function App() {
  const { data, isFetching } = useQuery<Bitcoin>("cotation", async () => {
    const response = await axios.get(
      "https://www.mercadobitcoin.net/api/BTC/ticker/"
    );

    return response.data;
  });

  const last = data?.ticker.last;
  const high = data?.ticker.high;
  const low = data?.ticker.low;
  const volume = data?.ticker.vol;
  const date = data?.ticker.date;

  const formatDate = () => {
    const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Date().toLocaleDateString(undefined, options);
  };

  const formatCurrency = (number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(number);
  };

  return (
    <div className="App">
      <div className="bitCoin">
        <div className="cryptoName">
          <h1>Bitcoin (BTC)</h1>
          <hr />
          <p>1 BTC = </p>
        </div>

        {isFetching && <p>carregando...</p>}
        <div className="cryptoContent">
          <div className="cryptoContentLast">
            <img src={bitcoin} />
            <div className="cryptoLast">
              <h1>{formatCurrency(last)}</h1>
              <p>{formatDate(date)}</p>
            </div>
          </div>
          <div className="cryptoMaxMin">
            <h3 className="cryptoMax">MÁX. {formatCurrency(high)}</h3>
            <h3 className="cryptoMin">MIN. {formatCurrency(low)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
