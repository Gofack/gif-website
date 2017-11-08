$(document).ready(function(){
    //собираем все картинки на странице
    var arr = $('img');

    var pagination = new Pagination(arr, 20);
    pagination.init();

        var none = [];

        // генерирую рандомное число
        function randomNum(imgArr) {
            return imgArr[Math.floor(Math.random() * imgArr.length)];
        }
        
        //сохраняю в переменную
        var num = randomNum(arr).id;

        //нахожу элемент с id которое равно рандомному числу
        for(var i=0; i<arr.length; i++) {
            if(num == arr[i].id) {
                //сохраняю этот элемент в массиве
                none.push(arr[i]);
            }
        }

    //по введенным символам в поле инпут
    $('#search').keyup(function() {
        var search = $(this).val();

        var found = false; 
        var chosen = [];

        //сравниваем их со значениями атрибута name у каждой картинки
        for(var i=0; i<arr.length; i++) {
            //если сходства есть и строка инпута не пустая
            if(search == arr[i].name || (arr[i].name.indexOf(search) != -1) && search != '') {
                //меняем флаг на противоположный
                found = true;
                //и добавляем этот элемент в массив
                chosen.push(arr[i]);
            }
            else {
                //все картинки которые нам не подходят будут скрыты
                $(arr[i]).css('display', 'none');
                // $(arr[i]).remove();
            }
        }

        //по сходству с текстом инпута
        if(!found) {
            //элементы вытягиваются с массива
            for(var i=0; i<chosen.length; i++){
                //и выводятся на экран
                $(chosen[i]).css('display', 'inline-block');
            }
        }

        //новый рендеринг при поиске
        var secondPagination = new secondPagination(chosen, chosen.length);
        secondPagination.init();

        function secondPagination(arr, itemsPerPage) {
            this.init = function() {
                this.newImageRender(1);
                this.renderNewPagination(1);
                this.emptyArr(chosen.length);
            },
            this.newImageRender = function(currentIndex) {

                var endIndex = currentIndex * chosen.length;
                var fromIndex;
                if(currentIndex == 0) {
                    fromIndex = 0;
                } 
                else {
                    fromIndex = (currentIndex - 1) * chosen.length;
                }

                $('.wrap').empty();

                for(var i=fromIndex; i<endIndex; i++) {
                    var img = chosen[i];
                    $('.wrap').append(img);
                }
            },

            this.renderNewPagination = function(activePageNumber) {
                var amountOfPages = Math.ceil(chosen.length / chosen.length);
                var pagination = this;
                $('.wrap').append('<div id="pagination" class="column ten push-one reset"></div>');
                $('#pagination').append('<ul class="pagination"></ul>');

                for(var i=0; i<amountOfPages; i++) {
                    var listElement = document.createElement('li');
                    var button = document.createElement('button');

                    button.innerHTML = i + 1;
                    button.className = 'btn btn-link';

                    if(i + 1 == activePageNumber) {
                        button.className += ' active';
                    }

                    $(button).on('click', function(){
                        var currentIndex = $(this).text();
                        pagination.renderGif(currentIndex);
                        pagination.renderPagination(currentIndex);
                    });

                    listElement.appendChild(button);
                    $('.pagination').append(listElement);
                }
            },
            this.emptyArr = function(length) {
                if(length == 0) {
                    $(none[0]).css('display', 'inline-block');
                    $(none[0]).css('border', '1px solid black');
                    $(none[0]).css('margin', '0 auto');
                    $('#pagination').prepend($('<li class="error">sorry, not found</li>'));
                    $('#pagination').append(none[0]);
                }
            }
        }
    });

    function Pagination(arr, itemsPerPage) {
        this.arr = arr;
        this.itemsPerPage = itemsPerPage;
        this.init = function() {
            this.renderGif(1);
            this.renderPagination(1);
        },
        this.renderGif = function(currentIndex) {

            var endIndex = this.itemsPerPage*currentIndex;
            var fromIndex;
            if(currentIndex == 0) {
                fromIndex = 0;
            } else {
                fromIndex = (currentIndex - 1) * this.itemsPerPage;
            }

            $('.wrap').empty();

            for(var i=fromIndex; i<endIndex; i++) {
                var gif = arr[i];
                $('.wrap').append(gif);
            }
        },
        this.renderPagination = function(activePageNumber) {
            var amountOfPages = Math.ceil(this.arr.length / this.itemsPerPage);
            var pagination = this;
            $('.wrap').append('<div id="pagination" class="column ten push-one reset"></div>');
            $('#pagination').append('<ul class="pagination"></ul>');

            for(var i=0; i<amountOfPages; i++) {
                var listElement = document.createElement('li');
                var button = document.createElement('button');

                button.innerHTML = i + 1;
                button.className = 'btn btn-link';

                if(i + 1 == activePageNumber) {
                    button.className += ' active';
                }

                $(button).on('click', function(){
                    var currentIndex = $(this).text();
                    // if(!currentIndex) {
                    //     currentIndex = 1;
                    // }
                    pagination.renderGif(currentIndex);
                    pagination.renderPagination(currentIndex);
                });

                listElement.appendChild(button);
                $('.pagination').append(listElement);
            }
        }
    }
});
