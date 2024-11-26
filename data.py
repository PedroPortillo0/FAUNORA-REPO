import pandas as pd
import numpy as np

# Configurar parámetros
np.random.seed(42)
fechas = pd.date_range(start="2024-01-01", end="2024-12-31")
perfiles = ["Perro Max", "Gato Luna", "Perro Coco", "Gato Simba"]
tipos_alimento = ["Pedigri", "Beneful", "Brit Care"]

# Generar dataset ficticio
data = []
for fecha in fechas:
    for perfil in perfiles:
        tipo_alimento = np.random.choice(tipos_alimento)
        consumo = np.random.randint(50, 500)  # Consumo en gramos
        precio_unitario = np.random.uniform(0.05, 0.15)  # Precio por gramo
        gasto = consumo * precio_unitario
        data.append([fecha, perfil, tipo_alimento, consumo, gasto])

# Crear DataFrame
df = pd.DataFrame(data, columns=["Fecha", "Perfil", "Tipo de Alimento", "Cantidad Consumida (gr)", "Gasto Diario ($)"])

# Guardar dataset para pruebas
df.to_csv("consumo_mascotas.csv", index=False)
print("Dataset generado y guardado como 'consumo_mascotas.csv'.")
print(df.head())

# Cargar el dataset generado
df = pd.read_csv("consumo_mascotas.csv", parse_dates=["Fecha"])

# Filtrar datos para un perfil específico (ejemplo: "Perro Max")
perfil_df = df[df['Perfil'] == 'Perro Max']

# Crear una serie de tiempo de consumo diario
serie_consumo = perfil_df.groupby('Fecha')['Cantidad Consumida (gr)'].sum()

# Crear una serie de tiempo de gasto diario
serie_gasto = perfil_df.groupby('Fecha')['Gasto Diario ($)'].sum()

# Resamplear semanalmente para suavizar la serie
serie_consumo_semanal = serie_consumo.resample('W').mean()
serie_gasto_semanal = serie_gasto.resample('W').mean()

# Mostrar las primeras filas de las series resampleadas
print("\nSerie de Consumo Semanal:")
print(serie_consumo_semanal.head())

print("\nSerie de Gasto Semanal:")
print(serie_gasto_semanal.head())
