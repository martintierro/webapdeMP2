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
    $("#notebutton").click(function(){
        note_input();
        on();
    });
    
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

    $("#editNote").click(function(){
        loadNote();
        on_editN();
    });

    function on_editN() {
        document.getElementById("overlay_editN").style.display = "block";
    }

    $("#background_editN").click(off_editN);
    function off_editN() {
        document.getElementById("overlay_editN").style.display = "none";
    }

    function loadNote(){
        $("#editpost").empty();
        
        let text = $("#noteContent").html();
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
        $(title).val($("#noteTitle").text());
        title.textContent=$("#noteTitle").text();
        title.className = "post_title";
        title.name = "note_title";

        save = document.createElement("input");
        save.type = "submit";
        save.value = "SAVE";
        save.id = "savebutton";

        note_form = document.createElement("form");
        note_form.action = "view_note";
        note_form.method = "GET";
        note_form.id = "noteform";
        note_form.append(title);
        note_form.append(content);
        note_form.append(save);

        $(note_form).hide();
        $("#editpost").append(note_form);
        $(note_form).show();
    }
});