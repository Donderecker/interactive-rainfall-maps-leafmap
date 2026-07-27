# Interactive Rainfall Maps with Leafmap

## Repository Status

🚧 **Repository in progress**

This repository is currently under development. Additional documentation, visualizations, and project outputs will be added progressively.

# Creación de mapas interactivos con LeafMap

LeafMap permite generar mapas interactivos en Python mediante la integración de información geoespacial vectorial, raster y servicios de mapas base. Esta herramienta facilita la visualización, exploración y publicación de datos espaciales mediante interfaces cartográficas interactivas.

---

# Creación del mapa interactivo

Para crear un mapa interactivo se utiliza la función `leafmap.Map()`, donde es posible definir parámetros iniciales como el centro del mapa, nivel de zoom y dimensiones de visualización.

```python
import leafmap

m = leafmap.Map(
    center=[-45, -75],
    zoom=6,
    height="500px",
    width="700px"
)

m
```

Parámetros utilizados:

- `center`: establece las coordenadas centrales del mapa.
- `zoom`: define el nivel inicial de acercamiento.
- `height` y `width`: determinan las dimensiones de la ventana interactiva.

---

# Incorporación de mapas base mediante XYZ Tiles

Los servicios XYZ Tiles permiten incorporar mapas base provenientes de diferentes proveedores cartográficos. LeafMap cuenta con herramientas para buscar servicios compatibles y agregarlos directamente al mapa.

```python
m.add_xyz_service("xyz.Stamen.Terrain")

m
```

Las capas agregadas pueden ser administradas desde el panel **Layers**, disponible dentro de la interfaz interactiva.

---

# Incorporación de datos vectoriales

LeafMap permite cargar información vectorial almacenada en formatos como Shapefile (`.shp`) mediante el método `add_vector()`.

```python
m.add_vector(
    "Cuencas.shp",
    layer_name="Cuencas_Sur",
    style={"color": "#00FF00"}
)

m
```

Parámetros utilizados:

- `layer_name`: define el nombre de la capa dentro del mapa.
- `style`: permite configurar la simbología de representación.

Ejemplo de modificación del color mediante código HEX:

```python
style={"color": "#00FF00"}
```

---

# Incorporación de datos vectoriales con clasificación temática

Además de representar geometrías, LeafMap permite visualizar variables asociadas a los atributos de una capa mediante métodos de clasificación estadística.

```python
m.add_data(
    "Cuencas.shp",
    column="AREAKM2",
    scheme="Quantiles",
    cmap="Greens",
    legend_title="Km2"
)

m
```

Configuración utilizada:

- `column`: corresponde al atributo utilizado para representar los valores.
- `scheme`: define el método estadístico para generar los rangos de clasificación.
- `cmap`: establece la escala de colores utilizada.
- `legend_title`: define el nombre mostrado en la leyenda.

Los métodos de clasificación permiten adaptar la representación cartográfica según la distribución de los datos y el objetivo del análisis.

---

# Incorporación de datos raster

LeafMap permite visualizar archivos raster como modelos digitales de elevación, imágenes satelitales y otros productos derivados.

Para trabajar con información raster se crea un nuevo objeto de mapa:

```python
r = leafmap.Map(
    center=[-45, -75],
    zoom=6,
    height="500px",
    width="700px"
)
```

---

## Visualización de un raster continuo

Ejemplo utilizando un modelo digital de elevación:

```python
r.add_raster(
    "dem.tif",
    palette="terrain",
    layer_name="elevacion"
)

r
```

Parámetros utilizados:

- `palette`: define la escala de colores utilizada para representar los valores del raster.
- `layer_name`: corresponde al nombre asignado a la capa dentro del mapa.

---

## Visualización de imágenes satelitales multibanda

LeafMap permite cargar imágenes satelitales seleccionando bandas específicas para generar composiciones RGB.

Ejemplo utilizando una imagen Landsat:

```python
r.add_raster(
    "LT05_232090_19980207.tif",
    bands=[5,4,1],
    layer_name="Landsat05_1998"
)

r
```

La combinación de bandas utilizada corresponde a:

- Banda 5 → canal rojo.
- Banda 4 → canal verde.
- Banda 1 → canal azul.

Esta configuración permite generar una composición RGB para la visualización e interpretación de imágenes satelitales.

---

# Exportación del mapa interactivo

Una vez configuradas las capas del mapa, LeafMap permite exportar el resultado como un archivo HTML interactivo.

```python
r.to_html("mapa_ejemplo.html")
```

El archivo generado contiene la configuración del mapa, capas incorporadas y elementos interactivos, permitiendo compartir la visualización sin necesidad de ejecutar nuevamente el código.

---

> [!WARNING]
> **Consideración importante sobre las teselas raster**
>
> Al incorporar archivos raster mediante `leafmap.add_raster()`, LeafMap utiliza `localtileserver` para generar las teselas necesarias para la visualización interactiva del mapa.
>
> Esto implica que las capas raster no quedan almacenadas directamente dentro del archivo HTML exportado, sino que dependen del servidor local de teselas generado durante la ejecución del código.
>
> ```python
> r.add_raster(
>     "dem.tif",
>     palette="terrain",
>     layer_name="elevacion"
> )
>
> r.to_html("mapa_ejemplo.html")
> ```
>
> El archivo HTML generado conserva la estructura del mapa y la configuración de las capas, pero requiere que el servicio local de teselas continúe activo para cargar correctamente la información raster.
>
> Por esta razón, al cerrar la sesión de trabajo donde se ejecuta Python, el servidor generado por `localtileserver` deja de funcionar y las teselas raster pueden dejar de visualizarse en el mapa exportado.

# Métodos de clasificación cartográfica

Para representar variables cuantitativas mediante simbología graduada es importante seleccionar un método de clasificación adecuado según la distribución de los datos.

Algunos métodos utilizados son:

- **Equal Interval:** divide los valores en intervalos de igual tamaño.
- **Quantiles:** agrupa los datos considerando igual cantidad de observaciones por clase.
- **Natural Breaks (Jenks):** identifica agrupaciones naturales dentro de los datos.
- **Standard Deviation:** clasifica los valores según su distancia respecto al promedio.

La selección del método dependerá del comportamiento estadístico de la variable y del propósito del análisis espacial.
## Overview

This repository contains Python workflows for creating interactive rainfall visualization maps using **Leafmap**, **Folium**, and geospatial analysis tools.

The project focuses on comparing precipitation data through interactive **SplitMap** visualizations and integrating watershed vector layers for spatial analysis.

## Technologies

- Python
- Leafmap
- Folium
- GeoPandas
- Rasterio
- WhiteboxTools
- Jupyter Notebook
