class Node {
    constructor(question, yes=null, no=null) {
        this.question = question;
        this.yes = yes;
        this.no = no;
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

function guessAnimal(now) {
    const svar = prompt(now.question + " (Ja/Nej): ").toLowerCase();
    if (svar === "ja") {
        if (now.yes) {
            return guessAnimal(now.yes);
        } else {
            return "Jeg gætter: " + now.question;
        }
    } else {
        if (now.no) {
            return guessAnimal(now.no);
        } else {
            //Hvis computeren ikke gætter korrekt
            const nytDyr = prompt("Hvilket dyr var der tale om?");
            const nytSpørgsmål = prompt("Hvilket spørgsmål kunne stilles for at identificere dyret korrekt?");
            const nyDyrNode = new Node(nytDyr);
            const nytSpørgsmålNode = new Node(nytSpørgsmål, nyDyrNode, now);
            //Opdatere træet
            const parent = findParentNode(træ, now);
            if (parent) {
                if (parent.yes === now) {
                    parent.yes = nytSpørgsmålNode;
                } else if (parent.no === now) {
                    parent.no = nytSpørgsmålNode;
                }
            }
            return "Dyret er blevet tilføjet til træet. Spillet starter forfra.";
        }
    }
}

//funktion til at finde parentnode til en given node
function findParentNode(root, node) {
    if (!root || !node) return null;
    if (root.yes === node || root.no === node) return root;
    return findParentNode(root.yes, node) || findParentNode(root.no, node);
}

//starter spillet
alert("Velkommen til Gæt Dyret spillet!");
alert(guessAnimal(træ));