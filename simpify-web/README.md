# Simpify — Ecosistema Financiero y Operativo B2B

> **Tus pagos por SINPE, facturación y POS, por fin bajo control.**  
> Plataforma web corporativa y suite interactiva de productos financieros diseñada para emprendedores, comercios y PYMES en Costa Rica.

---

## 1. Visión General del Proyecto

**Simpify** nace para resolver el desorden operativo y administrativo que enfrentan los negocios que cobran diariamente por **SINPE Móvil** (capturas de pantalla sueltas en WhatsApp, cierres de caja manuales, riesgo de comprobantes falsos y doble digitación al facturar).

A diferencia de una herramienta aislada, **Simpify** funciona como una marca paraguas con **tres productos especializados** que pueden contratarse por separado o funcionar sincronizados en tiempo real a partir de un único paso: **vincular el número telefónico del comercio**.

---

## 2. Módulos y Productos del Ecosistema

El estado global de las transacciones está conectado en `src/App.jsx`, permitiendo que cualquier pago simulado en **Simpify Simpe** o cobrado en **Simpify POS** esté disponible de inmediato en todo el ecosistema:

### 🟢 Producto 1: Simpify Simpe (`src/pages/SimpifySimpe.jsx`)
* **Centralización por Número Único:** El comercio registra únicamente su línea receptora (`+506`) y recibe todas las transferencias organizadas automáticamente.
* **Libro Mayor en Vivo y Filtros Bancarios:** Filtrado rápido por entidad emisora (*BAC Credomatic, Banco Nacional, Banco de Costa Rica, Promerica*) y buscador por teléfono, cliente o referencia.
* **Inspector Lateral Antifraude:** Vista detallada de cada transacción con validación de autenticidad, latencia en milisegundos y visualización del mensaje bancario original conciliado.
* **Directorio CRM Automático (Segmentación RFM):** Agrupa automáticamente los pagos bajo el número de teléfono del comprador para calcular frecuencia de compra y valor total (*LTV*) sin pedir formularios.
* **Exportación Contable Real:** Generación y descarga inmediata de cierres en formato `.CSV` / Excel.

### 🔵 Producto 2: Simpify Facturación (`src/pages/SimpifyFacturacion.jsx`)
* **Conversión SINPE a Factura en 1 Clic:** Selecciona cualquier pago recibido en Simpify Simpe y autocompleta los datos del receptor y el monto para emitir el comprobante oficial.
* **Cumplimiento Ministerio de Hacienda CR (Anexo v4.4):** Soporte para *Factura Electrónica (01)*, *Tiquete Electrónico (04)* y *Nota de Crédito (03)*.
* **Motor de Impuestos y CABYS:** Selector rápido de tarifas de IVA (*13%, 4%, 2% y 0% Exento*) con desglose automático de subtotal neto e impuesto.
* **Representación Gráfica en Vivo:** Previsualización instantánea del documento con **Clave Numérica de 50 dígitos**, número consecutivo oficial y código QR de verificación.

### 🟣 Producto 3: Simpify POS (`src/pages/SimpifyPOS.jsx`)
* **Terminal de Punto de Venta Ágil:** Catálogo interactivo organizado por categorías (*Cafetería, Repostería, Cocina, Servicios, Retail*) y códigos SKU.
* **Verificador de Cajero en Vivo (Modo Ciego):** Permite a los empleados en mostrador confirmar que un pago SINPE ingresó realmente al negocio sin darles acceso a las cuentas bancarias ni saldos del propietario.
* **Gestión de Cobro Multimodal:** Soporte para *SINPE Móvil*, *Datáfono* y *Efectivo* (con calculadora rápida de vuelto por denominación de billete y descuentos comerciales).
* **Tiquete Térmico 80mm en Vivo:** Previsualización en formato monoespaciado lista para impresoras térmicas ESC/POS.

### ⚙️ Configurador Comercial B2B (`src/pages/PricingROI.jsx`)
* **Sin Precios Públicos Fijos:** Diseñado bajo estrategia B2B donde el cliente selecciona qué módulos desea integrar y el tamaño de su operación (*Emprendimiento, PYME o Multisede*) para solicitar una cotización y demo guiada.
* **Calculadora de Impacto Operativo:** Estima las horas mensuales que el equipo ahorra al eliminar la conciliación manual de comprobantes.

---

## 3. Sistema de Diseño e Identidad Visual

Para evitar la apariencia genérica de plantillas prefabricadas, la interfaz sigue estándares de diseño **Fintech de alta precisión**:

* **Paleta de Colores Oficial:**
  * **Verde Esmeralda (`#10B981`):** Acción principal, liquidez positiva, confirmaciones verificadas.
  * **Azul Marino Profundo (`#0F172A`):** Estructura corporativa, barras laterales, encabezados y contraste de seguridad bancaria.
  * **Gris Hielo (`#F8FAFC`):** Fondo general de la aplicación para descansar la vista y resaltar las tarjetas blancas (`#FFFFFF`).
* **Tipografía Dual (Google Fonts en `src/index.css`):**
  * **UI y Encabezados:** `Plus Jakarta Sans` con espaciado negativo (`letter-spacing: -0.03em`) para una lectura limpia y moderna.
  * **Datos Financieros y Telemetría:** `JetBrains Mono` con `tabular-nums` para alinear montos en colones (`₡`), teléfonos, códigos SKU y claves de Hacienda al milímetro.

---

## 4. Estructura del Repositorio

```text
simpify-web/
├── public/
│   └── favicon.svg                # Isotipo oficial de Simpify en SVG (doble curva S)
├── src/
│   ├── components/
│   │   └── Navbar.jsx             # Barra de navegación sticky + componente SimpifyLogo
│   ├── pages/
│   │   ├── EcosystemHome.jsx      # Landing principal del ecosistema y mockup interactivo
│   │   ├── SimpifySimpe.jsx       # Plataforma de conciliación SINPE, CRM e inspector
│   │   ├── SimpifyFacturacion.jsx # Estación de Facturación Electrónica Hacienda v4.4
│   │   ├── SimpifyPOS.jsx         # Terminal de Punto de Venta e impresión térmica 80mm
│   │   └── PricingROI.jsx         # Configurador de módulos B2B y calculadora de ahorro
│   ├── App.jsx                    # Estado compartido de transacciones y enrutador de vistas
│   ├── index.css                  # Importación de Tailwind v4 y fuentes Plus Jakarta / JetBrains
│   └── main.jsx                   # Punto de entrada de React
├── index.html                     # Título "Simpify" y enlace al favicon oficial
├── package.json                   # Dependencias y scripts de ejecución
└── vite.config.js                 # Configuración de Vite + plugin @tailwindcss/vite
```

---

## 5. Requisitos e Instalación Local

Para clonar y correr este proyecto en tu máquina local, asegurate de tener instalado **Node.js** (versión 18 o superior recomendada).

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/simpify-web.git
cd simpify-web
```

### Paso 2: Instalar dependencias
```bash
npm install
```
*(Nota: Esto instalará automáticamente `react`, `react-dom`, `lucide-react`, `tailwindcss` y `@tailwindcss/vite`).*

### Paso 3: Levantar el servidor de desarrollo
```bash
npm run dev
```
Abrí tu navegador en `http://localhost:5173` para ver la plataforma en vivo con recarga instantánea (HMR).

### Paso 4: Compilar para producción
```bash
npm run build
```
Genera la carpeta `dist/` optimizada y lista para desplegar en Vercel, Netlify o servidor propio.

---

## 6. Flujo de Trabajo en Git para Colaboradores

Para mantener el repositorio ordenado mientras trabajamos en equipo:

1. **Actualizar siempre antes de empezar:**
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Crear una rama por cada mejora o módulo:**
   * `git checkout -b feat/nombre-de-mejora` (para nuevas funciones)
   * `git checkout -b fix/nombre-de-correccion` (para ajustes visuales o bugs)
3. **Commits claros:**
   * Ejemplo: `git commit -m "feat(pos): agregar filtro de inventario por sucursal"`
4. **Subir cambios y abrir Pull Request:**
   ```bash
   git push origin feat/nombre-de-mejora
   ```

---

**Simpify Costa Rica** — *Desarrollado por QR Innovations Dev.*