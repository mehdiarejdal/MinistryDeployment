import pandas as pd

# Load data from Test.csv
test_data = pd.read_csv("Test.csv")

# Print the columns of the DataFrame
print("Columns of the DataFrame loaded from Test.csv:")
print(test_data.columns)

# Count the number of columns
num_columns = len(test_data.columns)
print("Number of columns:", num_columns)

def feature_engineering(df):
    # School_period
    df['School_period'] = (df['id_annee'] + 2007) - df['DO_ETAB_i1']
    df.drop('DO_ETAB_i1', axis=1, inplace=True)

    # age
    df['age'] = (df['id_annee'] + 2007) - df['datenaiseleve']
    df.drop('datenaiseleve', axis=1, inplace=True)

    # Text features encoding
    categorical_columns = ['profession_pere', 'profession_mere']
    encoder = LabelEncoder()
    for column in categorical_columns:
        df[column] = encoder.fit_transform(df[column])

    # Normalization
    scaler = MinMaxScaler()
    columns_to_normalize = ['profession_pere', 'profession_mere', 'NbrJourAbsenceAutorise_i1', 'NbrUniteAbsenceAutorise_i1',
                            'NbrJourAbsenceNonAutorise_i1', 'NbrUniteAbsenceNonAutorise_i1', 'failure_i1',
                            'MoyenneClasse_i1', 'age', 'School_period', 'Nb_class_failure_i1', 'Nb_class_dropout_i1',
                            'nbr_eleves_i1', 'nbr_filles_i1', 'Multiclass_i1', 'Classment_class_i1',
                            'Coefficients_CC_11_i1', 'Coefficients_CC_12_i1', 'Coefficients_CC_18_i1',
                            'Coefficients_CC_19_i1', 'Coefficients_CC_20_i1', 'Coefficients_CC_23_i1',
                            'Coefficients_CC_24_i1', 'Coefficients_CC_26_i1']
    df[columns_to_normalize] = scaler.fit_transform(df[columns_to_normalize])

    # Normalization by class
    columns_to_normalize_class = ['MoyenneGen_i1', 'NoteCC_11_i1', 'NoteCC_12_i1', 'NoteCC_18_i1', 'NoteCC_19_i1',
                                  'NoteCC_20_i1', 'NoteCC_23_i1', 'NoteCC_24_i1', 'NoteCC_26_i1']
    df[columns_to_normalize_class] = scaler.fit_transform(df[columns_to_normalize_class])

    # Feature encoding
    columns_to_encode = ['target_i1', 'cd_prov_i1']
    df["id_genre"] = df["id_genre"] - 1
    df = pd.get_dummies(df, columns=columns_to_encode)

    # New features
    df['Average_scientific_subjects_i1'] = df[['NoteCC_19_i1', 'NoteCC_20_i1', 'NoteCC_23_i1']].mean(axis=1)
    df['Average_literary_subjects_i1'] = df[['NoteCC_11_i1', 'NoteCC_12_i1', 'NoteCC_18_i1', 'NoteCC_24_i1']].mean(
        axis=1)

    # Drop columns
    df.drop(['id_annee', 'Level_i1', 'Adress', 'AdresseL_i1', 'Level', 'id_classe', 'CD_REG_i1', 'White_year_i1',
             'CD_REG_i1', 'id_eleve'], axis=1, inplace=True)

    return df

    # Call the feature engineering function and store the result


# Print the shape of the DataFrame (number of rows, number of columns)
print("Shape of the DataFrame:", df.shape)

# Print the list of column names
print("Column names:", df.columns.tolist())
