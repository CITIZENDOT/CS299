def create_evaluation_df(predictions, xTestIndex, yTest, H):
    """Create a data frame for easy evaluation"""
    evalDf = pd.DataFrame(
        predictions, columns=["t + " + str(t) for t in range(1, H + 1)]
    )
    evalDf["timestamp"] = xTestIndex.values
    evalDf = pd.melt(evalDf, id_vars="timestamp", value_name="prediction", var_name="h")
    evalDf["actual"] = np.transpose(yTest).ravel()
    return evalDf
