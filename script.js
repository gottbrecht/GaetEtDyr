class Node {
    constructor(question, yes=null, no=null) {
        this.question = question;
        this.yes = yes;
        this.no = no;
    }
}

//Funktion til at læse træet fra JSON-filen
function loadTreeFromJSON(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Fejl ved indlæsning af træet fra JSON:", error);
        return null;
    }
}

//Funktion til at gemme træet som JSON
function saveTreeToJSON(tree) {
    try {
        return JSON.stringify(tree, null, 2);
    } catch (error) {
        console.error("Fejl ved gemning af træet som JSON:", error);
        return null;
    }
}
//Opret det oprindelige træ
const træ = new Node("Har det pels?");
const pattedyrNode = new Node("Er det et pattedyr?");
const fuglNode = new Node("Kan det flyve?");
const fiskNode = new Node("Er det en fisk?");
const insektNode = new Node("Har det seks ben?");

træ.yes = pattedyrNode;
træ.no = fuglNode;
pattedyrNode.yes = new Node("Er det en hund?");
pattedyrNode.no = new Node("Er det en kat?");
fuglNode.yes = new Node("Er det en ørn?");
fuglNode.no = fiskNode;
fiskNode.yes = new Node("Er det en haj?");
fiskNode.no = insektNode;
insektNode.yes = new Node("Er det en myre?");
insektNode.no = new Node("Er det en sommerfugl?");

//funktion til at spille spillet
function playGame(now) {
    const svar = prompt(now.question + " (Ja/Nej): ").toLowerCase();
    if (svar === "ja") {
        if (now.yes) {
            playGame(now.yes);
        } else {
            alert("Jeg gætter: " + now.question);
            restartGame();
        }
    } else {
        if (now.no) {
            playGame(now.no);
        } else {
            //hvis computeren ikke gætter korrekt
            const nytDyr = prompt("Hvilket dyr var der tale om?");
            const nytSpørgsmål = prompt("Hvilket spørgsmål kunne stilles for at identificere dyret korrekt?");
            const nyDyrNode = new Node(nytDyr);
            const nytSpørgsmålNode = new Node(nytSpørgsmål, nyDyrNode, now);
            //opdatere træet
            const parent = findParentNode(træ, now);
            if (parent) {
                if (parent.yes === now) {
                    parent.yes = nytSpørgsmålNode;
                } else if (parent.no === now) {
                    parent.no = nytSpørgsmålNode;
                }
            }
            alert("Dyret er blevet tilføjet til træet. Spillet starter forfra.");
            restartGame();
        }
    }
}

//funktion genstarter spillet
function restartGame() {
    alert("Velkommen til Gæt Dyret spillet!");
    playGame(træ);
}

//funktion til at finde parentnoden til en given node
function findParentNode(root, node) {
    if (!root || !node) return null;
    if (root.yes === node || root.no === node) return root;
    return findParentNode(root.yes, node) || findParentNode(root.no, node);
}

//funktion til at hente træet fra JSON-filen
function loadTree() {
    const jsonString = prompt("Indtast træet som JSON:");
    if (jsonString) {
        træ = loadTreeFromJSON(jsonString);
        if (træ) {
            alert("Træet er blevet indlæst fra JSON.");
        } else {
            alert("Fejl ved indlæsning af træet fra JSON.");
        }
    }
}

//funktion til at gemme træet som JSON
function saveTree() {
    const jsonTree = saveTreeToJSON(træ);
    if (jsonTree) {
        alert("Træet er blevet gemt som JSON:\n" + jsonTree);
    } else {
        alert("Fejl ved gemning af træet som JSON.");
    }
}

//Starter spillet
restartGame();
