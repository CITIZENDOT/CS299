from os import mkdir, path
import json
import yfinance
from datetime import datetime as dt


def main():

    period = "5y"  # Valid periods are: 1d, 5d, 1mo, 3mo, 6mo, 1y, 2y, 5y, 10y, ytd, max
    mkdir("data")

    with open("S&P_500.json", "r") as f:
        data = json.load(f)
    for company in data:
        print(f'{company["name"]} ...', end=" ")
        ticker_df = yfinance.download(company["symbol"], period=period, progress=False)
        ticker_df.to_csv(path.join("data", f'{company["symbol"]}.csv'))
        print("Done.")


if __name__ == "__main__":
    main()