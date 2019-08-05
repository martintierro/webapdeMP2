window.onscroll = function() {stickyFunction()};

let header = document.getElementById("HeaderDiv");
let sticky = header.offsetTop;
let spanItem, divItem, divCtnr, content, title, note_form, item_input, checkbox, deletebox;
let tag, noteTag, tagContainer;

function stickyFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        //header.classList.remove("sticky");
    }
}

$(document).ready(function(){
    $("#notebutton").click(function(){
        note_input();
        on();
    });

    $("#listbutton").click(function () {
        list_input();
        on_editCL();
    });

    $(".deleteNote").click(function () {
        $(this).parent().parent().remove();
    });

    $(".deleteCheckList").click(function () {
        $(this).parent().parent().remove();
    });

    $(".addtagButton").click(addTag);

    function addTag(){
        tag = document.createElement("input");
        tag.type="text"
        $(tag).attr("placeholder", "Enter tag...");
        tag.className = "selection";

        $(tag).hide();
        $("#tags_list").append(tag);
        $(tag).show();
    }

    document.getElementById('picbutton').addEventListener('click', openDialog);
    //button now clicks file button
    function openDialog() {
        document.getElementById('fileid').click();
    }



    function on() {
        document.getElementById("overlay").style.display = "block";
    }

    $("#background").click(off);
    function off() {
        document.getElementById("overlay").style.display = "none";
    }

    function note_input(){
        $("#newpost").empty();

        let noteAddTag = document.createElement("input");
        noteAddTag.type = "button";
        $(noteAddTag).val("ADD");
        noteAddTag.textContent = "ADD";
        noteAddTag.className = "tagButtonN";

        tagContainer = document.createElement("div");
        tagContainer.append(noteAddTag);
        tagContainer.className = "tagContainerN";

        content = document.createElement("textarea");
        $(content).attr("placeholder", "Enter something...");
        $(content).val($("#postinput").val());
        content.textContent=$("#postinput").val();
        content.className = "post_content";
        content.name = "note_content";

        title = document.createElement("input");
        title.type = "text";
        $(title).attr("placeholder", "Title");
        title.className = "post_title";
        title.name = "note_title";

        save = document.createElement("input");
        save.type = "button";
        save.value = "SAVE";
        save.id = "savebutton";
        $(save).click(function () {

            let container = document.createElement("div");
            container.className = "noteDiv";

            let new_title = document.createElement("p");
            new_title.className = "noteTitle";
            $(new_title).val($(title).val());
            new_title.textContent=$(title).val();

            let new_content = document.createElement("p");
            new_content.className = "noteContent";
            $(new_content).val($(content).val());
            new_content.textContent=$(content).val();

            let edit_button = document.createElement("input");
            edit_button.type = "button";
            edit_button.className = "editNote";
            edit_button.value = "EDIT";
            $(edit_button).click(function (){
                loadNote(this);
                on_editN();
            });

            let delete_button = document.createElement("input");
            delete_button.type = "button";
            delete_button.className = "deleteNote";
            delete_button.value = "DELETE";
            $(delete_button).click(function (){
                $(this).parent().parent().remove();
            });

            let button_container = document.createElement("form");
            button_container.className = "noteButtons";
            button_container.append(edit_button);
            button_container.append(delete_button);

            container.append(new_title);
            container.append(button_container);
            container.append(new_content);
           $("#notescontainer").append(container);
           off();
        });


        let file_button = document.createElement("input");
        file_button.type = "button";
        file_button.value = "UPLOAD IMAGE";
        file_button.className = "filebutton";
        file_button.addEventListener('click', openDialog);

        let footer = document.createElement("div");
        footer.className = "footer";
        footer.append(save);
        footer.append(file_button);

        note_form = document.createElement("form");
        note_form.action = "create_note";
        note_form.method = "POST";
        note_form.id = "noteform";
        note_form.append(title);
        note_form.append(tagContainer);
        note_form.append(content);
        note_form.append(footer);

        $(note_form).hide();
        $("#newpost").append(note_form);
        $(note_form).show();

    }


    function list_input() {
        $("#editCL").empty();

        let checklistAddTag = document.createElement("input");
        checklistAddTag.type = "button";
        $(checklistAddTag).val("ADD");
        checklistAddTag.textContent = "ADD";
        checklistAddTag.className = "tagButtonCL";

        tagContainer = document.createElement("div");
        tagContainer.append(checklistAddTag);
        tagContainer.className = "tagContainerCL";

        title = document.createElement("input");
        title.type = "text";
        $(title).attr("placeholder", "Title");
        $(title).val($("#postinput").val());
        title.textContent=$("#postinput").val();
        title.className = "post_title";
        title.name = "list_title";

        divCtnr = document.createElement("div");
        divCtnr.className ="item_container";

        item_input = document.createElement("input");
        item_input.type ="text";
        $(item_input).attr("placeholder","List Item");
        item_input.className = "iteminput";
        item_input.name = "list_item[]";

        let remove = document.createElement("span");
        remove.innerHTML ="REMOVE";
        remove.className = "remove";

        $(remove).click(function() {
            $(this).parent().remove();
        });

        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "check_item";

        divCtnr.append(checkbox);
        divCtnr.append(item_input);
        divCtnr.append(remove);

        save = document.createElement("input");
        save.type = "button";
        save.value = "SAVE";
        save.id = "savebutton";
        $(save).click(function () {
            let container = document.createElement("div");
            container.className = "checklistDiv";

            let new_title = document.createElement("p");
            new_title.className = "checklistTitle";
            $(new_title).val($(title).val());
            new_title.textContent=$(title).val();

            let new_form = document.createElement("form");
            new_form.className = "checklistContent";

            let myControls = $("#noteform").find('input.iteminput');
            let checkboxes = $("#noteform").find("input.check_item");

            for (let i = 0; i < myControls.length ; i++) {
                let new_row = document.createElement("label");

                let new_checkbox = document.createElement("input");
                new_checkbox.type = "checkbox";
                if(checkboxes[i].checked)
                    new_checkbox.checked = true;
                new_row.className = "checklistItem";
                new_row.name = "p_id[]";
                new_row.innerHTML = myControls[i].value;
                $(new_row).prepend(new_checkbox);

                $(new_form).append(new_row);
                $(new_form).append(document.createElement("br"));
            }

            let edit_button = document.createElement("input");
            edit_button.type = "button";
            edit_button.className = "editNote";
            edit_button.value = "EDIT";
            $(edit_button).click(function (){
                loadCheckList(this);
                on_editCL();
            });

            let delete_button = document.createElement("input");
            delete_button.type = "button";
            delete_button.className = "deleteNote";
            delete_button.value = "DELETE";
            $(delete_button).click(function (){
                $(this).parent().parent().remove();
            });

            let button_container = document.createElement("form");
            button_container.className = "noteButtons";
            button_container.append(edit_button);
            button_container.append(delete_button);

            container.append(new_title);
            container.append(button_container);
            container.append(new_form);
            $("#notescontainer").append(container);
            off_editCL();
        });


        let add = document.createElement("div");
        add.innerHTML = "ADD";
        add.className = "add";
        $(add).click(function() {
            item_input = document.createElement("input");
            item_input.type ="text";
            $(item_input).attr("placeholder","List Item");
            item_input.className = "iteminput";
            item_input.name = "list_item[]";

            checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "check_item";

            remove = document.createElement("span");
            remove.innerHTML ="REMOVE";
            remove.className = "remove";

            $(remove).click(function() {
                $(this).parent().remove();
            });

            divCtnr = document.createElement("div");
            divCtnr.className ="item_container";
            divCtnr.append(checkbox);
            divCtnr.append(item_input);
            divCtnr.append(remove);

            $(divCtnr).insertBefore($(footer));
            return false;
        });

        let footer = document.createElement("div");
        footer.className = "footer";
        footer.append(save);
        footer.append(add);

        note_form = document.createElement("form");
        note_form.action = "create_list";
        note_form.method = "POST";
        note_form.id = "noteform";
        note_form.append(title);
        note_form.append(tagContainer);
        note_form.append(divCtnr);
        note_form.append(footer);

        $(note_form).hide();
        $("#editCL").append(note_form);
        $(note_form).show();
    }

    $(".editNote").click(function(){
        loadNote(this);
        on_editN();
    });

    function on_editN() {
        document.getElementById("overlay_editN").style.display = "block";
    }

    $("#background_editN").click(off_editN);
    function off_editN() {
        document.getElementById("overlay_editN").style.display = "none";
    }

    function loadNote(button){
        $("#editpost").empty();

        let parent = $(button).parent().parent();
        if(parent.find(".noteTagDiv").length !== 0){
            console.log(parent.find(".noteTagDiv").length);
            let noteAddTag = document.createElement("input");
            noteAddTag.type = "button";
            $(noteAddTag).val("ADD");
            noteAddTag.textContent = "ADD";
            noteAddTag.className = "tagButtonN";

            /*$(noteAddTag).click(function(){
                let dropdownItem = document.createElement("div");
                $(dropdownItem).val($("#tag").val());
                dropdownItem.textContent = $("#tag").val();
                dropdownItem.id = "dropdownItem";
                tagContainer.append(dropdownItem);

                $(dropdownItem).click(function(){
                    nodenewTag = document.createElement("span");
                    $(nodenewTag).val($(dropdownItem).text());
                    nodenewTag.textContent = $(dropdownItem).text();
                    nodenewTag.className = "tagN";
                    tagContainer.append(nodenewTag);
                    console.log("clicked");
                })
            })*/

            $(note_form).click(function(){
                $("#dropdownItem").remove();
            })

            noteTag = document.createElement("span");
            $(noteTag).val($("#noteTag").text());
            noteTag.textContent = $("#noteTag").text();
            noteTag.className = "tagN";

            tagContainer = document.createElement("div");
            tagContainer.append(noteTag);
            tagContainer.append(noteAddTag);
            tagContainer.className = "tagContainerN";
        }else {
            $(".tagN").remove();
            $(".tagCL").remove();
        }


        let text = parent.find(".noteContent").html();
        let withBL = text.split('<br>').join('\n');

        content = document.createElement("textarea");
        $(content).attr("placeholder", "Enter something...");
        $(content).val(withBL);
        content.textContent = withBL;
        content.className = "post_content";
        content.name = "note_content";

        title = document.createElement("input");
        title.type = "text";
        $(title).attr("placeholder", "Title");
        $(title).val($(parent).find(".noteTitle").text());
        title.textContent=$(".noteTitle").text();
        title.className = "post_title";
        title.name = "note_title";

        save = document.createElement("input");
        save.type = "button";
        save.value = "SAVE";
        save.id = "savebutton";
        $(save).click(function () {
            parent.find(".noteTitle").text($(title).val());
            parent.find(".noteContent").text($(content).val());
            off_editN();
        });


        let file_button = document.createElement("input");
        file_button.type = "button";
        file_button.value = "UPLOAD IMAGE";
        file_button.className = "filebutton";
        file_button.addEventListener('click', openDialog);

        let footer = document.createElement("div");
        footer.className = "footer";
        footer.append(save);
        footer.append(file_button);

        note_form = document.createElement("form");
        note_form.action = "view_note";
        note_form.method = "GET";
        note_form.id = "noteform";
        note_form.append(title);
        note_form.append(tagContainer);
        note_form.append(content);
        note_form.append(footer);

        $("#editpost").append(note_form);
    }

    $(".editCheckList").click(function(){
        count();
        loadCheckList(this);
        on_editCL();
    });

    function on_editCL() {
        document.getElementById("overlay_editCL").style.display = "block";
    }

    $("#background_editCL").click(off_editCL);
    function off_editCL() {
        document.getElementById("overlay_editCL").style.display = "none";
    }

    function count(){
        label_count = $("form#checklistContent>label").length;
        console.log(label_count);
    }

    function loadCheckList(button){
        $("#editCL").empty();

        let parent = $(button).parent().parent();

        if(parent.find("#checklistTag").length !== 0){
            console.log(parent.find("#checklistTag").length);
            let noteAddTag = document.createElement("input");
            noteAddTag.type = "button";
            $(noteAddTag).val("ADD");
            noteAddTag.textContent = "ADD";
            noteAddTag.className = "tagButtonN";

            $(noteAddTag).click(function(){
                let dropdownItem = document.createElement("div");
                $(dropdownItem).val($("#tag").val());
                dropdownItem.textContent = $("#tag").val();
                dropdownItem.id = "dropdownItem";
                tagContainer.append(dropdownItem);

                $(dropdownItem).click(function(){
                    nodenewTag = document.createElement("span");
                    $(nodenewTag).val($(dropdownItem).text());
                    nodenewTag.textContent = $(dropdownItem).text();
                    nodenewTag.className = "tagN";
                    tagContainer.append(nodenewTag);
                    console.log("clicked");
                })
            })

            $(note_form).click(function(){
                $("#dropdownItem").remove();
            })

            noteTag = document.createElement("span");
            $(noteTag).val($("#checklistTag").text());
            noteTag.textContent = $("#checklistTag").text();
            noteTag.className = "tagN";

            tagContainer = document.createElement("div");
            tagContainer.append(noteTag);
            tagContainer.append(noteAddTag);
            tagContainer.className = "tagContainerN";
        }else {
            $(".tagCL").remove();
        }

        let checklistAddTag = document.createElement("input");
        checklistAddTag.type = "button";
        $(checklistAddTag).val("ADD");
        checklistAddTag.textContent = "ADD";
        checklistAddTag.className = "tagButtonCL";

        checklistTag = document.createElement("span");
        $(checklistTag).val($("#checklistTag").text());
        checklistTag.textContent = $("#checklistTag").text();
        checklistTag.className = "tagCL";

        tagContainer = document.createElement("div");
        tagContainer.append(checklistTag);
        tagContainer.append(checklistAddTag);
        tagContainer.className = "tagContainerCL";

        title = document.createElement("input");
        title.type = "text";
        $(title).attr("placeholder", "Title");
        $(title).val(parent.find(".checklistTitle").text());
        title.textContent=parent.find(".checklistTitle").text();
        title.className = "post_title";
        title.name = "note_title";

        note_form = document.createElement("form");
        note_form.action = "view_checklist";
        note_form.method = "GET";
        note_form.id = "noteform";
        note_form.append(title);
        note_form.append(tagContainer);

        let myControls = parent.find(".checklistContent").find('label.checklistItem');
        let checkboxes = parent.find(".checklistContent").find("input");
        /*document.getElementById("checklistContent").elements['p_id[]'];*/
        console.log(myControls.length);
        for (var i = 0; i < myControls.length; i++) {
            console.log($(myControls[i]).text());

            checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "check_item";
            if(checkboxes[i].checked)
                checkbox.checked = true;
            content = document.createElement("input");
            content.type = "text";
            $(content).attr("placeholder", "Enter something...");
            $(content).val($(myControls[i]).text());
            content.textContent=$($(myControls[i]).text());
            content.className = "task";
            content.name = "note_content";

            spanItem = document.createElement("div");
            spanItem.className = "item_container";
            remove = document.createElement("span");
            remove.innerHTML ="REMOVE";
            remove.className = "remove";
            $(remove).click(function() {
                $(this).parent().remove();
            });

            spanItem.append(checkbox);
            spanItem.append(content);
            spanItem.append(remove);

            note_form.append(spanItem);
        }

        let add = document.createElement("div");
        add.innerHTML = "ADD";
        add.className = "add";

        $(add).click(function() {
            item_input = document.createElement("input");
            item_input.type ="text";
            $(item_input).attr("placeholder","List Item");
            item_input.className = "task";
            item_input.name = "list_item[]";

            checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "check_item";

            remove = document.createElement("span");
            remove.innerHTML ="REMOVE";
            remove.className = "remove";

            $(remove).click(function() {
                $(this).parent().remove();
            });

            divCtnr = document.createElement("div");
            divCtnr.className ="item_container";
            divCtnr.append(checkbox);
            divCtnr.append(item_input);
            divCtnr.append(remove);

            $(divCtnr).insertBefore($(footer));
            return false;
        });



        save = document.createElement("input");
        save.type = "button";
        save.value = "SAVE";
        save.id = "savebutton";
        $(save).click(function () {
            parent.find(".checklistTitle").text($(title).val());
            let form = parent.find(".checklistContent");
            form.empty();
            let myControls = $("#editCL").find('input.task');
            let checkboxes = $("#editCL").find("input.check_item");
            for (let i = 0; i < myControls.length ; i++) {
                let new_row = document.createElement("label");
                let new_checkbox = document.createElement("input");
                new_checkbox.type = "checkbox";
                if(checkboxes[i].checked)
                    new_checkbox.checked = true;
                new_row.className = "checklistItem";
                new_row.name = "p_id[]";
                new_row.innerHTML = myControls[i].value;
                $(new_row).prepend(new_checkbox);
                $(form).append(new_row);
                $(form).append(document.createElement("br"));
            }
            off_editCL();
        });



        let footer = document.createElement("div");
        footer.className = "footer";
        footer.append(save);
        footer.append(add);
       
        note_form.append(footer);

        $("#editCL").append(note_form);
        off_editCL()
    }

});