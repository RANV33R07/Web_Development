import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from sklearn.impute import SimpleImputer

# Function to perform EDA on selected columns
def perform_eda_on_selected_columns(df, selected_columns):
    # Subset DataFrame with selected columns
    df_selected = df[selected_columns]

    # Display basic information about the DataFrame
    st.subheader("DataFrame Info:")
    st.write(df_selected.info())

    # Display summary statistics of selected columns
    st.subheader("Summary Statistics:")
    st.write(df_selected.describe())

    # Display the first few rows of the DataFrame
    st.subheader("First Few Rows:")
    st.write(df_selected.head())

    # Display missing values in the DataFrame
    st.subheader("Missing Values:")
    st.write(df_selected.isnull().sum())

    return df_selected

# Function to visualize data distribution of selected columns
def visualize_distribution_of_selected_columns(df_selected):
    st.subheader("Data Distribution Visualization:")
    numerical_columns = df_selected.select_dtypes(include=np.number).columns.tolist()
    for column in numerical_columns:
        fig, ax = plt.subplots()  # Create a new figure
        sns.histplot(data=df_selected, x=column, kde=True)
        plt.title(f"Distribution of {column}")
        st.pyplot(fig)  # Display the figure

# Function to perform feature scaling and PCA on selected columns
def perform_feature_scaling_and_pca_on_selected_columns(df_selected):
    st.subheader("Feature Scaling and PCA:")
    numerical_columns = df_selected.select_dtypes(include=np.number).columns.tolist()

    # Display unimputed and missing entries
    st.subheader("Unimputed and Missing Entries:")
    st.write(df_selected[numerical_columns][df_selected[numerical_columns].isnull().any(axis=1)])

    # Handling missing values with imputation
    imputer = SimpleImputer(strategy='mean')
    df_selected[numerical_columns] = imputer.fit_transform(df_selected[numerical_columns])

    # Display after imputing entries
    st.subheader("After Imputing Entries:")
    st.write(df_selected[numerical_columns])

    # Standardize the features
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(df_selected[numerical_columns])

    # Perform PCA
    pca = PCA()
    pca.fit(scaled_features)
    explained_variance_ratio = pca.explained_variance_ratio_

    # Visualize explained variance ratio
    fig, ax = plt.subplots()  # Create a new figure
    plt.plot(np.cumsum(explained_variance_ratio), marker='o')
    plt.xlabel('Number of Components')
    plt.ylabel('Cumulative Explained Variance')
    plt.title('Explained Variance Ratio')
    st.pyplot(fig)  # Display the figure

# Streamlit app
def main():
    st.title("Interactive Exploratory Data Analysis (EDA) Tool")

    # Upload CSV file
    uploaded_file = st.file_uploader("Upload CSV file", type=["csv"])

    if uploaded_file is not None:
        # Read CSV file into a DataFrame
        df = pd.read_csv(uploaded_file)

        # Display column selection for feature selection
        st.sidebar.subheader("Select Columns for Analysis:")
        selected_columns = st.sidebar.multiselect("Select columns:", df.columns.tolist(), default=df.columns.tolist())

        if selected_columns:
            # Perform EDA on selected columns
            df_selected = perform_eda_on_selected_columns(df, selected_columns)

            # Visualize data distribution of selected columns
            visualize_distribution_of_selected_columns(df_selected)

            # Perform feature scaling and PCA on selected columns
            perform_feature_scaling_and_pca_on_selected_columns(df_selected)

# Run the Streamlit app
if __name__ == "__main__":
    main()
