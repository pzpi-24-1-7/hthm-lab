document.addEventListener("DOMContentLoaded", fetchPopularBooks);

async function fetchPopularBooks() {
  try {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=subject:fantasy&maxResults=24&orderBy=relevance&key=AIzaSyCpm2GnI3K_CGmVAnV_tlHYB0vuQqTSagU"
    );
    const { items } = await response.json();

    const popularBooks = items
      .filter(
        ({ volumeInfo }) =>
          volumeInfo.averageRating >= 3.8 && volumeInfo.ratingsCount >= 10
      )
      .sort((a, b) => b.volumeInfo.ratingsCount - a.volumeInfo.ratingsCount)
      .slice(0, 6); // Топ-6 книг

    renderPopularBooks(popularBooks);
  } catch (error) {
    console.error("Error fetching popular books:", error);
    document.getElementById("popularBooksList").innerHTML = "<li>No books</li>";
  }
}

function renderPopularBooks(books) {
  document.getElementById("popularBooksList").innerHTML = books
    .map(
      ({
        volumeInfo: {
          title = "No title available",
          authors = ["Unknown author"],
          averageRating,
          ratingsCount,
          imageLinks: { thumbnail: image = "/img/placeholder.jpg" } = {},
          infoLink: link = "#",
        },
      }) => `
      <li class="book">
        <a href="${link}" target="_blank">
          <img src="${image}" alt="${title}" />
          <p>${title}</p>
          <p>${authors.join(", ")}</p>
          <p>⭐ ${averageRating}<span style="color:#a7a7a7">/5</span> (${ratingsCount} votes)</p>
        </a>
      </li>
    `
    )
    .join("");
}
