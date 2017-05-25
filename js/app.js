/*
  Please add all Javascript code to this file.
*/
// include utils file
//same as todo and weather app
// copy HTML into Javascript
// render function that puts it into a container
// carefull of container class - use body
// $.get = fetch

//import main, { add, subtract } from './math'

// main is default
// in curly brackets are non default

//main()

//model - state

const app = document.querySelector('#app')

// All feeds
  // const obj ={
  //   array =[
  //
  //
  //   ]
  // }

const state = {

  source: 'Mashable',
  articles: [
    {
      image: '',
      title: '',
      theme: '',
      impressions: '',
      summary: '',
      link: '',
    }
  ]
  //overlay: {},
  //loading: true
}

// use render for different sources

//  loading check -
  // before call is made -
  // key in state called loading -
  // set to true while loading, false when done - use in render function.
  // if loading render loader, else render articles
  // loading - ${data.loading ? renderLoader() : renderArticles(data.articles)}

function fetchUrl(url) {
  return fetch(`https://accesscontrolalloworiginall.herokuapp.com/${url}`)
}

// Mashable

function fetchMashableArticles() {
  return fetchUrl('http://migbylab.com/feed.json')
  .then(res => res.json())
  .then(data => {
    return data.new.map(article => {
      return {
        image: article.feature_image,
        title: article.display_title,
        theme: article.channel,
        impressions: article.formatted_shares,
        summary: article.excerpt,
        link: article.short_url
      }
    })
  })
}

// Reddit

function fetchRedditArticles() {
  return fetchUrl('https://www.reddit.com/top.json')
  .then(res => res.json())
  .then(body => {
    return body.data.children.map(article => {
      return {
        image: article.data.thumbnail, //preview.images["0"].source.url,
        title: article.data.title,
        theme: article.data.subreddit,
        impressions: article.data.ups,
        summary: article.title,
        link: article.url
      }
    })
  })
}

// Digg

function fetchDiggArticles() {
  return fetchUrl('http://digg.com/api/news/popular.json')
  .then(res => res.json())
  .then(body => {
      return body.data.feed.map(article => {
      return {
        image: article.content.media.images[0].original_url,
        title: article.content.title,
        theme: article.content.tags[0].display_name,
        impressions: article.fb_shares.count,
        summary: article.content.description,
        link: article.content.url

      }
    })
  })
}

// Fetch Articles

function fetchArticles(source) {

  if (source === 'Mashable'){
    return fetchMashableArticles()
  }

  if (source === 'Digg'){
    return fetchDiggArticles()
  }

  if (source === 'Reddit'){
    return fetchRedditArticles()
  }
}



// Call fetch

fetchArticles(state.source)
.then(articles => state.articles = articles)
  //all articles together - here we push the values to a new array
.then(() => render(app, state))
//.then(state.loading = false)
//.catch(console.log("Error fetching articles"))



// delegate - event listener - controller

// On page load, show loader

window.addEventListener("load", loading, false);

function loading(event){
    document.getElementById("popUp").className = "loader"
    console.log(state)
}

// When clicked, change source
delegate("body", "click", ".article", (event) => {
  document.getElementById("popUp").className = "",
  render()

} )

document.addEventListener("click", switchSource, false)

  function switchSource(event){

    const pointer = event.target //|| event.srcElement

    if(!pointer ||pointer.nodeName !='A') return

    // loading
    document.getElementById("popUp").className = "loader"

    state.source = pointer.innerText
    fetchArticles(state.source)
    .then(articles => state.articles = articles)
    .then(() => render(app, state))

}

// When title s clicked, show #popup overlay

document.addEventListener("click", showArticle, false)

  function showArticle(event){

    const pointer = event.target //|| event.srcElement
    console.log(pointer)

    if(!pointer ||pointer.nodeName !='H3') return

    // if matches h3, find or filter the state and post out data for that article
    //once you have found matching article (based on innerText of H3 (title))
    //set state.overlay = {
    //  title = article.title,
    //  summary = article.summary
  //}
  //render(xx, state)
    document.getElementById("popUp").className = ""

// render popup for h3 clicked


    // state.source = pointer.innerText
    // fetchArticles(state.source)
    // .then(articles => state.articles = articles)
    // .then(() => render(app, state))

}


  // if(tg.innerText === "Mashable"){
  // state.source = tg.innerText
  // // Render mashable
  // fetchMashableArticles()
  // .then(values =>{
  //   state.articles = values
  // })
  // .then(render(app,state))
  // } else if(tg.innerText === "Reddit"){
  // state.source = tg.innerText
  // // Render reddit
  // fetchRedditArticles()
  // .then(values =>{
  //   state.articles = values
  // })
  // .then(render(app,state))
  //
  // }
  //
  // else if(tg.innerText === "Digg"){
  // state.source = tg.innerText
  //   // Render digg
  // fetchDiggArticles()
  // .then(values =>{
  //   state.articles = values
  // })
  // .then(render(app,state))
  // }

  // Render the article overlay

  function renderArticleOverlay() {

  }

  // Render the articles

  function renderArticles(articles) {
    return articles.map(article, id => `
      <article class="article", id="id">
        <section class="featuredImage">
          <img src="${article.image}" alt="" />
        </section>
        <section class="articleContent">
            <a href="#"><h3>${article.title}</h3></a>
            <h6>${article.theme}</h6>
        </section>
        <section class="impressions">
          ${article.impressions}
        </section>
        <div class="clearfix"></div>
      </article>
    `).join(`\n`)
  }

// Render the inside of the .container

function render(container, data) {
  container.innerHTML = `
  <header>
    <section class="container">
      <a href="#"><h1>Feedr</h1></a>
      <nav>
        <ul>
          <li><a id="newsSource" href="#">News Source: <span>${data.source}</span></a>
            <ul>
                <li><a href="#" class="m" >Mashable</a></li>
                <li><a href="#" class="d" >Digg</a></li>
                <li><a href="#" class="r" >Reddit</a></li>
            </ul>
          </li>
        </ul>
        <section id="search">
          <input type="text" name="name" value="">
          <a href="#"><img src="images/search.png" alt="" /></a>
        </section>
      </nav>
      <div class="clearfix"></div>
    </section>
  </header>
  <div id="popUp" class="loader hidden">
    <a href="#" class="closePopUp">X</a>
    <div id="articleOverlay" class="container">
      <h1>${data.overlay.title}</h1>
      <p>
        ${data.overlay.summary}
      </p>
      <a href="${data.overlay.link}" class="popUpAction" target="_blank">Read more from source</a>
    </div>
  </div>
  <section id="main" class="container">
    ${renderArticles(data.articles)}
  </section>
  `
}

render(app, state)
