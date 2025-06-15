bookmarkName = document.getElementById("bookmarkName");
bookmarkSite = document.getElementById("bookmarkSite");
subBtn = document.getElementById("sub");
var bookmarks = [];

if (localStorage.getItem("sites") != null) {
  bookmarks = JSON.parse(localStorage.getItem("sites"));
  display();
}

function addSite() {
  if (validation("bookmarkName") && validation("bookmarkSite")) {
    var bookmark = {
      name: bookmarkName.value,
      site: bookmarkSite.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("sites", JSON.stringify(bookmarks));
    display();
    clear();
  } else {
    Swal.fire({
      html: `
         <div class="row gap-2 pt-3 ps-2">
            <p style="width:25px; height:25px; border-radius: 50%; background-color:#F15F5D;"></p>
            <p style="width:25px; height:25px; border-radius: 50%; background-color:#FEBE2E;"></p>
            <p style="width:25px; height:25px; border-radius: 50%; background-color:#4DB748;"></p>

        </div>
        
        <p class="text-start fw-bolder text-black">Site Name or Url is not valid, Please follow the rules below :</p>
        <ul style="text-align: left; list-style: none; padding-left: 0;">
            <li class="py-3 text-black"><i class="fa-regular fa-circle-right text-danger"></i> Site name must contain at least 3 characters</li>
            <li class="text-black"><i class="fa-regular fa-circle-right text-danger"></i> Site URL must be a valid one</li>
        </ul>
        `,
      showCloseButton: true,
      showConfirmButton: false,
    });
  }
}

function display() {
  var cartona = ``;
  for (var i = 0; i < bookmarks.length; i++) {
    cartona += `        
        <tr class="border-white align-baseline ">
           <td>${i + 1}</td>
           <td>${bookmarks[i].name}</td>
           <td><a href="${
             bookmarks[i].site
           }" target="_blank" class="btn btn1"><i class="fa-solid fa-eye me-2"></i>Visit</a></td>
           <td><button onclick="deleteSite(${i})" class="btn btn2" ><i class="fa-solid fa-trash me-1" ></i>Delete</button></td>
         </tr>`;
  }
  document.querySelector("tbody").innerHTML = cartona;
}

function clear() {
  bookmarkName.value = null;
  bookmarkSite.value = null;
  bookmarkSite.classList.remove("is-valid");
  bookmarkName.classList.remove("is-valid");
}

function deleteSite(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(bookmarks));
  display();
}

function validation(idInput) {
  myInput = document.getElementById(idInput);
  var regex;
  var testString = myInput.value;
  switch (idInput) {
    case "bookmarkName":
      regex = /^[a-zA-Z]\w{2,9}$/;
      break;
    case "bookmarkSite":
      regex = /^(https:\/\/)?(www\.)[a-zA-Z0-9@:%._\+~#=]{1,256}$/;
      break;
  }
  if (regex.test(testString)) {
    myInput.classList.add("is-valid");
    myInput.classList.remove("is-invalid");
    return true;
  } else {
    myInput.classList.add("is-invalid");
    myInput.classList.remove("is-valid");
    return false;
  }
}

bookmarkName.addEventListener("input", function () {
  validation(bookmarkName.id);
});

bookmarkSite.addEventListener("input", function () {
  validation(bookmarkSite.id);
});

sub.addEventListener("click", function () {
  addSite();
});
