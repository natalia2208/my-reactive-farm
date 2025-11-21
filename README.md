2. Cuestionario de React
Responde en un archivo README.md (modificar el original del repositorio) las siguientes 10 preguntas sobre React. Usa tus propias palabras basadas en el análisis del repositorio.

¿Cuál es la diferencia entre un componente presentacional y un componente de página en React? Da ejemplos usando archivos del proyecto.
Un componente presentacional solo muestra información y recibe datos por props. No maneja lógica compleja.
ejemplo:
AnimalCard.jsx
Loader.jsx
Alert.jsx
Un componente de página maneja datos, estado y lógica. Suele hacer llamadas a APIs y controlar a los componentes hijos.
Ejemplo:
pages/Farm.jsx: carga datos, controla filtros, administra estado, renderiza el formulario y la lista.

¿Para qué se utiliza useState en el proyecto? Menciona dos estados distintos y su función.
useState sirve para manejar valores que cambian en la interfaz.
Ejemplo:
animals
Guarda la lista de animales que llega desde MockAPI.
loading
Se usa para mostrar la animación de carga mientras se hace la petición de datos.

¿Cómo se usa useEffect para cargar datos desde MockAPI al inicio? Explica el flujo.
Al montar la página Farm.jsx, se ejecuta un useEffect vacío ([]).
Dentro se llama a la función getAnimals() desde animalsApi.js.
Antes de la petición: loading = true.
Cuando la API responde, se actualiza animals con los datos recibidos.
Si ocurre un error, se guarda en loadError.
Al terminar: loading = false.
Este flujo asegura que la app muestre un loader mientras llegan los animales.

¿Cómo maneja el proyecto los estados de loading, error y lista vacía? ¿Qué se muestra al usuario en cada caso?
loading = true aparece <Loader message="Fetching animals…" />
loadError se muestra <Alert variant="error">Error...</Alert>
lista vacía la propia AnimalList muestra un mensaje de “no hay animales”.

¿Qué significa que un formulario sea controlado en React? Relaciónalo con el formulario del proyecto.
Un formulario controlado es aquel donde React lleva todo el control del valor de los inputs mediante estados (useState).
En AnimalForm.jsx:
Cada input tiene un value={...}
Y cada cambio se maneja con onChange={(e) => setName(e.target.value)} (u otros estados). Esto asegura que el UI y el estado siempre están sincronizados.

¿Por qué es buena práctica separar la lógica de datos en archivos como animalsApi.js en vez de hacer peticiones dentro de los componentes?
Mantiene el código más limpio.
Hace que los componentes sean más fáciles de leer.
Permite reutilizar funciones como getAnimals() y createAnimal().
Si cambia la API, solo se modifica un archivo.

¿Qué hace que AnimalCard sea un componente reutilizable? ¿Cómo se podría usar una tarjeta similar en otro contexto?
Recibe toda la información por props (name, type, weight, etc.).
No depende de estados internos.
No está atado a la página Farm.
La misma tarjeta podría usarse para:
Mostrar productos
Mostrar usuarios
Mostrar vehículos
Solo cambiarían las props.

¿Qué elementos del proyecto contribuyen a la accesibilidad? Menciona tres y explica su importancia.
Labels con htmlFor y campos con id
Mejora la navegación con lectores de pantalla.
Texto oculto con sr-only
Accesible para tecnología asistiva sin afectar el diseño.
Estados claros para feedback del usuario
Ejemplo: loaders, alertas y mensajes de error.

Antes de agregar una funcionalidad nueva, ¿qué pasos debes pensar según la filosofía de React? (ej.: qué datos, qué estado, dónde vive la lógica)
¿Qué datos necesito?
¿Ese dato cambia? Si cambia, debe ser estado (useState).
¿Dónde debe vivir ese estado?
(el componente más alto que lo requiera)
¿Cómo se comunicará con otros componentes?
(props)

¿Qué conceptos de React aprendidos en este proyecto podrías reutilizar en otro tipo de aplicación? Da al menos cuatro ejemplos.

10. ¿Qué conceptos de React aprendidos en este proyecto puedo reutilizar en otras apps?
Componentes reutilizables
useState para manejar valores que cambian
useEffect para ejecutar lógica en ciertos momentos
Formularios controlados
Filtros y búsqueda
Separación lógica/API en servicios externos
Todo esto aplica a cualquier proyecto moderno de React.
