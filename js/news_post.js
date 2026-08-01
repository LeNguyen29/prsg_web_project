const NAVBAR_FILEPATH = "../navbar.html";

$(function () {
    const basePath = $("body").data("basepath") || "";

    $("#navbar_div").load(NAVBAR_FILEPATH, function () {

        // Fix all href links
        $("#navbar_div a").each(function () {
            const href = $(this).attr("href");
            
            if (
                href &&
                !href.startsWith("http") &&
                !href.startsWith("#") &&
                !href.startsWith("/")
            ) {
                $(this).attr("href", basePath + href);
            }
        });

        // Fix all images
        $("#navbar_div img").each(function () {
            const src = $(this).attr("src");

            if (
                src &&
                !src.startsWith("http") &&
                !src.startsWith("/")
            ) {
                $(this).attr("src", basePath + src);
            }
        });
    });

    $("#footer_content").load("../footer.html", function () {

        $("#footer_content a").each(function () {
            const href = $(this).attr("href");

            if (
                href &&
                !href.startsWith("http") &&
                !href.startsWith("#") &&
                !href.startsWith("/")
            ) {
                $(this).attr("href", basePath + href);
            }
        });
    });
});