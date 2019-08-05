window.onscroll = function() {stickyFunction()};

let header = document.getElementById("HeaderDiv");
let sticky = header.offsetTop;
let spanItem, divItem, divCtnr, content, title, note_form, item_input, checkbox, deletebox;
let label_count=0;

function stickyFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

$(document).ready(function(){
    $("#listbutton").click(function () {
        list_input();
        on();
    })

    function on() {
        document.getElementById("overlay").style.display = "block";
    }

    $("#background").click(off);
    function off() {
        document.getElementById("overlay").style.display = "none";
    }

    function list_input() {
        $("#newpost").empty();
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

        divCtnr.append(checkbox)
        divCtnr.append(item_input);
        divCtnr.append(remove);

        save = document.createElement("input");
        save.type = "submit";
        save.value = "SAVE";
        save.id = "savebutton";
        save.id = "edit_checklist";


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
        footer.append(add);
        footer.append(save);

        note_form = document.createElement("form");
        note_form.action = "create_list";
        note_form.method = "POST";
        note_form.id = "noteform";
        note_form.append(title);
        note_form.append(divCtnr);
        note_form.append(footer)

        $(note_form).hide();
        $("#newpost").append(note_form);
        $(note_form).show();
    }

    $("#editCheckList").click(function(){
        count();
        loadCheckList();
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

    function loadCheckList(){
        $("#editCL").empty();

        title = document.createElement("input");
        title.type = "text";
        $(title).attr("placeholder", "Title");
        $(title).val($("#checklistTitle").text());
        title.textContent=$("#checklistTitle").text();
        title.className = "post_title";
        title.name = "note_title";

        note_form = document.createElement("form");
        note_form.action = "view_checklist";
        note_form.method = "GET";
        note_form.id = "noteform";
        note_form.append(title);

        var myControls = $("#checklistContent").find('label.checklistItem');
        /*document.getElementById("checklistContent").elements['p_id[]'];*/
        console.log(myControls.length);
        for (var i = 0; i < myControls.length; i++) {
            console.log($(myControls[i]).text());

            checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "check_item";

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
        save.type = "submit";
        save.value = "SAVE";
        save.id = "savebutton";

        let footer = document.createElement("div");
        footer.append(add);
        footer.append(save);
       
        note_form.append(footer);

        $(note_form).hide();
        $("#editCL").append(note_form);
        $(note_form).show();
    }
});