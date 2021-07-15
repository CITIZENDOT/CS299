## Analysis

In this section, We cover 3 models. I might add more in the future.

- Convolutional Neural Network **(CNN)**
- Recurrent Neural Network **(RNN)**
- Autoregressive integrated moving average **(ARIMA)**

## Metrics

| S. No                          | ARIMA | CNN   | RNN      | RNN (encoder-decoder) |
| ------------------------------ | ----- | ----- | -------- | --------------------- |
| R2 Score                       | 0.989 | 0.991 | -3.244   | -3.076                |
| Mean Absolute Error            | 0.405 | 2.168 | 59.98    | 58.423                |
| Mean Squared Error             | 0.301 | 10.2  | 4708.784 | 4522.834              |
| Mean Absolute Percentage Error | 0.017 | 0.03  | 0.845    | 0.818                 |

By above metrics, It's clear that, ARIMA and CNN perform better than RNN. Although ARIMA seems to perform better than CNN, I think it's not true. Because, ARIMA is based on a assumption that, Market is Linear in some form, and it's trying to capture the linearity, Where as CNN doesn't have any such assumptions.

**_Each subdirectory includes a README, which shows the metrics and some more info like Plots etc..._**
