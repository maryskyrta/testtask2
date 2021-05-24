import './scss/styles.scss';
import $ from 'jquery';
let timeout;

function checkInput(){
    clearTimeout(timeout);
    let query = $(".book-search-input").val();
    console.log(query);
    if(query.length > 3){
        timeout = setTimeout(()=>{updateSearchResult(query);}, 3000);
    }
}

let addBook = ({
                   volumeInfo
               }) => {
    let $book = $(`<div class="book-item">`);
    $book.append($(`<p class="book-title">`).text(volumeInfo.title));
    if(volumeInfo.subtitle)
        $book.append($(`<p class="book-subtitle">`).text(volumeInfo.subtitle));
    if(volumeInfo.authors){
        let authors = volumeInfo.authors.join(',');
        $book.append($(`<p class="book-authors">`).text(authors));
    }
    return $book;
}

function updateSearchResult(query){
    $.ajax({
        url: 'https://www.googleapis.com/books/v1/volumes?q='+query,
        method: 'get',
        dataType: 'json',
        success: function(json){
            $('.book-search-result').empty();
            json.items.forEach(book => $('.book-search-result').append(addBook(book)));
        },
        error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
    });
}

$(document).ready(function(){
    $(".book-search-input").on('input', checkInput);
    }
);