import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy.ndimage import gaussian_filter1d  # Para suavizado
from statsmodels.tsa.statespace.sarimax import SARIMAX
from statsmodels.tsa.holtwinters import ExponentialSmoothing

# Cargar los datos
data = pd.read_csv('consumo_mascotas.csv')  # Ajusta el nombre de tu archivo
data['Fecha'] = pd.to_datetime(data['Fecha'])
data.set_index('Fecha', inplace=True)

# Verificar duplicados en el índice
duplicates = data.index[data.index.duplicated()]
if not duplicates.empty:
    print("Fechas duplicadas:", duplicates)
    # Consolidar duplicados sumando los valores
    data = data.groupby(data.index).sum()

# Rellenar días faltantes con ceros
data = data.asfreq('D', fill_value=0)

# Agregación diaria
daily_consumption = data['Cantidad Consumida (gr)']
daily_spending = data['Gasto Diario ($)']

# ---- Gráfica de Pastel ---- #
categories = ['Beneful', 'Brit Care', 'Pedigri']
values = [25, 40, 35]

plt.figure(figsize=(8, 8))
plt.pie(values, labels=categories, autopct='%1.1f%%', startangle=90, colors=['#FFD700', '#90EE90', '#FF6347'])
plt.title('Tipo de alimentos', fontsize=16, fontweight='bold')
plt.legend(categories, title='Leyenda', loc='upper right', bbox_to_anchor=(1.2, 0.9))
plt.savefig('grafica_pastel_con_leyendas.png')  # Guardar gráfica
plt.show()

# ---- Gráfica de Línea (Gasto Diario) ---- #
if not daily_spending.empty:
    # Aplicar suavizado al gasto diario
    smoothed_spending = gaussian_filter1d(daily_spending[:30], sigma=1.5)

    # Calcular porcentaje de cambio en el gasto
    initial_spending = daily_spending.iloc[0]
    final_spending = daily_spending.iloc[-1]
    percentage_change_spending = ((final_spending - initial_spending) / initial_spending) * 100

    plt.figure(figsize=(10, 6))
    plt.plot(daily_spending.index[:30], smoothed_spending, color='orange', linewidth=2, label='Gasto Diario (Suavizado)', marker='o')
    plt.text(0.02, 0.9, f"El gasto cambió un {percentage_change_spending:.2f}%", transform=plt.gca().transAxes,
             fontsize=12, color='orange', fontweight='bold')
    plt.title('Gasto en comida (Primeros 30 Días)', fontsize=16, fontweight='bold', color='orange')
    plt.xlabel('Fecha', fontsize=12, color='orange')
    plt.ylabel('Gasto Diario ($)', fontsize=12, color='orange')
    plt.legend(loc='upper left', fontsize=10, frameon=True, shadow=True, facecolor='white', edgecolor='orange')
    plt.grid(axis='y', linestyle='--', alpha=0.5, color='#FFD6A5')
    plt.tight_layout()
    plt.savefig('grafica_gasto_linea_con_cambio.png')  # Guardar gráfica
    plt.show()

# ---- Gráfica de Área (Consumo Diario) ---- #
if not daily_consumption.empty:
    # Aplicar suavizado al consumo diario
    smoothed_consumption = gaussian_filter1d(daily_consumption, sigma=3)

    # Calcular porcentaje de aumento
    initial_value = daily_consumption.iloc[0]
    final_value = daily_consumption.iloc[-1]
    percentage_increase = ((final_value - initial_value) / initial_value) * 100

    plt.figure(figsize=(14, 8))
    plt.fill_between(daily_consumption.index, smoothed_consumption, color='#A2D2FF', alpha=0.6, label='Consumo Diario (Suavizado)')
    plt.plot(daily_consumption.index, smoothed_consumption, color='#023E8A', linewidth=2, label='Tendencia Suavizada')
    plt.text(0.02, 0.9, f"El consumo aumentó un {percentage_increase:.2f}%", transform=plt.gca().transAxes,
             fontsize=12, color='#023E8A', fontweight='bold')
    plt.legend(loc='upper left', fontsize=10, frameon=True, shadow=True, facecolor='white', edgecolor='#023E8A')
    plt.title('Consumo Diario de Alimentos (Gráfica de Área Suavizada)', fontsize=16, fontweight='bold', color='#023E8A')
    plt.xlabel('Fecha', fontsize=12, color='#023E8A')
    plt.ylabel('Cantidad Consumida (gr)', fontsize=12, color='#023E8A')
    plt.grid(axis='y', linestyle='--', alpha=0.5, color='#8ECAE6')
    plt.tight_layout()
    plt.savefig('consumo_diario_area_suavizada.png')  # Guardar gráfica
    plt.show()

# ---- Modelos de Predicción ---- #
# Modelo SARIMA para consumo diario
sarima_model = SARIMAX(daily_consumption, order=(1, 1, 1), seasonal_order=(1, 1, 0, 7))
sarima_fit = sarima_model.fit(disp=False)
sarima_forecast = sarima_fit.get_forecast(steps=30).predicted_mean

# Modelo Holt-Winters para consumo diario
holt_model = ExponentialSmoothing(daily_consumption, trend='add', seasonal='add', seasonal_periods=7).fit()
holt_forecast = holt_model.forecast(steps=30)

# ---- Gráfica de Predicciones para Consumo Diario ---- #
plt.figure(figsize=(14, 8))
plt.plot(daily_consumption.index, daily_consumption, label='Datos Reales', color='blue', linewidth=1.5)
plt.plot(sarima_forecast.index, sarima_forecast, label='Predicción SARIMA', color='red', linestyle='--')
plt.plot(holt_forecast.index, holt_forecast, label='Predicción Holt-Winters', color='green', linestyle='--')
plt.title('Consumo Diario - Comparación de Predicciones', fontsize=16)
plt.xlabel('Fecha', fontsize=12)
plt.ylabel('Cantidad Consumida (gr)', fontsize=12)
plt.legend(loc='upper left', fontsize=10)
plt.grid(alpha=0.7)
plt.tight_layout()
plt.savefig('consumo_diario_predicciones.png')  # Guardar gráfica
plt.show()

# Modelo SARIMA para gasto diario
sarima_model_spending = SARIMAX(daily_spending, order=(1, 1, 1), seasonal_order=(1, 1, 0, 7))
sarima_fit_spending = sarima_model_spending.fit(disp=False)
sarima_forecast_spending = sarima_fit_spending.get_forecast(steps=30).predicted_mean

# Modelo Holt-Winters para gasto diario
holt_model_spending = ExponentialSmoothing(daily_spending, trend='add', seasonal='add', seasonal_periods=7).fit()
holt_forecast_spending = holt_model_spending.forecast(steps=30)

# ---- Gráfica de Predicciones para Gasto Diario ---- #
plt.figure(figsize=(14, 8))
plt.plot(daily_spending.index, daily_spending, label='Datos Reales', color='blue', linewidth=1.5)
plt.plot(sarima_forecast_spending.index, sarima_forecast_spending, label='Predicción SARIMA', color='red', linestyle='--')
plt.plot(holt_forecast_spending.index, holt_forecast_spending, label='Predicción Holt-Winters', color='green', linestyle='--')
plt.title('Gasto Diario - Comparación de Predicciones', fontsize=16)
plt.xlabel('Fecha', fontsize=12)
plt.ylabel('Gasto Diario ($)', fontsize=12)
plt.legend(loc='upper left', fontsize=10)
plt.grid(alpha=0.7)
plt.tight_layout()
plt.savefig('gasto_diario_predicciones.png')  # Guardar gráfica
plt.show()
