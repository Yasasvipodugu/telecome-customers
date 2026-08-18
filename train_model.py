import os
import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, confusion_matrix, roc_curve, classification_report
)
import joblib

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
ML_DIR = os.path.join(BASE_DIR, 'ml')
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(ML_DIR, exist_ok=True)

csv_path = os.path.join(DATA_DIR, 'telco_churn.csv')

def load_and_preprocess(filepath):
    df = pd.read_csv(filepath)
    
    # 1. Clean TotalCharges - handle empty strings or spaces
    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'].astype(str).str.strip(), errors='coerce')
    df['TotalCharges'] = df['TotalCharges'].fillna(df['MonthlyCharges'] * df['tenure'])
    df['TotalCharges'] = df['TotalCharges'].fillna(0)
    
    # 2. Binary Encoding
    binary_cols = ['Partner', 'Dependents', 'PhoneService', 'PaperlessBilling']
    for col in binary_cols:
        if col in df.columns:
            df[col + '_enc'] = (df[col] == 'Yes').astype(int)
            
    df['gender_enc'] = (df['gender'] == 'Male').astype(int)
    df['SeniorCitizen_enc'] = df['SeniorCitizen'].astype(int)
    
    # 3. Categorical Multi-class One-Hot Encoding
    service_cols = [
        'MultipleLines', 'InternetService', 'OnlineSecurity', 'OnlineBackup',
        'DeviceProtection', 'TechSupport', 'StreamingTV', 'StreamingMovies',
        'Contract', 'PaymentMethod'
    ]
    
    encoded_df = pd.get_dummies(df[service_cols], drop_first=False)
    
    # 4. Target
    df['Churn_enc'] = (df['Churn'] == 'Yes').astype(int)
    
    # 5. Numerical & binary features combined
    num_features = [
        'tenure', 'MonthlyCharges', 'TotalCharges', 'gender_enc', 'SeniorCitizen_enc',
        'Partner_enc', 'Dependents_enc', 'PhoneService_enc', 'PaperlessBilling_enc'
    ]
    
    X = pd.concat([df[num_features], encoded_df], axis=1)
    y = df['Churn_enc']
    
    return df, X, y

def train():
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found!")
        return
        
    df, X, y = load_and_preprocess(csv_path)
    
    # 80/20 Stratified Train-Test Split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )
    
    # Train interpretable Decision Tree Classifier (tuned for balance and interpretability)
    clf = DecisionTreeClassifier(
        max_depth=5,
        min_samples_split=25,
        min_samples_leaf=15,
        criterion='gini',
        random_state=42
    )
    clf.fit(X_train, y_train)
    
    # Model Predictions & Probabilities
    y_pred = clf.predict(X_test)
    y_prob = clf.predict_proba(X_test)[:, 1]
    
    # Metrics
    acc = float(accuracy_score(y_test, y_pred))
    prec = float(precision_score(y_test, y_pred, zero_division=0))
    rec = float(recall_score(y_test, y_pred, zero_division=0))
    f1 = float(f1_score(y_test, y_pred, zero_division=0))
    roc_auc = float(roc_auc_score(y_test, y_prob))
    cm = confusion_matrix(y_test, y_pred).tolist()
    
    # ROC Curve points
    fpr, tpr, _ = roc_curve(y_test, y_prob)
    roc_data = [{'fpr': round(float(f), 4), 'tpr': round(float(t), 4)} for f, t in zip(fpr, tpr)]
    
    # Depth Tuning Curve (Depth 2 to 10)
    depth_tuning = []
    for d in range(2, 11):
        dt = DecisionTreeClassifier(max_depth=d, min_samples_leaf=15, random_state=42)
        dt.fit(X_train, y_train)
        tr_acc = float(accuracy_score(y_train, dt.predict(X_train)))
        te_acc = float(accuracy_score(y_test, dt.predict(X_test)))
        depth_tuning.append({'depth': d, 'train_acc': round(tr_acc * 100, 2), 'test_acc': round(te_acc * 100, 2)})
        
    # Feature Importances
    feat_imp = []
    for col, imp in zip(X.columns, clf.feature_importances_):
        if imp > 0.001:
            feat_imp.append({
                'feature': col,
                'importance': round(float(imp), 4),
                'percentage': round(float(imp) * 100, 2)
            })
    feat_imp = sorted(feat_imp, key=lambda x: x['importance'], reverse=True)
    
    # Dataset statistics
    total_cust = len(df)
    churn_cnt = int(df['Churn_enc'].sum())
    retain_cnt = total_cust - churn_cnt
    churn_rate = round((churn_cnt / total_cust) * 100, 2)
    
    # Family Structure Column for EDA
    df['FamilyStructure'] = 'Solo (No Partner, No Dependents)'
    df.loc[(df['Partner']=='Yes') & (df['Dependents']=='No'), 'FamilyStructure'] = 'Partner Only'
    df.loc[(df['Partner']=='No') & (df['Dependents']=='Yes'), 'FamilyStructure'] = 'Dependents Only'
    df.loc[(df['Partner']=='Yes') & (df['Dependents']=='Yes'), 'FamilyStructure'] = 'Partner & Dependents'
    
    # Tenure Cohorts
    tenure_bins = [0, 12, 24, 36, 48, 60, 72]
    tenure_labels = ['0-12 Mo', '13-24 Mo', '25-36 Mo', '37-48 Mo', '49-60 Mo', '61-72 Mo']
    df['TenureCohort'] = pd.cut(df['tenure'], bins=tenure_bins, labels=tenure_labels, include_lowest=True)
    
    # Monthly Charges Cohorts
    charge_bins = [0, 35, 65, 85, 130]
    charge_labels = ['<$35 (Basic)', '$35-$65 (Mid)', '$65-$85 (High)', '>$85 (Premium)']
    df['ChargeCohort'] = pd.cut(df['MonthlyCharges'], bins=charge_bins, labels=charge_labels, include_lowest=True)
    
    # Cross-tabulations for all 10 EDA variables
    def get_crosstab(col):
        ct = df.groupby(col, observed=False)['Churn'].value_counts(normalize=True).unstack().fillna(0) * 100
        counts = df.groupby(col, observed=False)['Churn'].value_counts().unstack().fillna(0)
        res = {}
        for idx in ct.index:
            res[str(idx)] = {
                'churn_rate': round(float(ct.loc[idx].get('Yes', 0)), 2),
                'retained_rate': round(float(ct.loc[idx].get('No', 0)), 2),
                'churn_count': int(counts.loc[idx].get('Yes', 0)),
                'retained_count': int(counts.loc[idx].get('No', 0)),
                'total_count': int(counts.loc[idx].sum())
            }
        return res

    eda_stats = {
        'total_customers': total_cust,
        'total_features': 21,
        'churned_customers': churn_cnt,
        'retained_customers': retain_cnt,
        'churn_rate': churn_rate,
        'numerical_features': 3,
        'categorical_features': 17,
        'tenure_mean': round(float(df['tenure'].mean()), 2),
        'tenure_median': float(df['tenure'].median()),
        'monthly_charges_mean': round(float(df['MonthlyCharges'].mean()), 2),
        'total_charges_mean': round(float(df['TotalCharges'].mean()), 2),
        'by_contract': get_crosstab('Contract'),
        'by_internet': get_crosstab('InternetService'),
        'by_tenure_cohort': get_crosstab('TenureCohort'),
        'by_charge_cohort': get_crosstab('ChargeCohort'),
        'by_payment': get_crosstab('PaymentMethod'),
        'by_tech_support': get_crosstab('TechSupport'),
        'by_online_security': get_crosstab('OnlineSecurity'),
        'by_senior': get_crosstab('SeniorCitizen'),
        'by_family': get_crosstab('FamilyStructure')
    }
    
    # Textual Decision Tree Rules
    tree_rules = export_text(clf, feature_names=list(X.columns))
    
    # Save Model Metadata
    metadata = {
        'project_title': "Telecom Churn Driver Discovery & Persona Profiler",
        'subtitle': "Customer Churn Analysis, Driver Discovery and Persona Profiling",
        'metrics': {
            'accuracy': round(acc, 4),
            'precision': round(prec, 4),
            'recall': round(rec, 4),
            'f1_score': round(f1, 4),
            'roc_auc': round(roc_auc, 4),
            'confusion_matrix': cm,
            'test_sample_size': len(y_test)
        },
        'roc_curve': roc_data,
        'depth_tuning': depth_tuning,
        'feature_importances': feat_imp,
        'feature_names': list(X.columns),
        'eda_stats': eda_stats,
        'tree_rules': tree_rules,
        'model_parameters': {
            'algorithm': 'DecisionTreeClassifier',
            'criterion': 'gini',
            'max_depth': 5,
            'min_samples_split': 25,
            'min_samples_leaf': 15,
            'test_split': 0.20,
            'random_state': 42
        }
    }
    
    meta_path = os.path.join(ML_DIR, 'model_metadata.json')
    with open(meta_path, 'w') as f:
        json.dump(metadata, f, indent=2)
        
    model_path = os.path.join(ML_DIR, 'decision_tree_model.pkl')
    joblib.dump(clf, model_path)
    
    print("Training complete!")
    print(f"Model saved to: {model_path}")
    print(f"Metadata saved to: {meta_path}")
    print(f"Dataset Rows: {total_cust}, Churn Rate: {churn_rate}%")
    print(f"Accuracy: {acc:.4f}, Precision: {prec:.4f}, Recall: {rec:.4f}, F1: {f1:.4f}, ROC-AUC: {roc_auc:.4f}")

if __name__ == '__main__':
    train()
