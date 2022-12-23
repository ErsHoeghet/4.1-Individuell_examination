const URL_API = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";

interface Books {
    id: string;
    title: string;
    author: string;
    publisher: string;
    year: string;
    pages: string;
    plot: string;
    audience: string;
    color: string;
}

async function getBooks() {
    try {
        const res = await fetch(URL_API);
        const data: Books[] = await res.json();
        startingPoint(data);
    } catch (error) {
        console.log(error);
        return;
    }
}

function startingPoint(data: Books[]): void {
    createBookElements(data);
    createBookChildElements(data);
    fillElementsWithData(data);
    createEventListener(data);
}

function createBookElements(data: Books[]): void {
    const parentElem: HTMLElement = document.querySelector(".main__book_container");

    for (let i = 0; i < data.length; i++) {
        let childElem: HTMLElement = document.createElement("article");
        parentElem.appendChild(childElem);
        let currentChild: HTMLElement = document.querySelector(`.main__book_container :nth-child(${i + 1})`);
        currentChild.setAttribute("id", `book${i + 1}`);
        currentChild.style.backgroundColor = data[i].color;
        currentChild.classList.add("book");
    }
}

function createBookChildElements(data: Books[]): void {
    for (let i = 0; i < data.length; i++) {
        let book: HTMLElement = document.querySelector(`#book${i + 1}`);
        let author: HTMLElement = document.createElement("h2");
        let title: HTMLElement = document.createElement("h2");

        book.appendChild(author);
        book.appendChild(title);
    }
}

function fillElementsWithData(data: Books[]): void {
    for (let i = 0; i < data.length; i++) {
        document.querySelector(`#book${i + 1} :nth-child(1)`).innerHTML = data[i].author;
        document.querySelector(`#book${i + 1} :nth-child(2)`).innerHTML = data[i].title;
    }
}

function createEventListener(data: Books[]): void {
    document.addEventListener("click", (event) => {
        let whatClicked = event.target as HTMLElement;
        if (whatClicked.classList.contains("book") || whatClicked.tagName === "H2") {
            if (!whatClicked.hasAttribute("id")) {
                whatClicked.id = whatClicked.parentElement.getAttribute("id");
            }
            hideAndShowWindows();
            printBookInfo(data, whatClicked.id);
        } else if (whatClicked.classList.contains("main__topic") || whatClicked.id === "main__btn") {
            document.querySelector(".main__book_container").classList.remove("hide");
            document.querySelector(".main__book_info").classList.add("hide");
        }
    });
}

function hideAndShowWindows(): void {
    document.querySelector(".main__book_container").classList.toggle("hide");
    document.querySelector(".main__book_info").classList.toggle("hide");
}

function printBookInfo(data: Books[], bookid: string): void {
    const slicedid: number = parseInt(bookid.slice(4));

    (document.querySelector(".main__book_info") as HTMLElement).style.background = data[slicedid - 1].color;

    let author = document.querySelector("#main__author").querySelector(".bookspan");
    author.innerHTML = data[slicedid - 1].author;
    let title = document.querySelector("#main__title").querySelector(".bookspan");
    title.innerHTML = data[slicedid - 1].title;
    let pages = document.querySelector("#main__pages").querySelector(".bookspan");
    pages.innerHTML = data[slicedid - 1].pages;
    let audience = document.querySelector("#main__audience").querySelector(".bookspan");
    audience.innerHTML = data[slicedid - 1].audience;
    let publisher = document.querySelector("#main__publisher").querySelector(".bookspan");
    publisher.innerHTML = data[slicedid - 1].publisher;
    let released = document.querySelector("#main__released").querySelector(".bookspan");
    released.innerHTML = data[slicedid - 1].year;
    let plot = document.querySelector("#main__plot").querySelector(".bookspan");
    plot.innerHTML = data[slicedid - 1].plot;
}

getBooks();