
const mov=document.querySelector('.movies');
const was=document.querySelector('.watchlist_area')
const wa=document.querySelector('.watchlist_area1');
const swa=document.querySelector('.swatchlist_area');
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

const max=100;
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
    const add=document.createElement("button");
    const urev=document.createElement("textarea");
    const urt=document.createElement("input");
    const sb=document.createElement("button");
    urev.placeholder="Leave a Review";
    urev.rows=3;
    sb.className="submit";
    sb.innerText="Submit";
    urt.type="number";
    urt.min="0";
    urt.max="10";
    urt.step="0.5";
    urt.placeholder="Your rating";

    rating=Math.round(rating*100);
    rating=rating/100;
    add.innerText="Add+";

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
    card.append(urev);
    card.append(urt);
    card.append(sb);
    card.append(add);
    
    sb.addEventListener('click',()=>{
        const revText=urev.value.trim();
        const revnum=Number(urt.value);
        const disp=document.createElement("div");
        disp.innerText="User Review:\n"+ revText + "\n"+"User Rating : "+revnum;
        urev.remove();
        urt.remove();
        card.append(disp);
    })
    mov.append(card);
    /* add.addEventListener('click',()=>{
        
        if(add.classList.toggle('clicked_button')){
            add.innerText="Added"+"✔️";
            wa.append(card);
        }
        else{
            add.innerText="Add+";
            card.remove();
            mov.append(card);
        }
    }) */
   add.addEventListener("click", () => {
    let watchlist = getWatchlist();

    if (add.classList.toggle("clicked_button")) {
      add.innerText = "Added✔️";
      wa.append(card);

      if (!watchlist.some((item) => item.id === movieId)) {
        watchlist.push({
          id: movieId,
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        });
        setWatchlist(watchlist);
      }
    } else {
      add.innerText = "Add+";
      card.remove();
      mov5.append(card);

      watchlist = watchlist.filter((item) => item.id !== movieId);
      setWatchlist(watchlist);
    }
  });
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
    const add=document.createElement("button");
    const urev=document.createElement("textarea");
    const urt=document.createElement("input");
    const sb=document.createElement("button");
    urev.placeholder="Leave a Review";
    urev.rows=3;
    sb.className="submit";
    sb.innerText="Submit";
    urt.type="number";
    urt.min="0";
    urt.max="10";
    urt.step="0.5";
    urt.placeholder="Your rating";

    const poster_path=new_response.poster_path;
    const posterURL=`https://image.tmdb.org/t/p/w500${poster_path}`;

    poster.src=posterURL;
    poster.alt=new_response.title;
    add.innerText="Add+";

    title.innerText=new_response.title;
    if(new_response.overview.length>100){
        desc.innerText=new_response.overview.slice(0,100).trim()+"...";
    }
    else{
        desc.innerText=new_response.overview;
    }
    rd.innerText=new_response.release_date;
    const va=Math.round(100*new_response.vote_average)/100;
    rt.innerText="⭐"+va;
    add.innerText="Add+";

    card.classList.toggle("movie");

    card.append(poster);
    card.append(title);
    card.append(desc);
    card.append(rd);
    card.append(rt);
    
    card.append(urev);
    card.append(urt);
    card.append(sb);
    card.append(add);
    
    sb.addEventListener('click',()=>{
        const revText=urev.value.trim();
        const revnum=Number(urt.value);
        const disp=document.createElement("div");
        disp.innerText="User Review:\n"+ revText + "\n"+"User Rating : "+revnum;
        urev.remove();
        urt.remove();
        card.append(disp);
    })
    mov1.append(card);
    /* add.addEventListener('click',()=>{
        
        if(add.classList.toggle('clicked_button')){
            add.innerText="Added"+"✔️";
            wa.append(card);
        }
        else{
            add.innerText="Add+";
            card.remove();
            mov1.append(card);
        }
    }) */
   add.addEventListener("click", () => {
    let watchlist = getWatchlist();

    if (add.classList.toggle("clicked_button")) {
      add.innerText = "Added✔️";
      wa.append(card);

      if (!watchlist.some((item) => item.id === movieId)) {
        watchlist.push({
          id: movieId,
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        });
        setWatchlist(watchlist);
      }
    } else {
      add.innerText = "Add+";
      card.remove();
      mov5.append(card);

      watchlist = watchlist.filter((item) => item.id !== movieId);
      setWatchlist(watchlist);
    }
  });
    })
    
}

const mov5=document.querySelector(".movies2");
let mov6=undefined;
async function getEvenMoreMovies(){
    try{
        let p=1;
        for(p=1;p<=5;p++){
            const second_response= await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e00916475442260629a8a8e7fe5f12c9&page=${p}`,{
            method:"GET",
            headers:{
                "accept":"application/json",
                "Authorization":'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDA5MTY0NzU0NDIyNjA2MjlhOGE4ZTdmZTVmMTJjOSIsIm5iZiI6MTc5NTQ1Mzg5Ny44NjMwMDAyLCJzdWIiOiI2YjA0NzNjOTg3NGZhNzdiMzI5MTg1Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BhiGNznIaEJHnHXtjmLz9CgL6l6dJzyTFs2DC2WXyH4'
            }
        })

        if(!second_response.ok){
            throw new Error(`Response is not working ${second_response.status}`);
        }
        const new_response= await second_response.json();
        console.log("Fetched page:", p, "First movie:", new_response.results?.[0]?.title, "Count:", new_response.results?.length);
        bifurcateEvenMoreMovies(new_response);
        }
        mov6=mov5.querySelectorAll(".movie");
        console.log("Found .movie cards:", mov6.length);
        mov6.forEach((card)=>{
            card.style.display="none";
        })
    }
    catch(error){
        console.error("Error fetching movie data:",error.message);
    }
}
getEvenMoreMovies();
function bifurcateEvenMoreMovies(new_response){
    new_response.results.forEach((new_response)=>{
    const card=document.createElement("div");
    const poster=document.createElement("img");
    const desc=document.createElement("p");
    const title=document.createElement("h2");
    const rd=document.createElement("h3");
    const rt=document.createElement("h3");
    const add=document.createElement("button");
    const urev=document.createElement("textarea");
    const urt=document.createElement("input");
    const sb=document.createElement("button");
    urev.placeholder="Leave a Review";
    urev.rows=3;
    sb.className="submit";
    urt.type="number";
    sb.innerText="Submit";
    urt.min="0";
    urt.max="10";
    urt.step="0.5";
    urt.placeholder="Your rating";

    const poster_path=new_response.poster_path;
    const posterURL=`https://image.tmdb.org/t/p/w500${poster_path}`;

    poster.src=posterURL;
    poster.alt=new_response.title;
    add.innerText="Add+";

    title.innerText=new_response.title;
    if(new_response.overview.length>100){
        desc.innerText=new_response.overview.slice(0,100).trim()+"...";
    }
    else{
        desc.innerText=new_response.overview;
    }
    rd.innerText=new_response.release_date;
    const va=Math.round(100*new_response.vote_average)/100;
    rt.innerText="⭐"+va;
    add.innerText="Add+";

    card.classList.toggle("movie");

    card.append(poster);
    card.append(title);
    card.append(desc);
    card.append(rd);
    card.append(rt);
    card.append(urev);
    card.append(urt);
    card.append(sb);
    card.append(add);
    
    sb.addEventListener('click',()=>{
        const revText=urev.value.trim();
        const revnum=Number(urt.value);
        const disp=document.createElement("div");
        disp.innerText="User Review:\n"+ revText + "\n"+"User Rating : "+revnum;
        urev.remove();
        urt.remove();
        card.append(disp);
    })
    mov5.append(card);
    /* add.addEventListener('click',()=>{
        
        if(add.classList.toggle('clicked_button')){
            add.innerText="Added"+"✔️";
            wa.append(card);
        }
        else{
            add.innerText="Add+";
            card.remove();
            mov5.append(card);
        }
    }) */
   add.addEventListener("click", () => {
    let watchlist = getWatchlist();

    if (add.classList.toggle("clicked_button")) {
      add.innerText = "Added✔️";
      wa.append(card);

      if (!watchlist.some((item) => item.id === movieId)) {
        watchlist.push({
          id: movieId,
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        });
        setWatchlist(watchlist);
      }
    } else {
      add.innerText = "Add+";
      card.remove();
      mov5.append(card);

      watchlist = watchlist.filter((item) => item.id !== movieId);
      setWatchlist(watchlist);
    }
  });
    
    })
    console.log("Total cards in mov5:", mov5.children.length);
}
const s=document.getElementById("search_bar");
const si=document.getElementById("search_input");
const i=document.querySelector(".invalid");
const st=document.querySelectorAll(".segment_title");
const mov2=mov.querySelectorAll(".movie");
const mov3=mov1.querySelectorAll(".movie");
const mov4=wa.querySelectorAll(".movie");
mov6=mov5.querySelectorAll(".movie");
const sr=document.querySelector(".search_result");
const srr=sr.querySelectorAll(".movie");
s.addEventListener("submit", (submit) => {
  submit.preventDefault();
  mov.style.display = "none";
  mov1.style.display = "none";
  sr.innerHTML = "";
  sr.style.display = "flex";
  st.forEach((el) => {
    el.style.display = "none";
  });
  i.style.display = "none";

  const q = si.value.trim();
  if (!q) {
    sr.innerHTML = "";
    sr.style.display = "none";
    was.style.display = "none";
    i.style.display = "none";
    mov.style.display = "flex";
    mov1.style.display = "flex";
    st.forEach((el) => {
      el.style.display = "none";
    });
    return;
  }

  getAllMovies();

  async function getAllMovies() {
    try {
      const my_response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(q)}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDA5MTY0NzU0NDIyNjA2MjlhOGE4ZTdmZTVmMTJjOSIsIm5iZiI6MTc5NTQ1Mzg5Ny44NjMwMDAyLCJzdWIiOiI2YjA0NzNjOTg3NGZhNzdiMzI5MTg1Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BhiGNznIaEJHnHXtjmLz9CgL6l6dJzyTFs2DC2WXyH4",
          },
        }
      );

      if (!my_response.ok) {
        throw new Error(`Unable to fetch response ${my_response.status}`);
      }

      const new_my_response = await my_response.json();
      bifurcateAllMovies(new_my_response);
    } catch (error) {
      console.error("Error fetching movie data:", error.message);
    }
  }

  function bifurcateAllMovies(new_my_response) {
    (new_my_response.results).forEach((movieItem) => {
      createMovieCard(movieItem, sr);
    });
    if(new_my_response.results.length==0){
        i.style.display="block";
    }
    else{
        i.style.display="none";
    }
  }
});
/* s.addEventListener('submit',(submit)=>{
    submit.preventDefault();
    mov.style.display="none";
    mov1.style.display="none";
    sr.innerHTML="";
    sr.style.display="flex";
    st.forEach((st)=>{
            st.style.display="none";
        })
    i.style.display="none";
    let q=si.value.trim();
     if(!q){
        sr.innerHTML="";
        sr.style.display="none";
        was.style.display="none";
        st.forEach((st)=>{
            st.style.display="flex";
        })
        i.style.display="none";
        mov.style.display="flex";
        mov1.style.display="flex";
        st.forEach((st)=>{
            st.style.display="none";
        })
        return;
    }
    getAllMovies();
    async function getAllMovies(){
        try{
        const my_response=await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(q)}`,{
            method:"GET",
            headers:{
                "accept":"application/json",
                "Authorization":'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDA5MTY0NzU0NDIyNjA2MjlhOGE4ZTdmZTVmMTJjOSIsIm5iZiI6MTc5NTQ1Mzg5Ny44NjMwMDAyLCJzdWIiOiI2YjA0NzNjOTg3NGZhNzdiMzI5MTg1Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BhiGNznIaEJHnHXtjmLz9CgL6l6dJzyTFs2DC2WXyH4'
            }
        });
        if(!my_response.ok){
            throw new Error(`Unable to fetch response ${my_response.status}`);
        }
        const new_my_response=await my_response.json();
        bifurcateAllMovies(new_my_response);
    }
    catch(error){
        console.error("Error fetching movie data:",error.message);
    }
}

function bifurcateAllMovies(new_my_response){
    new_my_response.results.forEach((new_my_response)=>{
        const card=document.createElement("div");
    const poster=document.createElement("img");
    const desc=document.createElement("p");
    const title=document.createElement("h2");
    const rd=document.createElement("h3");
    const rt=document.createElement("h3");
    const add=document.createElement("button");
    const urev=document.createElement("textarea");
    const urt=document.createElement("input");
    const sb=document.createElement("button");
    urt.innerText="Leave a Review";
    sb.innerText="Submit";
    const poster_path=new_my_response.poster_path;
    const posterURL=`https://image.tmdb.org/t/p/w500${poster_path}`;

    poster.src=posterURL;
    poster.alt=new_my_response.title;
    add.innerText="Add+";

    title.innerText=new_my_response.title;
    if((new_my_response.overview||"").length>100){
        desc.innerText=new_my_response.overview.slice(0,100).trim()+"...";
    }
    else{
        desc.innerText=new_my_response.overview;
    }
    rd.innerText=new_my_response.release_date;
    const va=Math.round(100*new_my_response.vote_average)/100;
    rt.innerText="⭐"+va;
    add.innerText="Add+";

    card.classList.toggle("movie");

    card.append(poster);
    card.append(title);
    card.append(desc);
    card.append(rd);
    card.append(rt);
    card.append(urev);
    card.append(urt);
    card.append(sb);
    card.append(add);
    sr.append(card);
    card.style.display="flex";
    
    sb.addEventListener('click',()=>{
        const revText=urev.value.trim();
        const revnum=Number(urt.value);
        const disp=document.createElement("div");
        disp.innerText="User Review:\n"+ revText + "\n"+"User Rating : "+revnum;
        urev.remove();
        urt.remove();
        card.append(disp);
    })
    add.addEventListener('click',()=>{
        
        if(add.classList.toggle('clicked_button')){
            add.innerText="Added"+"✔️";
            wa.append(card);
        }
        else{
            add.innerText="Add+";
            card.remove();
            mov5.append(card);
        }
    })
    })
    
}
}) */
s.addEventListener("submit", (submit) => {
  submit.preventDefault();
  mov.style.display = "none";
  mov1.style.display = "none";
  sr.innerHTML = "";
  sr.style.display = "flex";
  st.forEach((el) => {
    el.style.display = "none";
  });
  i.style.display = "none";

  const q = si.value.trim();
  if (!q) {
    sr.innerHTML = "";
    sr.style.display = "none";
    was.style.display = "none";
    i.style.display = "none";
    mov.style.display = "flex";
    mov1.style.display = "flex";
    return;
  }

  getActorId();

  async function getActorId() {
    try {
      const m_response = await fetch(
        `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(q)}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDA5MTY0NzU0NDIyNjA2MjlhOGE4ZTdmZTVmMTJjOSIsIm5iZiI6MTc5NTQ1Mzg5Ny44NjMwMDAyLCJzdWIiOiI2YjA0NzNjOTg3NGZhNzdiMzI5MTg1Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BhiGNznIaEJHnHXtjmLz9CgL6l6dJzyTFs2DC2WXyH4",
          },
        }
      );

      if (!m_response.ok) {
        throw new Error(`Unable to find actor name ${m_response.status}`);
      }

      const n_response = await m_response.json();
      const actorId = n_response.results?.[0]?.id;
      if (!actorId) return;

      getActorMovies(actorId);
    } catch (error) {
      console.error("New Error found:", error.message);
    }
  }

  async function getActorMovies(actor_id) {
    if (!actor_id) return;
    try {
      const id_response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?with_cast=${actor_id}&sort_by=popularity.desc`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDA5MTY0NzU0NDIyNjA2MjlhOGE4ZTdmZTVmMTJjOSIsIm5iZiI6MTc5NTQ1Mzg5Ny44NjMwMDAyLCJzdWIiOiI2YjA0NzNjOTg3NGZhNzdiMzI5MTg1Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BhiGNznIaEJHnHXtjmLz9CgL6l6dJzyTFs2DC2WXyH4",
          },
        }
      );

      if (!id_response.ok) {
        throw new Error(`Unable to recieve actor work ${id_response.status}`);
      }

      const n_id_response = await id_response.json();
      bifurcateActorMovies(n_id_response);
    } catch (error) {
      console.error("New Error found:", error.message);
    }
  }

  function bifurcateActorMovies(new_my_response) {
    (new_my_response.results || []).forEach((movieItem) => {
      createMovieCard(movieItem, sr);
    });
  }
});
/* s.addEventListener('submit',(submit)=>{
    submit.preventDefault();
    mov.style.display="none";
    mov1.style.display="none";
    sr.innerHTML="";
    sr.style.display="flex";
    st.forEach((st)=>{
            st.style.display="none";
        })
    i.style.display="none";
    let q=si.value.trim();
     if(!q){
        sr.innerHTML="";
        sr.style.display="none";
        was.style.display="none";
        i.style.display="none";
        mov.style.display="flex";
        mov1.style.display="flex";
        st.forEach((st)=>{
            st.style.display="none";
        })
        return;
    }
    getActorId();
    async function getActorId(){
        try{
        const m_response=await fetch(`https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(q)}`,{
            method:"GET",
            headers:{
                "accept":"application/json",
                "Authorization":'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDA5MTY0NzU0NDIyNjA2MjlhOGE4ZTdmZTVmMTJjOSIsIm5iZiI6MTc5NTQ1Mzg5Ny44NjMwMDAyLCJzdWIiOiI2YjA0NzNjOTg3NGZhNzdiMzI5MTg1Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BhiGNznIaEJHnHXtjmLz9CgL6l6dJzyTFs2DC2WXyH4'
            }
        });
        if(!m_response.ok){
            throw new Error(`Unable to find actor name ${m_response.status}`);
        }
        const n_response=await m_response.json();
        getActorMovies(n_response.results[0].id);
        }
        catch(error){
            console.error(`New Error found:`,error.message);
        }
    }
    async function getActorMovies(actor_id){
        if(!actor_id)return;
        try{
            const id_response=await fetch(`https://api.themoviedb.org/3/discover/movie?with_cast=${actor_id}&sort_by=popularity.desc`,{
                method:"GET",
                headers:{
                    "accept":"application/json",
                "Authorization":'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDA5MTY0NzU0NDIyNjA2MjlhOGE4ZTdmZTVmMTJjOSIsIm5iZiI6MTc5NTQ1Mzg5Ny44NjMwMDAyLCJzdWIiOiI2YjA0NzNjOTg3NGZhNzdiMzI5MTg1Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BhiGNznIaEJHnHXtjmLz9CgL6l6dJzyTFs2DC2WXyH4'
                }
            })
            if(!id_response.ok){
                throw new Error(`Unable to recieve actor work ${id_response.status}`);
            }
            const n_id_response=await id_response.json();
            bifurcateActorMovies(n_id_response);
        }
        catch(error){
            console.error(`New Error found:`,error.message);
        }
    }
    function bifurcateActorMovies(new_my_response){
    new_my_response.results.forEach((new_my_response)=>{
    const card=document.createElement("div");
    const poster=document.createElement("img");
    const desc=document.createElement("p");
    const title=document.createElement("h2");
    const rd=document.createElement("h3");
    const rt=document.createElement("h3");
    const add=document.createElement("button");
    const urev=document.createElement("textarea");
    const urt=document.createElement("input");
    const sb=document.createElement("button");
    urev.innerText="Leave a Review";
    sb.innerText="Submit";
    const poster_path=new_my_response.poster_path;
    const posterURL=`https://image.tmdb.org/t/p/w500${poster_path}`;

    poster.src=posterURL;
    poster.alt=new_my_response.title;
    add.innerText="Add+";

    title.innerText=new_my_response.title;
    if((new_my_response.overview||"").length>100){
        desc.innerText=new_my_response.overview.slice(0,100).trim()+"...";
    }
    else{
        desc.innerText=new_my_response.overview;
    }
    rd.innerText=new_my_response.release_date;
    const va=Math.round(100*new_my_response.vote_average)/100;
    rt.innerText="⭐"+va;
    add.innerText="Add+";

    card.classList.toggle("movie");

    card.append(poster);
    card.append(title);
    card.append(desc);
    card.append(rd);
    card.append(rt);
    card.append(urev);
    card.append(urt);
    card.append(sb);
    card.append(add);
    sr.append(card);
    card.style.display="flex";
    
    sb.addEventListener('click',()=>{
        const revText=urev.value.trim();
        const revnum=Number(urt.value);
        const disp=document.createElement("div");
        disp.innerText="User Review:\n"+ revText + "\n"+"User Rating : "+revnum;
        urev.remove();
        urt.remove();
        card.append(disp);
    })
    add.addEventListener('click',()=>{
        
        if(add.classList.toggle('clicked_button')){
            add.innerText="Added"+"✔️";
            wa.append(card);
        }
        else{
            add.innerText="Add+";
            card.remove();
            mov5.append(card);
        }
    })
    })
    
}

}) */

const WATCHLIST_KEY = "watchlist";

function getWatchlist() {
  try {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading watchlist:", err);
    return [];
  }
}

function setWatchlist(items) {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(items));
}

function createMovieCard(movie, targetContainer = sr) {
  const movieId = movie.id ?? movie.title;
  const card = document.createElement("div");
  const poster = document.createElement("img");
  const desc = document.createElement("p");
  const title = document.createElement("h2");
  const rd = document.createElement("h3");
  const rt = document.createElement("h3");
  const add = document.createElement("button");
  const urev = document.createElement("textarea");
  const urt = document.createElement("input");
  const sb = document.createElement("button");

  urev.placeholder = "Leave a Review";
  urt.placeholder = "Your rating";
  sb.innerText = "Submit";
  urt.min="0";
  urt.max="10";
  urt.step="0.5";

  poster.src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";
  poster.alt = movie.title || "Movie poster";

  title.innerText = movie.title || "Untitled";

  const overviewText = movie.overview || "";
  desc.innerText =
    overviewText.length > 100
      ? overviewText.slice(0, 100).trim() + "..."
      : overviewText;

  rd.innerText = movie.release_date || "";
  const va = Math.round(100 * (movie.vote_average || 0)) / 100;
  rt.innerText = "⭐" + va;

  const isAlreadySaved = getWatchlist().some((item) => item.id === movieId);
  if (isAlreadySaved) {
    add.classList.add("clicked_button");
    add.innerText = "Added✔️";
  } else {
    add.innerText = "Add+";
  }

  card.classList.add("movie");
  card.style.display = "flex";

  card.append(poster, title, desc, rd, rt, urev, urt, sb, add);
  targetContainer.append(card);

  sb.addEventListener("click", () => {
    const revText = urev.value.trim();
    const revnum = Number(urt.value);
    const disp = document.createElement("div");
    if (urt.value.trim() === "" || Number.isNaN(revnum) || revnum > 10 || revnum < 0) {
  disp.innerText = "Invalid Entry";
} else {
  disp.innerText = "User Review:\n" + revText + "\n" + "User Rating : " + revnum;
}
    sb.remove();
    urev.remove();
    urt.remove();
    card.append(disp);
  });

  add.addEventListener("click", () => {
    let watchlist = getWatchlist();

    if (add.classList.toggle("clicked_button")) {
      add.innerText = "Added✔️";
      wa.append(card);

      if (!watchlist.some((item) => item.id === movieId)) {
        watchlist.push({
          id: movieId,
          title: movie.title,
          poster_path: movie.poster_path,
          overview: movie.overview,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        });
        setWatchlist(watchlist);
      }
    } else {
      add.innerText = "Add+";
      card.remove();
      mov5.append(card);

      watchlist = watchlist.filter((item) => item.id !== movieId);
      setWatchlist(watchlist);
    }
  });

  return card;
}

function renderWatchlist() {
  const watchlist = getWatchlist();
  wa.innerHTML = "";

  /* if (watchlist.length === 0) {
    wa.innerHTML = "<p>Your watchlist is empty.</p>";
    return;
  }
  else{
    wa.innerHTML="";
  } */

  watchlist.forEach((savedMovie) => {
    createMovieCard(savedMovie, wa);
  });
}

s.addEventListener("submit", (submit) => {
  submit.preventDefault();
  mov.style.display = "none";
  mov1.style.display = "none";
  sr.innerHTML = "";
  sr.style.display = "flex";
  st.forEach((el) => {
    el.style.display = "none";
  });
  i.style.display = "none";

  const q = si.value.trim();
  if (!q) {
    sr.innerHTML = "";
    sr.style.display = "none";
    was.style.display = "none";
    i.style.display = "none";
    mov.style.display = "flex";
    mov1.style.display = "flex";
    return;
  }

  getDirectorId();

  async function getDirectorId() {
    try {
      const m_response = await fetch(
        `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(q)}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDA5MTY0NzU0NDIyNjA2MjlhOGE4ZTdmZTVmMTJjOSIsIm5iZiI6MTc5NTQ1Mzg5Ny44NjMwMDAyLCJzdWIiOiI2YjA0NzNjOTg3NGZhNzdiMzI5MTg1Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BhiGNznIaEJHnHXtjmLz9CgL6l6dJzyTFs2DC2WXyH4",
          },
        }
      );

      if (!m_response.ok) {
        throw new Error(`Unable to find Director name ${m_response.status}`);
      }

      const n_response = await m_response.json();
      const directorId = n_response.results?.[0]?.id;
      if (!directorId) return;

      getDirectorMovies(directorId);
    } catch (error) {
      console.error("New Error found:", error.message);
    }
  }

  async function getDirectorMovies(directorId) {
    if (!directorId) return;
    try {
      const id_response = await fetch(
        `https://api.themoviedb.org/3/person/${directorId}/movie_credits`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDA5MTY0NzU0NDIyNjA2MjlhOGE4ZTdmZTVmMTJjOSIsIm5iZiI6MTc5NTQ1Mzg5Ny44NjMwMDAyLCJzdWIiOiI2YjA0NzNjOTg3NGZhNzdiMzI5MTg1Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BhiGNznIaEJHnHXtjmLz9CgL6l6dJzyTFs2DC2WXyH4",
          },
        }
      );

      if (!id_response.ok) {
        throw new Error(`Unable to recieve director work ${id_response.status}`);
      }

      const n_id_response = await id_response.json();
      const directed_response = (n_id_response.crew || []).filter(
        (item) => item.job === "Director"
      );

      bifurcateDirectorMovies({ results: directed_response });
    } catch (error) {
      console.error("New Error found:", error.message);
    }
  }

  function bifurcateDirectorMovies(new_my_response) {
    new_my_response.results.forEach((movieItem) => {
      createMovieCard(movieItem, sr);
    });
  }
});
/* s.addEventListener('submit',(submit)=>{
    submit.preventDefault();
    mov.style.display="none";
    mov1.style.display="none";
    sr.innerHTML="";
    sr.style.display="flex";
    st.forEach((st)=>{
            st.style.display="none";
        })
    i.style.display="none";
    let q=si.value.trim();
     if(!q){
        sr.innerHTML="";
        sr.style.display="none";
        was.style.display="none";
        i.style.display="none";
        mov.style.display="flex";
        mov1.style.display="flex";
        st.forEach((st)=>{
            st.style.display="none";
        })
        return;
    }
    getDirectorId();
    async function getDirectorId(){
        try{
        const m_response=await fetch(`https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(q)}`,{
            method:"GET",
            headers:{
                "accept":"application/json",
                "Authorization":'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDA5MTY0NzU0NDIyNjA2MjlhOGE4ZTdmZTVmMTJjOSIsIm5iZiI6MTc5NTQ1Mzg5Ny44NjMwMDAyLCJzdWIiOiI2YjA0NzNjOTg3NGZhNzdiMzI5MTg1Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BhiGNznIaEJHnHXtjmLz9CgL6l6dJzyTFs2DC2WXyH4'
            }
        });
        if(!m_response.ok){
            throw new Error(`Unable to find Director name ${m_response.status}`);
        }
        const n_response=await m_response.json();
        getDirectorMovies(n_response.results[0].id);
        }
        catch(error){
            console.error(`New Error found:`,error.message);
        }
    }
    async function getDirectorMovies(actor_id){
        if(!actor_id)return;
        try{
            const id_response=await fetch(`https://api.themoviedb.org/3/person/$${actor_id}/movie_credits`,{
                method:"GET",
                headers:{
                    "accept":"application/json",
                "Authorization":'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMDA5MTY0NzU0NDIyNjA2MjlhOGE4ZTdmZTVmMTJjOSIsIm5iZiI6MTc5NTQ1Mzg5Ny44NjMwMDAyLCJzdWIiOiI2YjA0NzNjOTg3NGZhNzdiMzI5MTg1Y2UiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.BhiGNznIaEJHnHXtjmLz9CgL6l6dJzyTFs2DC2WXyH4'
                }
            })
            if(!id_response.ok){
                throw new Error(`Unable to recieve actor work ${id_response.status}`);
            }
            const n_id_response=await id_response.json();
            const directed_response=(n_id_response.crew || []).filter(
                (item) => item.job==="Director"
            );
            bifurcateDirectorMovies({results:directed_response});
        }
        catch(error){
            console.error(`New Error found:`,error.message);
        }
    }
    function bifurcateDirectorMovies(new_my_response){
    new_my_response.results.forEach((new_my_response)=>{
    const card=document.createElement("div");
    const poster=document.createElement("img");
    const desc=document.createElement("p");
    const title=document.createElement("h2");
    const rd=document.createElement("h3");
    const rt=document.createElement("h3");
    const add=document.createElement("button");
    const urev=document.createElement("textarea");
    const urt=document.createElement("input");
    const sb=document.createElement("button");
    urev.innerText="Leave a Review";
    sb.innerText="Submit";
    const poster_path=new_my_response.poster_path;
    const posterURL=`https://image.tmdb.org/t/p/w500${poster_path}`;

    poster.src=posterURL;
    poster.alt=new_my_response.title;
    add.innerText="Add+";

    title.innerText=new_my_response.title;
    if((new_my_response.overview||"").length>100){
        desc.innerText=new_my_response.overview.slice(0,100).trim()+"...";
    }
    else{
        desc.innerText=new_my_response.overview;
    }
    rd.innerText=new_my_response.release_date;
    const va=Math.round(100*new_my_response.vote_average)/100;
    rt.innerText="⭐"+va;
    add.innerText="Add+";

    card.classList.toggle("movie");

    card.append(poster);
    card.append(title);
    card.append(desc);
    card.append(rd);
    card.append(rt);
    card.append(urev);
    card.append(urt);
    card.append(sb);
    card.append(add);
    sr.append(card);
    card.style.display="flex";
    
    sb.addEventListener('click',()=>{
        const revText=urev.value.trim();
        const revnum=Number(urt.value);
        const disp=document.createElement("div");
        disp.innerText="User Review:\n"+ revText + "\n"+"User Rating : "+revnum;
        sb.remove();
        urev.remove();
        urt.remove();
        card.append(disp);
    })
    add.addEventListener('click',()=>{
        
        if(add.classList.toggle('clicked_button')){
            add.innerText="Added"+"✔️";
            wa.append(card);
        }
        else{
            add.innerText="Add+";
            card.remove();
            mov5.append(card);
        }
    })
    })
    
}

}) */

const wb=document.querySelector(".watchlist_button");
wb.addEventListener('click',()=>{
    renderWatchlist();
    if(was.classList.toggle("swatchlist_area")){
        was.style.display="block";
    }
    else{
        was.style.display="none";
    }
})