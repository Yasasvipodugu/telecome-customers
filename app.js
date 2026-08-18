// Master Application Controller & UI Event Orchestration
// Telecom Churn Driver Discovery & Persona Profiler

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

const App = {
    currentSection: 'home',
    datasetPage: 1,
    datasetPageSize: 8,
    datasetFiltered: [...DATASET_SAMPLE_RECORDS],

    init() {
        this.setupNavigation();
        this.setupPredictor();
        this.setupPersonaSandbox();
        this.setupRiskDashboard();
        this.setupDatasetExplorer();
        this.setupMethodology();
        this.setupDecisionTreeRules();
        this.setupRecommendations();

        // Initialize visualizations
        setTimeout(() => {
            ChartsManager.initAll();
            this.runCohortFilter();
        }, 150);
    },

    // Navigation & Mobile Drawer
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link, .quick-cta');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('data-target');
                if (targetId) {
                    this.navigateTo(targetId);
                }
            });
        });

        const mobileMenuBtn = document.getElementById('btn-mobile-menu');
        const sidebar = document.querySelector('.app-sidebar');
        if (mobileMenuBtn && sidebar) {
            mobileMenuBtn.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }
    },

    navigateTo(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('data-target') === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Close mobile sidebar if open
        const sidebar = document.querySelector('.app-sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }

        // Smooth scroll to target
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.currentSection = sectionId;
    },

    // Customer Churn Predictor Form
    setupPredictor() {
        const form = document.getElementById('churn-predictor-form');
        const resetBtn = document.getElementById('btn-reset-form');
        const presetBtns = document.querySelectorAll('.preset-btn');
        const tenureSlider = document.getElementById('input-tenure');
        const tenureVal = document.getElementById('val-tenure');
        const monthlySlider = document.getElementById('input-monthly');
        const monthlyVal = document.getElementById('val-monthly');

        // Dynamic slider value display
        if (tenureSlider && tenureVal) {
            tenureSlider.addEventListener('input', () => {
                tenureVal.textContent = `${tenureSlider.value} mo`;
                this.updateTotalChargesEstimate();
            });
        }

        if (monthlySlider && monthlyVal) {
            monthlySlider.addEventListener('input', () => {
                monthlyVal.textContent = `$${parseFloat(monthlySlider.value).toFixed(2)}`;
                this.updateTotalChargesEstimate();
            });
        }

        // Preset Loaders
        presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const presetKey = btn.getAttribute('data-preset');
                if (PRESETS[presetKey]) {
                    this.loadPreset(PRESETS[presetKey].data);
                }
            });
        });

        // Form Submit Handler
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handlePrediction();
            });
        }

        // Reset Handler
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                form.reset();
                if (tenureSlider) tenureSlider.value = 12;
                if (tenureVal) tenureVal.textContent = '12 mo';
                if (monthlySlider) monthlySlider.value = 65;
                if (monthlyVal) monthlyVal.textContent = '$65.00';
                this.updateTotalChargesEstimate();
                document.getElementById('prediction-results-card').classList.add('hidden');
            });
        }
    },

    updateTotalChargesEstimate() {
        const tenure = parseFloat(document.getElementById('input-tenure')?.value || 12);
        const monthly = parseFloat(document.getElementById('input-monthly')?.value || 65);
        const totalInput = document.getElementById('input-total');
        if (totalInput) {
            totalInput.value = (tenure * monthly).toFixed(2);
        }
    },

    loadPreset(data) {
        Object.keys(data).forEach(key => {
            const el = document.getElementById(`input-${key.toLowerCase()}`);
            if (el) {
                el.value = data[key];
            }
        });

        // Update displayed sliders
        const tenureEl = document.getElementById('input-tenure');
        const monthlyEl = document.getElementById('input-monthly');
        if (tenureEl) {
            tenureEl.value = data.tenure;
            document.getElementById('val-tenure').textContent = `${data.tenure} mo`;
        }
        if (monthlyEl) {
            monthlyEl.value = data.MonthlyCharges;
            document.getElementById('val-monthly').textContent = `$${parseFloat(data.MonthlyCharges).toFixed(2)}`;
        }
        if (data.TotalCharges) {
            const totalEl = document.getElementById('input-total');
            if (totalEl) totalEl.value = data.TotalCharges;
        }

        // Auto trigger prediction
        this.handlePrediction();
    },

    async handlePrediction() {
        const formData = this.getFormData();
        const submitBtn = document.getElementById('btn-submit-prediction');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Evaluating Model...';
        }

        let result = null;

        // Try backend Flask API first, fallback to client DecisionTreeEngine
        try {
            const response = await fetch('/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                const apiData = await response.json();
                result = {
                    prediction: apiData.prediction,
                    probability: apiData.probability,
                    probabilityPct: apiData.probability_percentage,
                    riskLevel: apiData.risk_level.toUpperCase(),
                    riskColor: apiData.risk_level === 'High' ? 'var(--danger)' : (apiData.risk_level === 'Medium' ? 'var(--warning)' : 'var(--success)'),
                    riskBadge: apiData.risk_level === 'High' ? 'badge-danger' : (apiData.risk_level === 'Medium' ? 'badge-warning' : 'badge-success'),
                    drivers: apiData.main_risk_indicators.map((ind, i) => ({
                        factor: typeof ind === 'object' ? ind.factor : `Key Driver #${i+1}`,
                        impact: typeof ind === 'object' ? ind.impact : "Primary Risk Contributor",
                        description: typeof ind === 'object' ? ind.description : ind,
                        severity: i === 0 ? 'high' : 'medium',
                        icon: 'fa-exclamation-triangle'
                    })),
                    persona: apiData.persona,
                    recommendation: apiData.recommended_action
                };
            }
        } catch (e) {
            // Standalone client fallback
            result = null;
        }

        if (!result) {
            result = DecisionTreeEngine.predict(formData);
        }

        this.renderPredictionResult(result);

        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-bolt"></i> Predict Churn Risk';
        }
    },

    getFormData() {
        return {
            gender: document.getElementById('input-gender')?.value || 'Female',
            SeniorCitizen: parseInt(document.getElementById('input-seniorcitizen')?.value || 0),
            Partner: document.getElementById('input-partner')?.value || 'No',
            Dependents: document.getElementById('input-dependents')?.value || 'No',
            tenure: parseFloat(document.getElementById('input-tenure')?.value || 12),
            PhoneService: document.getElementById('input-phoneservice')?.value || 'Yes',
            MultipleLines: document.getElementById('input-multiplelines')?.value || 'No',
            InternetService: document.getElementById('input-internetservice')?.value || 'Fiber optic',
            OnlineSecurity: document.getElementById('input-onlinesecurity')?.value || 'No',
            OnlineBackup: document.getElementById('input-onlinebackup')?.value || 'No',
            DeviceProtection: document.getElementById('input-deviceprotection')?.value || 'No',
            TechSupport: document.getElementById('input-techsupport')?.value || 'No',
            StreamingTV: document.getElementById('input-streamingtv')?.value || 'No',
            StreamingMovies: document.getElementById('input-streamingmovies')?.value || 'No',
            Contract: document.getElementById('input-contract')?.value || 'Month-to-month',
            PaperlessBilling: document.getElementById('input-paperlessbilling')?.value || 'Yes',
            PaymentMethod: document.getElementById('input-paymentmethod')?.value || 'Electronic check',
            MonthlyCharges: parseFloat(document.getElementById('input-monthly')?.value || 65),
            TotalCharges: parseFloat(document.getElementById('input-total')?.value || 780)
        };
    },

    renderPredictionResult(res) {
        const resultsCard = document.getElementById('prediction-results-card');
        if (!resultsCard) return;

        resultsCard.classList.remove('hidden');

        // Update Verdict & Badge
        const verdictEl = document.getElementById('res-verdict');
        const probMeter = document.getElementById('res-prob-meter');
        const probText = document.getElementById('res-prob-text');
        const riskBadge = document.getElementById('res-risk-badge');
        const personaBadge = document.getElementById('res-persona-badge');
        const personaDesc = document.getElementById('res-persona-desc');
        const driversList = document.getElementById('res-drivers-list');
        const recText = document.getElementById('res-recommendation');

        if (verdictEl) {
            verdictEl.textContent = res.prediction === 'YES' ? 'CHURN RISK: LIKELY TO CANCEL' : 'RETENTION: LIKELY TO STAY';
            verdictEl.style.color = res.riskColor;
        }

        if (probMeter) {
            probMeter.style.width = res.probabilityPct;
            probMeter.style.backgroundColor = res.riskColor;
        }

        if (probText) {
            probText.textContent = `${res.probabilityPct} Attrition Probability`;
        }

        if (riskBadge) {
            riskBadge.className = `status-badge ${res.riskBadge}`;
            riskBadge.textContent = `${res.riskLevel} RISK`;
        }

        if (personaBadge) {
            personaBadge.textContent = res.persona?.name || 'Persona Profile';
        }

        if (personaDesc) {
            personaDesc.textContent = res.persona?.tagline || res.persona?.characteristics || '';
        }

        if (driversList) {
            driversList.innerHTML = '';
            res.drivers.forEach(d => {
                const li = document.createElement('div');
                li.className = 'driver-item';
                li.innerHTML = `
                    <div class="driver-icon ${d.severity}"><i class="fas ${d.icon || 'fa-info-circle'}"></i></div>
                    <div class="driver-content">
                        <div class="driver-name">${d.factor} <span class="driver-impact">${d.impact}</span></div>
                        <div class="driver-desc">${d.description}</div>
                    </div>
                `;
                driversList.appendChild(li);
            });
        }

        if (recText) {
            recText.textContent = res.recommendation;
        }

        // Scroll into view
        resultsCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    },

    // Persona Profiler Interactive Sandbox
    setupPersonaSandbox() {
        const personaCards = document.querySelectorAll('.persona-card');
        personaCards.forEach(card => {
            const btnLoad = card.querySelector('.btn-test-persona');
            if (btnLoad) {
                btnLoad.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const pid = card.getAttribute('data-persona-id');
                    let presetKey = 'highRiskNew';
                    if (pid === 'A') presetKey = 'highRiskNew';
                    else if (pid === 'B') presetKey = 'highRiskSenior';
                    else if (pid === 'C') presetKey = 'loyalLongTerm';
                    else if (pid === 'D') presetKey = 'moderateStandard';

                    this.navigateTo('predictor');
                    if (PRESETS[presetKey]) {
                        this.loadPreset(PRESETS[presetKey].data);
                    }
                });
            }
        });
    },

    // Interactive Churn Risk Dashboard Filters
    setupRiskDashboard() {
        const filterContract = document.getElementById('filter-contract');
        const filterInternet = document.getElementById('filter-internet');
        const filterPayment = document.getElementById('filter-payment');
        const filterTenureMax = document.getElementById('filter-tenure-max');
        const filterTenureVal = document.getElementById('val-filter-tenure');
        const filterChargeMax = document.getElementById('filter-charge-max');
        const filterChargeVal = document.getElementById('val-filter-charge');
        const resetFilterBtn = document.getElementById('btn-reset-filters');

        const triggerUpdate = () => this.runCohortFilter();

        if (filterContract) filterContract.addEventListener('change', triggerUpdate);
        if (filterInternet) filterInternet.addEventListener('change', triggerUpdate);
        if (filterPayment) filterPayment.addEventListener('change', triggerUpdate);

        if (filterTenureMax && filterTenureVal) {
            filterTenureMax.addEventListener('input', () => {
                filterTenureVal.textContent = `0 - ${filterTenureMax.value} mo`;
                triggerUpdate();
            });
        }

        if (filterChargeMax && filterChargeVal) {
            filterChargeMax.addEventListener('input', () => {
                filterChargeVal.textContent = `$0 - $${filterChargeMax.value}`;
                triggerUpdate();
            });
        }

        if (resetFilterBtn) {
            resetFilterBtn.addEventListener('click', () => {
                if (filterContract) filterContract.value = 'All';
                if (filterInternet) filterInternet.value = 'All';
                if (filterPayment) filterPayment.value = 'All';
                if (filterTenureMax) filterTenureMax.value = 72;
                if (filterTenureVal) filterTenureVal.textContent = '0 - 72 mo';
                if (filterChargeMax) filterChargeMax.value = 120;
                if (filterChargeVal) filterChargeVal.textContent = '$0 - $120';
                triggerUpdate();
            });
        }
    },

    async runCohortFilter() {
        const contract = document.getElementById('filter-contract')?.value || 'All';
        const internet = document.getElementById('filter-internet')?.value || 'All';
        const payment = document.getElementById('filter-payment')?.value || 'All';
        const tenureMax = parseFloat(document.getElementById('filter-tenure-max')?.value || 72);
        const chargeMax = parseFloat(document.getElementById('filter-charge-max')?.value || 120);

        let data = null;

        // Try API
        try {
            const resp = await fetch('/api/cohorts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contract,
                    internet,
                    payment,
                    tenure_min: 0,
                    tenure_max: tenureMax,
                    charge_min: 0,
                    charge_max: chargeMax
                })
            });
            if (resp.ok) {
                data = await resp.json();
            }
        } catch (e) {
            data = null;
        }

        if (!data) {
            // Client-side fallback calculation from baseline stats
            let estimatedCount = 7043;
            let estimatedChurn = 1869;

            if (contract === 'Month-to-month') { estimatedCount *= 0.55; estimatedChurn = estimatedCount * 0.427; }
            else if (contract === 'One year') { estimatedCount *= 0.21; estimatedChurn = estimatedCount * 0.113; }
            else if (contract === 'Two year') { estimatedCount *= 0.24; estimatedChurn = estimatedCount * 0.028; }

            if (internet === 'Fiber optic') { estimatedCount *= 0.44; estimatedChurn = estimatedCount * 0.419; }
            else if (internet === 'DSL') { estimatedCount *= 0.34; estimatedChurn = estimatedCount * 0.190; }

            if (tenureMax < 24) { estimatedChurn = estimatedCount * 0.47; }
            
            estimatedCount = Math.max(Math.round(estimatedCount), 10);
            estimatedChurn = Math.min(Math.max(Math.round(estimatedChurn), 0), estimatedCount);

            const churnRate = roundVal((estimatedChurn / estimatedCount) * 100, 1);
            const highR = Math.round(estimatedCount * (churnRate > 35 ? 0.6 : 0.2));
            const lowR = Math.round(estimatedCount * (churnRate < 15 ? 0.7 : 0.2));
            const medR = Math.max(0, estimatedCount - highR - lowR);

            data = {
                count: estimatedCount,
                churn_count: estimatedChurn,
                churn_rate: churnRate,
                avg_monthly_charges: chargeMax * 0.65,
                avg_tenure: tenureMax * 0.45,
                risk_distribution: { High: highR, Medium: medR, Low: lowR },
                samples: DATASET_SAMPLE_RECORDS
            };
        }

        this.renderCohortMetrics(data);
    },

    renderCohortMetrics(d) {
        const countEl = document.getElementById('cohort-count');
        const churnRateEl = document.getElementById('cohort-churn-rate');
        const highRiskEl = document.getElementById('cohort-high-risk');
        const medRiskEl = document.getElementById('cohort-med-risk');
        const lowRiskEl = document.getElementById('cohort-low-risk');

        if (countEl) countEl.textContent = d.count.toLocaleString();
        if (churnRateEl) churnRateEl.textContent = `${d.churn_rate}%`;
        if (highRiskEl) highRiskEl.textContent = (d.risk_distribution?.High || 0).toLocaleString();
        if (medRiskEl) medRiskEl.textContent = (d.risk_distribution?.Medium || 0).toLocaleString();
        if (lowRiskEl) lowRiskEl.textContent = (d.risk_distribution?.Low || 0).toLocaleString();

        ChartsManager.updateCohortCharts(d);
        this.renderCohortTable(d.samples || DATASET_SAMPLE_RECORDS);
    },

    renderCohortTable(records) {
        const tbody = document.getElementById('cohort-table-body');
        if (!tbody) return;

        tbody.innerHTML = '';
        records.forEach(r => {
            const tr = document.createElement('tr');
            const isChurn = r.Churn === 'Yes';
            tr.innerHTML = `
                <td class="mono">${r.customerID}</td>
                <td>${r.gender}</td>
                <td>${r.SeniorCitizen ? 'Yes' : 'No'}</td>
                <td>${r.tenure} mo</td>
                <td><span class="pill-badge">${r.Contract}</span></td>
                <td>${r.InternetService}</td>
                <td>${r.PaymentMethod}</td>
                <td class="mono">$${typeof r.MonthlyCharges === 'number' ? r.MonthlyCharges.toFixed(2) : r.MonthlyCharges}</td>
                <td><span class="status-badge ${isChurn ? 'badge-danger' : 'badge-success'}">${isChurn ? 'CHURNED' : 'RETAINED'}</span></td>
            `;
            tbody.appendChild(tr);
        });
    },

    // Dataset Overview Table Explorer
    setupDatasetExplorer() {
        const searchInput = document.getElementById('dataset-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                if (!query) {
                    this.datasetFiltered = [...DATASET_SAMPLE_RECORDS];
                } else {
                    this.datasetFiltered = DATASET_SAMPLE_RECORDS.filter(r => 
                        r.customerID.toLowerCase().includes(query) ||
                        r.Contract.toLowerCase().includes(query) ||
                        r.InternetService.toLowerCase().includes(query) ||
                        r.PaymentMethod.toLowerCase().includes(query)
                    );
                }
                this.datasetPage = 1;
                this.renderDatasetExplorerTable();
            });
        }
        this.renderDatasetExplorerTable();
    },

    renderDatasetExplorerTable() {
        const tbody = document.getElementById('dataset-explorer-body');
        if (!tbody) return;

        tbody.innerHTML = '';
        const start = (this.datasetPage - 1) * this.datasetPageSize;
        const pageItems = this.datasetFiltered.slice(start, start + this.datasetPageSize);

        pageItems.forEach(r => {
            const tr = document.createElement('tr');
            const isChurn = r.Churn === 'Yes';
            tr.innerHTML = `
                <td class="mono">${r.customerID}</td>
                <td>${r.gender}</td>
                <td>${r.SeniorCitizen ? 'Senior' : 'General'}</td>
                <td>${r.tenure} mo</td>
                <td>${r.PhoneService}</td>
                <td>${r.InternetService}</td>
                <td>${r.OnlineSecurity}</td>
                <td>${r.TechSupport}</td>
                <td><span class="pill-badge">${r.Contract}</span></td>
                <td>${r.PaymentMethod}</td>
                <td class="mono">$${typeof r.MonthlyCharges === 'number' ? r.MonthlyCharges.toFixed(2) : r.MonthlyCharges}</td>
                <td><span class="status-badge ${isChurn ? 'badge-danger' : 'badge-success'}">${isChurn ? 'CHURNED' : 'RETAINED'}</span></td>
            `;
            tbody.appendChild(tr);
        });
    },

    // Methodology 12-Step Accordion / Cards
    setupMethodology() {
        const container = document.getElementById('methodology-timeline');
        if (!container) return;

        container.innerHTML = '';
        METHODOLOGY_STEPS.forEach(s => {
            const card = document.createElement('div');
            card.className = 'methodology-card';
            card.innerHTML = `
                <div class="step-badge">Step ${s.step}</div>
                <div class="step-icon"><i class="fas ${s.icon}"></i></div>
                <h4 class="step-title">${s.title}</h4>
                <p class="step-desc">${s.desc}</p>
            `;
            container.appendChild(card);
        });
    },

    // Decision Tree Rules Explorer
    setupDecisionTreeRules() {
        const rulesContainer = document.getElementById('tree-rules-list');
        const filterInput = document.getElementById('rules-filter-input');
        if (!rulesContainer) return;

        const rules = [
            { id: 1, rule: "IF Contract = 'Month-to-month' AND tenure <= 15.5 AND InternetService = 'Fiber optic'", risk: "High Churn Risk (71.2%)", badge: "badge-danger", count: 914 },
            { id: 2, rule: "IF Contract = 'Month-to-month' AND tenure <= 15.5 AND InternetService != 'Fiber optic' AND MonthlyCharges > 68.3", risk: "Elevated Risk (54.6%)", badge: "badge-warning", count: 420 },
            { id: 3, rule: "IF Contract = 'Month-to-month' AND tenure > 15.5 AND MonthlyCharges > 89.2 AND TechSupport = 'No'", risk: "Moderate-High Risk (46.8%)", badge: "badge-warning", count: 532 },
            { id: 4, rule: "IF Contract = 'Month-to-month' AND tenure > 15.5 AND MonthlyCharges <= 89.2", risk: "Moderate Risk (28.4%)", badge: "badge-info", count: 1210 },
            { id: 5, rule: "IF Contract in ('One year', 'Two year') AND tenure <= 24 AND MonthlyCharges > 85", risk: "Low-Moderate Risk (14.2%)", badge: "badge-info", count: 480 },
            { id: 6, rule: "IF Contract in ('One year', 'Two year') AND tenure > 24 AND TechSupport = 'Yes'", risk: "Minimal Risk (2.8%)", badge: "badge-success", count: 2180 },
            { id: 7, rule: "IF InternetService = 'No Internet Service' AND Contract in ('One year', 'Two year')", risk: "Negligible Risk (1.9%)", badge: "badge-success", count: 1307 }
        ];

        const renderRules = (items) => {
            rulesContainer.innerHTML = '';
            items.forEach(r => {
                const item = document.createElement('div');
                item.className = 'tree-rule-item';
                item.innerHTML = `
                    <div class="rule-code mono">${r.rule}</div>
                    <div class="rule-outcome">
                        <span class="status-badge ${r.badge}">${r.risk}</span>
                        <span class="rule-samples">Cohort Size: ${r.count} subscribers</span>
                    </div>
                `;
                rulesContainer.appendChild(item);
            });
        };

        renderRules(rules);

        if (filterInput) {
            filterInput.addEventListener('input', (e) => {
                const q = e.target.value.toLowerCase().trim();
                if (!q) {
                    renderRules(rules);
                } else {
                    renderRules(rules.filter(r => r.rule.toLowerCase().includes(q) || r.risk.toLowerCase().includes(q)));
                }
            });
        }
    },

    // Business Recommendations Filter
    setupRecommendations() {
        const grid = document.getElementById('recommendations-grid');
        const filterBtns = document.querySelectorAll('.rec-filter-btn');
        if (!grid) return;

        const render = (pillar) => {
            grid.innerHTML = '';
            const filtered = pillar === 'All' 
                ? BUSINESS_RECOMMENDATIONS 
                : BUSINESS_RECOMMENDATIONS.filter(r => r.pillar === pillar);

            filtered.forEach(rec => {
                const card = document.createElement('div');
                card.className = 'rec-card';
                card.innerHTML = `
                    <div class="rec-header">
                        <div class="rec-icon"><i class="fas ${rec.icon}"></i></div>
                        <span class="status-badge ${rec.priority === 'Critical' ? 'badge-danger' : (rec.priority === 'High' ? 'badge-warning' : 'badge-info')}">${rec.priority} Priority</span>
                    </div>
                    <div class="rec-pillar">${rec.pillar}</div>
                    <h4 class="rec-title">${rec.id}. ${rec.title}</h4>
                    <p class="rec-desc">${rec.desc}</p>
                `;
                grid.appendChild(card);
            });
        };

        render('All');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                render(btn.getAttribute('data-pillar'));
            });
        });
    }
};

function roundVal(val, decimals = 2) {
    return Number(Math.round(val + 'e' + decimals) + 'e-' + decimals);
}
