import pandas as pd
import requests
import json

# Load the test data from Test.csv
test_data = pd.read_csv("Test.csv")

# Define the URL for the Flask endpoint
url = "http://localhost:7117/predict"

# Iterate over each row of the DataFrame
for _, row in test_data.iterrows():
    # Convert the row to a dictionary
    row_dict = row.to_dict()
    
    # Convert the row dictionary to JSON format
    row_json = json.dumps(row_dict)
    
    # Send a POST request to the Flask endpoint with the row data
    response = requests.post(url, json=row_json)

    # Check if the request was successful
    if response.status_code == 200:
        # Extract the predictions from the response
        predictions = response.json()["predictions"]
        print("Predictions:", predictions)
    else:
        print("Error:", response.text)
