    var slideIndex = 1;
    showSlides(slideIndex);
    
    // Next/previous controls
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
    
    // Thumbnail image controls
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }
    
    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("demo");
      var captionText = document.getElementById("caption");
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      var slidesR = slides[slideIndex-1]
      if(slidesR){ slidesR.style.display = "block" }
      var dotsR = dots[slideIndex-1];
      if(dotsR){ dotsR.className += " active" }
      if(captionText){ captionText.innerHTML = dots[slideIndex-1].alt }
    }

    


    

    <div className="container">
    {/* Full-width images with number text */}
    <div className="mySlides">
      <div className="numbertext">1 / 6</div>
      <img src='/images/0_NEgmVl2J_RRzI9Sr.jpg' style={{width: '100%'}} alt="" />
    </div>
    <div className="mySlides">
      <div className="numbertext">2 / 6</div>
      <img src="/images/11a11585cec9fb88054ea71c21cbf4ea.png" style={{width: '100%'}} alt="" />
    </div>
    <div className="mySlides">
      <div className="numbertext">3 / 6</div>
      <img src="img_mountains_wide.jpg" style={{width: '100%'}} alt="" />
    </div>
    <div className="mySlides">
      <div className="numbertext">4 / 6</div>
      <img src="img_lights_wide.jpg" style={{width: '100%'}} alt="" />
    </div>
    <div className="mySlides">
      <div className="numbertext">5 / 6</div>
      <img src="img_nature_wide.jpg" style={{width: '100%'}} alt="" />
    </div>
    <div className="mySlides">
      <div className="numbertext">6 / 6</div>
      <img src="img_snow_wide.jpg" style={{width: '100%'}} alt="" />
    </div>
    {/* Next and previous buttons */}
    <span className="prev" onClick={()=>{plusSlides(-1)}}>❮</span>
    <span className="next" onClick={()=>{plusSlides(1)}}>❯</span>
    {/* Image text */}
    <div className="caption-container">
      <p id="caption" />
    </div>
    {/* Thumbnail images */}
    <div className="row">
      <div className="column">
        <img className="demo cursor" src="img_woods.jpg" style={{width: '100%'}} onclick="currentSlide(1)" alt="The Woods" />
      </div>
      <div className="column">
        <img className="demo cursor" src="img_5terre.jpg" style={{width: '100%'}} onclick="currentSlide(2)" alt="Cinque Terre" />
      </div>
      <div className="column">
        <img className="demo cursor" src="img_mountains.jpg" style={{width: '100%'}} onclick="currentSlide(3)" alt="Mountains and fjords" />
      </div>
      <div className="column">
        <img className="demo cursor" src="img_lights.jpg" style={{width: '100%'}} onclick="currentSlide(4)" alt="Northern Lights" />
      </div>
      <div className="column">
        <img className="demo cursor" src="img_nature.jpg" style={{width: '100%'}} onclick="currentSlide(5)" alt="Nature and sunrise" />
      </div>
      <div className="column">
        <img className="demo cursor" src="img_snow.jpg" style={{width: '100%'}} onclick="currentSlide(6)" alt="Snowy Mountains" />
      </div>
    </div>
  </div>
