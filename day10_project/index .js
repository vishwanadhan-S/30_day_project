
const modal = document.getElementById("myModal");
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementsByClassName("close-btn")[0];
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");


openBtn.addEventListener("click", function () {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; 
});


closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; 
});


cancelBtn.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});


confirmBtn.addEventListener("click", function () {
    alert("Action confirmed!");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
});


