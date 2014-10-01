

var mijnConsoleWaarde = "";
var waarde = "";
var progress;


function mijnUserInterface() {
    // Een functie die de interface elementen aanmaakt
    res = "group{orientation:'column', alignment:['fill','fill'], alignChildren:['fill','fill'],\
myImportPanel: Panel{text:'DC_Philips_SP_Import', orienttaion:'column',alignment:['fill','top'],alignChildren:['left','top'],\
myPanelButton1: Button{text:' Import the philips supers text file '},\
myProgressBar: Progressbar{text:'Progressbar'} alignChildren:['fill','fill'],\
myConsoleText: StaticText{text:''},\
},\
}";
}

function mijnUserInterfaceFuncties(myPanel) {
    //een functie die defeault states aangeeft voor interface elementen en tevens de on.click functie van de button verwerkt
    myPanel.grp.myImportPanel.myPanelButton1.onClick = function () {


        ABC_PreImport();

        mijnConsoleWaarde = "Nieuwe teksten aan het importeren";
        // einde van de else
        //alert(a);

    };
}

function myScript(thisObj){
    function myScript_buildUI(thisObj){
        // een functie om de interface elementen en states samen te voegen en uit te voeren
        var myPanel = (thisObj instanceof Panel) ? thisObj : new Window("palette","DC_Philips_SP_Import_v0.0.1", undefined, {resizeable:true});
        mijnUserInterface();
        myPanel.grp = myPanel.add(res);
        myPanel.layout.layout(true);

        mijnUserInterfaceFuncties(myPanel);

        // progressbar
        progress = myPanel.grp.myImportPanel.myProgressBar;
        //progress.value = progressWaarde;
        progress.value = 0;

        // panel sizing
        myPanel.layout.layout(true);
        myPanel.grp.minimumSize = myPanel.grp.size;


        //consoleWaarde
        mijnConsoleWaarde = myPanel.grp.myImportPanel.myConsoleText;

        // maak de panel resizable

        myPanel.layout.resize();
        myPanel.onResizing = myPanel.onResize = function() {this.layout.resize()};

        return myPanel;
    }
    var myScriptPal = myScript_buildUI(thisObj);

    if((myScriptPal != null) && (myScriptPal instanceof Window)){
        myScriptPal.center();
        myScriptPal.show();

    }
}

myScript(this);



//alert("test123")

    var mijnComp = "";
    var mijnLayers = "";
//var mijnComp2 = app.project.activeItem;
    var AantalLayers = "";
// oplossing is twee myComp itmems gebruiken.

    var letterNr = "";
    var letterWoord = "";
    var letterWoordTxt = "";



// ***********************************************************************************************************
// Een functie om de CTRL_COMP initieren
// ***********************************************************************************************************

    function ABC_PreImport(){
        CTRL_CompTest();
    }
    mijnConsoleWaarde.text = "";
    //progress.value = 01;
    progressWaarde = 1;

// ***********************************************************************************************************
// Testen of de CTRL Comp bestaat en die gebruiken voor de import functie
// ***********************************************************************************************************

    function CTRL_CompTest() {
        var refCompNaam = "CTRL_Comp" ;

        var foundIt = false; // Het is er niet
        for (var i = 1; i <= app.project.numItems; i++){
            if (app.project.item(i).name == refCompNaam && app.project.item(i) instanceof CompItem ){
                mijnComp = app.project.item(i);
                AantalLayers = mijnComp.layers.length;
                //alert(AantalLayers);

                foundIt = true;
                progress.value = 0;

                break;
            }
        }
        if (foundIt){
            //alert("CTRL_Comp bestaat.");

            DC_ABC_Import();



        } else {
            alert("is is geen Comp aanwezig met de naam CTRL_Comp" );
        }

    }


// ***********************************************************************************************************
// Mijn Hoofdfunctie uitvoeren DC_ABC_Import
// ***********************************************************************************************************

    function DC_ABC_Import() {



        function eersteLetter(layerNaam) { // ______________________________________________________________________
            // eerste letter van een object weergeven
            var str = layerNaam;
            var res = str.charAt(0)
            return res;
        } // Einde van de eerstelettervinden functie _______________________________________________________________

        function tweedeLetter(layerNaam) { // ______________________________________________________________________
            // eerste letter van een object weergeven
            var str = layerNaam;
            var res = str.charAt(1)
            return res;
        } // Einde van de tweedelettervinden functie ______________________________________________________________

        function derdeLetter(layerNaam) { // ______________________________________________________________________
            // eerste letter van een object weergeven
            var str = layerNaam;
            var res = str.charAt(2)
            return res;
        } // Einde van de derdelettervinden functie _______________________________________________________________


        // *********************************************************************************************************
        // een loop door alle text layers maken en kijken naar de namen ervan
        // (textname properties vervolgens opslaan en array genaamd textID)
        // *********************************************************************************************************

        var textID = new Array();

        //alert(mijnComp.name);

        function textLayersVinden() { // ___________________________________________________________________________
            mijnConsoleWaarde.text ="Tekstlayer vinden";
            progress.value = 7;


            //alert(AantalLayers);
            for (w=1 ; w <= AantalLayers ; w++){ // antalLayers is 18
                //alert(mijnComp2.layer(w));
                //alert(mijnComp.layer(w).name);

                if( (mijnComp.layer(w) instanceof TextLayer) == true) {
                    //alert(mijnComp.layer(w).name);

                    layerNaam = mijnComp.layer(w).name;
                    var eersteTextObjectPos = (eersteLetter(layerNaam));
                    var tweedeTextObjectPos =(tweedeLetter(layerNaam));
                    var derdeTextObjectPos =(derdeLetter(layerNaam));

                    var IDnaam = eersteTextObjectPos + tweedeTextObjectPos + derdeTextObjectPos;
                } // Einde van de for loop

                textID[w] = IDnaam;
                //alert(textID[i]);
            }
            return textID;
        } // Einde van de textLayersVinden Functie _________________________________________________________________

        var textID = textLayersVinden(); // textID is een array
        //alert(textID[1]);

        mijnConsoleWaarde.text = "Tekstlayer importeren";

        // var newFile = File.openDialog("Selecteer een txt bestand met titles" ); // open een find file dialog

        var newFile = File.openDialog("Selecteer een txt bestand met titles" );


        if (newFile != null) {  // is er wel een file geselecteerd? (NIET null)
            var a = readDocument(newFile, 0).contentAry; // we kunnen zowel onze contentAry oproepen of onze contentList die we hieronder aanmaken via de functe


        }  // Als ie geen file vindt dan doet het hemelaal niks, (geen else statement gemaakt)

        function readDocument(inputDoc, linesToSkip) { // __________________________________________________________
            var curDoc = new File(inputDoc);           //Een nieuwe bestand aanmaken gebaseerd op de geselecteerde input file
            if (curDoc.exists){                                 // we controleren of deze bestaat  (gebeurt allemaal achter de schermen in de memory)
                var contentAry = new Array();           // we maken een content array
                curDoc.open("r");                               // we openen het document om deze in te lezen (in read mode "R"), schrijven is "W" mode.
                while(!curDoc.eof) {                        // terwijl we NIEt aan het einde van de document zijn (eof is end of file)
                    contentAry[contentAry.length] = curDoc.readln(); // lezen we elke regel van het document en slaan deze op in de zojuist aangemaakte array.
                }
                curDoc.close();                             // we sluiten vervolgens het document
            }
            contentAry.splice(0, linesToSkip);       // document processing (bijg evalueren of we regels willen overslaan zoals de header etc., in dat geval worden die gestript uit de array
            var contentList = contentAry.join("_dpt_").toString().replace(new RegExp("_dpt_","g" ), " \r" );  // we maken vervolgens een nieuwe variabel aan , deze is gelij aan onze array, maar we gaan deze joinen (comma separated array wordt ander character) in dit geval "_dpt_". Dit voorkomt dat de script error maakt als er een komma in de tekst file zit.
            contentAry = contentAry;
            return{   // we krijgen de data terug of als een content array, of als een content list (voor als we later bijv de lijst willen printen, in leesbare vorm)
                'contentAry': contentAry,
                'contentList': contentList
            }
        } // Einde van de readDocument functie __________________________________________________________________


        var hekjesArray = new Array();
        hekjesPositie();

        function hekjesPositie() { // Een array maken van alle "hekjes" positie in de geinporteerde txt___________
            // var hekjesArray={hekje1: 'value1',hekje2:'value2poep'};

            mijnConsoleWaarde.text ="Hekjespositie vaststellen";


            //var hekjesArray = new Array()
            hekjesArray["hekje1"] = "waarde 1";
            hekjesArray["hekje2"] = "waarde 2";

            var hekjesTemp = [];

            for (i=0 ; i <=a.length ; i++){ // de sterretjes posities opslaan

                if ((a[i]) === "###"){

                    hekjesTemp.push(i);
                    //alert("sterretjes" + i);
                    //alert(hekjesTemp);
                }
            }
            //alert(hekjesTemp[1]);
            hekjesArray["hekje1"] = hekjesTemp[0]; // Positie van eerste hekje
            hekjesArray["hekje2"] = hekjesTemp[1]; // Positie van tweede hekje

            var hekje1POS = hekjesArray["hekje1"];
            var hekje2POS = hekjesArray["hekje2"];

            return hekjesTemp;

        } // Einde van de hekjesPositie functie __________________________________________________________________

        var h = hekjesPositie(); // Dit biedt mij een array met daarin twee index posities zoals (2, em 8);

        //alert(h);


        function txtNaarArray() { // Drie arrays maken op basis van de geimporteerde text bestand
            mijnConsoleWaarde.text ="Hekjesarray opbouwen";


            var txtArrayA = new Array();
            var txtArrayB = new Array();
            var txtArrayC = new Array();
            var aantalZinnen = a.length;

            //alert(h[0]);
            var sterpositie1 = h[0];
            var sterpositie2 = h[1];

            for (i = 0; i < aantalZinnen ; i++ ){

                if (i < sterpositie1 ) { // Een array maken voor de A groep
                    txtArrayA[i] = a[i];
                }

                if ((i > (sterpositie1)) && (i < (sterpositie2))) { // Een array maken voor de B groep
                    txtArrayB[i] = a[i];
                    //dcShift(txtArrayB, txtArrayA.length) ;
                    //alert( txtArrayB[i] );
                }

                if (i > sterpositie2  ) { // Een array maken voor de C groep
                    txtArrayC[i] = a[i];
                    var AplusBLengte =  txtArrayA.length +  txtArrayB.length;
                    //alert(AplusBLengte);
                    //dcShift(txtArrayC, AplusBLengte) ;
                    //alert(txtArrayC[i]);
                }
            }
            var txtArray = [txtArrayA , txtArrayB , txtArrayC]; // Een multidimensional Array met daarin drie arrays voor elk groep een eigen array.

            return  txtArray;
        } // Einde van de txtNaarArray Functie ___________________________________________________________________

        var test = txtNaarArray();


        function binden(A1, A1txt) {
            // A1 is een string
            // A1txt is een variable
            for (p=0; p < textID.length ; p++) {
                if(textID[p] == A1) {
                    mijnComp.layer(p).property("Source Text").setValue(A1txt);
                }
            }
        }


        function dcShift(a, b) { // verwijdert de eerste objecten uit een array _________________________________
            // a = de array waarvan je objecten wilt deleten
            // b = hoeveel plekken wil je ervan afhalen? = de lengte van een array als input

            for ( j = 0 ; j <= b ; j ++) {
                a.shift() ;
            }

            mijnConsoleWaarde.text ="DC shift";

        } // einde dcShift _____________________________________________________________________________________


        function a_binden() {
            for (a=0 ; a < test[0].length ; a++) {
                var letterNr = a+1; // De A nummers beginnen niet met nul maar met 1 vandaar dat i er 1 bij optel
                var letterWoord = "A" + letterNr; // Maak er A1 en A2 van etc (avhankelijk van de lengte van de A array
                var letterWoordTxt = test[0][a];   // Wat wordt daadwerkelijk ingevuld in de juiste positie?
                //alert("laag: " + letterWoord + " wordt: " + letterWoordTxt  );
                binden(letterWoord,letterWoordTxt);
                mijnConsoleWaarde.text ="A binden";

            } // einde van de A loop
        } // einde van de functie a_binden
        a_binden();

        function b_binden(){
            var bDelete = test[0].length;
            dcShift(test[1],bDelete);

            for (b=0 ; b < test[1].length ; b++) { // De "B" loop
                var letterNr = b+1; // De B nummers beginnen niet met nul maar met 1 vandaar dat i er 1 bij optel
                var letterWoord = "B" + letterNr; // Maak er B1 en B2 van etc (avhankelijk van de lengte van de A array
                var letterWoordTxt = test[1][b];   // Wat wordt daadwerkelijk ingevuld in de juiste positie?
                //alert(letterWoordTxt);
                binden(letterWoord,letterWoordTxt);
                mijnConsoleWaarde.text ="B binden";

            } // einde van de B loop
        }
        b_binden();

        function c_binden(){
            var cDelete = test[0].length + test[1].length + 1;
            dcShift(test[2],cDelete);
            //alert(test[2]);

            for (c=0 ; c < test[2].length ; c++) { // De "C" loop
                var letterNr = c+1; // De C nummers beginnen niet met nul maar met 1 vandaar dat i er 1 bij optel
                var letterWoord = "C" + letterNr; // Maak er BC en BC van etc (avhankelijk van de lengte van de A array
                var letterWoordTxt = test[2][c];   // Wat wordt daadwerkelijk ingevuld in de juiste positie?
                //alert(letterWoordTxt);
                binden(letterWoord,letterWoordTxt);
                mijnConsoleWaarde.text ="C binden";

            } // einde cab de C loop
            //alert("Done importing text into A, B and C!")
        }
        c_binden();


        SP_textSize1();
        SP_textSize3();
        SP_textSize4();

        DC_OffsetComplete();

    } // Einde van de DC_ABC_Import functie





function SP_textSize1(){
    app.beginUndoGroup("DC_TextSize3.0");


    var CompNames =[];
    CompNames[0] = "01_intro";
    CompNames[1] = "03_IconUSPs";
    CompNames[2] = "04_Outro";
//alert(CompNames);

    var mijnComp = app.project.item(1);

    //alert(mijnComp.name);
    mijnConsoleWaarde.text = "verwerken van: " + mijnComp.name;




    // Alle layers uit de geselecteerde compositie item vastpakken
    mijnLayer = mijnComp.layers;
    //alert(mijnLayer[1]);


    for (var i=1; i<mijnLayer.length+1; i++) {
        if( (mijnLayer[i] instanceof TextLayer) == true) {

            //alert(mijnLayer[i].name); // loop hier correct door alle layers heen
            DC_TextSizeComp(i);
            if (i == mijnLayer.length){
                //alert("Done collecting textSize data!");

            } // Einde van de if statement
        } // Einde van de if statement "is textlaye true"
    } // Einde van de for loop


// mijnGlobal Variables
    var widthIngevoerd = "";
    var heightIngevoerd = "";
    var mijnComp = "";
    var mijnLayer = "";
    var progress = 0;


    function DC_getEffects(layer, matchName){
        // berekent het aantal effecten in een layer
        var matchingEffects = [];

        var N,n;
        if (layer.effect)
        {
            N = layer.effect.numProperties;
            for (n=1; n<=N; n++) if (layer.effect(n).matchName===matchName) matchingEffects.push(layer.effect(n));
        };
        return matchingEffects;
    }; // Einde DC_getEffects


    function DC_TextSizeUitvoerenComp(mijnComp2) {

        mijnComp = mijnComp2;

        // detecteer of er ten minste 1 actieve geselecteerde compositie item bestaat

        if (mijnComp == null || (mijnComp instanceof CompItem) == false) {
            alert("Please select at leat one composition item." );
        }

        var arr =[];
        for (i=0;i<mijnComp.layers;i++){
        }

        // Alle layers uit de geselecteerde compositie item vastpakken
        mijnLayer = mijnComp.layers;
        //alert(mijnLayer[1]);


        // Zorg ervoor dat de geselecteerde "Compositie Layer" niet leeg is



        for (var i=1; i<mijnLayer.length+1; i++) {
            if( (mijnLayer[i] instanceof TextLayer) == true) {

                //alert(mijnLayer[i].name);
                DC_TextSizeComp(i);
                if (i == mijnLayer.length){
                    //alert("Done collecting textSize data!");

                } // Einde van de if statement
            } // Einde van de if statement "is textlaye true"
        } // Einde van de for loop

    }


    function DC_TextSizeComp(layer) {

        //mijnComp = app.project.activeItem;

        // De geselecteerde layer pakken -- LOCAL VARIABLE

        var mijnLayer2 = mijnComp.layer(layer);
        var mijnLayerNaam = mijnLayer2.name;

        //alert(mijnLayerNaam);


        // ** De hoogte en breedte van de geselecteerde text element vastgrijpen ** //

        var textBox = mijnLayer2.sourceRectAtTime(0, false);
        var textWidth = textBox.width;
        var textHeight = textBox.height;

        var breedteNaam = "Info width";
        var hoogteNaam = "Info height";


        mijnSliderA = mijnLayer2.property("Effects").property("ADBE Slider Control")
        if(mijnSliderA == null) { // Controleren or er al slider controls bestaan

            // ** De Slider Controls Aanmaken (Hoogte) ** //
            var mijnSlider2 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
            mijnSlider2.name = breedteNaam;
            mijnSlider2.property("Slider").setValue(textWidth);

            // ** De Slider Controls Aanmaken (Breedte) ** //
            var mijnSlider1 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
            mijnSlider1.name = hoogteNaam;
            mijnSlider1.property("Slider").setValue(textHeight);

            var layerGetal = mijnLayer2.index +1;

            var aantalLayers = mijnComp.layers.length;
            var test = "testen123";
            //alert(aantalLayers);
            mijnSolidIndex = aantalLayers +1;
            //alert (mijnSolidIndex);

            var mijnSolidSettings = [1920,1080,1,10,24]
            // var MijnSolid = mijnComp.layers.addSolid([0.1, 0.1, 0.3], "BGSolid", mijnSolidSettings[0], mijnSolidSettings[1], mijnSolidSettings[2]);
            alert("ervoor");
        } else {
            //alert("erna");
            // De else statement die het vervangen van data uitvoert

            var mijnLayer2 = mijnComp.layer(layer); // De geselecteerde layer pakken -- LOCAL VARIABLE

            var mijnSlider = mijnLayer2.property("Effects");
            var aantalEffecten = mijnSlider.numProperties; //  Aantal gevonden effecten in deze layer

            //alert(mijnLayer2.name);
            //alert(mijnSlider);
            //alert(aantalEffecten);


            for (u=1;u<=aantalEffecten;u++){ //De namen en indexes van de sliders effecten in een array plaatsen
                var namenArray = new Array();

                var sliderIndex =  u+1;
                namenArray[i] = mijnSlider(u).name;
                if (mijnSlider(u).name == breedteNaam){
                    mijnSlider(u).property("Slider").setValue(textWidth);
                }
                if (mijnSlider(u).name == hoogteNaam){
                    mijnSlider(u).property("Slider").setValue(textHeight);
                }
            }

        } // einde van de else statement

    }



    app.endUndoGroup();

} // Einde van de SP_textSize Function

function SP_textSize3(){
    app.beginUndoGroup("DC_TextSize3.0");


    var CompNames =[];
    CompNames[0] = "01_intro";
    CompNames[1] = "03_IconUSPs";
    CompNames[2] = "04_Outro";
//alert(CompNames);

    var mijnComp = app.project.item(3);

    //alert(mijnComp.name);
    mijnConsoleWaarde.text = "verwerken van: " + mijnComp.name;
    progress.value = 50;




    // Alle layers uit de geselecteerde compositie item vastpakken
    mijnLayer = mijnComp.layers;
    //alert(mijnLayer[1]);


    for (var i=1; i<mijnLayer.length+1; i++) {
        if( (mijnLayer[i] instanceof TextLayer) == true) {

            //alert(mijnLayer[i].name); // loop hier correct door alle layers heen
            DC_TextSizeComp(i);
            if (i == mijnLayer.length){
                //alert("Done collecting textSize data!");

            } // Einde van de if statement
        } // Einde van de if statement "is textlaye true"
    } // Einde van de for loop


// mijnGlobal Variables
    var widthIngevoerd = "";
    var heightIngevoerd = "";
    var mijnComp = "";
    var mijnLayer = "";
    //var progress = 0;


    function DC_getEffects(layer, matchName){
        // berekent het aantal effecten in een layer
        var matchingEffects = [];

        var N,n;
        if (layer.effect)
        {
            N = layer.effect.numProperties;
            for (n=1; n<=N; n++) if (layer.effect(n).matchName===matchName) matchingEffects.push(layer.effect(n));
        };
        return matchingEffects;
    }; // Einde DC_getEffects


    function DC_TextSizeUitvoerenComp(mijnComp2) {

        mijnComp = mijnComp2;

        // detecteer of er ten minste 1 actieve geselecteerde compositie item bestaat

        if (mijnComp == null || (mijnComp instanceof CompItem) == false) {
            alert("Please select at leat one composition item." );
        }

        var arr =[];
        for (i=0;i<mijnComp.layers;i++){
        }

        // Alle layers uit de geselecteerde compositie item vastpakken
        mijnLayer = mijnComp.layers;
        //alert(mijnLayer[1]);


        // Zorg ervoor dat de geselecteerde "Compositie Layer" niet leeg is



        for (var i=1; i<mijnLayer.length+1; i++) {
            if( (mijnLayer[i] instanceof TextLayer) == true) {

                //alert(mijnLayer[i].name);
                DC_TextSizeComp(i);
                if (i == mijnLayer.length){
                    //alert("Done collecting textSize data!");

                } // Einde van de if statement
            } // Einde van de if statement "is textlaye true"
        } // Einde van de for loop

    }


    function DC_TextSizeComp(layer) {

        //mijnComp = app.project.activeItem;

        // De geselecteerde layer pakken -- LOCAL VARIABLE

        var mijnLayer2 = mijnComp.layer(layer);
        var mijnLayerNaam = mijnLayer2.name;

        //alert(mijnLayerNaam);


        // ** De hoogte en breedte van de geselecteerde text element vastgrijpen ** //

        var textBox = mijnLayer2.sourceRectAtTime(0, false);
        var textWidth = textBox.width;
        var textHeight = textBox.height;

        var breedteNaam = "Info width";
        var hoogteNaam = "Info height";


        mijnSliderA = mijnLayer2.property("Effects").property("ADBE Slider Control")
        if(mijnSliderA == null) { // Controleren or er al slider controls bestaan

            // ** De Slider Controls Aanmaken (Hoogte) ** //
            var mijnSlider2 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
            mijnSlider2.name = breedteNaam;
            mijnSlider2.property("Slider").setValue(textWidth);

            // ** De Slider Controls Aanmaken (Breedte) ** //
            var mijnSlider1 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
            mijnSlider1.name = hoogteNaam;
            mijnSlider1.property("Slider").setValue(textHeight);

            var layerGetal = mijnLayer2.index +1;

            var aantalLayers = mijnComp.layers.length;
            var test = "testen123";
            //alert(aantalLayers);
            mijnSolidIndex = aantalLayers +1;
            //alert (mijnSolidIndex);

            var mijnSolidSettings = [1920,1080,1,10,24]
            // var MijnSolid = mijnComp.layers.addSolid([0.1, 0.1, 0.3], "BGSolid", mijnSolidSettings[0], mijnSolidSettings[1], mijnSolidSettings[2]);
            alert("ervoor");
        } else {
            //alert("erna");
            // De else statement die het vervangen van data uitvoert

            var mijnLayer2 = mijnComp.layer(layer); // De geselecteerde layer pakken -- LOCAL VARIABLE

            var mijnSlider = mijnLayer2.property("Effects");
            var aantalEffecten = mijnSlider.numProperties; //  Aantal gevonden effecten in deze layer

            //alert(mijnLayer2.name);
            //alert(mijnSlider);
            //alert(aantalEffecten);


            for (u=1;u<=aantalEffecten;u++){ //De namen en indexes van de sliders effecten in een array plaatsen
                var namenArray = new Array();

                var sliderIndex =  u+1;
                namenArray[i] = mijnSlider(u).name;
                if (mijnSlider(u).name == breedteNaam){
                    mijnSlider(u).property("Slider").setValue(textWidth);
                }
                if (mijnSlider(u).name == hoogteNaam){
                    mijnSlider(u).property("Slider").setValue(textHeight);
                }
            }

        } // einde van de else statement

    }



    app.endUndoGroup();

} // Einde van de SP_textSize Function

function SP_textSize4(){
    app.beginUndoGroup("DC_TextSize3.0");


    var CompNames =[];
    CompNames[0] = "01_intro";
    CompNames[1] = "03_IconUSPs";
    CompNames[2] = "04_Outro";
//alert(CompNames);

    var mijnComp = app.project.item(4);

    //alert(mijnComp.name);
    mijnConsoleWaarde.text = "verwerken van: " + mijnComp.name;
    progress.value = 65;




    // Alle layers uit de geselecteerde compositie item vastpakken
    mijnLayer = mijnComp.layers;
    //alert(mijnLayer[1]);


    for (var i=1; i<mijnLayer.length+1; i++) {
        if( (mijnLayer[i] instanceof TextLayer) == true) {

            //alert(mijnLayer[i].name); // loop hier correct door alle layers heen
            DC_TextSizeComp(i);
            if (i == mijnLayer.length){
                //alert("Done collecting textSize data!");

            } // Einde van de if statement
        } // Einde van de if statement "is textlaye true"
    } // Einde van de for loop


// mijnGlobal Variables
    var widthIngevoerd = "";
    var heightIngevoerd = "";
    var mijnComp = "";
    var mijnLayer = "";
    //var progress = 0;


    function DC_getEffects(layer, matchName){
        // berekent het aantal effecten in een layer
        var matchingEffects = [];

        var N,n;
        if (layer.effect)
        {
            N = layer.effect.numProperties;
            for (n=1; n<=N; n++) if (layer.effect(n).matchName===matchName) matchingEffects.push(layer.effect(n));
        };
        return matchingEffects;
    }; // Einde DC_getEffects


    function DC_TextSizeUitvoerenComp(mijnComp2) {

        mijnComp = mijnComp2;

        // detecteer of er ten minste 1 actieve geselecteerde compositie item bestaat

        if (mijnComp == null || (mijnComp instanceof CompItem) == false) {
            alert("Please select at leat one composition item." );
        }

        var arr =[];
        for (i=0;i<mijnComp.layers;i++){
        }

        // Alle layers uit de geselecteerde compositie item vastpakken
        mijnLayer = mijnComp.layers;
        //alert(mijnLayer[1]);


        // Zorg ervoor dat de geselecteerde "Compositie Layer" niet leeg is



        for (var i=1; i<mijnLayer.length+1; i++) {
            if( (mijnLayer[i] instanceof TextLayer) == true) {

                //alert(mijnLayer[i].name);
                DC_TextSizeComp(i);
                if (i == mijnLayer.length){
                    //alert("Done collecting textSize data!");

                } // Einde van de if statement
            } // Einde van de if statement "is textlaye true"
        } // Einde van de for loop

    }


    function DC_TextSizeComp(layer) {

        //mijnComp = app.project.activeItem;

        // De geselecteerde layer pakken -- LOCAL VARIABLE

        var mijnLayer2 = mijnComp.layer(layer);
        var mijnLayerNaam = mijnLayer2.name;

        //alert(mijnLayerNaam);


        // ** De hoogte en breedte van de geselecteerde text element vastgrijpen ** //

        var textBox = mijnLayer2.sourceRectAtTime(0, false);
        var textWidth = textBox.width;
        var textHeight = textBox.height;

        var breedteNaam = "Info width";
        var hoogteNaam = "Info height";


        mijnSliderA = mijnLayer2.property("Effects").property("ADBE Slider Control")
        if(mijnSliderA == null) { // Controleren or er al slider controls bestaan

            // ** De Slider Controls Aanmaken (Hoogte) ** //
            var mijnSlider2 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
            mijnSlider2.name = breedteNaam;
            mijnSlider2.property("Slider").setValue(textWidth);

            // ** De Slider Controls Aanmaken (Breedte) ** //
            var mijnSlider1 = mijnLayer2.property("Effects").addProperty("ADBE Slider Control");
            mijnSlider1.name = hoogteNaam;
            mijnSlider1.property("Slider").setValue(textHeight);

            var layerGetal = mijnLayer2.index +1;

            var aantalLayers = mijnComp.layers.length;
            var test = "testen123";
            //alert(aantalLayers);
            mijnSolidIndex = aantalLayers +1;
            //alert (mijnSolidIndex);

            var mijnSolidSettings = [1920,1080,1,10,24]
            // var MijnSolid = mijnComp.layers.addSolid([0.1, 0.1, 0.3], "BGSolid", mijnSolidSettings[0], mijnSolidSettings[1], mijnSolidSettings[2]);
            alert("ervoor");
        } else {
            //alert("erna");
            // De else statement die het vervangen van data uitvoert

            var mijnLayer2 = mijnComp.layer(layer); // De geselecteerde layer pakken -- LOCAL VARIABLE

            var mijnSlider = mijnLayer2.property("Effects");
            var aantalEffecten = mijnSlider.numProperties; //  Aantal gevonden effecten in deze layer

            //alert(mijnLayer2.name);
            //alert(mijnSlider);
            //alert(aantalEffecten);


            for (u=1;u<=aantalEffecten;u++){ //De namen en indexes van de sliders effecten in een array plaatsen
                var namenArray = new Array();

                var sliderIndex =  u+1;
                namenArray[i] = mijnSlider(u).name;
                if (mijnSlider(u).name == breedteNaam){
                    mijnSlider(u).property("Slider").setValue(textWidth);
                }
                if (mijnSlider(u).name == hoogteNaam){
                    mijnSlider(u).property("Slider").setValue(textHeight);
                }
            }

        } // einde van de else statement

    }



    app.endUndoGroup();

} // Einde van de SP_textSize Function

function DC_OffsetComplete() {

    mijnConsoleWaarde.text ="Layer offsets uitvoeren";

    app.project.timeDisplayType=TimeDisplayType.TIMECODE; // Zet de tijdcode style eerst om naar TIMECODE i.p.v. frames

    progress.value = 85;

    mijnConsoleWaarde.text = "Offset van de control layer toepassen";


    var refCompNaam = "RenderComp" ;

    var foundIt = false; // Het is er niet
    for (var i = 1; i <= app.project.numItems; i++){

        if (app.project.item(i).name == refCompNaam && app.project.item(i) instanceof CompItem ){
            var mijnComp = app.project.item(i);
            foundIt = true;
            //break;
        }

    }
    if (foundIt){
        //alert("RenderComp bestaat.");
        DC_offsetA();
        DC_offsetB();

    } else {
        alert("is is geen Comp aanwezig met de naam RenderComp" );
    }


    function DC_getEffects(layer, matchName){
        // berekent het aantal effecten in een layer
        var matchingEffects = [];

        var N,n;
        if (layer.effect)
        {
            N = layer.effect.numProperties;
            for (n=1; n<=N; n++) if (layer.effect(n).matchName===matchName) matchingEffects.push(layer.effect(n));
        };
        return matchingEffects;
    }; // Einde DC_getEffects


    function DC_offsetA() {


        var mijnLayer2 = mijnComp.layers;

        for (var i=1; i<mijnLayer2.length+1; i++) { // een loop door alle layers

            var thisLayer = mijnComp.layer(i);
            //alert(thisLayer.name);

            var layerEffecten = DC_getEffects(thisLayer,"ADBE Slider Control");
            var layerEffectenPlus = layerEffecten.length +1;

            if(mijnComp.layer(i).name == "Master_CTRL" ){

                for (y=1 ; y < layerEffectenPlus ; y++) {

                    if (thisLayer.property("Effects")(y).name == "MasterStartFrame") {
                        var opgeslagenStartAreaTMP = thisLayer.property("Effects")(y).property("slider").value;
                        var opgeslagenStartArea = currentFormatToTime("0:" + opgeslagenStartAreaTMP, mijnComp.frameRate);
                    }
                    if (thisLayer.property("Effects")(y).name == "MasterEndFrame") {
                        var opgeslagenEindAreaTMP = thisLayer.property("Effects")(y).property("slider").value;
                        var opgeslagenEindArea = currentFormatToTime("0:" + (opgeslagenEindAreaTMP + 1), mijnComp.frameRate);
                    }
                }

                var alleLayers = mijnComp.layers;

                mijnComp.workAreaStart = opgeslagenStartArea; // Area Start in Secondes
                var areaStartTijd = mijnComp.workAreaStart;
                var ingevoerdeTijd = opgeslagenEindArea; // Area eindtijd
                mijnComp.workAreaDuration = ingevoerdeTijd - areaStartTijd;

            }
        }
        progress.value = 90;


        mijnConsoleWaarde.text = "Offset van de text layers toepassen";


    }// einde DC_offset A function


    function DC_offsetB() {


        var mijnLayer2 = mijnComp.layers;

        for (var i=1; i<mijnLayer2.length+1; i++) { // een loop door alle layers
            var thisLayer = mijnComp.layer(i);

            var layerEffecten = DC_getEffects(thisLayer,"ADBE Slider Control");
            var layerEffectenPlus = layerEffecten.length +1;

            for (p=1 ; p < layerEffectenPlus ; p++) {

                if (thisLayer.property("Effects")(p).name == "startFrame") { // layer offset Inpoint
                    var opgeslagenStartFrame = thisLayer.property("Effects")(p).property("slider").value;
                    var DC_frameStart = (opgeslagenStartFrame);
                    //alert(DC_frameStart);
                }

                if (thisLayer.property("Effects")(p).name == "endFrame") { // layer offset Outpoint
                    var opgeslagenEindFrameTmp = thisLayer.property("Effects")(p).property("slider").value;
                    var opgeslagenEindFrame = opgeslagenEindFrameTmp +1;
                    var DC_frameEinde = opgeslagenEindFrame;
                    //alert(opgeslagenEindFrameTmp);
                    //alert(" Layernaam is: " + thisLayer.name + " test frameeinde getal is: " + DC_frameEinde);
                }


                var startTijd = DC_frameStart / mijnComp.frameRate;
                var eindTijd = DC_frameEinde / mijnComp.frameRate;

                var starten = currentFormatToTime("0:" + (DC_frameStart ), mijnComp.frameRate)
                var eindigen = currentFormatToTime("0:" + DC_frameEinde, mijnComp.frameRate)

                thisLayer.startTime = starten;
                thisLayer.outPoint = eindigen;


            } // einde van de loop
        }


        progress.value = 100;

        //SP_textSize1();
        mijnConsoleWaarde.text = "tweede comp textsize uitvoeren";

        //SP_textSize3();
        mijnConsoleWaarde.text = "derde comp textsize uitvoeren";

        //SP_textSize4();



    } // einde DC_offset B function

    mijnConsoleWaarde.text = "klaar";

} // Einde van de DC_Offset Functie











