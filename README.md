# tinyquestions
### *a web app of quick quizzes 🗯*

***
![logo](/public/tinyquestionscover.webp)
***

!!! - ¿Cómo desplegar el proyecto en local?
=
***

> [!NOTE]
> Para ver la documentación completa de la app visita:
> **[Documentación Completa](https://internal-buckaroo-a26.notion.site/tinyquestions-8518a1c3128342eeb06610fc12508847?pvs=4)**

### Primero desplegar el backend, puedes encontra la guía de instalación en el REDME.md del propio repo:

>  https://github.com/Patcire/tinyquestions-backend.git

### Después desplegar el front:

1- Clonamos este repositorio:

> git clone https://github.com/Patcire/tinyquestions-frontend.git

2 - Abrimos el proyecto y en la terminal escribimos:
`*Requisitos previos:*` 

`*Tener Git, Node y npm instalados en tu sistema*`.

1. Clona el repositorio original:
    
    ```markdown
    git clone https://github.com/Patcire/tinyquestions-frontend.git
    ```
    
2. Luego, dentro del proyecto, es necesario cambiar la ruta de la API que por defecto apunta a la dirección de producción y sustituirla por la de desarrollo. Para ello: 
    - Ve al siguiente archivo:
        
        src/helpers/others.js
        
    - Verás algo como esto:
        
        ![**Figura 7**. Código a modificar en el front]([https://prod-files-secure.s3.us-west-2.amazonaws.com/93ad78ff-5f34-4de9-a9e6-55c3ebc2407f/81b2388f-20c9-42cd-b01c-90d98976f985/Untitled.png](https://internal-buckaroo-a26.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F93ad78ff-5f34-4de9-a9e6-55c3ebc2407f%2F81b2388f-20c9-42cd-b01c-90d98976f985%2FUntitled.png?table=block&id=9576e07f-fda0-44c4-9480-e30e768d968f&spaceId=93ad78ff-5f34-4de9-a9e6-55c3ebc2407f&width=1290&userId=&cache=v2))
        
        **Figura 7**. Código a modificar en el front
        
        Comenta las dos `const` habilitadas, descomenta las otras dos y guarda los cambios. 
        
3. Por último ejecuta estos dos comandos en al terminal de tu proyecto:
    
    ```markdown
    npm install
    ```
    
    Cuando haya finalizado, ejecuta el siguiente:
    
    ```markdown
    npm run dev
    ```
    
    Finalizada la ejecución de esta instrucción se te proporcionará un enlace. ¡Visítalo y tendrás la app desplegada y funcionando en tu máquina!
    
    `¡¡Recuerda tener el back-end desplegado!!`

***

***

0.1 - Introducción
=
***

> [!IMPORTANT] 
> Para leer la documentación del proyecto al completo visitar el siguiente enlace:
> [https://github.com/Patcire/tinyquestions-frontend/blob/main/doc/doc.md](https://internal-buckaroo-a26.notion.site/tinyquestions-8518a1c3128342eeb06610fc12508847)

Tinyquestions, estilizado tinyquestions, es una aplicación web que se enfoca en ofrecer a las usuarias y usuarios un enfoque rápido, accesible y minimalista de los clásicos juegos de trivial/quizzes.

Con ello se pretende ofrecer una herramienta altamente dinámica e interactiva con la que poder distraerse y liberar el estrés de la rutina diaria de forma fácil, sencilla y sin tener que dedicarle una gran cantidad de tiempo. A su vez, colateralmente, ofrece la oportunidad de adquirir nuevos datos y conocimientos.

El desarrollo del proyecto persigue por tanto la obtención de un producto final que pueda
servir de entretenimiento a un gran número de personas adaptando los juegos de preguntas y respuestas al formato filler games (juegos simples, cortos y con dinámicas fáciles de entender).

Por tanto, es prioritario el crear una web que sea cómoda y eficaz para los propósitos anteriormente descritos, otorgando por ello gran importancia al feedback que recibirán los usuarios y usuarias al interactuar con la UI y la inmediatez para poder estar jugando cuanto antes.

