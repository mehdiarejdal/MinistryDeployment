from flask import Flask, request, jsonify
import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
import mlflow
app = Flask(__name__)

# Load the pre-trained model
model = joblib.load("model.pkl")

data_test = pd.read_csv("Test.csv")

# Call Feature_engineering function with the loaded data


def Feature_engineering(df):
    df['School_period'] = (df['id_annee'] +2007)-df['DO_ETAB_i1']
    df=df.drop(['DO_ETAB_i1'], axis=1)
    
    df['age'] = ( df['id_annee'] +2007)-data['datenaiseleve'] 
    df = df.drop(['datenaiseleve'], axis=1)
    
    # Text features
    categorical_columns = ['profession_pere','profession_mere']
    encoder = LabelEncoder()
    for column in categorical_columns:
        df[column] = encoder.fit_transform(df[column])
        
    # Normalisation
    scaler = MinMaxScaler()
    # General Normalization
    columns_to_normalize=[ 'profession_pere','profession_mere','NbrJourAbsenceAutorise_i1','NbrUniteAbsenceAutorise_i1', 'NbrJourAbsenceNonAutorise_i1','NbrUniteAbsenceNonAutorise_i1',
                          'failure_i1', 'MoyenneClasse_i1','age','School_period', 'Nb_class_failure_i1','Nb_class_dropout_i1','nbr_eleves_i1', 'nbr_filles_i1','Multiclass_i1','Level_i1','Classment_class_i1',
                         'Coefficients_CC_11_i1', 'Coefficients_CC_12_i1', 'Coefficients_CC_18_i1', 'Coefficients_CC_19_i1', 'Coefficients_CC_20_i1', 'Coefficients_CC_23_i1', 'Coefficients_CC_24_i1', 
                          'Coefficients_CC_26_i1'] 
    df[columns_to_normalize] = scaler.fit_transform(df[columns_to_normalize])

    # Normalization by class
    columns_to_normalize_class = ['MoyenneGen_i1','NoteCC_11_i1','NoteCC_12_i1', 'NoteCC_18_i1', 'NoteCC_19_i1', 'NoteCC_20_i1','NoteCC_23_i1', 'NoteCC_24_i1', 'NoteCC_26_i1']
    # Group by 'class_id' and apply Min-Max normalization within each group
    df[columns_to_normalize_class] = scaler.fit_transform(df[columns_to_normalize_class])

    # Feature encoding
    columns_to_encode = ['target_i1','cd_prov_i1']
    df["id_genre"] = df["id_genre"] - 1
    # Get dummy variables for the specified columns
    df = pd.get_dummies(df, columns=columns_to_encode)

    # New features     
    df['Average_scientific_subjects_i1'] = df[['NoteCC_19_i1', 'NoteCC_20_i1', 'NoteCC_23_i1']].mean(axis=1)
    df['Average_literary_subjects_i1'] = df[['NoteCC_11_i1', 'NoteCC_12_i1', 'NoteCC_18_i1', 'NoteCC_24_i1']].mean(axis=1)

    # Drop columns        
    df=df.drop(['id_annee','Level_i1','Adress','AdresseL_i1','Level','id_classe','CD_REG_i1','White_year_i1','CD_REG_i1','id_eleve'], axis=1)
    return df

data_cleaned=Feature_engineering(data_test)


# Load the pre-trained model
# model_path = "/home/ismail.elbouknify/lustre/data_sec-um6p-st-sccs-6sevvl76uja/IDS/Ismail_Elbouknify/Deployment/Models/level_8"
# loaded_model = mlflow.sklearn.load_model(model_path)
# print("Loaded model:")

y_pred = model.predict(data_cleaned)



# Define a route for making predictions
@app.route("/predict", methods=["POST"])
def predict():
    # Get the JSON data from the request
    data = request.json
    
    # Convert JSON data to DataFrame
    df = pd.DataFrame(data)
    
    # Perform feature engineering
    df_cleaned = Feature_engineering(df)
    
    # Make predictions using the loaded model
    predictions = model.predict(df_cleaned)
    
    # Return predictions as JSON response
    return jsonify({"predictions": predictions.tolist()})

# Define a route for fetching data from Test.csv and sending predictions
@app.route("/predict_from_csv", methods=["POST"])
def predict_from_csv():
    # Load data from Test.csv
    test_data = pd.read_csv("Test.csv")
    
    # Make predictions for each row
    predictions = []
    for index, row in test_data.iterrows():
        # Prepare data for prediction
        data = row.to_dict()
        
        # Perform feature engineering
        df_cleaned = Feature_engineering(pd.DataFrame([data]))
      
        prediction = model.predict(df_cleaned)
        predictions.append(prediction[0])
    
    # Return predictions as JSON response
    return jsonify({"predictions": predictions})

if __name__ == "__main__":
    # Run the Flask app
    app.run(host="0.0.0.0", port=7117)
