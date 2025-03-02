console.log("Content script inyectado!");

let all = document.querySelector(".todo");

if (all) {
    all.click();
    console.log("Click en el enlace exitoso!");
} else {
    console.log("No se encontró el elemento con querySelector.");
}
let arrayNotas = [];
const checkNotas = setInterval(() => {
    const mark = document.getElementsByClassName("catedras");

    if (mark.length > 0) {
        for(let i=0; i<mark.length; i++){ 
            arrayNotas.push(mark[i].innerText);
        }
        calcPromedio();
        clearInterval(checkNotas);
    } else {
        console.log("No hay notas, reintentando clic...");
        all?.click();
        all = document.querySelector(".todo");
    }
}, 1000);


function calcPromedio() {
    let SumaNotas = 0;
    let cantidadMaterias = 0;
    arrayNotas.forEach(element => {

        //Acortamos la string
        let position = element.indexOf(')');
        let stringParsed = element.substring(position+1);

        //Buscamos si promociono
        let positionPromo = stringParsed.indexOf('Promoción');
        if(positionPromo != -1){ //Si promociono
            let nota = stringParsed.substring(positionPromo + 11, positionPromo + 15); //Volvemos a acortar la string para encontrar la nota
            nota = nota.trim();
            if(nota.indexOf('(')!=-1){
                nota = nota.substring(0, nota.indexOf('(')-1);
                
            }
            console.log('nota : ' + nota);
            cantidadMaterias++;
            SumaNotas+=parseFloat(nota);

        }
        else if(stringParsed.indexOf('Examen')!=-1){
            let positionExamen = stringParsed.indexOf('Examen');
            let nota = stringParsed.substring(positionExamen + 8, positionExamen + 13);
            nota = nota.trim();
            if(nota.indexOf('(')!=-1){
                nota = nota.substring(0, nota.indexOf('(')-1);   
            }
            SumaNotas+=parseFloat(nota);
            console.log('Regular : ' + nota);
            cantidadMaterias++;
        }
        
    });
    
    console.log('Cantidad de materias : ' + cantidadMaterias);
    console.log('Suma de notas : ' + SumaNotas);
    let promedio = SumaNotas/cantidadMaterias;
    console.log('Promedio : ' + promedio);
    
    let divPromedio = document.getElementsByClassName('titulo_operacion');

if (divPromedio.length > 0) {
    divPromedio[0].innerHTML += `
    <div class="promedioContainer" style="color:white; background-color: #2E6C8A; padding: 10px; border-radius: 5px; display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <h3 style="color: white">Promedio : ${promedio}</h3>
        <br>
        <p>Materias aprobadas : ${cantidadMaterias}</p>
        
    </div>
    `;
}
}