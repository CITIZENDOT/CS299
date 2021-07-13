import yfinance as yf


def get_data(symbol="AAPL", period="1mo", interval="5m", file_name="data.csv"):
    data = yf.download(tickers=symbol, period=period, interval=interval)
    data.to_csv(file_name)


if __name__ == "__main__":
    get_data()
