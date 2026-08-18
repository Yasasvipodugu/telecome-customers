# Telecom Churn Driver Discovery & Persona Profiler

**An Academic Data Science & Machine Learning Case Study Platform**

---

## 🎯 Project Overview & Objective
This project is an end-to-end interactive Data Science and Machine Learning web application evaluating customer attrition dynamics on the **IBM Telco Customer Churn dataset (7,043 subscriber records, 21 attributes)**. 

The platform identifies empirical churn drivers, segments customers into **4 actionable behavioral personas**, predicts individual customer attrition risk using an interpretable **Decision Tree Classifier (79.84% Test Accuracy, 0.8281 ROC-AUC)**, and provides a multi-variable cohort risk dashboard alongside 14 structured business retention playbooks.

---

## 🚀 Key Features Across the 14 Application Sections

1. **Home Page:** Executive dashboard, project scope, quick navigation CTAs, and headline metric cards.
2. **Project Overview:** Churn definition, economic impact in telecom (CAC vs LTV), business problem formulation, and supervised machine learning rationale.
3. **Dataset Overview:** 5 core KPI cards (7,043 Customers, 21 Features, 1,869 Churned, 5,174 Retained, 26.54% Churn Rate), variable taxonomies, and interactive sample records preview.
4. **Exploratory Data Analysis (EDA):** 10 interactive Chart.js visualizations (Overall Distribution, Contract Type, Internet Service, Tenure Cohorts, Monthly Charges, Payment Method, Technical Support, Online Security, Senior Citizen Status, Household Structure) with dedicated business interpretation takeaway cards.
5. **Churn Driver Analysis:** Gini feature importance rankings (Contract Month-to-month 51.75%, Fiber Optic 16.44%, Tenure 15.50%) and explicit distinctions between observed statistical associations and causal mechanisms.
6. **Decision Tree Model:** Hierarchical node flow diagram, model structure parameters, and business-friendly `IF-THEN` conditional rules explorer.
7. **Customer Persona Profiler:** 4 distinct behavioral archetypes (*New Month-to-Month*, *High-Charge Month-to-Month*, *Loyal Long-Term*, *Stable Standard*) with characteristics, risk levels, indicators, and 1-click test buttons.
8. **Customer Churn Predictor:** 19-field interactive input form with 4 instant archetype presets, animated probability gauge, risk level badge, detected persona profile, top 3 customer-specific risk drivers, and tailored retention action plan.
9. **Model Performance:** Evaluation dashboard featuring Accuracy (79.84%), Precision (63.47%), Recall (56.68%), F1-Score (59.89%), ROC-AUC (0.8281), 2x2 Confusion Matrix, ROC Curve, and Hyperparameter Tree Depth regularisation analysis.
10. **Business Recommendations:** 14 strategic retention playbooks filterable across 4 core business pillars (Contract & Pricing, Onboarding & Support, Personalized Operations, Governance).
11. **Churn Risk Dashboard:** Multi-filter interactive cohort analyzer allowing real-time filtering by Contract, Internet, Tenure, Payment, and Monthly Charges with dynamic KPI recalculations and sample customer drilldown.
12. **Methodology:** 12-step Data Science lifecycle roadmap from business understanding and data quality assessment to persona profiling and production deployment.
13. **Project Findings:** Empirical synthesis of major quantitative patterns, high-risk segments, and retention opportunities.
14. **Conclusion:** Strategic synthesis on transforming telecom customer retention via explainable AI and persona-driven playbooks.

---

## 📁 Project Structure

```
telecom-churn-analytics/
├── data/
│   └── telco_churn.csv              # Canonical 7,043 IBM Telco Customer dataset records
├── ml/
│   ├── train_model.py               # Scikit-Learn training, evaluation & JSON export pipeline
│   ├── model_metadata.json          # Trained metrics, feature importances & tree rules
│   └── decision_tree_model.pkl      # Serialized Scikit-learn Decision Tree artifact
├── server/
│   ├── app.py                       # Flask REST API server & static host
│   └── requirements.txt             # Python backend dependencies
├── frontend/
│   ├── index.html                   # 14-section master web application
│   ├── css/
│   │   └── styles.css               # Modern Data Science theme & responsive styles
│   └── js/
│       ├── data.js                  # Authentic 7,043 dataset aggregates, presets & personas
│       ├── ml_engine.js             # Standalone client-side Decision Tree inference engine
│       ├── charts.js                # Chart.js visualization configurations & tooltips
│       └── app.js                   # Interactive UI controller, filters & event handlers
└── README.md                        # Documentation
```

---

## 💻 How to Run the Application

### Option 1: Python Flask Backend Server (Recommended)
1. Ensure Python 3 is installed.
2. Open PowerShell or Terminal in the project root:
   ```bash
   pip install -r server/requirements.txt
   ```
3. Start the Flask application server:
   ```bash
   python server/app.py
   ```
4. Access the web dashboard in your browser:
   ```
   http://127.0.0.1:5000
   ```

### Option 2: Instant Standalone Client Mode
1. Navigate to the `frontend/` directory.
2. Open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
3. The dashboard, interactive charts, and client-side Decision Tree inference engine will run 100% locally with zero backend dependencies required!

### Option 3: Retrain the Machine Learning Model
To retrain the Decision Tree model and regenerate metadata:
```bash
python ml/train_model.py
```

---

## 📊 Model Evaluation Summary

| Metric | Score | Evaluation Context |
| :--- | :---: | :--- |
| **Accuracy** | **79.84%** | Evaluated on 1,409 unseen test records (20% stratified test split) |
| **ROC-AUC** | **0.8281** | Strong discriminative ability across decision thresholds |
| **Precision** | **63.47%** | True churners among positive predictions |
| **Recall** | **56.68%** | True positive capture rate |
| **F1-Score** | **59.89%** | Balanced harmonic mean |
| **Specificity** | **88.21%** | True negative rate (913 of 1,035 retained customers correctly identified) |
| **Tree Depth** | **5** | Optimal regularized depth preventing overfitting |

---

## 📜 Academic Integrity & License
This project is built for educational and research purposes in Data Science and Machine Learning. All figures and empirical distributions are derived directly from the IBM Telco Customer Churn dataset.
