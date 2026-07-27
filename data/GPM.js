Código de Earth Engine (JavaScript) para descarga datos de precipitacion GPM

// Definición del rango de fechas
var range = ee.Date("2023-06-24").getRange("day");

// Filtrar la colección de imágenes por ubicación y rango de fechas
var dataset = ee.ImageCollection("NASA/GPM_L3/IMERG_V06")
  .filterBounds(geometry)  // Filtrar por ubicación geográfica (definida por "geometry")
  .filter(ee.Filter.date(range));  // Filtrar por rango de fechas

// Seleccionar la banda de precipitación y calcular la suma
var precipitacion = dataset.select("precipitationCal").sum();

// Definición de la paleta de colores
var palette = [
  '#0000FF', '#3366FF', '#66CCFF', '#99FFFF', '#66FF66',
  '#CCFF66', '#FFFF66', '#FFCC66', '#FF9933', '#FF0000'
];

// Configuración de visualización para los datos de precipitación
var precipitacionVis = {
  min: 0,    // Valor mínimo
  max: 300,  // Valor máximo
  palette: palette  // Paleta de colores
};

// Agregar la capa de precipitación al mapa
Map.addLayer(precipitacion, precipitacionVis, 'precipitacion (mm)');

// Centrar el mapa en las coordenadas específicas
Map.setCenter(-70, -35);

// Descargar 

// Exportar la imagen de precipitación a Google Drive
Export.image.toDrive({
  image: precipitacion,  // Imagen de precipitación a exportar
  description: 'GPM_2023_06_24',  // Descripción de archivo de salida
  region: geometry,  // Región de interés (definida por "geometry")
  crs: "EPSG:32719",  // Sistema de referencia de coordenadas
  folder: "Datos_GPM"  // Carpeta de destino en Google Drive
