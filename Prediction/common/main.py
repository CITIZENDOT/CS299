from prompt_toolkit import prompt
from prompt_toolkit.completion import WordCompleter
from generate_data import get_data

if __name__ == "__main__":
    periodList = WordCompleter(
        ["1d", "5d", "1mo", "3mo", "6mo", "1y", "2y", "5y", "10y", "ytd", "max"]
    )
    intervalList = WordCompleter(
        [
            "1m",
            "2m",
            "5m",
            "15m",
            "30m",
            "60m",
            "90m",
            "1h",
            "1d",
            "5d",
            "1wk",
            "1mo",
            "3mo",
        ]
    )

    symbol = prompt("Ticker name: ", default="AAPL")
    period = prompt("Period? ", completer=periodList, default="1mo")
    interval = prompt("Interval? ", completer=intervalList, default="5m")
    file_name = prompt("FileName? ", default="data.csv")

    get_data(symbol, period, interval, file_name)
