# 👟 Urban Step Store 

**Urban Step Store** es un prototipo no funcional de e-commerce especializado en calzado deportivo de alta gama. Este proyecto fue desarrollado como parte del Taller de React, implementando una arquitectura de estado global, navegación dinámica y persistencia de datos.

---

## 🚀 Requisitos del Proyecto (Cumplimiento)

* **Prototipo Navegable:** Sistema de rutas completamente funcional con 5 pantallas principales.
* **Estado Global:** Uso de **Context API** para la gestión del carrito de compras y catálogo.
* **Persistencia:** Implementación de **LocalStorage** para mantener los productos en el carrito tras recargar.
* **Roles de Usuario:** Definición de flujos para Cliente (Compra) y Administrador (Gestión).
* **Despliegue:** Configurado para hosting en Vercel/Netlify.

---

## 🖼️ Pantallas de la Aplicación

1.  **Home (Inicio):** Landing page con banner promocional y acceso rápido.
2.  **Catálogo:** Lista de sneakers con filtros por marca y categorías.
3.  **Detalle de Producto:** Vista expandida con descripción técnica, precio y botón de compra.
4.  **Carrito de Compras:** Gestión de artículos seleccionados, cálculo de totales y eliminación.
5.  **Panel de Administración:** Formulario controlado para la gestión del inventario (Rol Admin).

---

## 🛠️ Tecnologías Utilizadas

* **React + Vite:** Entorno de desarrollo rápido.
* **React Router Dom:** Manejo de rutas y navegación SPA.
* **Context API:** Manejo del estado global de la tienda.
* **Lucide React:** Set de iconos premium para la interfaz.
* **CSS Moderno:** Diseño "Premium Dark/Light" con enfoque responsivo.

---

## 👥 Roles de Usuario

### Cliente
* Explorar el catálogo completo de tenis.
* Ver detalles específicos de cada modelo.
* Añadir y eliminar productos del carrito de compras.

### Administrador
* Acceso al panel de control.
* Gestión de inventario mediante formularios controlados (Añadir/Editar productos).

---

## 📦 Instalación y Uso Local

1.  **Clonar el repositorio:**
    ```bash
    git clone [https://github.com/TU_USUARIO/urbanstep-store.git](https://github.com/TU_USUARIO/urbanstep-store.git)
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Ejecutar en modo desarrollo:**
    ```bash
    npm run dev
    ```
    *La aplicación estará disponible en: `http://localhost:5173/`*

---

## 🌐 Despliegue
La versión de producción se encuentra disponible en: https://urbanstep-rdny.vercel.app/

---
**Desarrollado por:** Miguel JR - Valledupar, Colombia.
