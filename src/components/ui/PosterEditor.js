import React from "react";

export default function PosterEditor() {
  function linkBuilder() {
    var fbtag = document.getElementById("fbtag").value;
    var instatag = document.getElementById("instatag").value;
    var date = document.getElementById("datepicker").value.split("/");
    console.log(date);
    var dateEntered = new Date(date[2], date[1] - 1, date[0]);
    console.log(dateEntered);
    var date_formatted = dateFormat(dateEntered, "ddd dS mmm");
    var time = document.getElementById("timepicker").value;
    var hours = time.slice(0, 2);
    var mins = time.slice(-2);
    var dateDummy = new Date();
    dateDummy.setHours(hours);
    dateDummy.setMinutes(mins);
    var myEvent = document.getElementById("myEvent").value;
    console.log(myEvent);
    var time_formatted = dateFormat(dateDummy, "h:MM TT");
    var location1 = document.getElementById("location1").value;
    var location2 = document.getElementById("location2").value;
    if (document.getElementById("myEvent").value == "24hours") {
      dropboxlink =
        "https://dl.dropboxusercontent.com/s/5qozk2clzg55vqy/24Hours.psd?dl=0";
    } else if (document.getElementById("myEvent").value == "Google") {
      dropboxlink =
        "https://dl.dropboxusercontent.com/s/o3j4yg004behdlm/Google.psd?dl=0";
    } else if (document.getElementById("myEvent").value == "underTheSkin") {
      dropboxlink =
        "https://dl.dropboxusercontent.com/s/6ntprcmm1r0vo5g/UnderTheSkin.psd?dl=0";
    } else if (document.getElementById("myEvent").value == "insideTheMind") {
      dropboxlink =
        "https://dl.dropboxusercontent.com/s/0no7qqbp1c03rmb/Inside%20The%20Mind%202.psd?dl=0";
    } else if (document.getElementById("myEvent").value == "Karma") {
      dropboxlink =
        "https://dl.dropboxusercontent.com/s/2r1yefn4tlv2bvp/Karma.psd?dl=0";
    } else if (document.getElementById("myEvent").value == "Habits") {
      dropboxlink =
        "https://dl.dropboxusercontent.com/s/e77kq3kzwbuivj9/Habits.psd?dl=0";
    } else if (document.getElementById("myEvent").value == "Meditation") {
      dropboxlink =
        "https://dl.dropboxusercontent.com/s/7czwwekzk1p5aa4/Meditation.psd?dl=0";
    } else if (document.getElementById("myEvent").value == "Diwali") {
      dropboxlink =
        "https://dl.dropboxusercontent.com/s/mj9y3ksronkspya/Diwali.psd?dl=0";
    } else if (
      document.getElementById("myEvent").value == "LearnAnythingFast"
    ) {
      dropboxlink =
        "https://dl.dropboxusercontent.com/s/akl6sij4a912s8p/How%20to%20learn%20anything%20fast.psd?dl=0";
    } else if (document.getElementById("myEvent").value == "FakeNews") {
      dropboxlink =
        "https://dl.dropboxusercontent.com/s/mt6kmd9bu47kzkx/Fake%20News.psd?dl=0";
    } else if (document.getElementById("myEvent").value == "Procrastination") {
      dropboxlink =
        "https://dl.dropboxusercontent.com/s/z4li0wrf2gv35dz/Procrastination.psd?dl=0";
    } else if (document.getElementById("myEvent").value == "ThankUNext") {
      dropboxlink =
        "https://dl.dropboxusercontent.com/s/df87923enriinrg/ThankYouNext.psd?dl=0";
    } else if (document.getElementById("myEvent").value == "7Secrets") {
      dropboxlink =
        "https://dl.dropboxusercontent.com/s/01fxavwvhyh88yt/7SecretsToHappiness.psd?dl=0";
    }
    var link =
      "https://www.photopea.com#%7B%22files%22:%5B%22" + dropboxlink + "%22%5D";
    var script =
      ",%22environment%22:%7B%7D,%22script%22:%22activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('@kcsoc%20FB%20Tag');%20activeDocument.activeLayer.textItem.contents%20=%20'" +
      fbtag +
      "';";
    var script2 =
      "%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('@kcsoc%20Insta%20Tag');%20activeDocument.activeLayer.textItem.contents%20=%20'" +
      instatag +
      "';";
    var script3 =
      "%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('Date');%20activeDocument.activeLayer.textItem.contents%20=%20'" +
      date_formatted +
      "';";
    var script4 =
      "%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('Time');%20activeDocument.activeLayer.textItem.contents%20=%20'" +
      time_formatted +
      " start';";
    var script5 =
      "%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('LocationLine1');%20activeDocument.activeLayer.textItem.contents%20=%20'" +
      location1 +
      "';";
    var script6 =
      "%20activeDocument.activeLayer%20=%20activeDocument.artLayers.getByName('LocationLine2');%20activeDocument.activeLayer.textItem.contents%20=%20'" +
      location2 +
      "';";
    var script7 = "%22%7D";
    var finalLink =
      link + script + script2 + script3 + script4 + script5 + script6 + script7;
    finalLink = finalLink.trim();
    window.open(finalLink);
    console.log(finalLink);
  }

  return <iframe />;
}
