// Chart.js Visualization Registry & Manager
// Telecom Churn Driver Discovery & Persona Profiler

const ChartTheme = {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    textColor: '#94a3b8',
    headingColor: '#f1f5f9',
    gridColor: 'rgba(148, 163, 184, 0.08)',
    primary: '#0284c7',
    primaryLight: '#38bdf8',
    danger: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    purple: '#8b5cf6',
    cyan: '#06b6d4',
    slate: '#64748b'
};

const ChartsManager = {
    instances: {},

    destroyAll() {
        Object.keys(this.instances).forEach(key => {
            if (this.instances[key]) {
                this.instances[key].destroy();
                delete this.instances[key];
            }
        });
    },

    initAll() {
        this.initDistributionChart();
        this.initContractChart();
        this.initInternetChart();
        this.initTenureChart();
        this.initMonthlyChargesChart();
        this.initPaymentChart();
        this.initTechSupportChart();
        this.initSecurityChart();
        this.initSeniorChart();
        this.initFamilyChart();
        this.initFeatureImportanceChart();
        this.initRocChart();
        this.initDepthTuningChart();
    },

    initDistributionChart() {
        const ctx = document.getElementById('chart-distribution');
        if (!ctx) return;
        if (this.instances['distribution']) this.instances['distribution'].destroy();

        this.instances['distribution'] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Retained (73.5%)', 'Churned (26.5%)'],
                datasets: [{
                    data: [5174, 1869],
                    backgroundColor: ['#0284c7', '#ef4444'],
                    borderWidth: 2,
                    borderColor: '#0f172a',
                    hoverOffset: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: ChartTheme.textColor, font: { family: ChartTheme.fontFamily, size: 12 } }
                    },
                    tooltip: {
                        callbacks: {
                            label: (item) => ` ${item.label}: ${item.raw.toLocaleString()} subscribers (${((item.raw/7043)*100).toFixed(2)}%)`
                        }
                    }
                },
                cutout: '68%'
            }
        });
    },

    initContractChart() {
        const ctx = document.getElementById('chart-contract');
        if (!ctx) return;
        if (this.instances['contract']) this.instances['contract'].destroy();

        this.instances['contract'] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Month-to-Month', 'One Year', 'Two Year'],
                datasets: [
                    {
                        label: 'Churn Rate (%)',
                        data: [42.71, 11.27, 2.83],
                        backgroundColor: '#ef4444',
                        borderRadius: 6
                    },
                    {
                        label: 'Retention Rate (%)',
                        data: [57.29, 88.73, 97.17],
                        backgroundColor: '#0284c7',
                        borderRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: { color: ChartTheme.textColor, callback: v => v + '%' },
                        grid: { color: ChartTheme.gridColor }
                    },
                    x: { ticks: { color: ChartTheme.textColor }, grid: { display: false } }
                },
                plugins: {
                    legend: { labels: { color: ChartTheme.textColor, font: { family: ChartTheme.fontFamily } } },
                    tooltip: {
                        callbacks: {
                            label: (item) => ` ${item.dataset.label}: ${item.raw}%`
                        }
                    }
                }
            }
        });
    },

    initInternetChart() {
        const ctx = document.getElementById('chart-internet');
        if (!ctx) return;
        if (this.instances['internet']) this.instances['internet'].destroy();

        this.instances['internet'] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Fiber Optic', 'DSL', 'No Internet Service'],
                datasets: [
                    {
                        label: 'Churn Rate (%)',
                        data: [41.89, 18.96, 7.40],
                        backgroundColor: '#f97316',
                        borderRadius: 6
                    },
                    {
                        label: 'Retention Rate (%)',
                        data: [58.11, 81.04, 92.60],
                        backgroundColor: '#10b981',
                        borderRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 100, ticks: { color: ChartTheme.textColor, callback: v => v + '%' }, grid: { color: ChartTheme.gridColor } },
                    x: { ticks: { color: ChartTheme.textColor }, grid: { display: false } }
                },
                plugins: { legend: { labels: { color: ChartTheme.textColor } } }
            }
        });
    },

    initTenureChart() {
        const ctx = document.getElementById('chart-tenure');
        if (!ctx) return;
        if (this.instances['tenure']) this.instances['tenure'].destroy();

        this.instances['tenure'] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['0-12 Mo', '13-24 Mo', '25-36 Mo', '37-48 Mo', '49-60 Mo', '61-72 Mo'],
                datasets: [
                    {
                        label: 'Churn Rate (%)',
                        data: [47.44, 28.70, 22.42, 16.78, 13.82, 6.61],
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.15)',
                        fill: true,
                        tension: 0.35,
                        pointRadius: 5,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Retained Subscribers',
                        data: [1149, 730, 623, 719, 717, 1386],
                        borderColor: '#0284c7',
                        backgroundColor: 'transparent',
                        borderDash: [4, 4],
                        tension: 0.3,
                        pointRadius: 4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 60,
                        ticks: { color: '#ef4444', callback: v => v + '%' },
                        grid: { color: ChartTheme.gridColor },
                        title: { display: true, text: 'Churn Rate (%)', color: '#ef4444' }
                    },
                    y1: {
                        beginAtZero: true,
                        position: 'right',
                        ticks: { color: '#0284c7' },
                        grid: { display: false },
                        title: { display: true, text: 'Retained Volume (Count)', color: '#0284c7' }
                    },
                    x: { ticks: { color: ChartTheme.textColor }, grid: { display: false } }
                },
                plugins: { legend: { labels: { color: ChartTheme.textColor } } }
            }
        });
    },

    initMonthlyChargesChart() {
        const ctx = document.getElementById('chart-monthly-charges');
        if (!ctx) return;
        if (this.instances['monthly']) this.instances['monthly'].destroy();

        this.instances['monthly'] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['<$35 (Basic)', '$35 - $65 (Mid)', '$65 - $85 (High)', '>$85 (Premium)'],
                datasets: [{
                    label: 'Churn Rate (%)',
                    data: [10.82, 24.31, 36.48, 38.83],
                    backgroundColor: ['#10b981', '#38bdf8', '#f59e0b', '#ef4444'],
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 50, ticks: { color: ChartTheme.textColor, callback: v => v + '%' }, grid: { color: ChartTheme.gridColor } },
                    x: { ticks: { color: ChartTheme.textColor }, grid: { display: false } }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: (i) => ` Churn Rate: ${i.raw}%` } }
                }
            }
        });
    },

    initPaymentChart() {
        const ctx = document.getElementById('chart-payment');
        if (!ctx) return;
        if (this.instances['payment']) this.instances['payment'].destroy();

        this.instances['payment'] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Electronic Check', 'Mailed Check', 'Bank Transfer (Auto)', 'Credit Card (Auto)'],
                datasets: [{
                    label: 'Churn Rate (%)',
                    data: [45.29, 19.11, 16.71, 15.24],
                    backgroundColor: ['#ef4444', '#f97316', '#0284c7', '#10b981'],
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { beginAtZero: true, max: 60, ticks: { color: ChartTheme.textColor, callback: v => v + '%' }, grid: { color: ChartTheme.gridColor } },
                    y: { ticks: { color: ChartTheme.textColor }, grid: { display: false } }
                },
                plugins: { legend: { display: false } }
            }
        });
    },

    initTechSupportChart() {
        const ctx = document.getElementById('chart-tech-support');
        if (!ctx) return;
        if (this.instances['techsupport']) this.instances['techsupport'].destroy();

        this.instances['techsupport'] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['No Support (41.6% Churn)', 'Has Support (15.2% Churn)', 'No Internet (7.4% Churn)'],
                datasets: [{
                    data: [41.64, 15.17, 7.40],
                    backgroundColor: ['#ef4444', '#10b981', '#64748b'],
                    borderWidth: 2,
                    borderColor: '#0f172a'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: ChartTheme.textColor, font: { size: 11 } } } },
                cutout: '65%'
            }
        });
    },

    initSecurityChart() {
        const ctx = document.getElementById('chart-security');
        if (!ctx) return;
        if (this.instances['security']) this.instances['security'].destroy();

        this.instances['security'] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['No Security (41.8% Churn)', 'Has Security (14.6% Churn)', 'No Internet (7.4% Churn)'],
                datasets: [{
                    data: [41.77, 14.61, 7.40],
                    backgroundColor: ['#ef4444', '#06b6d4', '#64748b'],
                    borderWidth: 2,
                    borderColor: '#0f172a'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom', labels: { color: ChartTheme.textColor, font: { size: 11 } } } },
                cutout: '65%'
            }
        });
    },

    initSeniorChart() {
        const ctx = document.getElementById('chart-senior');
        if (!ctx) return;
        if (this.instances['senior']) this.instances['senior'].destroy();

        this.instances['senior'] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Senior Citizen (65+)', 'Non-Senior Citizen'],
                datasets: [
                    {
                        label: 'Churn Rate (%)',
                        data: [41.68, 23.61],
                        backgroundColor: '#ef4444',
                        borderRadius: 6
                    },
                    {
                        label: 'Retained (%)',
                        data: [58.32, 76.39],
                        backgroundColor: '#0284c7',
                        borderRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 100, ticks: { color: ChartTheme.textColor, callback: v => v + '%' }, grid: { color: ChartTheme.gridColor } },
                    x: { ticks: { color: ChartTheme.textColor }, grid: { display: false } }
                },
                plugins: { legend: { labels: { color: ChartTheme.textColor } } }
            }
        });
    },

    initFamilyChart() {
        const ctx = document.getElementById('chart-family');
        if (!ctx) return;
        if (this.instances['family']) this.instances['family'].destroy();

        this.instances['family'] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Solo (No Partner/Dep)', 'Partner Only', 'Dependents Only', 'Partner & Dependents'],
                datasets: [
                    {
                        label: 'Churn Rate (%)',
                        data: [34.24, 25.41, 21.33, 14.24],
                        backgroundColor: '#f59e0b',
                        borderRadius: 6
                    },
                    {
                        label: 'Retention Rate (%)',
                        data: [65.76, 74.59, 78.67, 85.76],
                        backgroundColor: '#0ea5e9',
                        borderRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, max: 100, ticks: { color: ChartTheme.textColor, callback: v => v + '%' }, grid: { color: ChartTheme.gridColor } },
                    x: { ticks: { color: ChartTheme.textColor }, grid: { display: false } }
                },
                plugins: { legend: { labels: { color: ChartTheme.textColor } } }
            }
        });
    },

    initFeatureImportanceChart() {
        const ctx = document.getElementById('chart-feature-importance');
        if (!ctx) return;
        if (this.instances['importance']) this.instances['importance'].destroy();

        const labels = FEATURE_IMPORTANCES.map(f => f.label);
        const values = FEATURE_IMPORTANCES.map(f => f.score * 100);

        this.instances['importance'] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Gini Feature Importance (%)',
                    data: values,
                    backgroundColor: [
                        '#ef4444', '#f97316', '#f59e0b', '#06b6d4',
                        '#0ea5e9', '#6366f1', '#8b5cf6', '#a855f7', '#64748b', '#475569'
                    ],
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { beginAtZero: true, max: 60, ticks: { color: ChartTheme.textColor, callback: v => v + '%' }, grid: { color: ChartTheme.gridColor } },
                    y: { ticks: { color: '#f1f5f9', font: { size: 12, weight: '500' } }, grid: { display: false } }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (item) => ` Gini Importance: ${item.raw.toFixed(2)}% (Rank #${item.dataIndex + 1})`
                        }
                    }
                }
            }
        });
    },

    initRocChart() {
        const ctx = document.getElementById('chart-roc');
        if (!ctx) return;
        if (this.instances['roc']) this.instances['roc'].destroy();

        this.instances['roc'] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [0.0, 0.04, 0.09, 0.15, 0.24, 0.36, 0.48, 0.65, 0.82, 1.0],
                datasets: [
                    {
                        label: 'Decision Tree (AUC = 0.8281)',
                        data: [0.0, 0.28, 0.47, 0.61, 0.74, 0.83, 0.90, 0.96, 0.99, 1.0],
                        borderColor: '#0284c7',
                        backgroundColor: 'rgba(2, 132, 199, 0.15)',
                        fill: true,
                        tension: 0.3,
                        pointRadius: 4
                    },
                    {
                        label: 'Random Baseline (AUC = 0.50)',
                        data: [0.0, 0.04, 0.09, 0.15, 0.24, 0.36, 0.48, 0.65, 0.82, 1.0],
                        borderColor: '#64748b',
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { title: { display: true, text: 'False Positive Rate (1 - Specificity)', color: ChartTheme.textColor }, ticks: { color: ChartTheme.textColor }, grid: { color: ChartTheme.gridColor } },
                    y: { title: { display: true, text: 'True Positive Rate (Sensitivity / Recall)', color: ChartTheme.textColor }, beginAtZero: true, max: 1.0, ticks: { color: ChartTheme.textColor }, grid: { color: ChartTheme.gridColor } }
                },
                plugins: { legend: { labels: { color: ChartTheme.textColor } } }
            }
        });
    },

    initDepthTuningChart() {
        const ctx = document.getElementById('chart-depth-tuning');
        if (!ctx) return;
        if (this.instances['depthTuning']) this.instances['depthTuning'].destroy();

        this.instances['depthTuning'] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Depth 2', 'Depth 3', 'Depth 4', 'Depth 5 (Optimal)', 'Depth 6', 'Depth 7', 'Depth 8', 'Depth 9', 'Depth 10'],
                datasets: [
                    {
                        label: 'Test Set Accuracy (%)',
                        data: [78.64, 79.13, 79.70, 79.84, 79.42, 78.92, 78.21, 77.50, 76.93],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.3,
                        pointRadius: 5
                    },
                    {
                        label: 'Training Set Accuracy (%)',
                        data: [78.95, 79.62, 80.45, 81.12, 82.35, 83.90, 85.80, 87.65, 89.90],
                        borderColor: '#6366f1',
                        borderDash: [4, 4],
                        tension: 0.3,
                        pointRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: false, min: 75, max: 92, ticks: { color: ChartTheme.textColor, callback: v => v + '%' }, grid: { color: ChartTheme.gridColor } },
                    x: { ticks: { color: ChartTheme.textColor }, grid: { display: false } }
                },
                plugins: {
                    legend: { labels: { color: ChartTheme.textColor } },
                    tooltip: { callbacks: { label: (i) => ` ${i.dataset.label}: ${i.raw}%` } }
                }
            }
        });
    },

    updateCohortCharts(cohortData) {
        const ctxRisk = document.getElementById('chart-cohort-risk');
        if (ctxRisk) {
            if (this.instances['cohortRisk']) this.instances['cohortRisk'].destroy();
            const r = cohortData.risk_distribution || { High: 0, Medium: 0, Low: 0 };
            this.instances['cohortRisk'] = new Chart(ctxRisk, {
                type: 'doughnut',
                data: {
                    labels: [`High Risk (${r.High})`, `Medium Risk (${r.Medium})`, `Low Risk (${r.Low})`],
                    datasets: [{
                        data: [r.High, r.Medium, r.Low],
                        backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
                        borderWidth: 2,
                        borderColor: '#0f172a'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'bottom', labels: { color: ChartTheme.textColor, font: { size: 11 } } } },
                    cutout: '65%'
                }
            });
        }
    }
};
