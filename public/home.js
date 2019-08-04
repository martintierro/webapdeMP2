window.onscroll = function() {stickyFunction()};

let header = document.getElementById("HeaderDiv");
let sticky = header.offsetTop;
let divItem, divCtnr, content, title, note_form, item_input, checkbox, deletebox;

function stickyFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

$(document).ready(function(){
    $("#notebutton").click(function(){
        note_input();
        on();
    });

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

    function note_input(){
        $("#newpost").empty();

        content = document.createElement("textarea");
        $(content).attr("placeholder", "Enter something...");
        $(content).val($("#postinput").val());
        content.textContent=$("#postinput").val();
        content.className = "post_content";
        content.name = "note_content";


        /*spanItem = document.createElement("span");
        $(spanItem).text($("#createpostTitle").val());
        spanItem.textContent=$("#createpostTitle").val();
        $(spanItem).attr("placeholder", "Title");*/

        title = document.createElement("input");
        title.type = "text";
        $(title).attr("placeholder", "Title");
        title.className = "post_title";
        title.name = "note_title";

        save = document.createElement("input");
        save.type = "submit";
        save.value = "SAVE";
        save.id = "savebutton";

        note_form = document.createElement("form");
        note_form.action = "create_note";
        note_form.method = "POST";
        note_form.id = "noteform";
        note_form.append(title);
        note_form.append(content);
        note_form.append(save);

        $(note_form).hide();
        $("#newpost").append(note_form);
        $(note_form).show();

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

        let remove = document.createElement("span");
        remove.innerHTML ="REMOVE";
        remove.className = "remove";

        divCtnr.append(item_input);
        divCtnr.append(remove);

        save = document.createElement("input");
        save.type = "submit";
        save.value = "SAVE";
        save.id = "savebutton";


        let add = document.createElement("div");
        add.innerHTML = "ADD";
        add.className = "add";
        $(add).click(function() {
            $("form > div:first-child").clone(true).insertBefore("form > div:last-child");
            $(item_input).val("");
            item_input.textContent="";
            return false;
        });

        $(remove).click(function() {
            $(this).parent().remove();
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

    $("#editNote").click(function(){
        loadNote();
        on_edit();
    });

    function on_edit() {
        document.getElementById("overlay_edit").style.display = "block";
    }

    $("#background").click(off);
    function off_edit() {
        document.getElementById("overlay_edit").style.display = "none";
    }

    function loadNote(){
        content = document.createElement("textarea");
        $(content).attr("placeholder", "Enter something...");
        $(content).val($("#noteContent").val());
        content.textContent=$("#noteContent").val();
        content.className = "post_content";
        content.name = "note_content";
    }
});