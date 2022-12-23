var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const URL_API = "https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books";
function getBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(URL_API);
            const data = yield res.json();
            startingPoint(data);
        }
        catch (error) {
            console.log(error);
            return;
        }
    });
}
function startingPoint(data) {
    createBookElements(data);
    createBookChildElements(data);
    fillElementsWithData(data);
    createEventListener(data);
}
function createBookElements(data) {
    const parentElem = document.querySelector(".main__book_container");
    for (let i = 0; i < data.length; i++) {
        let childElem = document.createElement("article");
        parentElem.appendChild(childElem);
        let currentChild = document.querySelector(`.main__book_container :nth-child(${i + 1})`);
        currentChild.setAttribute("id", `book${i + 1}`);
        currentChild.style.backgroundColor = data[i].color;
        currentChild.classList.add("book");
    }
}
function createBookChildElements(data) {
    for (let i = 0; i < data.length; i++) {
        let book = document.querySelector(`#book${i + 1}`);
        let author = document.createElement("h2");
        let title = document.createElement("h2");
        book.appendChild(author);
        book.appendChild(title);
    }
}
function fillElementsWithData(data) {
    for (let i = 0; i < data.length; i++) {
        document.querySelector(`#book${i + 1} :nth-child(1)`).innerHTML = data[i].author;
        document.querySelector(`#book${i + 1} :nth-child(2)`).innerHTML = data[i].title;
    }
}
function createEventListener(data) {
    document.addEventListener("click", (event) => {
        let whatClicked = event.target;
        if (whatClicked.classList.contains("book") || whatClicked.tagName === "H2") {
            if (!whatClicked.hasAttribute("id")) {
                whatClicked.id = whatClicked.parentElement.getAttribute("id");
            }
            hideAndShowWindows();
            printBookInfo(data, whatClicked.id);
        }
        else if (whatClicked.classList.contains("main__topic") || whatClicked.id === "main__btn") {
            document.querySelector(".main__book_container").classList.remove("hide");
            document.querySelector(".main__book_info").classList.add("hide");
        }
    });
}
function hideAndShowWindows() {
    document.querySelector(".main__book_container").classList.toggle("hide");
    document.querySelector(".main__book_info").classList.toggle("hide");
}
function printBookInfo(data, bookid) {
    const slicedid = parseInt(bookid.slice(4));
    document.querySelector(".main__book_info").style.background = data[slicedid - 1].color;
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
