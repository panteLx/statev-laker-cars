document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://api.statev.de/req/factory/";
  const token = "7YC9YM41X63SG52ZDL";
  let currentSlideIndex = 0; // Aktueller Slide-Index
  let slides = []; // Array für die Slides

  function fetchIsOpenStatus() {
    fetch(apiUrl + "list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Netzwerkantwort war nicht ok: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        const isOpen = data[0].isOpen;
        const isOpenElement = document.getElementById("is-open");
        if (isOpen !== null) {
          isOpenElement.innerText = isOpen ? "Geöffnet" : "Geschlossen";
          isOpenElement.style.color = isOpen ? "green" : "red";
        } else {
          isOpenElement.innerText = "Unbekannt";
          isOpenElement.style.color = "orange";
        }
      })
      .catch((error) => console.error("Fehler beim Abrufen der Daten:", error));
  }

  function fetchRandomCar() {
    fetch(apiUrl + "options/65c7771c35f1ed5c9e0198fc/1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Netzwerkantwort war nicht ok: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        const cars = JSON.parse(data.data);
        const randomCar = cars[Math.floor(Math.random() * cars.length)];
        document.getElementById("car-name").innerText = randomCar.Fahrzeugname;
        document.getElementById("car-zustand").innerText = randomCar.Zustand
          ? "Neuwagen"
          : "Gebrauchtwagen";
        document.getElementById("car-price").innerText = `${randomCar.Preis}$`;
        document.getElementById("car-ps").innerText = randomCar.PS;
        document.getElementById(
          "car-km"
        ).innerText = `${randomCar.Kilometerstand} KM`;
        document.getElementById("car-tuned").innerText = randomCar.Tuned
          ? "Ja"
          : "Nein";
        document.getElementById(
          "car-trunk"
        ).innerText = `${randomCar.Kofferraumvolumen} KG`;
        document.getElementById("car-image").src = decodeURIComponent(
          randomCar.PicURL
        );
      })
      .catch((error) => console.error("Fehler beim Abrufen der Daten:", error));
  }

  function fetchAllCars() {
    fetch(apiUrl + "options/65c7771c35f1ed5c9e0198fc/1", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Netzwerkantwort war nicht ok: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        const cars = JSON.parse(data.data);
        const sliderContainer = document.querySelector(".slideshow");

        // Leere den Slider-Container
        sliderContainer.innerHTML = "";

        // Füge die Autos in Gruppen von drei zur Slideshow hinzu
        for (let i = 0; i < cars.length; i += 3) {
          const slide = document.createElement("div");
          slide.className = "slide";

          for (let j = i; j < i + 3 && j < cars.length; j++) {
            const car = cars[j];
            const carDiv = document.createElement("div");
            carDiv.className = "car factory-thumb";

            const img = document.createElement("img");
            img.src = decodeURIComponent(car.PicURL);
            img.className = "img-fluid";
            img.alt = car.Fahrzeugname;

            const infoDiv = document.createElement("div");
            infoDiv.className = "factory-info car-info";

            const carName = document.createElement("h3");
            carName.className = "mb-1";
            carName.innerText = car.Fahrzeugname;

            const carDetails = document.createElement("span");
            carDetails.innerHTML = `<strong><a href="#" class="fa fa-map" style="color: #909090"></a> ${
              car.Zustand ? "Neuwagen" : "Gebrauchtwagen"
            }</strong> - ${car.Preis}$<br/>`;

            const carStats = document.createElement("p");
            carStats.className = "mt-3";
            carStats.innerHTML = `PS: ${car.PS} <br />Tuned: ${
              car.Tuned ? "Ja" : "Nein"
            } <br />Kilometerstand: ${
              car.Kilometerstand
            } KM <br />Kofferraumvolumen: ${car.Kofferraumvolumen} KG`;

            infoDiv.appendChild(carName);
            infoDiv.appendChild(carDetails);
            infoDiv.appendChild(carStats);
            carDiv.appendChild(img);
            carDiv.appendChild(infoDiv);
            slide.appendChild(carDiv);
          }
          sliderContainer.appendChild(slide);
          slides.push(slide); // Füge die Slide zum Slides-Array hinzu
        }

        // Zeige die erste Slide an
        showSlide(currentSlideIndex);
      })
      .catch((error) =>
        console.error("Fehler beim Abrufen der Fahrzeugdaten:", error)
      );
  }

  function showSlide(index) {
    // Alle Slides ausblenden
    slides.forEach((slide) => (slide.style.display = "none"));
    // Zeige den aktuellen Slide an
    slides[index].style.display = "flex";
  }

  function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    showSlide(currentSlideIndex);
  }

  function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    showSlide(currentSlideIndex);
  }

  // Event Listener für die Pfeiltasten
  document.querySelector(".left-arrow").addEventListener("click", prevSlide);
  document.querySelector(".right-arrow").addEventListener("click", nextSlide);

  // Daten abrufen
  fetchIsOpenStatus();
  fetchRandomCar();
  fetchAllCars();
});
