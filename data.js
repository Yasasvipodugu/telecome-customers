// Telecom Churn Analytics Data & Meta Repository
// Authentic IBM Telco Customer Churn Dataset (7,043 Records, 21 Features)

const PROJECT_CONFIG = {
    title: "Telecom Churn Driver Discovery & Persona Profiler",
    subtitle: "Customer Churn Analysis, Driver Discovery and Persona Profiling",
    dataset: {
        name: "IBM Telco Customer Churn Benchmark Dataset",
        records: 7043,
        features: 21,
        numericalFeatures: 3,
        categoricalFeatures: 17,
        churnCount: 1869,
        retainedCount: 5174,
        churnRate: 26.54,
        tenureMean: 32.37,
        tenureMedian: 29.0,
        monthlyChargesMean: 64.76,
        totalChargesMean: 2279.73,
        metrics: {
            accuracy: 0.7984,
            precision: 0.6347,
            recall: 0.5668,
            f1Score: 0.5989,
            rocAuc: 0.8281,
            testSampleSize: 1409
        }
    }
};

const EDA_DATA = {
    churnDistribution: {
        labels: ['Retained Customers (No)', 'Churned Customers (Yes)'],
        data: [5174, 1869],
        percentages: ['73.5%', '26.5%'],
        colors: ['#0284c7', '#ef4444'],
        insight: "26.54% (1,869 of 7,043) of subscribers churned. This baseline attrition rate represents substantial recurring revenue loss and underscores the urgent requirement for proactive, automated retention mechanisms."
    },
    churnByContract: {
        labels: ['Month-to-Month', 'One Year', 'Two Year'],
        churnRates: [42.71, 11.27, 2.83],
        retainedRates: [57.29, 88.73, 97.17],
        counts: { churned: [1655, 166, 48], retained: [2220, 1307, 1647] },
        insight: "Contract commitment is the single strongest retention anchor. Month-to-month subscribers churn at 42.71%, whereas 1-Year (11.27%) and 2-Year (2.83%) commitments experience drastically lower attrition."
    },
    churnByInternet: {
        labels: ['Fiber Optic', 'DSL', 'No Internet Service'],
        churnRates: [41.89, 18.96, 7.40],
        retainedRates: [58.11, 81.04, 92.60],
        counts: { churned: [1297, 459, 113], retained: [1799, 1962, 1413] },
        insight: "Fiber optic subscribers exhibit the highest churn (41.89%), driven by high monthly price expectations ($70-$118/mo) and sensitivity to technical performance hurdles, compared to DSL (18.96%) and No Internet (7.40%)."
    },
    churnByTenure: {
        labels: ['0-12 Mo', '13-24 Mo', '25-36 Mo', '37-48 Mo', '49-60 Mo', '61-72 Mo'],
        churnRates: [47.44, 28.70, 22.42, 16.78, 13.82, 6.61],
        retainedRates: [52.56, 71.30, 77.58, 83.22, 86.18, 93.39],
        churnCounts: [1037, 294, 180, 145, 115, 98],
        retainedCounts: [1149, 730, 623, 719, 717, 1386],
        insight: "Over 55.5% of all churn events take place within the initial 12 months (47.44% first-year attrition). After customer tenure exceeds 36 months, churn drops sustainably below 17%."
    },
    churnByMonthlyCharges: {
        labels: ['<$35 (Basic Tier)', '$35 - $65 (Mid Tier)', '$65 - $85 (High Tier)', '>$85 (Premium Tier)'],
        churnRates: [10.82, 24.31, 36.48, 38.83],
        retainedRates: [89.18, 75.69, 63.52, 61.17],
        counts: { churned: [174, 342, 597, 756], retained: [1434, 1065, 1039, 1190] },
        insight: "Churn risk scales directly with monthly invoice amounts; accounts billed over $65/mo exhibit more than triple the churn rate of basic tier (<$35) subscribers."
    },
    churnByPayment: {
        labels: ['Electronic Check', 'Mailed Check', 'Bank Transfer (Auto)', 'Credit Card (Auto)'],
        churnRates: [45.29, 19.11, 16.71, 15.24],
        retainedRates: [54.71, 80.89, 83.29, 84.76],
        counts: { churned: [1071, 308, 258, 232], retained: [1294, 1304, 1286, 1290] },
        insight: "Manual Electronic Check payment is heavily correlated with churn (45.29%). In contrast, automated billing via Credit Card (15.24%) or Bank Transfer (16.71%) cuts attrition by nearly two-thirds."
    },
    churnByTechSupport: {
        labels: ['No Tech Support', 'Has Tech Support', 'No Internet Service'],
        churnRates: [41.64, 15.17, 7.40],
        retainedRates: [58.36, 84.83, 92.60],
        counts: { churned: [1446, 310, 113], retained: [2027, 1734, 1413] },
        insight: "Customers without Technical Support experience a 41.64% churn rate. Equipping subscribers with responsive tech support reduces churn to 15.17%, creating high retention value."
    },
    churnBySecurity: {
        labels: ['No Online Security', 'Has Online Security', 'No Internet Service'],
        churnRates: [41.77, 14.61, 7.40],
        retainedRates: [58.23, 85.39, 92.60],
        counts: { churned: [1461, 295, 113], retained: [2037, 1724, 1413] },
        insight: "Online Security serves as a protective switching barrier; accounts without security churn at 41.77% versus only 14.61% for accounts with cybersecurity activated."
    },
    churnBySenior: {
        labels: ['Senior Citizen (65+)', 'Non-Senior Citizen'],
        churnRates: [41.68, 23.61],
        retainedRates: [58.32, 76.39],
        counts: { churned: [476, 1393], retained: [666, 4508] },
        insight: "Senior citizens exhibit an elevated churn rate (41.68% vs 23.61%), typically influenced by fixed-income sensitivity, invoice complexity, or unassisted digital service channels."
    },
    churnByFamily: {
        labels: ['Solo (No Partner/Dep)', 'Partner Only', 'Dependents Only', 'Partner & Dependents'],
        churnRates: [34.24, 25.41, 21.33, 14.24],
        retainedRates: [65.76, 74.59, 78.67, 85.76],
        counts: { churned: [1123, 442, 77, 227], retained: [2157, 1297, 284, 1368] },
        insight: "Family households (Partner & Dependents) exhibit the lowest churn (14.24%), as multi-user connectivity creates high household inertia compared to solo accounts (34.24%)."
    }
};

const FEATURE_IMPORTANCES = [
    { name: "Contract_Month-to-month", label: "Contract Type: Month-to-Month", score: 0.5175, pct: "51.75%", category: "Contract", desc: "Absence of long-term commitment allows frictionless monthly attrition." },
    { name: "InternetService_Fiber optic", label: "Internet Service: Fiber Optic", score: 0.1644, pct: "16.44%", category: "Service", desc: "High monthly charges and high bandwidth expectations create vulnerability." },
    { name: "tenure", label: "Customer Tenure (Months)", score: 0.1550, pct: "15.50%", category: "Tenure", desc: "Primary split threshold at 15.5 months distinguishes high vs low risk lifecycle." },
    { name: "MonthlyCharges", label: "Monthly Charges ($ Amount)", score: 0.0385, pct: "3.85%", category: "Billing", desc: "Recurring invoice magnitude directly increases customer price sensitivity." },
    { name: "TotalCharges", label: "Total Lifetime Charges ($)", score: 0.0331, pct: "3.31%", category: "Billing", desc: "Accumulated customer spend reflects cumulative loyalty and usage depth." },
    { name: "PaymentMethod_Electronic check", label: "Payment: Electronic Check", score: 0.0281, pct: "2.81%", category: "Billing", desc: "Manual check friction reinforces active monthly cancellation considerations." },
    { name: "TechSupport_No", label: "Absence of Technical Support", score: 0.0215, pct: "2.15%", category: "Support", desc: "Customers facing unresolved technical hurdles exit at higher rates." },
    { name: "OnlineBackup_No", label: "Absence of Online Backup", score: 0.0093, pct: "0.93%", category: "Add-on", desc: "Fewer active cloud utilities reduces integrated switching barriers." },
    { name: "OnlineSecurity_No", label: "Absence of Online Security", score: 0.0087, pct: "0.87%", category: "Security", desc: "Single-play connectivity users carry lower switching friction." },
    { name: "Contract_One year", label: "Contract Type: One Year", score: 0.0083, pct: "0.83%", category: "Contract", desc: "One-year contracts reduce churn propensity by more than 70%." }
];

const PERSONAS_DATA = [
    {
        id: "A",
        code: "PERSONA-1",
        name: "New Month-to-Month",
        tagline: "High-Risk Early Onboarding Segment",
        badgeColor: "danger",
        riskScore: "Critical Risk (~68% - 82%)",
        cohortShare: "24.6% of Cohort",
        avgMonthly: "$66.40",
        characteristics: [
            "Contract: Month-to-month commitment",
            "Tenure: 1 to 12 months in service",
            "Payment: Commonly Electronic Check",
            "Add-ons: None or minimal support services"
        ],
        painPoints: "High vulnerability to early onboarding friction, lack of switching barriers, unassisted configuration issues, and zero cancellation penalty.",
        indicators: [
            "Month-to-month flexibility with zero lock-in",
            "Low cumulative investment in service relationship",
            "Frequent technical friction during initial 90 days",
            "Manual monthly payment reminds them to reconsider service"
        ],
        recommendedAction: "Establish a 30/60/90-day structured onboarding check-in. Offer a 20% discount on converting to a 1-Year contract, bundled with 3 months of complimentary 24/7 Technical Support and a $10 bill credit for enabling automated card payment.",
        priority: "Immediate Critical Priority"
    },
    {
        id: "B",
        code: "PERSONA-2",
        name: "High-Charge Month-to-Month",
        tagline: "Price-Sensitive Premium Subscriber",
        badgeColor: "warning",
        riskScore: "Elevated Risk (~62% - 74%)",
        cohortShare: "18.3% of Cohort",
        avgMonthly: "$88.90",
        characteristics: [
            "Contract: Month-to-month commitment",
            "Monthly Charges: High ($75.00 to $118.75)",
            "Internet: Fiber Optic + Streaming packages",
            "Tenure: 6 to 24 months"
        ],
        painPoints: "Invoice bill-shock without long-term commitment; high performance expectations where any minor outage prompts consideration of competitors.",
        indicators: [
            "High recurring monthly cost creates active comparison shopping",
            "Subscribed to multiple streaming services without bundled discount",
            "Electronic check payment creates monthly billing frustration",
            "Lack of dedicated technical support when bandwidth drops occur"
        ],
        recommendedAction: "Proactively review account value with customized multi-service bundle pricing. Route support requests to a dedicated VIP resolution queue, and offer a guaranteed 12-month rate-lock upon 1-year contract conversion.",
        priority: "High Strategic Priority"
    },
    {
        id: "C",
        code: "PERSONA-3",
        name: "Loyal Long-Term",
        tagline: "High-LTV Core Brand Advocate",
        badgeColor: "success",
        riskScore: "Minimal Risk (~3% - 8%)",
        cohortShare: "32.4% of Cohort",
        avgMonthly: "$61.20",
        characteristics: [
            "Contract: One-Year or Two-Year commitment",
            "Tenure: Long-term (> 36 to 72 months)",
            "Payment: Automated Bank Transfer or Credit Card",
            "Services: Multiple active add-ons (Security, Backup)"
        ],
        painPoints: "Feeling unappreciated when attractive promotional rates and hardware discounts are marketed exclusively to new customer acquisitions.",
        indicators: [
            "Multi-year contractual commitment and habituated usage",
            "High lifetime total charges accumulated ($3,000+)",
            "Automated payment eliminates recurring billing friction",
            "Deep multi-product integration across household"
        ],
        recommendedAction: "Enroll account in Tenure Milestone Loyalty Rewards, offer complimentary Wi-Fi 6 router hardware upgrades, provide priority customer care access, and offer family plan add-on referral credits.",
        priority: "Retention & LTV Expansion"
    },
    {
        id: "D",
        code: "PERSONA-4",
        name: "Stable / Other",
        tagline: "Balanced Standard Subscriber",
        badgeColor: "info",
        riskScore: "Moderate / Stable (~18% - 25%)",
        cohortShare: "24.7% of Cohort",
        avgMonthly: "$43.50",
        characteristics: [
            "Contract: Mixed (1-Year or long-tenure DSL/Phone)",
            "Monthly Charges: Low to Moderate ($25.00 - $65.00)",
            "Internet: DSL or Landline Phone only",
            "Tenure: 18 to 48 months"
        ],
        painPoints: "Susceptible to competitor fiber rollout campaigns and promotional bundle upgrades if current broadband speeds feel outdated.",
        indicators: [
            "Predictable, low-maintenance customer service interaction",
            "Moderate tenure with stable payment history",
            "Lower total revenue per account compared to fiber users",
            "Potential silent attrition when competitor speeds are advertised"
        ],
        recommendedAction: "Target with cross-sell campaigns for Cyber Security and Cloud Backup suites. Offer free 30-day fiber speed upgrades with a seamless transition to discounted annual broadband plans.",
        priority: "Steady Account Growth"
    }
];

const PRESETS = {
    highRiskNew: {
        name: "🚨 High Risk: New Month-to-Month Fiber Streamer",
        data: {
            gender: "Female",
            SeniorCitizen: "0",
            Partner: "No",
            Dependents: "No",
            tenure: 2,
            PhoneService: "Yes",
            MultipleLines: "No",
            InternetService: "Fiber optic",
            OnlineSecurity: "No",
            OnlineBackup: "No",
            DeviceProtection: "No",
            TechSupport: "No",
            StreamingTV: "Yes",
            StreamingMovies: "Yes",
            Contract: "Month-to-month",
            PaperlessBilling: "Yes",
            PaymentMethod: "Electronic check",
            MonthlyCharges: 89.5,
            TotalCharges: 179.0
        }
    },
    highRiskSenior: {
        name: "⚠️ High Charge Senior (No Tech Support)",
        data: {
            gender: "Male",
            SeniorCitizen: "1",
            Partner: "No",
            Dependents: "No",
            tenure: 6,
            PhoneService: "Yes",
            MultipleLines: "Yes",
            InternetService: "Fiber optic",
            OnlineSecurity: "No",
            OnlineBackup: "No",
            DeviceProtection: "No",
            TechSupport: "No",
            StreamingTV: "Yes",
            StreamingMovies: "No",
            Contract: "Month-to-month",
            PaperlessBilling: "Yes",
            PaymentMethod: "Electronic check",
            MonthlyCharges: 94.8,
            TotalCharges: 568.8
        }
    },
    loyalLongTerm: {
        name: "🛡️ Low Risk: 2-Year Contract Multi-Service Veteran",
        data: {
            gender: "Male",
            SeniorCitizen: "0",
            Partner: "Yes",
            Dependents: "Yes",
            tenure: 62,
            PhoneService: "Yes",
            MultipleLines: "Yes",
            InternetService: "DSL",
            OnlineSecurity: "Yes",
            OnlineBackup: "Yes",
            DeviceProtection: "Yes",
            TechSupport: "Yes",
            StreamingTV: "Yes",
            StreamingMovies: "Yes",
            Contract: "Two year",
            PaperlessBilling: "No",
            PaymentMethod: "Credit card (automatic)",
            MonthlyCharges: 78.5,
            TotalCharges: 4867.0
        }
    },
    moderateStandard: {
        name: "⚖️ Moderate Risk: 1-Year DSL Standard Family",
        data: {
            gender: "Female",
            SeniorCitizen: "0",
            Partner: "Yes",
            Dependents: "No",
            tenure: 28,
            PhoneService: "Yes",
            MultipleLines: "No",
            InternetService: "DSL",
            OnlineSecurity: "Yes",
            OnlineBackup: "No",
            DeviceProtection: "Yes",
            TechSupport: "Yes",
            StreamingTV: "No",
            StreamingMovies: "No",
            Contract: "One year",
            PaperlessBilling: "Yes",
            PaymentMethod: "Bank transfer (automatic)",
            MonthlyCharges: 59.4,
            TotalCharges: 1663.2
        }
    }
};

const BUSINESS_RECOMMENDATIONS = [
    {
        id: 1,
        pillar: "Contract & Pricing Strategy",
        title: "Focus on Month-to-Month Customers",
        icon: "fa-calendar-times",
        priority: "Critical",
        desc: "Month-to-month customers account for 88.5% (1,655 of 1,869) of all churned subscribers. Direct retention budget and automated lifecycle triggers toward this segment."
    },
    {
        id: 2,
        pillar: "Onboarding & Support Experience",
        title: "Improve Early Customer Onboarding",
        icon: "fa-user-clock",
        priority: "Critical",
        desc: "55.5% of churn occurs within Year 1. Establish automated day 7, 30, 60, and 90 touchpoints, broadband speed verification, and dedicated onboarding specialists."
    },
    {
        id: 3,
        pillar: "Contract & Pricing Strategy",
        title: "Encourage Suitable Contract Conversion",
        icon: "fa-file-signature",
        priority: "High",
        desc: "Provide attractive discounts (e.g. 15-20% off for 6 months or 1 month free) when month-to-month subscribers agree to transition to 1-Year or 2-Year plans."
    },
    {
        id: 4,
        pillar: "Contract & Pricing Strategy",
        title: "Review High Monthly Charges",
        icon: "fa-tags",
        priority: "High",
        desc: "Subscribers paying >$85/mo churn at 38.83%. Implement automated bill-shock alerts and offer right-sizing package recommendations before customers seek alternatives."
    },
    {
        id: 5,
        pillar: "Onboarding & Support Experience",
        title: "Increase Technical Support Adoption",
        icon: "fa-headset",
        priority: "High",
        desc: "Having Tech Support lowers churn from 41.64% to 15.17%. Bundle complimentary 90-day tech support with all new Fiber Optic installations."
    },
    {
        id: 6,
        pillar: "Onboarding & Support Experience",
        title: "Increase Online Security Adoption",
        icon: "fa-shield-alt",
        priority: "High",
        desc: "Online Security reduces churn from 41.77% down to 14.61%. Position cybersecurity as a standard default feature or heavily discounted bundled utility."
    },
    {
        id: 7,
        pillar: "Onboarding & Support Experience",
        title: "Investigate Payment Experience Friction",
        icon: "fa-credit-card",
        priority: "Medium",
        desc: "Electronic check users churn at 45.29% compared to 15.24% for automated credit cards. Incentivize auto-pay adoption with a recurring $5 monthly bill credit."
    },
    {
        id: 8,
        pillar: "Personalized Retention Operations",
        title: "Develop Personalized Retention Offers",
        icon: "fa-gift",
        priority: "High",
        desc: "Replace generic retention discounts with persona-matched incentives (e.g. speed boosters for gamers, security packages for seniors, streaming bundles for families)."
    },
    {
        id: 9,
        pillar: "Personalized Retention Operations",
        title: "Improve Customer Feedback Systems",
        icon: "fa-comments-alt",
        priority: "Medium",
        desc: "Deploy real-time CSAT and transactional Net Promoter Score (tNPS) surveys immediately after support tickets and network maintenance events."
    },
    {
        id: 10,
        pillar: "Personalized Retention Operations",
        title: "Create Customer Loyalty Programs",
        icon: "fa-award",
        priority: "Medium",
        desc: "Reward tenure milestones at 12, 24, 36, and 48 months with loyalty tier badges, free hardware refreshes, and referral rewards to reinforce brand advocacy."
    },
    {
        id: 11,
        pillar: "Contract & Pricing Strategy",
        title: "Provide Flexible Pricing Plans",
        icon: "fa-sliders-h",
        priority: "Medium",
        desc: "Offer modular à la carte add-ons, seasonal pause options, and flexible payment scheduling for fixed-income seniors and budget-sensitive households."
    },
    {
        id: 12,
        pillar: "Governance & Continuous Evaluation",
        title: "Monitor High-Risk Customers Proactively",
        icon: "fa-radar",
        priority: "High",
        desc: "Feed real-time operational telemetry into the Decision Tree scoring pipeline to maintain a dynamic high-risk watchlist for prioritized account manager outreach."
    },
    {
        id: 13,
        pillar: "Governance & Continuous Evaluation",
        title: "Use Proactive Retention Strategies",
        icon: "fa-shield-virus",
        priority: "High",
        desc: "Engage customers before they call the cancellation queue by monitoring negative engagement signals, unresolved tickets, and billing discrepancies."
    },
    {
        id: 14,
        pillar: "Governance & Continuous Evaluation",
        title: "Continuously Evaluate Retention Campaigns",
        icon: "fa-chart-line-up",
        priority: "Medium",
        desc: "Track retention campaign performance through randomized control A/B testing to measure incremental lift, cost per saved customer, and true return on retention spend."
    }
];

const METHODOLOGY_STEPS = [
    {
        step: 1,
        title: "Business Understanding",
        icon: "fa-briefcase",
        desc: "Frame customer attrition as a binary classification challenge. Define business KPIs: Customer Lifetime Value (LTV), Customer Acquisition Cost (CAC), and target retention ROI."
    },
    {
        step: 2,
        title: "Data Loading",
        icon: "fa-file-import",
        desc: "Ingest the canonical IBM Telco Customer Churn dataset (7,043 subscriber records across 21 structured demographic, service, and billing attributes)."
    },
    {
        step: 3,
        title: "Data Understanding",
        icon: "fa-search",
        desc: "Inspect feature types (3 numerical, 17 categorical, 1 target), examine distributions, calculate summary statistics, and evaluate baseline churn balance (26.54% Churn)."
    },
    {
        step: 4,
        title: "Data Quality Assessment",
        icon: "fa-check-double",
        desc: "Identify whitespace missing values in TotalCharges (11 records with tenure=0), verify data types, validate value boundaries, and verify zero corrupted entries."
    },
    {
        step: 5,
        title: "Data Preprocessing",
        icon: "fa-broom",
        desc: "Impute missing TotalCharges with MonthlyCharges * tenure, cast types, binary-encode Yes/No flags, and generate one-hot dummy variables for multi-category features."
    },
    {
        step: 6,
        title: "Exploratory Data Analysis",
        icon: "fa-chart-pie",
        desc: "Perform bivariate and cross-tabulation analysis across all 10 core dimensions: Contract, Internet Service, Tenure cohorts, Monthly Charges, Payment, Support, Security, Demographics."
    },
    {
        step: 7,
        title: "Feature Preparation",
        icon: "fa-cogs",
        desc: "Assemble the 30-feature modeling matrix. Perform an 80/20 stratified train-test split (5,634 training / 1,409 test records) to preserve target class proportions."
    },
    {
        step: 8,
        title: "Decision Tree Modelling",
        icon: "fa-sitemap",
        desc: "Train an interpretable DecisionTreeClassifier (criterion='gini', max_depth=5, min_samples_split=25, min_samples_leaf=15) to balance predictive accuracy with white-box transparency."
    },
    {
        step: 9,
        title: "Model Evaluation",
        icon: "fa-bullseye",
        desc: "Evaluate test set performance: Accuracy (79.84%), Precision (63.47%), Recall (56.68%), F1-Score (59.89%), ROC-AUC (0.8281), Confusion Matrix, and ROC Curve."
    },
    {
        step: 10,
        title: "Churn Driver Discovery",
        icon: "fa-key",
        desc: "Extract Gini feature importances. Identify Month-to-Month Contract (51.75%), Fiber Optic (16.44%), Tenure (15.50%), and Monthly Charges (3.85%) as primary drivers."
    },
    {
        step: 11,
        title: "Persona Profiling",
        icon: "fa-users",
        desc: "Synthesize empirical tree rules into 4 actionable customer personas: New Month-to-Month, High-Charge Month-to-Month, Loyal Long-Term, and Stable Standard."
    },
    {
        step: 12,
        title: "Business Recommendations",
        icon: "fa-lightbulb",
        desc: "Formulate 14 actionable retention strategies across Onboarding, Pricing, Contract Conversion, Service Bundling, and Continuous A/B Campaign Governance."
    }
];

const DATASET_SAMPLE_RECORDS = [
    { customerID: "7590-VHVEG", gender: "Female", SeniorCitizen: 0, Partner: "Yes", Dependents: "No", tenure: 1, PhoneService: "No", MultipleLines: "No phone service", InternetService: "DSL", OnlineSecurity: "No", OnlineBackup: "Yes", DeviceProtection: "No", TechSupport: "No", StreamingTV: "No", StreamingMovies: "No", Contract: "Month-to-month", PaperlessBilling: "Yes", PaymentMethod: "Electronic check", MonthlyCharges: 29.85, TotalCharges: 29.85, Churn: "No" },
    { customerID: "5575-GNVDE", gender: "Male", SeniorCitizen: 0, Partner: "No", Dependents: "No", tenure: 34, PhoneService: "Yes", MultipleLines: "No", InternetService: "DSL", OnlineSecurity: "Yes", OnlineBackup: "No", DeviceProtection: "Yes", TechSupport: "No", StreamingTV: "No", StreamingMovies: "No", Contract: "One year", PaperlessBilling: "No", PaymentMethod: "Mailed check", MonthlyCharges: 56.95, TotalCharges: 1889.50, Churn: "No" },
    { customerID: "3668-QPYBK", gender: "Male", SeniorCitizen: 0, Partner: "No", Dependents: "No", tenure: 2, PhoneService: "Yes", MultipleLines: "No", InternetService: "DSL", OnlineSecurity: "Yes", OnlineBackup: "Yes", DeviceProtection: "No", TechSupport: "No", StreamingTV: "No", StreamingMovies: "No", Contract: "Month-to-month", PaperlessBilling: "Yes", PaymentMethod: "Mailed check", MonthlyCharges: 53.85, TotalCharges: 108.15, Churn: "Yes" },
    { customerID: "7795-CFOCW", gender: "Male", SeniorCitizen: 0, Partner: "No", Dependents: "No", tenure: 45, PhoneService: "No", MultipleLines: "No phone service", InternetService: "DSL", OnlineSecurity: "Yes", OnlineBackup: "No", DeviceProtection: "Yes", TechSupport: "Yes", StreamingTV: "No", StreamingMovies: "No", Contract: "One year", PaperlessBilling: "No", PaymentMethod: "Bank transfer (automatic)", MonthlyCharges: 42.30, TotalCharges: 1840.75, Churn: "No" },
    { customerID: "9237-HQITU", gender: "Female", SeniorCitizen: 0, Partner: "No", Dependents: "No", tenure: 2, PhoneService: "Yes", MultipleLines: "No", InternetService: "Fiber optic", OnlineSecurity: "No", OnlineBackup: "No", DeviceProtection: "No", TechSupport: "No", StreamingTV: "No", StreamingMovies: "No", Contract: "Month-to-month", PaperlessBilling: "Yes", PaymentMethod: "Electronic check", MonthlyCharges: 70.70, TotalCharges: 151.65, Churn: "Yes" },
    { customerID: "9305-CDSKC", gender: "Female", SeniorCitizen: 0, Partner: "No", Dependents: "No", tenure: 8, PhoneService: "Yes", MultipleLines: "Yes", InternetService: "Fiber optic", OnlineSecurity: "No", OnlineBackup: "No", DeviceProtection: "Yes", TechSupport: "No", StreamingTV: "Yes", StreamingMovies: "Yes", Contract: "Month-to-month", PaperlessBilling: "Yes", PaymentMethod: "Electronic check", MonthlyCharges: 99.65, TotalCharges: 820.50, Churn: "Yes" },
    { customerID: "1452-KIOVK", gender: "Male", SeniorCitizen: 0, Partner: "No", Dependents: "Yes", tenure: 22, PhoneService: "Yes", MultipleLines: "Yes", InternetService: "Fiber optic", OnlineSecurity: "No", OnlineBackup: "Yes", DeviceProtection: "No", TechSupport: "No", StreamingTV: "Yes", StreamingMovies: "No", Contract: "Month-to-month", PaperlessBilling: "Yes", PaymentMethod: "Credit card (automatic)", MonthlyCharges: 89.10, TotalCharges: 1949.40, Churn: "No" },
    { customerID: "6713-OKOMC", gender: "Female", SeniorCitizen: 0, Partner: "No", Dependents: "No", tenure: 10, PhoneService: "No", MultipleLines: "No phone service", InternetService: "DSL", OnlineSecurity: "Yes", OnlineBackup: "No", DeviceProtection: "No", TechSupport: "No", StreamingTV: "No", StreamingMovies: "No", Contract: "Month-to-month", PaperlessBilling: "No", PaymentMethod: "Mailed check", MonthlyCharges: 29.75, TotalCharges: 301.90, Churn: "No" },
    { customerID: "7892-POOKP", gender: "Female", SeniorCitizen: 0, Partner: "Yes", Dependents: "No", tenure: 28, PhoneService: "Yes", MultipleLines: "Yes", InternetService: "Fiber optic", OnlineSecurity: "No", OnlineBackup: "No", DeviceProtection: "Yes", TechSupport: "Yes", StreamingTV: "Yes", StreamingMovies: "Yes", Contract: "Month-to-month", PaperlessBilling: "Yes", PaymentMethod: "Electronic check", MonthlyCharges: 104.80, TotalCharges: 3046.05, Churn: "Yes" },
    { customerID: "6388-TABGU", gender: "Male", SeniorCitizen: 0, Partner: "No", Dependents: "Yes", tenure: 62, PhoneService: "Yes", MultipleLines: "No", InternetService: "DSL", OnlineSecurity: "Yes", OnlineBackup: "Yes", DeviceProtection: "No", TechSupport: "No", StreamingTV: "No", StreamingMovies: "No", Contract: "One year", PaperlessBilling: "No", PaymentMethod: "Bank transfer (automatic)", MonthlyCharges: 56.15, TotalCharges: 3487.95, Churn: "No" }
];
