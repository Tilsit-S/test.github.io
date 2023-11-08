// Textarea validation
(function () {
    var maxSymbolInTextarea = 200;
    var textareaWrapperErrorClass = "feedback-form__objective-wrapper_error";

    var textareaWrapper = document.querySelector(
        ".feedback-form__objective-wrapper"
    );
    var textarea = document.querySelector(".feedback-form__objective-wrapper");
    var currentCounter = document.querySelector(
        ".feedback-form__counter-current"
    );
    var maxCounter = document.querySelector(".feedback-form__counter-max");

    maxCounter.textContent = maxSymbolInTextarea;

    function onTextareaChange(evt) {
        var value = evt.target.value;
        var valueLength = value.length;

        currentCounter.textContent = String(valueLength);

        if (valueLength > maxSymbolInTextarea) {
            textareaWrapper.classList.add(textareaWrapperErrorClass);
        } else {
            textareaWrapper.classList.remove(textareaWrapperErrorClass);
        }
    }

    textarea.addEventListener("input", onTextareaChange);
})();

// Show more tags
(function () {
    var tagsToView = 6;
    var currentTagsView = 0;
    var showStyle = "display: block";
    var hiddenStyle = "display: none";

    var tags = Array.from(document.querySelectorAll(".feedback-form__tag"));
    var showMoreBtn = document.querySelector(".feedback-form__show-more-btn");

    tags.forEach(function (tag, i) {
        if (i + 1 > tagsToView) {
            tag.style = hiddenStyle;
        }
    });

    currentTagsView = tagsToView;

    function onShowMoreBtnClick(evt) {
        evt.preventDefault();
        var tagsLength = tags.length;

        if (tagsLength > currentTagsView) {
            currentTagsView = currentTagsView + tagsToView;

            tags.forEach(function (tag, i) {
                if (i + 1 < currentTagsView) {
                    tag.style = showStyle;
                }
            });
        }

        if (currentTagsView >= tagsLength) {
            showMoreBtn.style = hiddenStyle;
        }
    }

    showMoreBtn.addEventListener("click", onShowMoreBtnClick);
})();

// Select field
(function () {
    var selectFieldShowClass = "select-field_show-menu";
    var selectedItemClass = "select-field__item_selected";

    var selectField = document.querySelector(".select-field");
    var selectTextField = document.querySelector(".select-field__current-value");
    var selectInput = document.querySelector(".select");
    var selectList = document.querySelector(".select-field__list");
    var selectItems = Array.from(
        document.querySelectorAll(".select-field__item")
    );

    function openSelect() {
        selectField.classList.add(selectFieldShowClass);
        document.addEventListener("click", onDocumentClick);
    }

    function closeSelect() {
        selectField.classList.remove(selectFieldShowClass);
        document.removeEventListener("click", onDocumentClick);
    }

    function onDocumentClick(evt) {
        evt.preventDefault();
        var isSelect = selectField.contains(evt.target);

        if (!isSelect) {
            closeSelect();
            document.removeEventListener("click", onDocumentClick);
        }
    }

    function onSelectItemClick(evt) {
        evt.preventDefault();
        var classValue = evt.target.dataset.class;

        selectInput.value = classValue;
        selectTextField.textContent = String(classValue);

        selectItems.forEach(function (item) {
            var itemClassValue = item.dataset.class;

            if (itemClassValue !== classValue) {
                item.classList.remove(selectedItemClass);
            } else {
                item.classList.add(selectedItemClass);
            }
        });
    }

    function onSelectFieldClick(evt) {
        evt.preventDefault();
        var isShowSelect = selectField.classList.contains(selectFieldShowClass);
        var isSelectList = evt.target.parentNode === selectList;

        if (!isShowSelect) {
            openSelect();
        } else if (!isSelectList) {
            closeSelect();
        }
    }

    selectField.addEventListener("click", onSelectFieldClick);

    selectItems.forEach(function (item) {
        item.addEventListener("click", onSelectItemClick);
    });
})();
