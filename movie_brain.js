const ha=document.querySelector(".heroes_assembly");
const h1=document.querySelector(".hero1");
const h2=document.querySelector(".hero2");
const h3=document.querySelector(".hero3");
const h4=document.querySelector(".hero4");
const l1=document.querySelector(".line");
window.addEventListener("scroll",()=>{
    const u1=h1.getBoundingClientRect();
    const u2=h2.getBoundingClientRect();
    const u3=h3.getBoundingClientRect();
    const u4=h4.getBoundingClientRect();
    const u5=l1.getBoundingClientRect();

    const sectionheight=ha.offsetHeight;
    const viewportheight=window.innerHeight;

    let p1=u1.top/(sectionheight-viewportheight);
    let p2=u2.top/(sectionheight-viewportheight);
    let p3=u3.top/(sectionheight-viewportheight);
    let p4=u4.top/(sectionheight-viewportheight);
    let p5=u5.top/(sectionheight-viewportheight);
    

    p1=Math.max(0,Math.min(1,p1));
    p2=Math.max(0,Math.min(1,p2));
    p3=Math.max(0,Math.min(1,p3));
    p4=Math.max(0,Math.min(1,p4));
    p5=Math.max(0,Math.min(1,p5));

    if(p2>0 && p2<0.5){
        let distance=75-130*p2;
        h2.style.transform=`translateX(-${distance}%)`;
    }
    if(p1>0 && p1<0.5){
        let distance=25-40*p1;
        h1.style.transform=`translateX(-${distance}%)`;
    }
    if(p3>0 && p3<0.5){
        let distance=25-40*p3;
        h3.style.transform=`translateX(${distance}%) scale(1.45)`;
    }
    if(p4>0 && p4<0.5){
        let distance=75-130*p4;
        h4.style.transform=`translateX(${distance}%) scale(1.2)`;
    }
    if(p5>=0.5){
        let width=160-160*p5;
        l1.style.width=`${width}%`;
    }
})
async function getMovies(){
    try{
    const url="https://api.themoviedb.org/3/movie/popular"
    const response=await fetch(url,{
        method:"GET",
        headers:{
            "accept":"application/json",
            "Authorization":'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDA5MTY0NzU0NDIyNjA2MjlhOGE4ZTdmZTVmMTJjOSIsIm5iZiI6MTc5NTQ1Mzg5Ny44NjMwMDAyLCJzdWIiOiI2YjA0NzNjOTg3NGZhNzdiMzI5MTg1Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BhiGNznIaEJHnHXtjmLz9CgL6l6dJzyTFs2DC2WXyH4'
        }
    })
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data=await response.json();
    console.log(data);
    bifurcateMovieData(data);
    }
    catch(error){
        console.error("Error fetching movie data:", error.message);
    }
}
getMovies();
const mov=document.querySelector('.movies');
const max=120;
function bifurcateMovieData(data){
    data.results.forEach((movie)=>{
        const title=movie.title;
    const overview=movie.overview;
    const releaseDate=movie.release_date;
    let rating=movie.vote_average;
    const posterPath=movie.poster_path;
    const backdropPath=movie.backdrop_path;
    const posterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
    const backdropUrl = `https://image.tmdb.org/t/p/w1280${backdropPath}`;
    const card = document.createElement("div");
    const img = document.createElement("img");
    const title1 = document.createElement("h2");
    const desc1 = document.createElement("p");
    const rd=document.createElement("h3");
    const rt=document.createElement("h3");

    rating=Math.round(rating*100);
    rating=rating/100;

    rd.innerText="Released on: "+releaseDate;
    rt.innerText="⭐"+rating;
    img.src=posterUrl;
    img.alt=title;
    title1.innerText=title;
    if(overview.length>max){
        desc1.innerText=overview.slice(0,max).trim() + "...";
    }
    else{
        desc1.innerText=overview;
    }
    card.append(img);
    card.append(title1);
    card.append(desc1);
    card.append(rd);
    card.append(rt);
    mov.append(card);
    card.classList.toggle('movie');
    })
    
}
async function getMoreMovies(){
    try{
        const second_response= await fetch("https://api.themoviedb.org/3/movie/top_rated",{
            method:"GET",
            headers:{
                "accept":"application/json",
                "Authorization":'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDA5MTY0NzU0NDIyNjA2MjlhOGE4ZTdmZTVmMTJjOSIsIm5iZiI6MTc5NTQ1Mzg5Ny44NjMwMDAyLCJzdWIiOiI2YjA0NzNjOTg3NGZhNzdiMzI5MTg1Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BhiGNznIaEJHnHXtjmLz9CgL6l6dJzyTFs2DC2WXyH4'
            }
        })

        if(!second_response.ok){
            throw new Error(`Response is not working ${response.status}`);
        }
        const new_response= await second_response.json();
        bifurcateMoreMovies(new_response);
    }
    catch(error){
        console.error("Error fetching movie data:",error.message);
    }
}
getMoreMovies();
const mov1=document.querySelector(".movies1");
function bifurcateMoreMovies(new_response){
    new_response.results.forEach((new_response)=>{
    const card=document.createElement("div");
    const poster=document.createElement("img");
    const desc=document.createElement("p");
    const title=document.createElement("h2");
    const rd=document.createElement("h3");
    const rt=document.createElement("h3");

    const poster_path=new_response.poster_path;
    const posterURL=`https://image.tmdb.org/t/p/w500${poster_path}`;

    poster.src=posterURL;
    poster.alt=new_response.title;

    title.innerText=new_response.title;
    if(new_response.overview.length>120){
        desc.innerText=new_response.overview.slice(0,120).trim()+"...";
    }
    else{
        desc.innerText=new_response.overview;
    }
    rd.innerText=new_response.release_date;
    const va=Math.round(100*new_response.vote_average)/100;
    rt.innerText="⭐"+va;

    card.classList.toggle("movie");

    card.append(poster);
    card.append(title);
    card.append(desc);
    card.append(rd);
    card.append(rt);
    mov1.append(card);
    })
    
}
const s=document.getElementById("search_bar");
const si=document.getElementById("search_input");
const i=document.querySelector(".invalid");
const st=document.querySelectorAll(".segment_title");
s.addEventListener('submit',(event)=>{
    const mov2=mov.querySelectorAll(".movie");
    const mov3=mov1.querySelectorAll(".movie");
    let count=0;
    event.preventDefault();
    let search=si.value.trim();
    i.style.display="none";
    if(!search){
        st.forEach((st)=>{
            st.style.display="block";
        })
        i.style.display="none";
        mov2.forEach((card)=>{
            card.style.display="flex";
        })
        mov3.forEach((card)=>{
            card.style.display="flex";
        })
        return;
    }
    st.forEach((st)=>{
            st.style.display="none";
        })
    mov2.forEach((card)=>{
        const title=card.querySelector("h2");
        const comp=title.innerText.slice(0,search.length).toLowerCase();
        search=search.toLowerCase();
        if(comp==search){
            
            count++;
            card.style.display="flex";
        }
        else{
            card.style.display="none"
        }
    })
    mov3.forEach((card)=>{
        const title=card.querySelector("h2");
        const comp=title.innerText.slice(0,search.length).toLowerCase();
        search=search.toLowerCase();
        if(comp==search){
            
            count++;
            card.style.display="flex";
        }
        else{
            card.style.display="none"
        }
    })
    if(count==0){
        i.style.display="block";
    }
})