function Pillow(type) {
    this.type = type;
    this.quantity = 1;
}

var pricePerPillow = {
    standard: 20,
    'memory-foam': 30,
    body: 40
};

function calcTotalPrice(pillows) {
    var totalPrice = 0;
    pillows.forEach(function(pillow) {
        totalPrice += pricePerPillow[pillow.type] * pillow.quantity;
    });
    return totalPrice;
}

$(document).ready(function() {
    var pillowList = [];

    function getPillowType() {
        return $("#pillow-type").val();
    }

    function getPillowQuantity() {
        return parseInt($("#pillow-quantity").val());
    }

    $("form#myform").submit(function(event) {
        event.preventDefault();
        var pillowType = getPillowType();
        var pillowQuantity = getPillowQuantity();

        var newPillow = new Pillow(pillowType);
        newPillow.quantity = pillowQuantity;
        $("#cart").hide();
        $("#table").show();
        $(".checkout").show();

        var oneOrder = pricePerPillow[pillowType] * pillowQuantity;

        $("#items").append(
            "<tr>" +
            "<td>" + newPillow.type + "</td>" +
            "<td>" + newPillow.quantity + "</td>" +
            "<td>$" + oneOrder + "</td>" +
            "</tr>"
        );

        pillowList.push(newPillow);
    });

    $("#orderbtn").on("click", function() {
        var pillowType = getPillowType();
        var pillowQuantity = getPillowQuantity();

        var newPillow = new Pillow(pillowType);
        newPillow.quantity = pillowQuantity;

        pillowList.push(newPillow);
    });

    $("#gettotal").click(function() {
        var total = calcTotalPrice(pillowList);
        $("#money").text(total);
    });

    $("#myModel").click(function() {
        var deliver = confirm(
            "Would you like us deliver your pillows to your doorstep? Delivery fee is $20."
        );
        if (deliver) {
            var place = prompt("Enter your location");
            $("#place").text(place);
            $("#success").show();
        } else {
            $("#no-delivery").show();
        }

        $("#pillow-type").val("");
        $("#pillow-quantity").val("1");
        $("#items").empty();
    });
});


// PRODUCTS PAGE
function toggleDetails(id) {
    var details = document.getElementById(id);
    var icon = document.getElementById("toggleIcon");
    
    if (details.classList.contains("collapse")) {
        details.classList.remove("collapse");
        icon.textContent = "-";
    } else {
        details.classList.add("collapse");
        icon.textContent = "+";
    }
}

function enlargeImage(img) {
    // Create a new image element for the enlarged image
    var enlargedImg = document.createElement("img");
    enlargedImg.src = img.src;
    enlargedImg.style.maxWidth = "100%";

    // Create a modal to display the enlarged image
    var modal = document.createElement("div");
    modal.classList.add("modal");
    modal.appendChild(enlargedImg);

    // Append the modal to the body
    document.body.appendChild(modal);

    // Close the modal when clicked outside the image
    modal.onclick = function() {
        modal.remove();
    };
}