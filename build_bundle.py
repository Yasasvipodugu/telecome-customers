import os

base_dir = r'C:\Users\yasas\.gemini\antigravity\scratch\telecom-churn-analytics'

with open(os.path.join(base_dir, 'css', 'styles.css'), 'r', encoding='utf-8') as f:
    css_content = f.read()

with open(os.path.join(base_dir, 'js', 'data.js'), 'r', encoding='utf-8') as f:
    data_js = f.read()

with open(os.path.join(base_dir, 'js', 'ml_engine.js'), 'r', encoding='utf-8') as f:
    ml_engine_js = f.read()

with open(os.path.join(base_dir, 'js', 'charts.js'), 'r', encoding='utf-8') as f:
    charts_js = f.read()

with open(os.path.join(base_dir, 'js', 'app.js'), 'r', encoding='utf-8') as f:
    app_js = f.read()

with open(os.path.join(base_dir, 'frontend', 'index.html'), 'r', encoding='utf-8') as f:
    html = f.read()

# Replace css link
css_tag = '<link rel="stylesheet" href="css/styles.css">'
style_block = f'<style>\n{css_content}\n</style>'

if css_tag in html:
    html = html.replace(css_tag, style_block)
else:
    # insert before </head>
    html = html.replace('</head>', f'{style_block}\n</head>')

# Replace scripts
script_tags = """<!-- Core Scripts -->
<script src="js/data.js"></script>
<script src="js/ml_engine.js"></script>
<script src="js/charts.js"></script>
<script src="js/app.js"></script>"""

inline_scripts = f"""<!-- Self-Contained Application Scripts -->
<script>
{data_js}
</script>
<script>
{ml_engine_js}
</script>
<script>
{charts_js}
</script>
<script>
{app_js}
</script>"""

if script_tags in html:
    html = html.replace(script_tags, inline_scripts)
else:
    html = html.replace('</body>', f'{inline_scripts}\n</body>')

with open(os.path.join(base_dir, 'index.html'), 'w', encoding='utf-8') as f:
    f.write(html)

with open(os.path.join(base_dir, 'frontend', 'index.html'), 'w', encoding='utf-8') as f:
    f.write(html)

print("Self-contained index.html generated successfully! File size:", len(html), "bytes")
