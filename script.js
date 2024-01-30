const containerVideos = document.querySelector(".videos__container");


async function buscarEMostrarVideos(){
try{//vai tentar executar isso, caso de um erro vai para o catch
const busca = await fetch("http://localhost:3000/videos");//O uso do async/await é uma forma de evitar o callback hell, pois permite escrever código assíncrono de forma mais linear, sem a necessidade de aninhar várias chamadas de função. Com o await, o código aguarda a conclusão de uma operação antes de prosseguir para a próxima, tornando o código mais legível e fácil de entender.

/*.then(res => res.json())
.then((videos) =>*/
const videos = await busca.json();

    videos.forEach((video)=> {
        if(video.categoria == ""){
            throw new Error('Vídeo não tem categoria');//vai jogar esse erro no catch
        }
        containerVideos.innerHTML += `
        <li class="videos__item">
            <iframe src="${video.url}" title"=${video.titulo}" frameborder="0" allowfullscreen></iframe>
                <div class="descricao-video">
                 	<img class="img-canal" src = "${video.imagem}" alt="Logo do Canal">
                 	<h3 class="titulo-video">${video.titulo}</h3>
                         <p class="titulo-canal">${video.descricao}</p>
                 </div>
              
        </li>
        `;
    
    });
}catch(error){//captar o erro e exibir na tela (somente erros que o navegador detecta)
    containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error} </p>`;
}
/*.catch((error) => {//utilizado caso ocorra algum erro 
    containerVideos.innerHTML = `<p> Houve um erro ao carregar os vídeos: ${error} </p>`;
})*/

}

buscarEMostrarVideos();