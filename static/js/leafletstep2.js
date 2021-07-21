const eqUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

/* creat call or url information*/
d3.json(eqUrl).then((data) => creatEQMap(info, status));

/********************************************************* */
function createEQMap(infor)
{
    // Create map object
    let myMap = MapObject();

    //create the Layers.baselayers dictionary object
    let baseMaps = createBaseLayers(myMap);

    //add default layer
    let layers = createLayerGroups();
    let overlayMaps = createoverlayMaps(layers);
    let updateAt = infor.Last_updated;

     // create the control layers. pass the base layers and overlaymaps
    let layerControl = createLayerControl(myMap, baseMaps, overlayMaps);


    // call updated legend
    let legend = createLegend(myMap,updateAt);
}

/**************************************************************** */

/* creating map object for call */
function MapObject()
{
    let map = L.map("map", 
    {
        center: 
        [
        37.09, -95.71
         ],
        zoom: 5,

    });
    return map;
}

/*************************************************************** */
function CreateLayerGroups()
{
    //Initialize layergroups
    let layers=
    {
        
    };
    return layers
}

/****************************************************************** */
//values for comming soon and text in box

function createOverlayMaps(layers) {
    let overlays = {
      "Coming Soon": layers.COMING_SOON,
      "Empty Stations": layers.EMPTY,
      "Low Stations": layers.LOW,
      "Healthy Stations": layers.NORMAL,
      "Out of Order": layers.OUT_OF_ORDER,
    };
    return overlays;
  }
/*********************************************************************** */
 function createBaseLayers()
 {
    var lightmap = L.tileLayer(
        "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "light-v10",
          accessToken: API_KEY,
        }
      );
      // TODO: create 4 more tilelayers and add them to the basemaps
           // id: "mapbox/streets-v11",
         // / mapbox/outdoors-v11;
            // mapbox/streets-v11;
            // mapbox/light-v10;
            // mapbox/dark-v10;
            // mapbox/satellite-v9;
            // mapbox/satellite-streets-v11;
            var streetmap = L.tileLayer(
              "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
              {
                attribution:
                  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: "streets-v11",
                accessToken: API_KEY,
              }
            );
           var darkmap = L.tileLayer(
              "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
              {
                attribution:
                  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: "dark-v10",
                accessToken: API_KEY,
              }
            );
            var satallitestreetmap = L.tileLayer(
              "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
              {
                attribution:
                  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: "satellite-streets-v11",
                accessToken: API_KEY,
              }
            );
    
      var baseMaps = {
        "Light Map":lightmap,
        "street map" : streetmap,
        "Dark map" : darkmap,
        "satallitestreetmap" : satallitestreetmap
      };
    
      map.addLayer(lightmap);// default layer map
     
      return baseMaps;
 }
/************************************************************************ */
function createLayerControl(map, baseLayers, overlayMaps) {
    let control = L.control.layers(baseLayers, overlayMaps, {
      collapsed: false,
      position: "topright",
    });
  
    control.addTo(map);
  // for (key in overlayMaps){ map.addlayer (overlaymaps [key])};
    // select all the layers when the map is loaded
    // TODO: implement the code here to make sure all the overlay maps are selected when the page is loaded
    return control;
  }

  /************************************************************************ */
  function createLegend(map,time)
  {
    let legendControl = L.control({
        position: "bottomright",
      });
    legendControl.onAdd = function () {
        let div = L.DomUtil.create("div", "legend");
    
        const htmlInfo = `<p>Updated:  ${moment
          .unix(time)
          .format("h:mm:ss A")} </p>`;
          
      //stationCount.COMING_SOON
    // EMPTY
    // LOW
    // NORMAL
    // OUT_OF_ORDER

    // TODO: Add the station count for each station type to the legend

    div.innerHTML = htmlInfo;
    // let draggable = new L.Draggable(div);
    // draggable.enable();
    return div;
    };
    legendControl.addTo(map);
    return legendControl;
  }
  /********************************************************************************** */