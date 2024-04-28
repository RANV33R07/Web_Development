import streamlit as st
import pandas as pd
from sklearn.ensemble import RandomForestRegressor

# Function to perform EDA on CSV data
def perform_eda(csv_file):
    # Read CSV file into a DataFrame
    df = pd.read_csv(csv_file)

    # Display basic information about the DataFrame
    st.subheader("DataFrame Info:")
    st.write(df.info())

    # Display summary statistics of numerical columns
    st.subheader("Summary Statistics:")
    st.write(df.describe())

    # Display the first few rows of the DataFrame
    st.subheader("First Few Rows:")
    st.write(df.head())

    # Display missing values in the DataFrame
    st.subheader("Missing Values:")
    st.write(df.isnull().sum())

    return df

# Function to train a model and get feature importances
def get_feature_importances(df):
    # Assuming the last column is the target variable
    X = df.iloc[:, :-1]
    y = df.iloc[:, -1]

    # Train a simple Random Forest Regressor
    model = RandomForestRegressor()
    model.fit(X, y)

    # Get feature importances
    feature_importances = pd.Series(model.feature_importances_, index=X.columns).sort_values(ascending=False)
    return feature_importances

# Streamlit app
def main():
    st.title("Exploratory Data Analysis (EDA) Tool")

    # Upload CSV file
    uploaded_file = st.file_uploader("Upload CSV file", type=["csv"])

    if uploaded_file is not None:
        # Perform EDA when file is uploaded
        df = perform_eda(uploaded_file)

        # Allow users to ask questions
        st.subheader("Ask a Question about the Dataset:")
        question = st.text_input("Type your question here:")

        if question:
            if "important features" in question.lower():
                # Get feature importances
                feature_importances = get_feature_importances(df)
                st.subheader("Feature Importances:")
                st.write(feature_importances)
            else:
                st.write("Sorry, I couldn't understand your question. Please try again.")

# Run the Streamlit app
if __name__ == "__main__":
    main()
