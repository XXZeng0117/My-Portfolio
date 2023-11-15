document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".search-box");
  const input = document.querySelector('input[type="search"]');
  const resultContainer = document.querySelector(".results");
  const resultCounter = document.querySelector("header p");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const searchTerm = input.value;
    if (searchTerm) {
      searchWikipedia(searchTerm);
    }
  });
  function searchWikipedia(searchTerm) {
    const url = `https://zh.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(
      searchTerm
    )}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispayResults(data.query.search);
      })
      .catch((error) => {
        alert("ERROR" + error);
      });
  }
  function dispayResults(results) {
    resultContainer.innerHTML = "";
    resultCounter.textContent = `搜尋結果:${results.length}筆資料`;
    results.forEach((result) => {
      const resultElement = document.createElement("div");
      resultElement.className = "result";
      resultElement.innerHTML = `<h3>${result.title}</h3>
        <p>${result.snippet}</p>
        <a href="http://zh.wikipedia.org/?curid=${result.pageid}" target="_blank">Read More</a>
        `;

      resultContainer.appendChild(resultElement);
    });
  }
});
